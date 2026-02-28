import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serveStatic } from 'hono/cloudflare-workers';
import { renderer } from './renderer';
import type { AppContext } from './types';

// Import routes
import doctorRoutes from './routes/doctor';
import articlesRoutes from './routes/articles';
import bookingRoutes from './routes/booking';
import bookingPageRoutes from './routes/booking-page';
import aboutPageRoutes from './routes/about-page';
import homePageRoutes from './routes/home-page';
import contactPageRoutes from './routes/contact-page';
import articlesPageRoutes from './routes/articles-page';
import articleSinglePageRoutes from './routes/article-single-page';
import adminPageRoutes from './routes/admin-page';
import testAdminPageRoutes from './routes/test-admin';
import youtubeApiRoutes from './routes/api/youtube';
import adminApiRoutes from './routes/api/admin';
import mediaApiRoutes from './routes/api/media';

// Import middleware
import { languageMiddleware } from './middleware/language';

// Initialize app
const app = new Hono<AppContext>();

// Global middleware
app.use('*', languageMiddleware);
app.use('/api/*', cors());

// Serve static files from public directory
app.use('/static/*', serveStatic({ root: './public' }));

// IMPORTANT: Override admin.html to serve from dist/static with no-cache headers
app.get('/static/admin.html', async (c) => {
  try {
    // Read the admin.html file
    const file = await fetch(new URL('./static/admin.html', c.req.url).href);
    const html = await file.text();
    
    // Return with no-cache headers
    return c.html(html, 200, {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
  } catch (error) {
    return c.text('Error loading admin page', 500);
  }
});

// Page Routes (before API routes)
app.route('/', homePageRoutes);
app.route('/booking', bookingPageRoutes);
app.route('/about', aboutPageRoutes);
app.route('/contact', contactPageRoutes);
app.route('/articles', articlesPageRoutes);
app.route('/articles', articleSinglePageRoutes);
app.route('/admin', adminPageRoutes);
app.route('/test-admin', testAdminPageRoutes);

// API Routes
app.route('/api/doctor', doctorRoutes);
app.route('/api/articles', articlesRoutes);
app.route('/api/booking', bookingRoutes);
app.route('/api/youtube', youtubeApiRoutes);
app.route('/api/admin', adminApiRoutes);
app.route('/api/media', mediaApiRoutes);

app.get('/api/health', (c) => {
  return c.json({
    success: true,
    message: 'Doctor Surgeon Website API is running',
    timestamp: new Date().toISOString()
  });
});

export default app;
