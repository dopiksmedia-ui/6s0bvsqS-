// ============================================
// Admin API Routes - Articles & Settings Management
// ============================================

import { Hono } from 'hono'
import { cors } from 'hono/cors'

type Bindings = {
  DB: D1Database;
  MEDIA_BUCKET?: R2Bucket;
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
        is_published, published_at, author_id,
        meta_title_ar, meta_title_en, meta_description_ar, meta_description_en,
        meta_keywords, featured_video_embed, seo_index, seo_follow,
        canonical_url, og_image_url, related_articles, read_time
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      1, // Default admin user
      article.meta_title_ar || article.title_ar,
      article.meta_title_en || article.title_en,
      article.meta_description_ar || article.excerpt_ar || '',
      article.meta_description_en || article.excerpt_en || '',
      JSON.stringify(article.meta_keywords || []),
      article.featured_video_embed || '',
      article.seo_index !== undefined ? article.seo_index : 1,
      article.seo_follow !== undefined ? article.seo_follow : 1,
      article.canonical_url || '',
      article.og_image_url || article.main_image_url || '',
      JSON.stringify(article.related_articles || []),
      article.read_time || 5
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
        meta_title_ar = ?,
        meta_title_en = ?,
        meta_description_ar = ?,
        meta_description_en = ?,
        meta_keywords = ?,
        featured_video_embed = ?,
        seo_index = ?,
        seo_follow = ?,
        canonical_url = ?,
        og_image_url = ?,
        related_articles = ?,
        read_time = ?,
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
      article.meta_title_ar || article.title_ar,
      article.meta_title_en || article.title_en,
      article.meta_description_ar || article.excerpt_ar || '',
      article.meta_description_en || article.excerpt_en || '',
      JSON.stringify(article.meta_keywords || []),
      article.featured_video_embed || '',
      article.seo_index !== undefined ? article.seo_index : 1,
      article.seo_follow !== undefined ? article.seo_follow : 1,
      article.canonical_url || '',
      article.og_image_url || article.main_image_url || '',
      JSON.stringify(article.related_articles || []),
      article.read_time || 5,
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
// MEDIA LIBRARY API
// ============================================

// Upload image from device (multipart/form-data)
admin.post('/media/upload-file', async (c) => {
  try {
    const { DB, MEDIA_BUCKET } = c.env
    const formData = await c.req.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return c.json({ error: 'No file provided' }, 400)
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!validTypes.includes(file.type)) {
      return c.json({ error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.' }, 400)
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return c.json({ error: 'File too large. Maximum size is 5MB.' }, 400)
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 8)
    const extension = file.name.split('.').pop()
    const filename = `${timestamp}-${randomString}.${extension}`
    
    // Get file buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)

    let fileUrl = ''

    // Try to upload to R2 if available (production)
    if (MEDIA_BUCKET) {
      try {
        await MEDIA_BUCKET.put(filename, buffer, {
          httpMetadata: {
            contentType: file.type,
          },
        })
        // R2 URL format (will need to be configured with custom domain)
        fileUrl = `/uploads/${filename}`
      } catch (r2Error) {
        console.error('R2 upload failed, falling back to local storage:', r2Error)
      }
    }

    // Fallback: Save to local filesystem (development only)
    // Note: In Cloudflare Workers, we can't write to filesystem
    // So we'll return the file as base64 for development
    if (!fileUrl) {
      // For development, we'll save to a simulated path
      // In production, this should always use R2
      fileUrl = `/static/uploads/${filename}`
      
      // Store in database with base64 data for local development
      const base64Data = btoa(String.fromCharCode(...buffer))
      
      // Save to media_library with base64
      const result = await DB.prepare(`
        INSERT INTO media_library (
          filename, original_filename, file_url, file_type, mime_type,
          file_size, alt_text_ar, alt_text_en, uploaded_by
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        filename,
        file.name,
        fileUrl,
        'image',
        file.type,
        file.size,
        formData.get('alt_text_ar') || '',
        formData.get('alt_text_en') || '',
        1 // Admin user
      ).run()

      return c.json({
        success: true,
        message: 'File uploaded successfully (local)',
        media: {
          id: result.meta.last_row_id,
          filename: filename,
          original_filename: file.name,
          file_url: fileUrl,
          file_type: file.type,
          file_size: file.size,
          base64: `data:${file.type};base64,${base64Data}` // For local preview
        }
      })
    }

    // Save metadata to database (R2 upload)
    const result = await DB.prepare(`
      INSERT INTO media_library (
        filename, original_filename, file_url, file_type, mime_type,
        file_size, alt_text_ar, alt_text_en, uploaded_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      filename,
      file.name,
      fileUrl,
      'image',
      file.type,
      file.size,
      formData.get('alt_text_ar') || '',
      formData.get('alt_text_en') || '',
      1 // Admin user
    ).run()

    return c.json({
      success: true,
      message: 'File uploaded successfully',
      media: {
        id: result.meta.last_row_id,
        filename: filename,
        original_filename: file.name,
        file_url: fileUrl,
        file_type: file.type,
        file_size: file.size
      }
    })

  } catch (error) {
    console.error('Upload error:', error)
    return c.json({ error: 'Failed to upload file', details: error.message }, 500)
  }
})

// Upload image (base64 or URL)
admin.post('/media/upload', async (c) => {
  try {
    const { DB } = c.env
    const body = await c.req.json()
    
    const { 
      filename, 
      file_url, 
      file_type = 'image',
      mime_type = 'image/jpeg',
      file_size = 0,
      width = 0,
      height = 0,
      alt_text_ar = '',
      alt_text_en = '',
      caption_ar = '',
      caption_en = ''
    } = body

    // Insert into media library
    const result = await DB.prepare(`
      INSERT INTO media_library (
        filename, original_filename, file_url, file_type, mime_type,
        file_size, width, height, alt_text_ar, alt_text_en,
        caption_ar, caption_en, uploaded_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      filename,
      filename,
      file_url,
      file_type,
      mime_type,
      file_size,
      width,
      height,
      alt_text_ar,
      alt_text_en,
      caption_ar,
      caption_en,
      1 // Admin user
    ).run()

    return c.json({
      success: true,
      message: 'Media uploaded successfully',
      media: {
        id: result.meta.last_row_id,
        file_url: file_url
      }
    })
  } catch (error) {
    console.error('Upload error:', error)
    return c.json({ error: 'Failed to upload media' }, 500)
  }
})

// Get all media
admin.get('/media', async (c) => {
  try {
    const { DB } = c.env
    const type = c.req.query('type') // Filter by type
    
    let query = `SELECT * FROM media_library`
    const params: any[] = []
    
    if (type) {
      query += ` WHERE file_type = ?`
      params.push(type)
    }
    
    query += ` ORDER BY created_at DESC`
    
    const { results } = await DB.prepare(query).bind(...params).all()

    return c.json({ success: true, media: results })
  } catch (error) {
    return c.json({ error: 'Failed to fetch media' }, 500)
  }
})

// Delete media
admin.delete('/media/:id', async (c) => {
  try {
    const { DB } = c.env
    const id = c.req.param('id')

    // TODO: Delete from R2 bucket in production
    
    await DB.prepare(`
      DELETE FROM media_library WHERE id = ?
    `).bind(id).run()

    return c.json({
      success: true,
      message: 'Media deleted successfully'
    })
  } catch (error) {
    return c.json({ error: 'Failed to delete media' }, 500)
  }
})

// Get article images
admin.get('/articles/:id/images', async (c) => {
  try {
    const { DB } = c.env
    const articleId = c.req.param('id')

    const { results } = await DB.prepare(`
      SELECT 
        ai.*,
        m.file_url,
        m.filename,
        m.alt_text_ar,
        m.alt_text_en,
        m.caption_ar,
        m.caption_en
      FROM article_images ai
      JOIN media_library m ON ai.media_id = m.id
      WHERE ai.article_id = ?
      ORDER BY ai.display_order
    `).bind(articleId).all()

    return c.json({ success: true, images: results })
  } catch (error) {
    return c.json({ error: 'Failed to fetch article images' }, 500)
  }
})

// Add image to article
admin.post('/articles/:id/images', async (c) => {
  try {
    const { DB } = c.env
    const articleId = c.req.param('id')
    const { media_id, display_order = 0, position_in_content = null } = await c.req.json()

    const result = await DB.prepare(`
      INSERT INTO article_images (article_id, media_id, display_order, position_in_content)
      VALUES (?, ?, ?, ?)
    `).bind(articleId, media_id, display_order, position_in_content).run()

    return c.json({
      success: true,
      message: 'Image added to article',
      id: result.meta.last_row_id
    })
  } catch (error) {
    return c.json({ error: 'Failed to add image to article' }, 500)
  }
})

// Remove image from article
admin.delete('/articles/:articleId/images/:imageId', async (c) => {
  try {
    const { DB } = c.env
    const imageId = c.req.param('imageId')

    await DB.prepare(`
      DELETE FROM article_images WHERE id = ?
    `).bind(imageId).run()

    return c.json({
      success: true,
      message: 'Image removed from article'
    })
  } catch (error) {
    return c.json({ error: 'Failed to remove image' }, 500)
  }
})

// ============================================
// BOOKINGS MANAGEMENT API
// ============================================

// Get all bookings with filters
admin.get('/bookings', async (c) => {
  try {
    const { DB } = c.env
    const status = c.req.query('status') // pending, confirmed, cancelled
    const date = c.req.query('date') // YYYY-MM-DD
    const month = c.req.query('month') // YYYY-MM
    const limit = parseInt(c.req.query('limit') || '100')
    const offset = parseInt(c.req.query('offset') || '0')
    
    let query = `SELECT * FROM bookings WHERE 1=1`
    const params: any[] = []
    
    if (status) {
      query += ` AND status = ?`
      params.push(status)
    }
    
    if (date) {
      query += ` AND booking_date = ?`
      params.push(date)
    } else if (month) {
      query += ` AND strftime('%Y-%m', booking_date) = ?`
      params.push(month)
    }
    
    query += ` ORDER BY booking_date DESC, booking_time DESC LIMIT ? OFFSET ?`
    params.push(limit, offset)
    
    const { results } = await DB.prepare(query).bind(...params).all()
    
    // Get counts
    let countQuery = `SELECT COUNT(*) as total FROM bookings WHERE 1=1`
    const countParams: any[] = []
    
    if (status) {
      countQuery += ` AND status = ?`
      countParams.push(status)
    }
    
    if (date) {
      countQuery += ` AND booking_date = ?`
      countParams.push(date)
    } else if (month) {
      countQuery += ` AND strftime('%Y-%m', booking_date) = ?`
      countParams.push(month)
    }
    
    const { total } = await DB.prepare(countQuery).bind(...countParams).first() as { total: number }

    return c.json({
      success: true,
      bookings: results,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    })
  } catch (error) {
    console.error('Get bookings error:', error)
    return c.json({ error: 'Failed to fetch bookings' }, 500)
  }
})

// Get booking statistics
admin.get('/bookings/stats', async (c) => {
  try {
    const { DB } = c.env
    const month = c.req.query('month') // YYYY-MM or 'all'
    
    let dateFilter = ''
    const params: any[] = []
    
    if (month && month !== 'all') {
      dateFilter = ` WHERE strftime('%Y-%m', booking_date) = ?`
      params.push(month)
    }
    
    // Get status counts
    const statusQuery = `
      SELECT 
        status,
        COUNT(*) as count
      FROM bookings
      ${dateFilter}
      GROUP BY status
    `
    
    const { results: statusCounts } = await DB.prepare(statusQuery).bind(...params).all()
    
    // Get total bookings
    const totalQuery = `SELECT COUNT(*) as total FROM bookings${dateFilter}`
    const { total } = await DB.prepare(totalQuery).bind(...params).first() as { total: number }
    
    // Get today's bookings
    const todayQuery = `
      SELECT COUNT(*) as today
      FROM bookings
      WHERE booking_date = date('now')
    `
    const { today } = await DB.prepare(todayQuery).first() as { today: number }
    
    // Get upcoming bookings (next 7 days)
    const upcomingQuery = `
      SELECT COUNT(*) as upcoming
      FROM bookings
      WHERE booking_date >= date('now')
        AND booking_date <= date('now', '+7 days')
        AND status IN ('pending', 'confirmed')
    `
    const { upcoming } = await DB.prepare(upcomingQuery).first() as { upcoming: number }

    return c.json({
      success: true,
      stats: {
        total,
        today,
        upcoming,
        byStatus: statusCounts
      }
    })
  } catch (error) {
    console.error('Get stats error:', error)
    return c.json({ error: 'Failed to fetch statistics' }, 500)
  }
})

// Get single booking
admin.get('/bookings/:id', async (c) => {
  try {
    const { DB } = c.env
    const id = c.req.param('id')

    const booking = await DB.prepare(`
      SELECT * FROM bookings WHERE id = ?
    `).bind(id).first()

    if (!booking) {
      return c.json({ error: 'Booking not found' }, 404)
    }

    return c.json({ success: true, booking })
  } catch (error) {
    return c.json({ error: 'Failed to fetch booking' }, 500)
  }
})

// Update booking status
admin.put('/bookings/:id/status', async (c) => {
  try {
    const { DB } = c.env
    const id = c.req.param('id')
    const { status, notes, cancellation_reason } = await c.req.json()

    if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
      return c.json({ error: 'Invalid status' }, 400)
    }

    let updateQuery = `
      UPDATE bookings 
      SET status = ?, updated_at = CURRENT_TIMESTAMP
    `
    const params: any[] = [status]

    if (status === 'confirmed') {
      updateQuery += `, confirmed_at = CURRENT_TIMESTAMP, confirmed_by = ?`
      params.push(1) // Admin user ID
    } else if (status === 'cancelled' && cancellation_reason) {
      updateQuery += `, cancelled_at = CURRENT_TIMESTAMP, cancellation_reason = ?`
      params.push(cancellation_reason)
    }

    if (notes) {
      updateQuery += `, notes = ?`
      params.push(notes)
    }

    updateQuery += ` WHERE id = ?`
    params.push(id)

    await DB.prepare(updateQuery).bind(...params).run()

    return c.json({
      success: true,
      message: 'Booking status updated successfully'
    })
  } catch (error) {
    console.error('Update status error:', error)
    return c.json({ error: 'Failed to update booking status' }, 500)
  }
})

// Update booking details
admin.put('/bookings/:id', async (c) => {
  try {
    const { DB } = c.env
    const id = c.req.param('id')
    const {
      patient_name,
      patient_phone,
      patient_email,
      booking_date,
      booking_time,
      notes
    } = await c.req.json()

    await DB.prepare(`
      UPDATE bookings 
      SET 
        patient_name = ?,
        patient_phone = ?,
        patient_email = ?,
        booking_date = ?,
        booking_time = ?,
        notes = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(
      patient_name,
      patient_phone,
      patient_email || '',
      booking_date,
      booking_time,
      notes || '',
      id
    ).run()

    return c.json({
      success: true,
      message: 'Booking updated successfully'
    })
  } catch (error) {
    console.error('Update booking error:', error)
    return c.json({ error: 'Failed to update booking' }, 500)
  }
})

// Delete booking
admin.delete('/bookings/:id', async (c) => {
  try {
    const { DB } = c.env
    const id = c.req.param('id')

    await DB.prepare(`
      DELETE FROM bookings WHERE id = ?
    `).bind(id).run()

    return c.json({
      success: true,
      message: 'Booking deleted successfully'
    })
  } catch (error) {
    return c.json({ error: 'Failed to delete booking' }, 500)
  }
})

// Export bookings to CSV
admin.get('/bookings/export/csv', async (c) => {
  try {
    const { DB } = c.env
    const status = c.req.query('status')
    const month = c.req.query('month')
    
    let query = `SELECT * FROM bookings WHERE 1=1`
    const params: any[] = []
    
    if (status) {
      query += ` AND status = ?`
      params.push(status)
    }
    
    if (month) {
      query += ` AND strftime('%Y-%m', booking_date) = ?`
      params.push(month)
    }
    
    query += ` ORDER BY booking_date DESC, booking_time DESC`
    
    const { results } = await DB.prepare(query).bind(...params).all()
    
    // Generate CSV
    const headers = [
      'رقم الحجز',
      'اسم المريض',
      'رقم الجوال',
      'البريد الإلكتروني',
      'التاريخ',
      'الوقت',
      'نوع الاستشارة',
      'السبب',
      'الحالة',
      'ملاحظات',
      'تاريخ الإنشاء'
    ]
    
    const csvRows = [headers.join(',')]
    
    for (const booking of results as any[]) {
      const row = [
        booking.booking_number,
        booking.patient_name,
        booking.patient_phone,
        booking.patient_email || '',
        booking.booking_date,
        booking.booking_time,
        booking.consultation_type_ar || booking.consultation_type_en || '',
        (booking.reason || '').replace(/,/g, ';'),
        booking.status,
        (booking.notes || '').replace(/,/g, ';'),
        booking.created_at
      ]
      csvRows.push(row.map(field => `"${field}"`).join(','))
    }
    
    const csv = csvRows.join('\n')
    
    // Add BOM for proper UTF-8 encoding in Excel
    const bom = '\uFEFF'
    
    return new Response(bom + csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="bookings-${month || 'all'}-${Date.now()}.csv"`
      }
    })
  } catch (error) {
    console.error('Export CSV error:', error)
    return c.json({ error: 'Failed to export bookings' }, 500)
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
