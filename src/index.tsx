import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serveStatic } from 'hono/cloudflare-workers';
import { renderer } from './renderer';
import type { AppContext } from './types';

// Import routes
import doctorRoutes from './routes/doctor';
import articlesRoutes from './routes/articles';
import bookingRoutes from './routes/booking';

// Import middleware
import { languageMiddleware } from './middleware/language';

// Initialize app
const app = new Hono<AppContext>();

// Global middleware
app.use('*', languageMiddleware);
app.use('/api/*', cors());

// Serve static files from public directory
app.use('/static/*', serveStatic({ root: './public' }));

// API Routes
app.route('/api/doctor', doctorRoutes);
app.route('/api/articles', articlesRoutes);
app.route('/api/booking', bookingRoutes);

// Homepage route
app.use(renderer);

app.get('/', (c) => {
  const lang = c.get('lang');
  
  return c.render(
    <div class="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section class="relative h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div class="container mx-auto px-6 text-center">
          <h1 class="text-5xl md:text-6xl font-bold mb-4" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            {lang === 'ar' ? 'د. أحمد محمد الشريف' : 'Dr. Ahmed Mohammed Al-Shareef'}
          </h1>
          <p class="text-xl md:text-2xl mb-8" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            {lang === 'ar' 
              ? 'استشاري جراحة عامة ومناظير | زمالة البورد الأمريكي' 
              : 'Consultant General & Laparoscopic Surgeon | FACS'}
          </p>
          
          <div class="flex gap-4 justify-center flex-wrap">
            <a href="/booking" class="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition">
              {lang === 'ar' ? '📅 احجز موعدك الآن' : '📅 Book Now'}
            </a>
            <a href={`https://wa.me/966XXXXXXXXX`} class="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-600 transition">
              {lang === 'ar' ? '💬 تواصل واتساب' : '💬 WhatsApp'}
            </a>
          </div>
          
          <div class="mt-12 text-center">
            <a href="#about" class="text-white hover:text-blue-200">
              ↓ {lang === 'ar' ? 'استكشف المزيد' : 'Explore More'}
            </a>
          </div>
        </div>
      </section>
      
      {/* Trust Statistics Bar */}
      <section class="py-16 bg-white">
        <div class="container mx-auto px-6">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <div>
              <div class="text-4xl font-bold text-blue-600 mb-2">15+</div>
              <div class="text-gray-600">{lang === 'ar' ? 'سنة خبرة' : 'Years Experience'}</div>
            </div>
            <div>
              <div class="text-4xl font-bold text-blue-600 mb-2">5,000+</div>
              <div class="text-gray-600">{lang === 'ar' ? 'عملية ناجحة' : 'Successful Surgeries'}</div>
            </div>
            <div>
              <div class="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <div class="text-gray-600">{lang === 'ar' ? 'رضا المرضى' : 'Patient Satisfaction'}</div>
            </div>
            <div>
              <div class="text-4xl font-bold text-blue-600 mb-2">25+</div>
              <div class="text-gray-600">{lang === 'ar' ? 'شهادة واعتماد' : 'Certifications'}</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Quick About Section */}
      <section id="about" class="py-20 bg-gray-50">
        <div class="container mx-auto px-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          <div class="max-w-4xl mx-auto text-center">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              {lang === 'ar' ? 'نبذة عن الدكتور' : 'About Dr. Ahmed'}
            </h2>
            <p class="text-lg text-gray-600 leading-relaxed mb-8">
              {lang === 'ar' 
                ? 'يتميز د. أحمد بخبرة واسعة في مجال الجراحة العامة وجراحة المناظير، حيث أجرى آلاف العمليات الناجحة على مدار مسيرته المهنية.'
                : 'Dr. Ahmed brings extensive experience in general and laparoscopic surgery, having performed thousands of successful operations throughout his career.'}
            </p>
            <a href="/about" class="text-blue-600 font-semibold hover:text-blue-700">
              {lang === 'ar' ? 'اقرأ المزيد ←' : 'Learn More →'}
            </a>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section class="py-20 bg-blue-600 text-white">
        <div class="container mx-auto px-6 text-center" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            {lang === 'ar' ? 'هل تحتاج استشارة طبية؟' : 'Need a Medical Consultation?'}
          </h2>
          <p class="text-xl mb-8">
            {lang === 'ar' 
              ? 'احجز موعدك الآن واحصل على أفضل رعاية طبية'
              : 'Book your appointment now and get the best medical care'}
          </p>
          <a href="/booking" class="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition inline-block">
            {lang === 'ar' ? '📅 احجز موعدك' : '📅 Book Your Appointment'}
          </a>
        </div>
      </section>
      
      {/* Footer */}
      <footer class="bg-gray-900 text-white py-12">
        <div class="container mx-auto px-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-{lang === 'ar' ? 'right' : 'left'}">
            <div>
              <h3 class="text-xl font-bold mb-4">{lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}</h3>
              <ul class="space-y-2">
                <li><a href="/" class="hover:text-blue-400">{lang === 'ar' ? 'الرئيسية' : 'Home'}</a></li>
                <li><a href="/about" class="hover:text-blue-400">{lang === 'ar' ? 'عن الدكتور' : 'About'}</a></li>
                <li><a href="/articles" class="hover:text-blue-400">{lang === 'ar' ? 'المقالات' : 'Articles'}</a></li>
                <li><a href="/booking" class="hover:text-blue-400">{lang === 'ar' ? 'حجز موعد' : 'Booking'}</a></li>
              </ul>
            </div>
            <div>
              <h3 class="text-xl font-bold mb-4">{lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}</h3>
              <ul class="space-y-2">
                <li>📞 +966 XX XXX XXXX</li>
                <li>📧 info@doctor.com</li>
                <li>📍 {lang === 'ar' ? 'الرياض، السعودية' : 'Riyadh, Saudi Arabia'}</li>
              </ul>
            </div>
            <div>
              <h3 class="text-xl font-bold mb-4">{lang === 'ar' ? 'تابعنا' : 'Follow Us'}</h3>
              <div class="flex gap-4 justify-center md:justify-{lang === 'ar' ? 'start' : 'start'}">
                <a href="#" class="hover:text-blue-400">Facebook</a>
                <a href="#" class="hover:text-blue-400">Instagram</a>
                <a href="#" class="hover:text-blue-400">Twitter</a>
                <a href="#" class="hover:text-blue-400">YouTube</a>
              </div>
            </div>
          </div>
          <div class="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>© 2024 {lang === 'ar' ? 'د. أحمد محمد الشريف - جميع الحقوق محفوظة' : 'Dr. Ahmed Mohammed Al-Shareef - All Rights Reserved'}</p>
          </div>
        </div>
      </footer>
    </div>
  );
});

// API health check
app.get('/api/health', (c) => {
  return c.json({
    success: true,
    message: 'Doctor Surgeon Website API is running',
    timestamp: new Date().toISOString()
  });
});

export default app;
