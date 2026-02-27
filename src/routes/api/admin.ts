// ============================================
// Admin API Routes - Articles & Settings Management
// ============================================

import { Hono } from 'hono'
import { cors } from 'hono/cors'

type Bindings = {
  DB: D1Database;
}

const admin = new Hono<{ Bindings: Bindings }>()

// Enable CORS for admin routes
admin.use('/*', cors({
  origin: '*',
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}))

// ============================================
// AUTHENTICATION
// ============================================

// Login endpoint
admin.post('/auth/login', async (c) => {
  try {
    const { username, password } = await c.req.json()
    
    // Basic validation
    if (!username || !password) {
      return c.json({ error: 'Username and password required' }, 400)
    }

    // For now, simple authentication (username: admin, password: admin123)
    // TODO: Implement proper bcrypt password hashing
    if (username === 'admin' && password === 'admin123') {
      return c.json({
        success: true,
        user: {
          id: 1,
          username: 'admin',
          email: 'admin@drmohammedsaeed.com',
          full_name: 'Admin User'
        },
        token: 'simple-auth-token' // TODO: Implement JWT
      })
    }

    return c.json({ error: 'Invalid credentials' }, 401)
  } catch (error) {
    return c.json({ error: 'Login failed' }, 500)
  }
})

// ============================================
// ARTICLES API
// ============================================

// Get all articles
admin.get('/articles', async (c) => {
  try {
    const { DB } = c.env
    const { results } = await DB.prepare(`
      SELECT 
        id, slug, title_ar, title_en, excerpt_ar, excerpt_en,
        main_image_url, category, tags, is_published, 
        published_at, created_at, updated_at, views
      FROM articles
      ORDER BY created_at DESC
    `).all()

    return c.json({ success: true, articles: results })
  } catch (error) {
    return c.json({ error: 'Failed to fetch articles' }, 500)
  }
})

// Get single article
admin.get('/articles/:id', async (c) => {
  try {
    const { DB } = c.env
    const id = c.req.param('id')

    const { results } = await DB.prepare(`
      SELECT * FROM articles WHERE id = ?
    `).bind(id).all()

    if (results.length === 0) {
      return c.json({ error: 'Article not found' }, 404)
    }

    return c.json({ success: true, article: results[0] })
  } catch (error) {
    return c.json({ error: 'Failed to fetch article' }, 500)
  }
})

// Create new article
admin.post('/articles', async (c) => {
  try {
    const { DB } = c.env
    const article = await c.req.json()

    // Generate slug from title
    const slug = article.slug || generateSlug(article.title_ar)

    const result = await DB.prepare(`
      INSERT INTO articles (
        slug, title_ar, title_en, excerpt_ar, excerpt_en,
        content_ar, content_en, main_image_url, category, tags,
        is_published, published_at, author_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      slug,
      article.title_ar,
      article.title_en,
      article.excerpt_ar || '',
      article.excerpt_en || '',
      article.content_ar,
      article.content_en,
      article.main_image_url || '',
      article.category || '',
      JSON.stringify(article.tags || []),
      article.is_published ? 1 : 0,
      article.is_published ? new Date().toISOString() : null,
      1 // Default admin user
    ).run()

    return c.json({
      success: true,
      message: 'Article created successfully',
      id: result.meta.last_row_id
    })
  } catch (error) {
    console.error('Error creating article:', error)
    return c.json({ error: 'Failed to create article' }, 500)
  }
})

// Update article
admin.put('/articles/:id', async (c) => {
  try {
    const { DB } = c.env
    const id = c.req.param('id')
    const article = await c.req.json()

    await DB.prepare(`
      UPDATE articles SET
        title_ar = ?,
        title_en = ?,
        excerpt_ar = ?,
        excerpt_en = ?,
        content_ar = ?,
        content_en = ?,
        main_image_url = ?,
        category = ?,
        tags = ?,
        is_published = ?,
        published_at = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(
      article.title_ar,
      article.title_en,
      article.excerpt_ar || '',
      article.excerpt_en || '',
      article.content_ar,
      article.content_en,
      article.main_image_url || '',
      article.category || '',
      JSON.stringify(article.tags || []),
      article.is_published ? 1 : 0,
      article.is_published ? new Date().toISOString() : null,
      id
    ).run()

    return c.json({
      success: true,
      message: 'Article updated successfully'
    })
  } catch (error) {
    console.error('Error updating article:', error)
    return c.json({ error: 'Failed to update article' }, 500)
  }
})

// Delete article
admin.delete('/articles/:id', async (c) => {
  try {
    const { DB } = c.env
    const id = c.req.param('id')

    await DB.prepare(`
      DELETE FROM articles WHERE id = ?
    `).bind(id).run()

    return c.json({
      success: true,
      message: 'Article deleted successfully'
    })
  } catch (error) {
    return c.json({ error: 'Failed to delete article' }, 500)
  }
})

// ============================================
// SITE SETTINGS API
// ============================================

// Get all settings
admin.get('/settings', async (c) => {
  try {
    const { DB } = c.env
    const { results } = await DB.prepare(`
      SELECT * FROM site_settings ORDER BY category, setting_key
    `).all()

    return c.json({ success: true, settings: results })
  } catch (error) {
    return c.json({ error: 'Failed to fetch settings' }, 500)
  }
})

// Get specific setting
admin.get('/settings/:key', async (c) => {
  try {
    const { DB } = c.env
    const key = c.req.param('key')

    const { results } = await DB.prepare(`
      SELECT * FROM site_settings WHERE setting_key = ?
    `).bind(key).all()

    if (results.length === 0) {
      return c.json({ error: 'Setting not found' }, 404)
    }

    return c.json({ success: true, setting: results[0] })
  } catch (error) {
    return c.json({ error: 'Failed to fetch setting' }, 500)
  }
})

// Update setting
admin.put('/settings/:key', async (c) => {
  try {
    const { DB } = c.env
    const key = c.req.param('key')
    const { value } = await c.req.json()

    await DB.prepare(`
      UPDATE site_settings 
      SET setting_value = ?, updated_at = CURRENT_TIMESTAMP
      WHERE setting_key = ?
    `).bind(value, key).run()

    return c.json({
      success: true,
      message: 'Setting updated successfully'
    })
  } catch (error) {
    return c.json({ error: 'Failed to update setting' }, 500)
  }
})

// Bulk update settings
admin.post('/settings/bulk', async (c) => {
  try {
    const { DB } = c.env
    const { settings } = await c.req.json()

    // Update each setting
    for (const [key, value] of Object.entries(settings)) {
      await DB.prepare(`
        UPDATE site_settings 
        SET setting_value = ?, updated_at = CURRENT_TIMESTAMP
        WHERE setting_key = ?
      `).bind(value, key).run()
    }

    return c.json({
      success: true,
      message: 'Settings updated successfully'
    })
  } catch (error) {
    return c.json({ error: 'Failed to update settings' }, 500)
  }
})

// ============================================
// HELPER FUNCTIONS
// ============================================

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
    || `article-${Date.now()}`
}

export default admin
