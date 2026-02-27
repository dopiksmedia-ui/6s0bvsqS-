import { Hono } from 'hono';
import type { AppContext } from '../types';
import { getNavigation } from '../components/navigation';
import { getFooter } from '../components/footer';

const aboutPage = new Hono<AppContext>();

/**
 * GET /about
 * About Us page with doctor information
 */
aboutPage.get('/', (c) => {
  const lang = c.get('lang');
  
  return c.html(`
<!DOCTYPE html>
<html lang="${lang}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${lang === 'ar' ? 'عن الدكتور' : 'About Doctor'} - Dr. Mohammed Saeed</title>
    <meta name="description" content="${lang === 'ar' ? 'تعرف على د. محمد سعيد ابن محسن علي - استشاري جراحة القولون والمستقيم مع خبرة بريطانية متميزة' : 'Meet Dr. Mohammed Saeed bin Mohsen Ali - Consultant Colorectal Surgeon with distinguished British experience'}">
    
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <style>
        * { font-family: 'IBM Plex Sans Arabic', 'Inter', sans-serif; }
        .section-title {
            position: relative;
            display: inline-block;
            padding-bottom: 15px;
        }
        .section-title::after {
            content: '';
            position: absolute;
            bottom: 0;
            ${lang === 'ar' ? 'right' : 'left'}: 0;
            width: 60px;
            height: 3px;
            background: linear-gradient(90deg, #2563eb, #60a5fa);
        }
        .stat-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .stat-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }
        .testimonial-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            transition: transform 0.3s ease;
        }
        .testimonial-card:hover {
            transform: scale(1.02);
        }
        .qualification-badge {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }
    </style>
</head>
<body class="bg-gray-50">
    ${getNavigation(lang, '/about')}

    <!-- Hero Section with Doctor Image -->
    <section class="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-20">
        <div class="container mx-auto px-6">
            <div class="grid md:grid-cols-2 gap-12 items-center">
                <!-- Doctor Image -->
                <div class="relative" data-aos="fade-right">
                    <div class="relative z-10">
                        <img 
                            src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&h=600&fit=crop" 
                            alt="Dr. Mohammed Saeed" 
                            class="rounded-2xl shadow-2xl w-full max-w-md mx-auto"
                        >
                        <div class="absolute -bottom-6 -${lang === 'ar' ? 'left' : 'right'}-6 bg-white text-blue-600 px-8 py-4 rounded-xl shadow-lg">
                            <div class="text-3xl font-bold">${lang === 'ar' ? 'زمالات بريطانية' : 'UK Fellowships'}</div>
                            <div class="text-sm">${lang === 'ar' ? 'خبرة متميزة' : 'Distinguished Experience'}</div>
                        </div>
                    </div>
                </div>

                <!-- Doctor Info -->
                <div data-aos="fade-left">
                    <h1 class="text-5xl font-bold mb-4">
                        ${lang === 'ar' ? 'د. محمد سعيد ابن محسن علي' : 'Dr. Mohammed Saeed bin Mohsen Ali'}
                    </h1>
                    <p class="text-2xl text-blue-200 mb-6">
                        ${lang === 'ar' 
                            ? 'استشاري جراحة القولون والمستقيم' 
                            : 'Consultant Colorectal Surgeon'}
                    </p>
                    <p class="text-lg text-blue-100 leading-relaxed mb-8">
                        ${lang === 'ar'
                            ? 'خبرة بريطانية متميزة في جراحات القولون والمستقيم والبواسير والنواسير، مع تقنيات حديثة في الجراحة بالمناظير والروبوت لتحقيق أفضل النتائج بأقل تدخل جراحي.'
                            : 'Distinguished British experience in colorectal surgery, hemorrhoids and fistulas, with modern techniques in laparoscopic and robotic surgery to achieve the best results with minimal surgical intervention.'}
                    </p>
                    
                    <!-- Quick Contact Buttons -->
                    <div class="flex gap-4 flex-wrap">
                        <a href="/booking" class="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition inline-flex items-center gap-2">
                            <i class="fas fa-calendar-check"></i>
                            ${lang === 'ar' ? 'احجز موعدك' : 'Book Appointment'}
                        </a>
                        <a href="https://wa.me/966XXXXXXXXX" class="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-600 transition inline-flex items-center gap-2">
                            <i class="fab fa-whatsapp"></i>
                            ${lang === 'ar' ? 'واتساب' : 'WhatsApp'}
                        </a>
                        <a href="tel:+966XXXXXXXXX" class="bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-900 transition inline-flex items-center gap-2">
                            <i class="fas fa-phone"></i>
                            ${lang === 'ar' ? 'اتصل الآن' : 'Call Now'}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Statistics Section -->
    <section class="py-16 bg-white">
        <div class="container mx-auto px-6">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div class="stat-card bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center">
                    <div class="text-5xl font-bold text-blue-600 mb-2">3</div>
                    <div class="text-gray-700">${lang === 'ar' ? 'زمالات بريطانية' : 'UK Fellowships'}</div>
                </div>
                <div class="stat-card bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl text-center">
                    <div class="text-5xl font-bold text-green-600 mb-2">10+</div>
                    <div class="text-gray-700">${lang === 'ar' ? 'خدمات علاجية' : 'Medical Services'}</div>
                </div>
                <div class="stat-card bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl text-center">
                    <div class="text-5xl font-bold text-purple-600 mb-2">98%</div>
                    <div class="text-gray-700">${lang === 'ar' ? 'رضا المرضى' : 'Patient Satisfaction'}</div>
                </div>
                <div class="stat-card bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl text-center">
                    <div class="text-5xl font-bold text-orange-600 mb-2">${lang === 'ar' ? 'متقدمة' : 'Advanced'}</div>
                    <div class="text-gray-700">${lang === 'ar' ? 'تقنيات حديثة' : 'Modern Techniques'}</div>
                </div>
            </div>
        </div>
    </section>

    <!-- About & Biography Section -->
    <section class="py-20 bg-gray-50">
        <div class="container mx-auto px-6">
            <div class="max-w-4xl mx-auto">
                <h2 class="section-title text-4xl font-bold text-gray-800 mb-8">
                    ${lang === 'ar' ? 'السيرة الذاتية' : 'Biography'}
                </h2>
                
                <div class="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                    <p class="text-xl text-gray-800 font-semibold">
                        ${lang === 'ar'
                            ? 'يُعد الدكتور محمد سعيد ابن محسن علي استشاري جراحة القولون والمستقيم من الأسماء المتميزة في مجال الجراحات المتقدمة، حيث يجمع بين الخبرة البريطانية والتقنيات الحديثة في علاج أمراض القولون والمستقيم والبواسير والنواسير.'
                            : 'Dr. Mohammed Saeed bin Mohsen Ali, Consultant Colorectal Surgeon, is a distinguished name in advanced surgery, combining British experience with modern techniques in treating colon, rectal, hemorrhoid and fistula diseases.'}
                    </p>
                    
                    <p>
                        ${lang === 'ar'
                            ? 'حصل الدكتور على زمالات تخصصية دقيقة من كبرى المستشفيات في المملكة المتحدة، ويعتمد في ممارسته على أحدث أساليب الجراحة بالمناظير والروبوت لتحقيق أفضل النتائج العلاجية بأقل تدخل جراحي ممكن.'
                            : 'Dr. Mohammed obtained specialized fellowships from major hospitals in the United Kingdom, and relies in his practice on the latest laparoscopic and robotic surgery methods to achieve the best therapeutic results with minimal surgical intervention.'}
                    </p>

                    <p>
                        ${lang === 'ar'
                            ? 'يقدم الدكتور محمد سعيد مجموعة متكاملة من خدمات جراحة القولون والمستقيم، تشمل علاج أورام القولون والمستقيم السرطانية، جراحات القولون والمستقيم بالروبوت، الجراحات العامة وجراحات المناظير المتقدمة، وجراحات البواسير والنواسير المتقدمة.'
                            : 'Dr. Mohammed Saeed provides a comprehensive range of colorectal surgery services, including treatment of colorectal cancer tumors, robotic colorectal surgeries, general surgeries and advanced laparoscopic surgeries, and advanced hemorrhoid and fistula surgeries.'}
                    </p>

                    <p>
                        ${lang === 'ar'
                            ? 'يعتمد الدكتور على نهج طبي حديث يركز على التشخيص الدقيق، تقليل التدخل الجراحي قدر الإمكان، استخدام جراحات المناظير والروبوت، تسريع التعافي وتقليل الألم، مع تقديم رعاية إنسانية شاملة للمريض.'
                            : 'Dr. Mohammed follows a modern medical approach focusing on accurate diagnosis, minimizing surgical intervention as much as possible, using laparoscopic and robotic surgeries, speeding recovery and reducing pain, while providing comprehensive humane patient care.'}
                    </p>

                    <div class="bg-blue-50 border-l-4 border-blue-600 p-6 my-6 rounded">
                        <h4 class="font-bold text-gray-800 mb-2 text-lg">
                            ${lang === 'ar' ? '🎯 الفئة العمرية المستقبلة' : '🎯 Age Group Accepted'}
                        </h4>
                        <p class="text-gray-700">
                            ${lang === 'ar'
                                ? '• في العيادة: من عمر 15 سنة<br>• في الحالات الطارئة: من عمر 7 سنوات فما فوق'
                                : '• In clinic: From age 15 years<br>• In emergency cases: From age 7 years and above'}
                        </p>
                    </div>
                </div>

                <!-- Qualifications & Certifications -->
                <div class="mt-12">
                    <h3 class="text-2xl font-bold text-gray-800 mb-6">
                        ${lang === 'ar' ? 'الزمالات والتأهيل العلمي' : 'Fellowships & Academic Qualifications'}
                    </h3>
                    <div class="grid md:grid-cols-2 gap-4">
                        <div class="qualification-badge text-white p-4 rounded-lg">
                            <i class="fas fa-hospital text-2xl mb-2"></i>
                            <div class="font-semibold">
                                ${lang === 'ar' ? 'زمالة مستشفى سانت مارك - لندن' : 'St Mark\'s Hospital Fellowship - London'}
                            </div>
                            <div class="text-sm opacity-90">
                                ${lang === 'ar' ? 'جراحة القولون والمستقيم' : 'Colorectal Surgery'}
                            </div>
                        </div>
                        <div class="qualification-badge text-white p-4 rounded-lg">
                            <i class="fas fa-hospital-user text-2xl mb-2"></i>
                            <div class="font-semibold">
                                ${lang === 'ar' ? 'زمالة مستشفى نورفولك ونوريتش' : 'Norfolk & Norwich Hospital Fellowship'}
                            </div>
                            <div class="text-sm opacity-90">
                                ${lang === 'ar' ? 'جراحة القولون والمستقيم وجراحة الطوارئ' : 'Colorectal & Emergency Surgery'}
                            </div>
                        </div>
                        <div class="qualification-badge text-white p-4 rounded-lg">
                            <i class="fas fa-robot text-2xl mb-2"></i>
                            <div class="font-semibold">
                                ${lang === 'ar' ? 'زمالة مستشفى نورفولك ونوريتش' : 'Norfolk & Norwich Hospital Fellowship'}
                            </div>
                            <div class="text-sm opacity-90">
                                ${lang === 'ar' ? 'جراحات الروبوت والمناظير' : 'Robotic & Laparoscopic Surgery'}
                            </div>
                        </div>
                        <div class="qualification-badge text-white p-4 rounded-lg">
                            <i class="fas fa-flag-checkered text-2xl mb-2"></i>
                            <div class="font-semibold">
                                ${lang === 'ar' ? 'خبرة بريطانية متميزة' : 'Distinguished UK Experience'}
                            </div>
                            <div class="text-sm opacity-90">
                                ${lang === 'ar' ? 'أفضل المستشفيات البريطانية' : 'Top British Hospitals'}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Specializations -->
                <div class="mt-12">
                    <h3 class="text-2xl font-bold text-gray-800 mb-6">
                        ${lang === 'ar' ? 'التخصصات والخدمات العلاجية' : 'Specializations & Medical Services'}
                    </h3>
                    <div class="grid md:grid-cols-2 gap-4">
                        ${[
                            { ar: 'علاج أورام القولون والمستقيم السرطانية', en: 'Treatment of Colorectal Cancer Tumors', icon: 'fa-ribbon' },
                            { ar: 'جراحات القولون والمستقيم بالروبوت', en: 'Robotic Colorectal Surgery', icon: 'fa-robot' },
                            { ar: 'الجراحات العامة وجراحات المناظير المتقدمة', en: 'General & Advanced Laparoscopic Surgery', icon: 'fa-hospital' },
                            { ar: 'جراحات البواسير والنواسير المتقدمة', en: 'Advanced Hemorrhoid & Fistula Surgery', icon: 'fa-user-doctor' },
                            { ar: 'علاج الشرخ الشرجي بحقن البوتكس', en: 'Anal Fissure Treatment with Botox', icon: 'fa-syringe' },
                            { ar: 'جراحة الناسور العصعصي', en: 'Pilonidal Sinus Surgery', icon: 'fa-notes-medical' },
                            { ar: 'الجراحة داخل المستقيم عبر فتحة الشرج', en: 'TAMIS - Transanal Minimally Invasive Surgery', icon: 'fa-microscope' },
                            { ar: 'جراحة إصلاح هبوط المستقيم وعضلات الحوض', en: 'Rectal Prolapse & Pelvic Floor Repair', icon: 'fa-heartbeat' },
                            { ar: 'جراحات المرارة والفتق', en: 'Gallbladder & Hernia Surgery', icon: 'fa-hospital-user' },
                            { ar: 'مناظير القولون والمستقيم التشخيصية والعلاجية', en: 'Diagnostic & Therapeutic Colonoscopy', icon: 'fa-stethoscope' }
                        ].map(spec => `
                            <div class="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition">
                                <i class="fas ${spec.icon} text-2xl text-blue-600"></i>
                                <span class="font-medium text-gray-800">${lang === 'ar' ? spec.ar : spec.en}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Patient Testimonials -->
    <section class="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-blue-800 text-white">
        <div class="container mx-auto px-6">
            <h2 class="text-4xl font-bold text-center mb-4">
                ${lang === 'ar' ? 'آراء المرضى' : 'Patient Testimonials'}
            </h2>
            <p class="text-center text-blue-200 mb-12 text-lg">
                ${lang === 'ar' ? 'شهادات من بعض المرضى الذين عالجناهم' : 'Testimonials from some of the patients we treated'}
            </p>

            <div class="grid md:grid-cols-3 gap-6">
                <!-- Testimonial 1 -->
                <div class="testimonial-card p-8 rounded-xl">
                    <div class="flex items-center gap-2 mb-4">
                        ${[1,2,3,4,5].map(() => '<i class="fas fa-star text-yellow-300"></i>').join('')}
                    </div>
                    <p class="text-lg mb-6 leading-relaxed">
                        "${lang === 'ar' 
                            ? 'الحمد لله على نجاح العملية. د. محمد طبيب ماهر جداً وخبير في جراحات القولون. أجرى لي عملية بالروبوت وكانت النتائج ممتازة. الألم كان قليل جداً والتعافي سريع. شكراً دكتور!'
                            : 'Thank God for the successful surgery. Dr. Mohammed is a very skilled doctor and expert in colorectal surgery. He performed robotic surgery for me and the results were excellent. Pain was minimal and recovery was quick. Thank you doctor!'}"
                    </p>
                    <div class="flex items-center gap-3">
                        <div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center">
                            <i class="fas fa-user text-blue-800"></i>
                        </div>
                        <div>
                            <div class="font-semibold">${lang === 'ar' ? 'عبدالله الشمري' : 'Abdullah Al-Shammari'}</div>
                            <div class="text-sm text-blue-200">${lang === 'ar' ? 'جراحة القولون بالروبوت' : 'Robotic Colorectal Surgery'}</div>
                        </div>
                    </div>
                </div>

                <!-- Testimonial 2 -->
                <div class="testimonial-card p-8 rounded-xl">
                    <div class="flex items-center gap-2 mb-4">
                        ${[1,2,3,4,5].map(() => '<i class="fas fa-star text-yellow-300"></i>').join('')}
                    </div>
                    <p class="text-lg mb-6 leading-relaxed">
                        "${lang === 'ar'
                            ? 'عانيت من مشكلة البواسير لسنوات طويلة. د. محمد عالجني بأحدث التقنيات وبدون ألم يذكر. الآن أنا أحسن بكثير. أنصح به بشدة لكل من يعاني من مشاكل مماثلة.'
                            : 'I suffered from hemorrhoids for many years. Dr. Mohammed treated me with the latest techniques with minimal pain. Now I am much better. I highly recommend him to anyone suffering from similar problems.'}"
                    </p>
                    <div class="flex items-center gap-3">
                        <div class="w-12 h-12 bg-pink-300 rounded-full flex items-center justify-center">
                            <i class="fas fa-user text-pink-800"></i>
                        </div>
                        <div>
                            <div class="font-semibold">${lang === 'ar' ? 'سارة القحطاني' : 'Sarah Al-Qahtani'}</div>
                            <div class="text-sm text-blue-200">${lang === 'ar' ? 'علاج البواسير' : 'Hemorrhoid Treatment'}</div>
                        </div>
                    </div>
                </div>

                <!-- Testimonial 3 -->
                <div class="testimonial-card p-8 rounded-xl">
                    <div class="flex items-center gap-2 mb-4">
                        ${[1,2,3,4,5].map(() => '<i class="fas fa-star text-yellow-300"></i>').join('')}
                    </div>
                    <p class="text-lg mb-6 leading-relaxed">
                        "${lang === 'ar'
                            ? 'تجربتي مع د. محمد كانت رائعة من البداية للنهاية. شخص الحالة بدقة وأجرى لي منظار علاجي ناجح. ما شاء الله عليه، يشرح كل شيء بوضوح ويطمئن المريض. الله يجزاه خير!'
                            : 'My experience with Dr. Mohammed was wonderful from start to finish. He diagnosed the condition accurately and performed a successful therapeutic endoscopy. He explains everything clearly and reassures the patient. May God reward him!'}"
                    </p>
                    <div class="flex items-center gap-3">
                        <div class="w-12 h-12 bg-green-300 rounded-full flex items-center justify-center">
                            <i class="fas fa-user text-green-800"></i>
                        </div>
                        <div>
                            <div class="font-semibold">${lang === 'ar' ? 'فهد المالكي' : 'Fahd Al-Malki'}</div>
                            <div class="text-sm text-blue-200">${lang === 'ar' ? 'منظار القولون العلاجي' : 'Therapeutic Colonoscopy'}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact & Booking CTA -->
    <section class="py-20 bg-white">
        <div class="container mx-auto px-6">
            <div class="max-w-4xl mx-auto">
                <div class="text-center mb-12">
                    <h2 class="text-4xl font-bold text-gray-800 mb-4">
                        ${lang === 'ar' ? 'كيفية التواصل والحجز' : 'How to Contact & Book'}
                    </h2>
                    <p class="text-lg text-gray-600">
                        ${lang === 'ar' 
                            ? 'نحن هنا لخدمتك! اختر الطريقة المناسبة للتواصل معنا'
                            : 'We are here to serve you! Choose the most convenient way to contact us'}
                    </p>
                </div>

                <div class="grid md:grid-cols-2 gap-6 mb-12">
                    <!-- Booking Card -->
                    <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
                        <i class="fas fa-calendar-check text-5xl text-blue-600 mb-4"></i>
                        <h3 class="text-2xl font-bold text-gray-800 mb-4">
                            ${lang === 'ar' ? 'حجز موعد إلكتروني' : 'Online Booking'}
                        </h3>
                        <p class="text-gray-700 mb-6">
                            ${lang === 'ar'
                                ? 'احجز موعدك بسهولة من خلال نظام الحجز الإلكتروني. اختر التاريخ والوقت المناسب لك.'
                                : 'Book your appointment easily through our online booking system. Choose the date and time that suits you.'}
                        </p>
                        <a href="/booking" class="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition">
                            ${lang === 'ar' ? 'احجز الآن' : 'Book Now'}
                            <i class="fas fa-arrow-${lang === 'ar' ? 'left' : 'right'} ${lang === 'ar' ? 'mr' : 'ml'}-2"></i>
                        </a>
                    </div>

                    <!-- WhatsApp Card -->
                    <div class="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl">
                        <i class="fab fa-whatsapp text-5xl text-green-600 mb-4"></i>
                        <h3 class="text-2xl font-bold text-gray-800 mb-4">
                            ${lang === 'ar' ? 'تواصل عبر واتساب' : 'WhatsApp Contact'}
                        </h3>
                        <p class="text-gray-700 mb-6">
                            ${lang === 'ar'
                                ? 'تواصل معنا مباشرة عبر الواتساب للرد على استفساراتك أو حجز موعد.'
                                : 'Contact us directly via WhatsApp to answer your inquiries or book an appointment.'}
                        </p>
                        <a href="https://wa.me/966XXXXXXXXX" class="inline-block bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition">
                            ${lang === 'ar' ? 'تواصل الآن' : 'Contact Now'}
                            <i class="fab fa-whatsapp ${lang === 'ar' ? 'mr' : 'ml'}-2"></i>
                        </a>
                    </div>
                </div>

                <!-- Contact Information -->
                <div class="bg-gray-50 p-8 rounded-2xl">
                    <h3 class="text-2xl font-bold text-gray-800 mb-6 text-center">
                        ${lang === 'ar' ? 'معلومات الاتصال' : 'Contact Information'}
                    </h3>
                    <div class="grid md:grid-cols-3 gap-6">
                        <!-- Phone -->
                        <div class="text-center">
                            <i class="fas fa-phone text-3xl text-blue-600 mb-3"></i>
                            <div class="font-semibold text-gray-800 mb-2">
                                ${lang === 'ar' ? 'الهاتف' : 'Phone'}
                            </div>
                            <a href="tel:+966XXXXXXXXX" class="text-blue-600 hover:underline" dir="ltr">
                                +966 XX XXX XXXX
                            </a>
                        </div>

                        <!-- Email -->
                        <div class="text-center">
                            <i class="fas fa-envelope text-3xl text-blue-600 mb-3"></i>
                            <div class="font-semibold text-gray-800 mb-2">
                                ${lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                            </div>
                            <a href="mailto:info@drahmed.com" class="text-blue-600 hover:underline">
                                info@drahmed.com
                            </a>
                        </div>

                        <!-- Location -->
                        <div class="text-center">
                            <i class="fas fa-map-marker-alt text-3xl text-blue-600 mb-3"></i>
                            <div class="font-semibold text-gray-800 mb-2">
                                ${lang === 'ar' ? 'الموقع' : 'Location'}
                            </div>
                            <div class="text-gray-600">
                                ${lang === 'ar' 
                                    ? 'مستشفى الملك فيصل التخصصي<br>الرياض، المملكة العربية السعودية'
                                    : 'King Faisal Specialist Hospital<br>Riyadh, Saudi Arabia'}
                            </div>
                        </div>
                    </div>

                    <!-- Working Hours -->
                    <div class="mt-8 border-t border-gray-200 pt-6">
                        <h4 class="font-semibold text-gray-800 mb-4 text-center">
                            ${lang === 'ar' ? 'ساعات العمل' : 'Working Hours'}
                        </h4>
                        <div class="grid md:grid-cols-2 gap-4 text-center">
                            <div>
                                <div class="font-medium text-gray-700">
                                    ${lang === 'ar' ? 'الأحد - الخميس' : 'Sunday - Thursday'}
                                </div>
                                <div class="text-gray-600">4:00 PM - 9:00 PM</div>
                            </div>
                            <div>
                                <div class="font-medium text-gray-700">
                                    ${lang === 'ar' ? 'الجمعة - السبت' : 'Friday - Saturday'}
                                </div>
                                <div class="text-red-600">${lang === 'ar' ? 'مغلق' : 'Closed'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    ${getFooter(lang)}
</body>
</html>
  `);
});

export default aboutPage;
