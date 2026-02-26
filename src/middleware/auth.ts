import { Context, Next } from 'hono';
import { getCookie } from 'hono/cookie';
import type { AppContext, User } from '../types';

/**
 * Auth Middleware - Verify JWT and load user
 */
export async function authMiddleware(c: Context<AppContext>, next: Next) {
  const token = getCookie(c, 'auth_token');
  
  if (!token) {
    return c.json({ success: false, error: 'Unauthorized' }, 401);
  }
  
  try {
    // In production, verify JWT token here
    // For now, we'll fetch user by session (simplified)
    const userId = parseInt(token); // Simplified - in production use JWT
    
    const user = await c.env.DB.prepare(
      'SELECT * FROM users WHERE id = ? AND status = ?'
    ).bind(userId, 'active').first<User>();
    
    if (!user) {
      return c.json({ success: false, error: 'Invalid session' }, 401);
    }
    
    c.set('user', user);
    await next();
  } catch (error) {
    return c.json({ success: false, error: 'Authentication failed' }, 401);
  }
}

/**
 * Role-based access control middleware
 */
export function requireRole(...roles: string[]) {
  return async (c: Context<AppContext>, next: Next) => {
    const user = c.get('user');
    
    if (!user) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }
    
    if (!roles.includes(user.role)) {
      return c.json({ 
        success: false, 
        error: 'Insufficient permissions',
        required_role: roles 
      }, 403);
    }
    
    await next();
  };
}

/**
 * Admin only middleware
 */
export const requireAdmin = requireRole('admin');

/**
 * Admin or Editor middleware
 */
export const requireEditor = requireRole('admin', 'editor');

/**
 * Admin or Receptionist middleware
 */
export const requireReceptionist = requireRole('admin', 'receptionist');
