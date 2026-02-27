import { Hono } from 'hono';
import type { AppContext } from '../types';
import { getNavigation } from '../components/navigation';
import { getFooter } from '../components/footer';

const contactPage = new Hono<AppContext>();

/**
 * GET /contact
 * Contact page with doctor contact information and clinic location
 */
contactPage.get('/', (c) => {
  const lang = c.get('lang');
  
  return c.html(`
<!DOCTYPE html>
<html lang="${lang}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${lang === 'ar' ? 'تواصل معنا' : 'Contact Us'} - Dr. Mohammed Saeed</title>
    <meta name="description" content="${lang === 'ar' ? 'تواصل مع د. محمد سعيد - استشاري جراحة القولون والمستقيم في مستشفى سليمان الحبيب فرع الفيحاء بجدة' : 'Contact Dr. Mohammed Saeed - Consultant Colorectal Surgeon at Dr. Sulaiman Al Habib Hospital, Al Faisaliah Branch, Jeddah'}">
    
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <style>
        * { font-family: 'IBM Plex Sans Arabic', 'Inter', sans-serif; }
        .contact-card {
            transition: all 0.3s ease;
        }
        .contact-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }
        .social-btn {
            transition: all 0.3s ease;
        }
        .social-btn:hover {
            transform: scale(1.1);
        }
        .map-container {
            position: relative;
            overflow: hidden;
            border-radius: 1rem;
        }
    </style>
</head>
<body class="bg-gray-50">
    ${getNavigation(lang, '/contact')}

    <!-- Hero Section with Doctor Photo -->
    <section class="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-16 overflow-hidden">
        <div class="absolute inset-0 opacity-10">
            <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
        </div>
        
        <div class="container mx-auto px-6 relative z-10">
            <div class="max-w-4xl mx-auto text-center">
                <!-- Doctor Photo -->
                <div class="mb-8">
                    <div class="w-48 h-48 mx-auto rounded-full overflow-hidden border-8 border-white shadow-2xl">
                        <img 
                            src="/doctor-mohammed-saeed.jpg" 
                            alt="Dr. Mohammed Saeed" 
                            class="w-full h-full object-cover"
                            onerror="this.src='/doctor-photo.jpg'"
                        >
                    </div>
                </div>

                <h1 class="text-4xl md:text-5xl font-bold mb-4">
                    ${lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                </h1>
                <p class="text-xl text-blue-100 mb-6">
                    ${lang === 'ar' 
                        ? 'د. محمد سعيد ابن محسن علي - استشاري جراحة القولون والمستقيم' 
                        : 'Dr. Mohammed Saeed bin Mohsen Ali - Consultant Colorectal Surgeon'}
                </p>
                <p class="text-lg text-blue-200">
                    ${lang === 'ar'
                        ? 'نحن هنا لمساعدتك - تواصل معنا عبر أي من الوسائل التالية'
                        : 'We are here to help you - Contact us through any of the following methods'}
                </p>
            </div>
        </div>
    </section>

    <!-- Quick Contact Buttons -->
    <section class="py-12 bg-white">
        <div class="container mx-auto px-6">
            <div class="max-w-4xl mx-auto">
                <div class="grid md:grid-cols-2 gap-6">
                    <!-- WhatsApp Contact -->
                    <a href="https://wa.me/966569925966" target="_blank" class="contact-card bg-gradient-to-br from-green-500 to-green-600 p-8 rounded-2xl text-white text-center shadow-lg">
                        <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fab fa-whatsapp text-5xl text-green-600"></i>
                        </div>
                        <h3 class="text-2xl font-bold mb-2">
                            ${lang === 'ar' ? 'تواصل عبر واتساب' : 'WhatsApp Contact'}
                        </h3>
                        <p class="text-green-100 mb-4" dir="ltr">
                            +966 56 992 5966
                        </p>
                        <div class="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-2 rounded-full font-semibold">
                            <i class="fab fa-whatsapp"></i>
                            ${lang === 'ar' ? 'ابدأ المحادثة' : 'Start Chat'}
                        </div>
                    </a>

                    <!-- Phone Contact -->
                    <a href="tel:+966127444444" class="contact-card bg-gradient-to-br from-blue-600 to-blue-700 p-8 rounded-2xl text-white text-center shadow-lg">
                        <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-phone text-5xl text-blue-600"></i>
                        </div>
                        <h3 class="text-2xl font-bold mb-2">
                            ${lang === 'ar' ? 'اتصل بالعيادة' : 'Call Clinic'}
                        </h3>
                        <p class="text-blue-100 mb-4" dir="ltr">
                            012 744 4444
                        </p>
                        <div class="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-2 rounded-full font-semibold">
                            <i class="fas fa-phone"></i>
                            ${lang === 'ar' ? 'اتصل الآن' : 'Call Now'}
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Information -->
    <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-6">
            <div class="max-w-6xl mx-auto">
                <div class="text-center mb-12">
                    <h2 class="text-4xl font-bold text-gray-800 mb-4">
                        ${lang === 'ar' ? 'معلومات الاتصال' : 'Contact Information'}
                    </h2>
                    <p class="text-xl text-gray-600">
                        ${lang === 'ar' ? 'يمكنك الوصول إلينا عبر' : 'You can reach us through'}
                    </p>
                </div>

                <div class="grid md:grid-cols-3 gap-8 mb-12">
                    <!-- Clinic Phone -->
                    <div class="contact-card bg-white p-8 rounded-2xl text-center shadow-lg">
                        <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-phone-alt text-3xl text-blue-600"></i>
                        </div>
                        <h3 class="text-xl font-bold text-gray-800 mb-2">
                            ${lang === 'ar' ? 'رقم العيادة' : 'Clinic Phone'}
                        </h3>
                        <a href="tel:+966127444444" class="text-blue-600 hover:text-blue-700 font-semibold text-lg" dir="ltr">
                            012 744 4444
                        </a>
                        <p class="text-gray-600 text-sm mt-2">
                            ${lang === 'ar' ? 'للحجز والاستفسارات' : 'For booking and inquiries'}
                        </p>
                    </div>

                    <!-- WhatsApp -->
                    <div class="contact-card bg-white p-8 rounded-2xl text-center shadow-lg">
                        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fab fa-whatsapp text-3xl text-green-600"></i>
                        </div>
                        <h3 class="text-xl font-bold text-gray-800 mb-2">
                            ${lang === 'ar' ? 'واتساب' : 'WhatsApp'}
                        </h3>
                        <a href="https://wa.me/966569925966" target="_blank" class="text-green-600 hover:text-green-700 font-semibold text-lg" dir="ltr">
                            +966 56 992 5966
                        </a>
                        <p class="text-gray-600 text-sm mt-2">
                            ${lang === 'ar' ? 'متاح 24/7' : 'Available 24/7'}
                        </p>
                    </div>

                    <!-- Location -->
                    <div class="contact-card bg-white p-8 rounded-2xl text-center shadow-lg">
                        <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-map-marker-alt text-3xl text-purple-600"></i>
                        </div>
                        <h3 class="text-xl font-bold text-gray-800 mb-2">
                            ${lang === 'ar' ? 'الموقع' : 'Location'}
                        </h3>
                        <p class="text-gray-700 font-medium">
                            ${lang === 'ar' 
                                ? 'مستشفى سليمان الحبيب' 
                                : 'Dr. Sulaiman Al Habib Hospital'}
                        </p>
                        <p class="text-gray-600 text-sm mt-1">
                            ${lang === 'ar' ? 'فرع الفيحاء - جدة' : 'Al Faisaliah Branch - Jeddah'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Map Section -->
    <section class="py-16 bg-white">
        <div class="container mx-auto px-6">
            <div class="max-w-6xl mx-auto">
                <div class="text-center mb-12">
                    <h2 class="text-4xl font-bold text-gray-800 mb-4">
                        ${lang === 'ar' ? 'موقع العيادة' : 'Clinic Location'}
                    </h2>
                    <p class="text-xl text-gray-600">
                        ${lang === 'ar' 
                            ? 'مستشفى الدكتور سليمان الحبيب - فرع الفيحاء - جدة' 
                            : 'Dr. Sulaiman Al Habib Hospital - Al Faisaliah Branch - Jeddah'}
                    </p>
                </div>

                <div class="map-container shadow-2xl">
                    <!-- Google Maps Embed for Dr. Sulaiman Al Habib Hospital - Al Faisaliah, Jeddah -->
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3710.6374828193677!2d39.15884937525562!3d21.590843980220437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3d0394e3e8c8b%3A0x9a6c4f3c8c8c8c8c!2sDr.%20Sulaiman%20Al%20Habib%20Hospital%20-%20Al%20Faisaliah!5e0!3m2!1sen!2ssa!4v1709123456789!5m2!1sen!2ssa" 
                        width="100%" 
                        height="500" 
                        style="border:0;" 
                        allowfullscreen="" 
                        loading="lazy" 
                        referrerpolicy="no-referrer-when-downgrade"
                        class="rounded-2xl">
                    </iframe>
                </div>

                <!-- Location Details -->
                <div class="mt-8 bg-blue-50 p-8 rounded-2xl">
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <i class="fas fa-hospital text-blue-600"></i>
                                ${lang === 'ar' ? 'العنوان الكامل' : 'Full Address'}
                            </h3>
                            <p class="text-gray-700 leading-relaxed">
                                ${lang === 'ar'
                                    ? 'مستشفى الدكتور سليمان الحبيب<br>فرع الفيحاء<br>جدة، المملكة العربية السعودية'
                                    : 'Dr. Sulaiman Al Habib Hospital<br>Al Faisaliah Branch<br>Jeddah, Saudi Arabia'}
                            </p>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <i class="fas fa-clock text-blue-600"></i>
                                ${lang === 'ar' ? 'ساعات العمل' : 'Working Hours'}
                            </h3>
                            <ul class="text-gray-700 space-y-2">
                                <li class="flex items-center gap-2">
                                    <i class="fas fa-check-circle text-green-600"></i>
                                    ${lang === 'ar' ? 'السبت - الخميس: 4:00 م - 10:00 م' : 'Saturday - Thursday: 4:00 PM - 10:00 PM'}
                                </li>
                                <li class="flex items-center gap-2">
                                    <i class="fas fa-times-circle text-red-600"></i>
                                    ${lang === 'ar' ? 'الجمعة: مغلق' : 'Friday: Closed'}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Social Media Section -->
    <section class="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 text-white">
        <div class="container mx-auto px-6">
            <div class="max-w-4xl mx-auto text-center">
                <h2 class="text-4xl font-bold mb-4">
                    ${lang === 'ar' ? 'تابعنا على وسائل التواصل' : 'Follow Us on Social Media'}
                </h2>
                <p class="text-xl text-blue-100 mb-8">
                    ${lang === 'ar' 
                        ? 'ابقَ على اطلاع بآخر الأخبار والنصائح الطبية' 
                        : 'Stay updated with the latest news and medical tips'}
                </p>
                
                <div class="flex gap-6 justify-center flex-wrap">
                    <!-- Facebook -->
                    <a href="#" target="_blank" class="social-btn w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl">
                        <i class="fab fa-facebook-f text-2xl text-blue-600"></i>
                    </a>
                    
                    <!-- Twitter -->
                    <a href="#" target="_blank" class="social-btn w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl">
                        <i class="fab fa-twitter text-2xl text-blue-400"></i>
                    </a>
                    
                    <!-- Instagram -->
                    <a href="#" target="_blank" class="social-btn w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl">
                        <i class="fab fa-instagram text-2xl text-pink-600"></i>
                    </a>
                    
                    <!-- LinkedIn -->
                    <a href="#" target="_blank" class="social-btn w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl">
                        <i class="fab fa-linkedin-in text-2xl text-blue-700"></i>
                    </a>
                    
                    <!-- YouTube -->
                    <a href="#" target="_blank" class="social-btn w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl">
                        <i class="fab fa-youtube text-2xl text-red-600"></i>
                    </a>
                    
                    <!-- WhatsApp -->
                    <a href="https://wa.me/966569925966" target="_blank" class="social-btn w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl">
                        <i class="fab fa-whatsapp text-2xl text-green-600"></i>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Booking CTA -->
    <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-6">
            <div class="max-w-4xl mx-auto bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-12 text-white text-center shadow-2xl">
                <i class="fas fa-calendar-check text-6xl mb-6 opacity-80"></i>
                <h2 class="text-4xl font-bold mb-4">
                    ${lang === 'ar' ? 'جاهز لحجز موعدك؟' : 'Ready to Book Your Appointment?'}
                </h2>
                <p class="text-xl text-blue-100 mb-8">
                    ${lang === 'ar'
                        ? 'احجز موعدك الآن واحصل على استشارة متخصصة'
                        : 'Book your appointment now and get a specialized consultation'}
                </p>
                <a href="/booking" class="inline-flex items-center gap-3 bg-white text-blue-600 px-10 py-5 rounded-full font-bold text-lg hover:bg-blue-50 transition shadow-lg">
                    <i class="fas fa-calendar-plus"></i>
                    ${lang === 'ar' ? 'احجز موعدك الآن' : 'Book Your Appointment'}
                </a>
            </div>
        </div>
    </section>

    ${getFooter(lang)}
</body>
</html>
  `);
});

export default contactPage;
