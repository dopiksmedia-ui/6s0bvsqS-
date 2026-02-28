import { Context, Next } from 'hono';
import type { AppContext } from '../types';
import { getLanguage } from '../lib/utils';

/**
 * Language detection middleware
 * Sets the language in context variables and saves to cookie if changed
 */
export async function languageMiddleware(c: Context<AppContext>, next: Next) {
  const url = new URL(c.req.raw.url);
  const langParam = url.searchParams.get('lang');
  const lang = getLanguage(c.req.raw);
  
  c.set('lang', lang);
  
  // If language parameter is set in URL, save to cookie (1 year expiry)
  if (langParam === 'en' || langParam === 'ar') {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    c.header('Set-Cookie', `lang=${langParam}; Path=/; Expires=${expires.toUTCString()}; SameSite=Lax`);
  }
  
  await next();
}

/**
 * RTL/LTR direction helper
 */
export function getDirection(lang: 'ar' | 'en'): 'rtl' | 'ltr' {
  return lang === 'ar' ? 'rtl' : 'ltr';
}
