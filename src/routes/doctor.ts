import { Hono } from 'hono';
import type { AppContext } from '../types';

const doctor = new Hono<AppContext>();

/**
 * GET /api/doctor/profile
 * Get doctor profile information
 */
doctor.get('/profile', async (c) => {
  const lang = c.get('lang');
  
  try {
    const profile = await c.env.DB.prepare(
      'SELECT * FROM doctor_profile WHERE id = 1'
    ).first();
    
    if (!profile) {
      return c.json({ 
        success: false, 
        error: 'Profile not found' 
      }, 404);
    }
    
    return c.json({
      success: true,
      data: profile
    });
  } catch (error) {
    return c.json({
      success: false,
      error: 'Failed to fetch profile'
    }, 500);
  }
});

/**
 * GET /api/doctor/stats
 * Get doctor statistics
 */
doctor.get('/stats', async (c) => {
  try {
    const profile = await c.env.DB.prepare(
      'SELECT years_of_experience, total_operations FROM doctor_profile WHERE id = 1'
    ).first<{ years_of_experience: number; total_operations: number }>();
    
    const articlesCount = await c.env.DB.prepare(
      'SELECT COUNT(*) as count FROM articles WHERE status = ?'
    ).bind('published').first<{ count: number }>();
    
    const videosCount = await c.env.DB.prepare(
      'SELECT COUNT(*) as count FROM videos WHERE status = ?'
    ).bind('published').first<{ count: number }>();
    
    const certificatesCount = await c.env.DB.prepare(
      'SELECT COUNT(*) as count FROM certificates WHERE status = ?'
    ).bind('published').first<{ count: number }>();
    
    return c.json({
      success: true,
      data: {
        years_of_experience: profile?.years_of_experience || 0,
        total_operations: profile?.total_operations || 0,
        articles_count: articlesCount?.count || 0,
        videos_count: videosCount?.count || 0,
        certificates_count: certificatesCount?.count || 0
      }
    });
  } catch (error) {
    return c.json({
      success: false,
      error: 'Failed to fetch stats'
    }, 500);
  }
});

export default doctor;
