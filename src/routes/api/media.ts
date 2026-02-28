// ============================================
// Media API Routes - Serve images from R2
// ============================================

import { Hono } from 'hono'

type Bindings = {
  MEDIA_BUCKET?: R2Bucket;
}

const media = new Hono<{ Bindings: Bindings }>()

/**
 * GET /api/media/:filename
 * Serve image from R2 bucket
 */
media.get('/:filename', async (c) => {
  try {
    const { MEDIA_BUCKET } = c.env
    const filename = c.req.param('filename')
    
    if (!MEDIA_BUCKET) {
      return c.text('Media bucket not configured', 503)
    }
    
    // Get file from R2
    const object = await MEDIA_BUCKET.get(filename)
    
    if (!object) {
      return c.text('Image not found', 404)
    }
    
    // Return image with correct content type
    const headers = new Headers()
    headers.set('Content-Type', object.httpMetadata?.contentType || 'image/jpeg')
    headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    
    return new Response(object.body, { headers })
  } catch (error) {
    console.error('Media serve error:', error)
    return c.text('Failed to serve image', 500)
  }
})

export default media
