import { Hono } from 'hono';
import type { AppContext, Article } from '../types';
import { createPagination } from '../lib/utils';

const articles = new Hono<AppContext>();

/**
 * GET /api/articles
 * List all published articles with pagination and filtering
 */
articles.get('/', async (c) => {
  const lang = c.get('lang');
  const page = parseInt(c.req.query('page') || '1');
  const limit = parseInt(c.req.query('limit') || '10');
  const category = c.req.query('category');
  const tag = c.req.query('tag');
  const search = c.req.query('search');
  const offset = (page - 1) * limit;
  
  try {
    let query = 'SELECT a.* FROM articles a WHERE a.status = ?';
    const params: any[] = ['published'];
    
    if (category) {
      query += ' AND a.category_id = (SELECT id FROM categories WHERE slug_' + lang + ' = ?)';
      params.push(category);
    }
    
    if (tag) {
      query += ' AND a.id IN (SELECT article_id FROM article_tags at JOIN tags t ON at.tag_id = t.id WHERE t.slug_' + lang + ' = ?)';
      params.push(tag);
    }
    
    if (search) {
      const searchField = lang === 'ar' ? 'title_ar' : 'title_en';
      query += ` AND a.${searchField} LIKE ?`;
      params.push(`%${search}%`);
    }
    
    query += ' ORDER BY a.published_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);
    
    const { results } = await c.env.DB.prepare(query).bind(...params).all<Article>();
    
    const countQuery = query.replace(/SELECT a\.\*/, 'SELECT COUNT(*) as total').replace(/ORDER BY.*/, '');
    const countParams = params.slice(0, -2); // Remove limit and offset
    const totalResult = await c.env.DB.prepare(countQuery).bind(...countParams).first<{ total: number }>();
    const total = totalResult?.total || 0;
    
    return c.json({
      success: true,
      data: results,
      pagination: createPagination(page, limit, total)
    });
  } catch (error) {
    return c.json({
      success: false,
      error: 'Failed to fetch articles'
    }, 500);
  }
});

/**
 * GET /api/articles/:slug
 * Get single article by slug
 */
articles.get('/:slug', async (c) => {
  const lang = c.get('lang');
  const slug = c.req.param('slug');
  const slugField = lang === 'ar' ? 'slug_ar' : 'slug_en';
  
  try {
    const article = await c.env.DB.prepare(
      `SELECT a.*, u.full_name as author_name, c.name_${lang} as category_name
       FROM articles a
       LEFT JOIN users u ON a.author_id = u.id
       LEFT JOIN categories c ON a.category_id = c.id
       WHERE a.${slugField} = ? AND a.status = ?`
    ).bind(slug, 'published').first();
    
    if (!article) {
      return c.json({
        success: false,
        error: 'Article not found'
      }, 404);
    }
    
    // Increment view count
    await c.env.DB.prepare(
      'UPDATE articles SET view_count = view_count + 1 WHERE id = ?'
    ).bind((article as any).id).run();
    
    // Fetch tags
    const { results: tags } = await c.env.DB.prepare(
      `SELECT t.id, t.name_${lang} as name, t.slug_${lang} as slug
       FROM tags t
       JOIN article_tags at ON t.id = at.tag_id
       WHERE at.article_id = ?`
    ).bind((article as any).id).all();
    
    return c.json({
      success: true,
      data: {
        ...article,
        tags
      }
    });
  } catch (error) {
    return c.json({
      success: false,
      error: 'Failed to fetch article'
    }, 500);
  }
});

/**
 * GET /api/articles/related/:id
 * Get related articles (same category)
 */
articles.get('/related/:id', async (c) => {
  const lang = c.get('lang');
  const articleId = parseInt(c.req.param('id'));
  const limit = parseInt(c.req.query('limit') || '3');
  
  try {
    const article = await c.env.DB.prepare(
      'SELECT category_id FROM articles WHERE id = ?'
    ).bind(articleId).first<{ category_id: number }>();
    
    if (!article) {
      return c.json({ success: false, error: 'Article not found' }, 404);
    }
    
    const { results } = await c.env.DB.prepare(
      `SELECT * FROM articles 
       WHERE category_id = ? 
       AND id != ? 
       AND status = ? 
       ORDER BY published_at DESC 
       LIMIT ?`
    ).bind(article.category_id, articleId, 'published', limit).all<Article>();
    
    return c.json({
      success: true,
      data: results
    });
  } catch (error) {
    return c.json({
      success: false,
      error: 'Failed to fetch related articles'
    }, 500);
  }
});

export default articles;
