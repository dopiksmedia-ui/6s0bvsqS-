import { Context, Next } from 'hono';
import type { AppContext } from '../types';
import { getClientIp } from '../lib/utils';

// Simple in-memory rate limiter (for production, use KV or external service)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

/**
 * Rate limiting middleware
 */
export function rateLimit(options: {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
  message?: string;
}) {
  return async (c: Context<AppContext>, next: Next) => {
    const ip = getClientIp(c.req.raw);
    const now = Date.now();
    const key = `${ip}-${c.req.path}`;
    
    const record = rateLimitStore.get(key);
    
    if (record && now < record.resetAt) {
      if (record.count >= options.maxRequests) {
        return c.json({
          success: false,
          error: options.message || 'Too many requests, please try again later',
          retryAfter: Math.ceil((record.resetAt - now) / 1000)
        }, 429);
      }
      record.count++;
    } else {
      rateLimitStore.set(key, {
        count: 1,
        resetAt: now + options.windowMs
      });
    }
    
    // Clean up old entries
    for (const [k, v] of rateLimitStore.entries()) {
      if (now > v.resetAt) {
        rateLimitStore.delete(k);
      }
    }
    
    await next();
  };
}

/**
 * Strict rate limit for sensitive endpoints
 */
export const strictRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5,
  message: 'Too many attempts, please try again in 15 minutes'
});

/**
 * Standard rate limit for API endpoints
 */
export const standardRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 60,
  message: 'Too many requests, please slow down'
});

/**
 * Booking rate limit
 */
export const bookingRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 3,
  message: 'Too many booking attempts, please try again in 1 hour'
});
