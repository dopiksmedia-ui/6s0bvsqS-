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

// Import middleware
import { languageMiddleware } from './middleware/language';

// Initialize app
const app = new Hono<AppContext>();

// Global middleware
app.use('*', languageMiddleware);
app.use('/api/*', cors());

// Serve static files from public directory
app.use('/static/*', serveStatic({ root: './public' }));

// Page Routes (before API routes)
app.route('/', homePageRoutes);
app.route('/booking', bookingPageRoutes);
app.route('/about', aboutPageRoutes);

// API Routes
app.route('/api/doctor', doctorRoutes);
app.route('/api/articles', articlesRoutes);
app.route('/api/booking', bookingRoutes);

app.get('/api/health', (c) => {
  return c.json({
    success: true,
    message: 'Doctor Surgeon Website API is running',
    timestamp: new Date().toISOString()
  });
});

export default app;
