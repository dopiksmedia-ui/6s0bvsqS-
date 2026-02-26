import { Context, Next } from 'hono';
import type { AppContext } from '../types';
import { getLanguage } from '../lib/utils';

/**
 * Language detection middleware
 * Sets the language in context variables
 */
export async function languageMiddleware(c: Context<AppContext>, next: Next) {
  const lang = getLanguage(c.req.raw);
  c.set('lang', lang);
  await next();
}

/**
 * RTL/LTR direction helper
 */
export function getDirection(lang: 'ar' | 'en'): 'rtl' | 'ltr' {
  return lang === 'ar' ? 'rtl' : 'ltr';
}
