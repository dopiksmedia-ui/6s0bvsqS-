import { Hono } from 'hono';
import type { AppContext } from '../types';

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
    <title>${lang === 'ar' ? 'عن الدكتور' : 'About Doctor'} - Dr. Ahmed Al-Shareef</title>
    <meta name="description" content="${lang === 'ar' ? 'تعرف على د. أحمد محمد الشريف - استشاري جراحة عامة ومناظير بخبرة تمتد لأكثر من 15 عاماً' : 'Meet Dr. Ahmed Mohammed Al-Shareef - Consultant General & Laparoscopic Surgeon with over 15 years of experience'}">
    
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
    <!-- Navigation -->
    <nav class="bg-white shadow-sm sticky top-0 z-50">
        <div class="container mx-auto px-6 py-4">
            <div class="flex justify-between items-center">
                <a href="/" class="text-2xl font-bold text-blue-600">
                    ${lang === 'ar' ? 'د. أحمد الشريف' : 'Dr. Ahmed Al-Shareef'}
                </a>
                <div class="flex gap-6 items-center">
                    <a href="/" class="text-gray-600 hover:text-blue-600 transition">
                        ${lang === 'ar' ? 'الرئيسية' : 'Home'}
                    </a>
                    <a href="/about" class="text-blue-600 font-semibold">
                        ${lang === 'ar' ? 'عن الدكتور' : 'About'}
                    </a>
                    <a href="/booking" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                        ${lang === 'ar' ? 'احجز الآن' : 'Book Now'}
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section with Doctor Image -->
    <section class="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-20">
        <div class="container mx-auto px-6">
            <div class="grid md:grid-cols-2 gap-12 items-center">
                <!-- Doctor Image -->
                <div class="relative" data-aos="fade-right">
                    <div class="relative z-10">
                        <img 
                            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=600&fit=crop" 
                            alt="Dr. Ahmed Al-Shareef" 
                            class="rounded-2xl shadow-2xl w-full max-w-md mx-auto"
                        >
                        <div class="absolute -bottom-6 -${lang === 'ar' ? 'left' : 'right'}-6 bg-white text-blue-600 px-8 py-4 rounded-xl shadow-lg">
                            <div class="text-3xl font-bold">15+</div>
                            <div class="text-sm">${lang === 'ar' ? 'سنة خبرة' : 'Years Experience'}</div>
                        </div>
                    </div>
                </div>

                <!-- Doctor Info -->
                <div data-aos="fade-left">
                    <h1 class="text-5xl font-bold mb-4">
                        ${lang === 'ar' ? 'د. أحمد محمد الشريف' : 'Dr. Ahmed Mohammed Al-Shareef'}
                    </h1>
                    <p class="text-2xl text-blue-200 mb-6">
                        ${lang === 'ar' 
                            ? 'استشاري جراحة عامة ومناظير | زمالة البورد الأمريكي FACS' 
                            : 'Consultant General & Laparoscopic Surgeon | FACS'}
                    </p>
                    <p class="text-lg text-blue-100 leading-relaxed mb-8">
                        ${lang === 'ar'
                            ? 'خبرة واسعة تمتد لأكثر من 15 عاماً في مجال الجراحة العامة وجراحة المناظير المتقدمة، مع سجل حافل بالنجاحات والإنجازات الطبية المتميزة.'
                            : 'Extensive experience spanning over 15 years in general surgery and advanced laparoscopic procedures, with an outstanding record of medical successes and achievements.'}
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
                    <div class="text-5xl font-bold text-blue-600 mb-2">15+</div>
                    <div class="text-gray-700">${lang === 'ar' ? 'سنة خبرة' : 'Years Experience'}</div>
                </div>
                <div class="stat-card bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl text-center">
                    <div class="text-5xl font-bold text-green-600 mb-2">5,000+</div>
                    <div class="text-gray-700">${lang === 'ar' ? 'عملية جراحية' : 'Surgeries'}</div>
                </div>
                <div class="stat-card bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl text-center">
                    <div class="text-5xl font-bold text-purple-600 mb-2">98%</div>
                    <div class="text-gray-700">${lang === 'ar' ? 'رضا المرضى' : 'Patient Satisfaction'}</div>
                </div>
                <div class="stat-card bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl text-center">
                    <div class="text-5xl font-bold text-orange-600 mb-2">25+</div>
                    <div class="text-gray-700">${lang === 'ar' ? 'شهادة واعتماد' : 'Certifications'}</div>
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
                            ? 'الدكتور أحمد محمد الشريف هو استشاري جراحة عامة ومناظير متميز، يجمع بين الخبرة الطويلة والمهارات الجراحية المتقدمة.'
                            : 'Dr. Ahmed Mohammed Al-Shareef is a distinguished consultant in general and laparoscopic surgery, combining extensive experience with advanced surgical skills.'}
                    </p>
                    
                    <p>
                        ${lang === 'ar'
                            ? 'تخرج د. أحمد من كلية الطب جامعة الملك سعود بتفوق، ثم أكمل تدريبه التخصصي في الجراحة العامة في مستشفيات مرموقة بالمملكة العربية السعودية. حصل على زمالة البورد الأمريكي في الجراحة العامة (FACS) من الكلية الأمريكية للجراحين، وهو ما يعكس التزامه بأعلى معايير التميز الطبي.'
                            : 'Dr. Ahmed graduated with distinction from King Saud University College of Medicine, then completed his specialized training in general surgery at prestigious hospitals in Saudi Arabia. He obtained a fellowship from the American Board of Surgery (FACS) from the American College of Surgeons, reflecting his commitment to the highest standards of medical excellence.'}
                    </p>

                    <p>
                        ${lang === 'ar'
                            ? 'خلال مسيرته المهنية التي امتدت لأكثر من 15 عاماً، أجرى د. أحمد أكثر من 5,000 عملية جراحية ناجحة، تنوعت بين العمليات التقليدية والمناظير المتقدمة. يتخصص في جراحات السمنة، المرارة، الفتق، الزائدة الدودية، والجراحات الطارئة.'
                            : 'Throughout his 15+ year career, Dr. Ahmed has performed over 5,000 successful surgeries, ranging from traditional operations to advanced laparoscopic procedures. He specializes in bariatric surgery, gallbladder, hernia, appendix, and emergency surgeries.'}
                    </p>

                    <p>
                        ${lang === 'ar'
                            ? 'يؤمن د. أحمد بأن كل مريض يستحق رعاية طبية شخصية ومتميزة، ولذلك يحرص على متابعة مرضاه بدقة من قبل وأثناء وبعد العملية. فلسفته في العلاج تقوم على الاستماع الجيد للمريض، التشخيص الدقيق، والتوعية الشاملة حول الخيارات العلاجية المتاحة.'
                            : 'Dr. Ahmed believes that every patient deserves personalized and distinguished medical care. Therefore, he carefully follows up with his patients before, during, and after surgery. His treatment philosophy is based on active listening to patients, accurate diagnosis, and comprehensive education about available treatment options.'}
                    </p>
                </div>

                <!-- Qualifications & Certifications -->
                <div class="mt-12">
                    <h3 class="text-2xl font-bold text-gray-800 mb-6">
                        ${lang === 'ar' ? 'المؤهلات والشهادات' : 'Qualifications & Certifications'}
                    </h3>
                    <div class="grid md:grid-cols-2 gap-4">
                        <div class="qualification-badge text-white p-4 rounded-lg">
                            <i class="fas fa-graduation-cap text-2xl mb-2"></i>
                            <div class="font-semibold">
                                ${lang === 'ar' ? 'بكالوريوس الطب والجراحة' : 'MBBS'}
                            </div>
                            <div class="text-sm opacity-90">
                                ${lang === 'ar' ? 'جامعة الملك سعود' : 'King Saud University'}
                            </div>
                        </div>
                        <div class="qualification-badge text-white p-4 rounded-lg">
                            <i class="fas fa-award text-2xl mb-2"></i>
                            <div class="font-semibold">
                                ${lang === 'ar' ? 'زمالة البورد الأمريكي (FACS)' : 'FACS Fellowship'}
                            </div>
                            <div class="text-sm opacity-90">
                                ${lang === 'ar' ? 'الكلية الأمريكية للجراحين' : 'American College of Surgeons'}
                            </div>
                        </div>
                        <div class="qualification-badge text-white p-4 rounded-lg">
                            <i class="fas fa-certificate text-2xl mb-2"></i>
                            <div class="font-semibold">
                                ${lang === 'ar' ? 'البورد السعودي - جراحة عامة' : 'Saudi Board - General Surgery'}
                            </div>
                            <div class="text-sm opacity-90">
                                ${lang === 'ar' ? 'الهيئة السعودية للتخصصات الصحية' : 'Saudi Commission for Health Specialties'}
                            </div>
                        </div>
                        <div class="qualification-badge text-white p-4 rounded-lg">
                            <i class="fas fa-microscope text-2xl mb-2"></i>
                            <div class="font-semibold">
                                ${lang === 'ar' ? 'زمالة جراحة المناظير المتقدمة' : 'Advanced Laparoscopy Fellowship'}
                            </div>
                            <div class="text-sm opacity-90">
                                ${lang === 'ar' ? 'جامعة هارفارد - الولايات المتحدة' : 'Harvard University - USA'}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Specializations -->
                <div class="mt-12">
                    <h3 class="text-2xl font-bold text-gray-800 mb-6">
                        ${lang === 'ar' ? 'التخصصات الطبية' : 'Medical Specializations'}
                    </h3>
                    <div class="grid md:grid-cols-2 gap-4">
                        ${[
                            { ar: 'جراحات السمنة والمناظير', en: 'Bariatric & Laparoscopic Surgery', icon: 'fa-weight-scale' },
                            { ar: 'جراحة المرارة بالمنظار', en: 'Laparoscopic Cholecystectomy', icon: 'fa-hospital' },
                            { ar: 'جراحة الفتق (الفتاق)', en: 'Hernia Surgery', icon: 'fa-user-doctor' },
                            { ar: 'جراحة الزائدة الدودية', en: 'Appendectomy', icon: 'fa-syringe' },
                            { ar: 'جراحات الطوارئ', en: 'Emergency Surgery', icon: 'fa-truck-medical' },
                            { ar: 'جراحات القولون والمستقيم', en: 'Colorectal Surgery', icon: 'fa-notes-medical' }
                        ].map(spec => `
                            <div class="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
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
                            ? 'تجربة ممتازة من البداية للنهاية. د. أحمد طبيب محترف جداً ويهتم بتفاصيل حالة المريض. العملية كانت ناجحة ولم أشعر بأي ألم بعدها. أنصح بشدة!'
                            : 'Excellent experience from start to finish. Dr. Ahmed is a very professional doctor who cares about patient details. The surgery was successful and I felt no pain afterward. Highly recommended!'}"
                    </p>
                    <div class="flex items-center gap-3">
                        <div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center">
                            <i class="fas fa-user text-blue-800"></i>
                        </div>
                        <div>
                            <div class="font-semibold">${lang === 'ar' ? 'محمد العتيبي' : 'Mohammed Al-Otaibi'}</div>
                            <div class="text-sm text-blue-200">${lang === 'ar' ? 'جراحة المرارة' : 'Gallbladder Surgery'}</div>
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
                            ? 'كنت خائفة جداً من العملية لكن د. أحمد طمأنني وشرح لي كل شيء بوضوح. الفريق الطبي رائع والمتابعة بعد العملية كانت ممتازة. شكراً جزيلاً!'
                            : 'I was very scared of the surgery but Dr. Ahmed reassured me and explained everything clearly. The medical team is wonderful and the post-operative follow-up was excellent. Thank you so much!'}"
                    </p>
                    <div class="flex items-center gap-3">
                        <div class="w-12 h-12 bg-pink-300 rounded-full flex items-center justify-center">
                            <i class="fas fa-user text-pink-800"></i>
                        </div>
                        <div>
                            <div class="font-semibold">${lang === 'ar' ? 'نورة السهلي' : 'Noura Al-Sahli'}</div>
                            <div class="text-sm text-blue-200">${lang === 'ar' ? 'جراحة الفتق' : 'Hernia Surgery'}</div>
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
                            ? 'أفضل طبيب جراح قابلته في حياتي. مهني، صبور، ويشرح كل شيء بطريقة مفهومة. العملية كانت بالمنظار وكانت سريعة وناجحة. الله يعطيه العافية!'
                            : 'The best surgeon I have ever met. Professional, patient, and explains everything in an understandable way. The laparoscopic surgery was quick and successful. May God give him health!'}"
                    </p>
                    <div class="flex items-center gap-3">
                        <div class="w-12 h-12 bg-green-300 rounded-full flex items-center justify-center">
                            <i class="fas fa-user text-green-800"></i>
                        </div>
                        <div>
                            <div class="font-semibold">${lang === 'ar' ? 'خالد المطيري' : 'Khaled Al-Mutairi'}</div>
                            <div class="text-sm text-blue-200">${lang === 'ar' ? 'جراحة الزائدة' : 'Appendix Surgery'}</div>
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

    <!-- Main Footer -->
    <footer class="bg-gray-900 text-white py-12">
        <div class="container mx-auto px-6">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <!-- About Column -->
                <div>
                    <h3 class="text-xl font-bold mb-4">
                        ${lang === 'ar' ? 'عن الدكتور' : 'About Doctor'}
                    </h3>
                    <p class="text-gray-400 leading-relaxed">
                        ${lang === 'ar'
                            ? 'د. أحمد محمد الشريف - استشاري جراحة عامة ومناظير بخبرة تمتد لأكثر من 15 عاماً في تقديم أفضل الخدمات الطبية.'
                            : 'Dr. Ahmed Mohammed Al-Shareef - Consultant General & Laparoscopic Surgeon with over 15 years of experience providing the best medical services.'}
                    </p>
                </div>

                <!-- Quick Links -->
                <div>
                    <h3 class="text-xl font-bold mb-4">
                        ${lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}
                    </h3>
                    <ul class="space-y-2">
                        <li><a href="/" class="text-gray-400 hover:text-blue-400 transition">${lang === 'ar' ? 'الرئيسية' : 'Home'}</a></li>
                        <li><a href="/about" class="text-gray-400 hover:text-blue-400 transition">${lang === 'ar' ? 'عن الدكتور' : 'About'}</a></li>
                        <li><a href="/booking" class="text-gray-400 hover:text-blue-400 transition">${lang === 'ar' ? 'حجز موعد' : 'Book Appointment'}</a></li>
                        <li><a href="/articles" class="text-gray-400 hover:text-blue-400 transition">${lang === 'ar' ? 'المقالات' : 'Articles'}</a></li>
                        <li><a href="/contact" class="text-gray-400 hover:text-blue-400 transition">${lang === 'ar' ? 'اتصل بنا' : 'Contact Us'}</a></li>
                    </ul>
                </div>

                <!-- Services -->
                <div>
                    <h3 class="text-xl font-bold mb-4">
                        ${lang === 'ar' ? 'الخدمات' : 'Services'}
                    </h3>
                    <ul class="space-y-2 text-gray-400">
                        <li>${lang === 'ar' ? 'جراحات المناظير' : 'Laparoscopic Surgery'}</li>
                        <li>${lang === 'ar' ? 'جراحات السمنة' : 'Bariatric Surgery'}</li>
                        <li>${lang === 'ar' ? 'جراحة المرارة' : 'Gallbladder Surgery'}</li>
                        <li>${lang === 'ar' ? 'جراحة الفتق' : 'Hernia Surgery'}</li>
                        <li>${lang === 'ar' ? 'جراحات الطوارئ' : 'Emergency Surgery'}</li>
                    </ul>
                </div>

                <!-- Contact Info -->
                <div>
                    <h3 class="text-xl font-bold mb-4">
                        ${lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                    </h3>
                    <ul class="space-y-3 text-gray-400">
                        <li class="flex items-center gap-2">
                            <i class="fas fa-phone"></i>
                            <span dir="ltr">+966 XX XXX XXXX</span>
                        </li>
                        <li class="flex items-center gap-2">
                            <i class="fas fa-envelope"></i>
                            <span>info@drahmed.com</span>
                        </li>
                        <li class="flex items-center gap-2">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${lang === 'ar' ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}</span>
                        </li>
                    </ul>

                    <!-- Social Media -->
                    <div class="mt-6">
                        <div class="flex gap-4">
                            <a href="#" class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" class="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a href="#" class="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition">
                                <i class="fab fa-instagram"></i>
                            </a>
                            <a href="#" class="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition">
                                <i class="fab fa-youtube"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bottom Footer -->
            <div class="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
                <p>
                    © ${new Date().getFullYear()} ${lang === 'ar' ? 'د. أحمد محمد الشريف - جميع الحقوق محفوظة' : 'Dr. Ahmed Mohammed Al-Shareef - All Rights Reserved'}
                </p>
                <div class="mt-2 flex justify-center gap-4 text-sm">
                    <a href="/privacy" class="hover:text-blue-400 transition">${lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}</a>
                    <span>|</span>
                    <a href="/terms" class="hover:text-blue-400 transition">${lang === 'ar' ? 'شروط الاستخدام' : 'Terms of Use'}</a>
                </div>
            </div>
        </div>
    </footer>
</body>
</html>
  `);
});

export default aboutPage;
