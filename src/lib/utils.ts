import bcrypt from 'bcryptjs';

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

/**
 * Compare password with hash
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Generate a unique booking number
 */
export function generateBookingNumber(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  
  return `BK-${year}${month}${day}-${random}`;
}

/**
 * Slugify text for URLs
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Calculate reading time for article (words per minute)
 */
export function calculateReadingTime(content: string, wpm: number = 200): number {
  const plainText = content.replace(/<[^>]*>/g, '');
  const wordCount = plainText.split(/\s+/).length;
  return Math.ceil(wordCount / wpm);
}

/**
 * Format date to YYYY-MM-DD
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Format time to HH:MM
 */
export function formatTime(date: Date): string {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

/**
 * Get day of week (0 = Sunday, 6 = Saturday)
 */
export function getDayOfWeek(date: Date): number {
  return date.getDay();
}

/**
 * Parse YouTube URL to get video ID
 */
export function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
}

/**
 * Generate YouTube embed code
 */
export function generateYouTubeEmbed(url: string): string | null {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return null;
  
  return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
}

/**
 * Sanitize HTML content (basic)
 */
export function sanitizeHtml(html: string): string {
  // In production, use a proper HTML sanitizer library
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/javascript:/gi, '');
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (Saudi Arabia format)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^(05|5)[0-9]{8}$/;
  return phoneRegex.test(phone.replace(/[\s\-]/g, ''));
}

/**
 * Get client IP address from request
 */
export function getClientIp(request: Request): string {
  return request.headers.get('CF-Connecting-IP') || 
         request.headers.get('X-Forwarded-For')?.split(',')[0] || 
         'unknown';
}

/**
 * Get user agent from request
 */
export function getUserAgent(request: Request): string {
  return request.headers.get('User-Agent') || 'unknown';
}

/**
 * Create pagination metadata
 */
export function createPagination(page: number, limit: number, total: number) {
  const totalPages = Math.ceil(total / limit);
  
  return {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1
  };
}

/**
 * Get language from request
 * Priority: 1. Cookie, 2. URL param, 3. Accept-Language header, 4. Default to Arabic
 */
export function getLanguage(request: Request): 'ar' | 'en' {
  const url = new URL(request.url);
  const langParam = url.searchParams.get('lang');
  const cookieHeader = request.headers.get('Cookie') || '';
  
  // Parse cookies manually (simple approach for Cloudflare Workers)
  const cookies: Record<string, string> = {};
  cookieHeader.split(';').forEach(cookie => {
    const [key, value] = cookie.trim().split('=');
    if (key && value) {
      cookies[key] = value;
    }
  });
  
  // Priority 1: Cookie (persisted choice)
  if (cookies['lang'] === 'en' || cookies['lang'] === 'ar') {
    return cookies['lang'] as 'ar' | 'en';
  }
  
  // Priority 2: URL parameter (for switching language)
  if (langParam === 'en' || langParam === 'ar') {
    return langParam;
  }
  
  // Priority 3: Accept-Language header
  const langHeader = request.headers.get('Accept-Language');
  if (langHeader?.includes('en') && !langHeader?.includes('ar')) {
    return 'en';
  }
  
  // Priority 4: Default to Arabic
  return 'ar';
}

/**
 * Generate time slots for a given day
 */
export function generateTimeSlots(
  startTime: string,
  endTime: string,
  duration: number
): string[] {
  const slots: string[] = [];
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);
  
  const startMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;
  
  for (let minutes = startMinutes; minutes < endMinutes; minutes += duration) {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;
    slots.push(`${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`);
  }
  
  return slots;
}

/**
 * Check if a date is in the past
 */
export function isPastDate(dateString: string): boolean {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

/**
 * Format Arabic date
 */
export function formatArabicDate(date: Date): string {
  const months = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];
  
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

/**
 * Format English date
 */
export function formatEnglishDate(date: Date): string {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}
