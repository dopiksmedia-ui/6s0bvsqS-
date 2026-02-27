import { Hono } from 'hono';
import type { AppContext } from '../types';
import { getNavigation } from '../components/navigation';
import { getFooter } from '../components/footer';

const homePage = new Hono<AppContext>();

/**
 * GET /
 * Homepage
 */
homePage.get('/', (c) => {
  const lang = c.get('lang');
  
  return c.html(`
<!DOCTYPE html>
<html lang="${lang}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${lang === 'ar' ? 'د. محمد سعيد - استشاري جراحة القولون والمستقيم' : 'Dr. Mohammed Saeed - Consultant Colorectal Surgeon'}</title>
    <meta name="description" content="${lang === 'ar' ? 'د. محمد سعيد ابن محسن علي - استشاري جراحة القولون والمستقيم مع خبرة بريطانية متميزة' : 'Dr. Mohammed Saeed bin Mohsen Ali - Consultant Colorectal Surgeon with distinguished British experience'}">
    
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <style>
        * { font-family: 'IBM Plex Sans Arabic', 'Inter', sans-serif; }
    </style>
</head>
<body class="bg-gray-50">
    ${getNavigation(lang, '/')}

    <!-- Hero Section -->
    <section class="relative h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white">
        <div class="container mx-auto px-6 text-center">
            <h1 class="text-5xl md:text-6xl font-bold mb-4">
                ${lang === 'ar' ? 'د. محمد سعيد ابن محسن علي' : 'Dr. Mohammed Saeed bin Mohsen Ali'}
            </h1>
            <p class="text-xl md:text-2xl mb-8 text-blue-100">
                ${lang === 'ar' 
                    ? 'استشاري جراحة القولون والمستقيم | زمالات بريطانية متميزة' 
                    : 'Consultant Colorectal Surgeon | Distinguished UK Fellowships'}
            </p>
            
            <div class="flex gap-4 justify-center flex-wrap">
                <a href="/booking" class="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition inline-flex items-center gap-2">
                    <i class="fas fa-calendar-check"></i>
                    ${lang === 'ar' ? 'احجز موعدك الآن' : 'Book Now'}
                </a>
                <a href="https://wa.me/966XXXXXXXXX" class="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-600 transition inline-flex items-center gap-2">
                    <i class="fab fa-whatsapp"></i>
                    ${lang === 'ar' ? 'تواصل واتساب' : 'WhatsApp'}
                </a>
            </div>
            
            <div class="mt-12 text-center">
                <a href="#about" class="text-white hover:text-blue-200 text-lg">
                    <i class="fas fa-chevron-down animate-bounce"></i><br>
                    ${lang === 'ar' ? 'استكشف المزيد' : 'Explore More'}
                </a>
            </div>
        </div>
    </section>
    
    <!-- Trust Statistics Bar -->
    <section class="py-16 bg-white">
        <div class="container mx-auto px-6">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div class="p-6">
                    <div class="text-4xl md:text-5xl font-bold text-blue-600 mb-2">3</div>
                    <div class="text-gray-600 font-medium">${lang === 'ar' ? 'زمالات بريطانية' : 'UK Fellowships'}</div>
                </div>
                <div class="p-6">
                    <div class="text-4xl md:text-5xl font-bold text-green-600 mb-2">10+</div>
                    <div class="text-gray-600 font-medium">${lang === 'ar' ? 'خدمات علاجية' : 'Medical Services'}</div>
                </div>
                <div class="p-6">
                    <div class="text-4xl md:text-5xl font-bold text-purple-600 mb-2">98%</div>
                    <div class="text-gray-600 font-medium">${lang === 'ar' ? 'رضا المرضى' : 'Patient Satisfaction'}</div>
                </div>
                <div class="p-6">
                    <div class="text-4xl md:text-5xl font-bold text-orange-600 mb-2">${lang === 'ar' ? 'متقدمة' : 'Advanced'}</div>
                    <div class="text-gray-600 font-medium">${lang === 'ar' ? 'تقنيات حديثة' : 'Modern Techniques'}</div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Quick About Section -->
    <section id="about" class="py-20 bg-gray-50">
        <div class="container mx-auto px-6">
            <div class="max-w-4xl mx-auto text-center">
                <h2 class="text-4xl font-bold text-gray-800 mb-6">
                    ${lang === 'ar' ? 'عن الدكتور' : 'About Doctor'}
                </h2>
                <p class="text-xl text-gray-700 leading-relaxed mb-8">
                    ${lang === 'ar'
                        ? 'د. محمد سعيد ابن محسن علي - استشاري متخصص في جراحة القولون والمستقيم مع خبرة بريطانية متميزة. حاصل على زمالات من أبرز المستشفيات في المملكة المتحدة، ويجمع بين الخبرة الأكاديمية والمهارات السريرية المتقدمة في علاج أمراض القولون والمستقيم.'
                        : 'Dr. Mohammed Saeed bin Mohsen Ali - A specialized consultant in colorectal surgery with distinguished British experience. Holds fellowships from the most prominent hospitals in the United Kingdom, combining academic expertise with advanced clinical skills in treating colorectal diseases.'}
                </p>
                <div class="flex gap-4 justify-center">
                    <a href="/about" class="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                        ${lang === 'ar' ? 'المزيد عن الدكتور' : 'Learn More'}
                        <i class="fas fa-arrow-${lang === 'ar' ? 'left' : 'right'} ml-2"></i>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Services CTA -->
    <section class="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white">
        <div class="container mx-auto px-6 text-center">
            <h2 class="text-4xl font-bold mb-6">
                ${lang === 'ar' ? 'جاهزون لمساعدتك' : 'Ready to Help You'}
            </h2>
            <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                ${lang === 'ar'
                    ? 'نقدم أحدث التقنيات الجراحية مع رعاية طبية شاملة. احجز موعدك الآن للحصول على استشارة متخصصة.'
                    : 'We provide the latest surgical techniques with comprehensive medical care. Book your appointment now for a specialized consultation.'}
            </p>
            <div class="flex gap-4 justify-center flex-wrap">
                <a href="/booking" class="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition inline-flex items-center gap-2">
                    <i class="fas fa-calendar-check"></i>
                    ${lang === 'ar' ? 'احجز موعد' : 'Book Appointment'}
                </a>
                <a href="https://wa.me/966XXXXXXXXX" class="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-600 transition inline-flex items-center gap-2">
                    <i class="fab fa-whatsapp"></i>
                    ${lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                </a>
            </div>
        </div>
    </section>

    ${getFooter(lang)}
</body>
</html>
  `);
});

export default homePage;
