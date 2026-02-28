// ============================================
// Media API Routes - Serve images from D1 database
// ============================================

import { Hono } from 'hono'

type Bindings = {
  DB: D1Database;
}

const media = new Hono<{ Bindings: Bindings }>()

/**
 * GET /api/media/:filename
 * Serve image from D1 database
 */
media.get('/:filename', async (c) => {
  try {
    const { DB } = c.env
    const filename = c.req.param('filename')
    
    if (!DB) {
      return c.text('Database not configured', 503)
    }
    
    // Get file from D1
    const result = await DB.prepare(`
      SELECT content_type, file_data 
      FROM media_files 
      WHERE filename = ?
    `).bind(filename).first() as { content_type: string; file_data: string } | null
    
    if (!result) {
      return c.text('Image not found', 404)
    }
    
    // Convert base64 to binary
    const binaryString = atob(result.file_data)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }
    
    // Return image with correct content type
    const headers = new Headers()
    headers.set('Content-Type', result.content_type || 'image/jpeg')
    headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    
    return new Response(bytes.buffer, { headers })
  } catch (error) {
    console.error('Media serve error:', error)
    return c.text('Failed to serve image', 500)
  }
})

export default media
