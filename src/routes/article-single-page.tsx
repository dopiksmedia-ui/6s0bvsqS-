import { Hono } from 'hono';
import type { AppContext } from '../types';
import { getNavigation } from '../components/navigation';
import { getFooter } from '../components/footer';

const articleSinglePage = new Hono<AppContext>();

// Sample article data (in production, this would come from D1 database)
const articlesData = {
  'colon-cancer-prevention': {
    id: 1,
    slug: 'colon-cancer-prevention',
    title_ar: 'الوقاية من سرطان القولون: دليلك الشامل للحماية والكشف المبكر',
    title_en: 'Colon Cancer Prevention: Your Complete Guide to Protection and Early Detection',
    author: 'Dr. Mohammed Saeed bin Mohsen Ali',
    date: '2024-02-20',
    readTime: 8,
    category_ar: 'الأورام',
    category_en: 'Cancer',
    image: '/articles/colon-cancer.jpg',
    content_ar: `
      <div class="article-content">
        <h2>ما هو سرطان القولون؟</h2>
        <p>سرطان القولون هو نمو غير طبيعي للخلايا في الأمعاء الغليظة (القولون) أو المستقيم. يبدأ عادةً كزوائد لحمية صغيرة غير سرطانية (سليلات) على البطانة الداخلية للقولون. مع مرور الوقت، قد تتحول بعض هذه السليلات إلى سرطان.</p>
        
        <div class="info-box bg-blue-50 p-6 rounded-xl my-8 border-l-4 border-blue-600">
          <h3 class="text-xl font-bold text-blue-900 mb-3"><i class="fas fa-info-circle ml-2"></i>حقيقة مهمة</h3>
          <p class="text-blue-800">يُعد سرطان القولون ثالث أكثر أنواع السرطان شيوعاً في المملكة العربية السعودية، لكن معدلات الشفاء منه عالية جداً عند اكتشافه مبكراً - تصل إلى 90% في المراحل المبكرة.</p>
        </div>

        <h2>عوامل الخطر الرئيسية</h2>
        <ul class="space-y-3 my-6">
          <li><i class="fas fa-check-circle text-green-600 ml-2"></i><strong>العمر:</strong> يزداد الخطر بعد سن الأربعين، خاصة بعد الخمسين</li>
          <li><i class="fas fa-check-circle text-green-600 ml-2"></i><strong>التاريخ العائلي:</strong> وجود حالات سرطان القولون في العائلة</li>
          <li><i class="fas fa-check-circle text-green-600 ml-2"></i><strong>الالتهابات المزمنة:</strong> مثل مرض كرون والتهاب القولون التقرحي</li>
          <li><i class="fas fa-check-circle text-green-600 ml-2"></i><strong>النظام الغذائي:</strong> الإفراط في تناول اللحوم الحمراء والمعالجة</li>
          <li><i class="fas fa-check-circle text-green-600 ml-2"></i><strong>قلة النشاط البدني:</strong> نمط الحياة الخامل</li>
          <li><i class="fas fa-check-circle text-green-600 ml-2"></i><strong>السمنة:</strong> زيادة الوزن المفرطة</li>
          <li><i class="fas fa-check-circle text-green-600 ml-2"></i><strong>التدخين:</strong> يزيد من خطر الإصابة بشكل كبير</li>
        </ul>

        <div class="image-container my-8">
          <img src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200&h=600&fit=crop" alt="نمط حياة صحي" class="w-full rounded-2xl shadow-lg">
          <p class="text-center text-gray-600 text-sm mt-3">نمط الحياة الصحي يساعد في الوقاية من سرطان القولون</p>
        </div>

        <h2>الأعراض التحذيرية - متى يجب استشارة الطبيب؟</h2>
        <div class="warning-box bg-red-50 p-6 rounded-xl my-8 border-l-4 border-red-600">
          <h3 class="text-xl font-bold text-red-900 mb-4"><i class="fas fa-exclamation-triangle ml-2"></i>انتبه لهذه الأعراض</h3>
          <ul class="space-y-2 text-red-800">
            <li><i class="fas fa-arrow-left text-red-600 ml-2"></i>تغيرات في عادات التبرز (إسهال أو إمساك مستمر)</li>
            <li><i class="fas fa-arrow-left text-red-600 ml-2"></i>نزيف من المستقيم أو دم في البراز</li>
            <li><i class="fas fa-arrow-left text-red-600 ml-2"></i>ألم أو تقلصات مستمرة في البطن</li>
            <li><i class="fas fa-arrow-left text-red-600 ml-2"></i>شعور بأن الأمعاء لا تفرغ تماماً</li>
            <li><i class="fas fa-arrow-left text-red-600 ml-2"></i>ضعف وإرهاق غير مبرر</li>
            <li><i class="fas fa-arrow-left text-red-600 ml-2"></i>فقدان الوزن غير المقصود</li>
          </ul>
        </div>

        <h2>طرق الوقاية الفعالة</h2>
        
        <h3>1. الفحص الدوري المبكر</h3>
        <p>يُعد الفحص الدوري أهم وسيلة للوقاية والكشف المبكر. يُنصح بالبدء بالفحص من سن الأربعين للأشخاص ذوي الخطر المتوسط، أو قبل ذلك لمن لديهم عوامل خطر.</p>
        
        <div class="grid md:grid-cols-2 gap-6 my-8">
          <div class="screening-card bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <i class="fas fa-microscope text-2xl text-blue-600"></i>
              </div>
              <h4 class="text-lg font-bold mr-3">منظار القولون</h4>
            </div>
            <p class="text-gray-700">الفحص الأكثر شمولية ودقة. يتم كل 10 سنوات للأشخاص ذوي الخطر المتوسط.</p>
          </div>
          
          <div class="screening-card bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <i class="fas fa-vial text-2xl text-green-600"></i>
              </div>
              <h4 class="text-lg font-bold mr-3">فحص الدم الخفي</h4>
            </div>
            <p class="text-gray-700">فحص بسيط يُجرى سنوياً للكشف عن وجود دم غير مرئي في البراز.</p>
          </div>
        </div>

        <div class="image-container my-8">
          <img src="https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1200&h=600&fit=crop" alt="الفحص الطبي" class="w-full rounded-2xl shadow-lg">
          <p class="text-center text-gray-600 text-sm mt-3">الفحص الدوري المنتظم هو المفتاح للكشف المبكر</p>
        </div>

        <h3>2. النظام الغذائي الصحي</h3>
        <div class="grid md:grid-cols-2 gap-6 my-8">
          <div class="diet-card bg-green-50 p-6 rounded-xl">
            <h4 class="text-lg font-bold text-green-900 mb-4 flex items-center">
              <i class="fas fa-check-circle text-green-600 ml-2"></i>
              يُنصح بتناوله
            </h4>
            <ul class="space-y-2 text-green-800">
              <li><i class="fas fa-leaf ml-2"></i>الخضروات والفواكه الطازجة</li>
              <li><i class="fas fa-leaf ml-2"></i>الحبوب الكاملة والألياف</li>
              <li><i class="fas fa-leaf ml-2"></i>الأسماك الدهنية (أوميغا 3)</li>
              <li><i class="fas fa-leaf ml-2"></i>البقوليات والمكسرات</li>
              <li><i class="fas fa-leaf ml-2"></i>الشاي الأخضر ومضادات الأكسدة</li>
            </ul>
          </div>
          
          <div class="diet-card bg-red-50 p-6 rounded-xl">
            <h4 class="text-lg font-bold text-red-900 mb-4 flex items-center">
              <i class="fas fa-times-circle text-red-600 ml-2"></i>
              يُفضل تجنبه أو التقليل منه
            </h4>
            <ul class="space-y-2 text-red-800">
              <li><i class="fas fa-ban ml-2"></i>اللحوم الحمراء المفرطة</li>
              <li><i class="fas fa-ban ml-2"></i>اللحوم المعالجة والمصنعة</li>
              <li><i class="fas fa-ban ml-2"></i>الأطعمة المقلية والدهون المشبعة</li>
              <li><i class="fas fa-ban ml-2"></i>السكريات والمشروبات الغازية</li>
              <li><i class="fas fa-ban ml-2"></i>الكحول والتدخين</li>
            </ul>
          </div>
        </div>

        <h3>3. النشاط البدني المنتظم</h3>
        <p>ممارسة الرياضة بانتظام تقلل من خطر الإصابة بسرطان القولون بنسبة تصل إلى 25%. يُنصح بممارسة 30 دقيقة من النشاط المعتدل يومياً، مثل المشي السريع أو السباحة.</p>

        <div class="image-container my-8">
          <img src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1200&h=600&fit=crop" alt="النشاط البدني" class="w-full rounded-2xl shadow-lg">
          <p class="text-center text-gray-600 text-sm mt-3">النشاط البدني المنتظم يساعد في الوقاية</p>
        </div>

        <h2>العلاج الحديث لسرطان القولون</h2>
        <p>تطورت طرق العلاج بشكل كبير في السنوات الأخيرة، وتشمل:</p>
        
        <div class="treatment-options grid md:grid-cols-3 gap-6 my-8">
          <div class="treatment-card bg-white p-6 rounded-xl shadow-lg text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-robot text-3xl text-blue-600"></i>
            </div>
            <h4 class="text-lg font-bold mb-2">الجراحة الروبوتية</h4>
            <p class="text-gray-600 text-sm">تقنية متقدمة توفر دقة عالية وتعافي أسرع</p>
          </div>
          
          <div class="treatment-card bg-white p-6 rounded-xl shadow-lg text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-syringe text-3xl text-green-600"></i>
            </div>
            <h4 class="text-lg font-bold mb-2">العلاج الموجه</h4>
            <p class="text-gray-600 text-sm">أدوية حديثة تستهدف الخلايا السرطانية بدقة</p>
          </div>
          
          <div class="treatment-card bg-white p-6 rounded-xl shadow-lg text-center">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-shield-virus text-3xl text-purple-600"></i>
            </div>
            <h4 class="text-lg font-bold mb-2">العلاج المناعي</h4>
            <p class="text-gray-600 text-sm">تقوية الجهاز المناعي لمحاربة السرطان</p>
          </div>
        </div>

        <h2>الخلاصة والنصائح الذهبية</h2>
        <div class="summary-box bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl my-8">
          <h3 class="text-2xl font-bold text-blue-900 mb-6 text-center">
            <i class="fas fa-star text-yellow-500 ml-2"></i>
            ما يجب تذكره
          </h3>
          <ol class="space-y-4 text-blue-900">
            <li class="flex items-start">
              <span class="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center ml-3 mt-1 font-bold">1</span>
              <span><strong>الفحص المبكر ينقذ الحياة:</strong> ابدأ الفحص الدوري من سن الأربعين</span>
            </li>
            <li class="flex items-start">
              <span class="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center ml-3 mt-1 font-bold">2</span>
              <span><strong>النظام الغذائي مهم:</strong> أكثر من الألياف والخضروات، وقلل اللحوم الحمراء</span>
            </li>
            <li class="flex items-start">
              <span class="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center ml-3 mt-1 font-bold">3</span>
              <span><strong>مارس الرياضة بانتظام:</strong> 30 دقيقة يومياً تحدث فرقاً كبيراً</span>
            </li>
            <li class="flex items-start">
              <span class="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center ml-3 mt-1 font-bold">4</span>
              <span><strong>حافظ على وزن صحي:</strong> السمنة عامل خطر رئيسي</span>
            </li>
            <li class="flex items-start">
              <span class="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center ml-3 mt-1 font-bold">5</span>
              <span><strong>توقف عن التدخين:</strong> إن كنت مدخناً، فهذا أفضل قرار لصحتك</span>
            </li>
            <li class="flex items-start">
              <span class="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center ml-3 mt-1 font-bold">6</span>
              <span><strong>استشر طبيبك فوراً:</strong> عند ملاحظة أي من الأعراض التحذيرية</span>
            </li>
          </ol>
        </div>
      </div>
    `,
    content_en: `
      <div class="article-content">
        <h2>What is Colon Cancer?</h2>
        <p>Colon cancer is an abnormal growth of cells in the large intestine (colon) or rectum. It usually starts as small, non-cancerous growths (polyps) on the inner lining of the colon. Over time, some of these polyps can become cancer.</p>
        
        <div class="info-box bg-blue-50 p-6 rounded-xl my-8 border-l-4 border-blue-600">
          <h3 class="text-xl font-bold text-blue-900 mb-3"><i class="fas fa-info-circle mr-2"></i>Important Fact</h3>
          <p class="text-blue-800">Colon cancer is the third most common type of cancer in Saudi Arabia, but survival rates are very high when detected early - up to 90% in early stages.</p>
        </div>

        <h2>Main Risk Factors</h2>
        <ul class="space-y-3 my-6">
          <li><i class="fas fa-check-circle text-green-600 mr-2"></i><strong>Age:</strong> Risk increases after 40, especially after 50</li>
          <li><i class="fas fa-check-circle text-green-600 mr-2"></i><strong>Family History:</strong> Cases of colon cancer in the family</li>
          <li><i class="fas fa-check-circle text-green-600 mr-2"></i><strong>Chronic Inflammation:</strong> Such as Crohn's disease and ulcerative colitis</li>
          <li><i class="fas fa-check-circle text-green-600 mr-2"></i><strong>Diet:</strong> Excessive consumption of red and processed meats</li>
          <li><i class="fas fa-check-circle text-green-600 mr-2"></i><strong>Lack of Physical Activity:</strong> Sedentary lifestyle</li>
          <li><i class="fas fa-check-circle text-green-600 mr-2"></i><strong>Obesity:</strong> Excessive weight gain</li>
          <li><i class="fas fa-check-circle text-green-600 mr-2"></i><strong>Smoking:</strong> Significantly increases risk</li>
        </ul>

        <div class="image-container my-8">
          <img src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200&h=600&fit=crop" alt="Healthy lifestyle" class="w-full rounded-2xl shadow-lg">
          <p class="text-center text-gray-600 text-sm mt-3">A healthy lifestyle helps prevent colon cancer</p>
        </div>

        <h2>Warning Symptoms - When to See a Doctor?</h2>
        <div class="warning-box bg-red-50 p-6 rounded-xl my-8 border-l-4 border-red-600">
          <h3 class="text-xl font-bold text-red-900 mb-4"><i class="fas fa-exclamation-triangle mr-2"></i>Watch for These Symptoms</h3>
          <ul class="space-y-2 text-red-800">
            <li><i class="fas fa-arrow-right text-red-600 mr-2"></i>Changes in bowel habits (persistent diarrhea or constipation)</li>
            <li><i class="fas fa-arrow-right text-red-600 mr-2"></i>Rectal bleeding or blood in stool</li>
            <li><i class="fas fa-arrow-right text-red-600 mr-2"></i>Persistent abdominal pain or cramps</li>
            <li><i class="fas fa-arrow-right text-red-600 mr-2"></i>Feeling that bowels don't empty completely</li>
            <li><i class="fas fa-arrow-right text-red-600 mr-2"></i>Unexplained weakness and fatigue</li>
            <li><i class="fas fa-arrow-right text-red-600 mr-2"></i>Unintentional weight loss</li>
          </ul>
        </div>

        <h2>Effective Prevention Methods</h2>
        
        <h3>1. Early Regular Screening</h3>
        <p>Regular screening is the most important means of prevention and early detection. It's recommended to start screening from age 40 for people with average risk, or earlier for those with risk factors.</p>
        
        <div class="grid md:grid-cols-2 gap-6 my-8">
          <div class="screening-card bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <i class="fas fa-microscope text-2xl text-blue-600"></i>
              </div>
              <h4 class="text-lg font-bold ml-3">Colonoscopy</h4>
            </div>
            <p class="text-gray-700">The most comprehensive and accurate screening. Done every 10 years for people with average risk.</p>
          </div>
          
          <div class="screening-card bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <i class="fas fa-vial text-2xl text-green-600"></i>
              </div>
              <h4 class="text-lg font-bold ml-3">Occult Blood Test</h4>
            </div>
            <p class="text-gray-700">Simple test done annually to detect invisible blood in stool.</p>
          </div>
        </div>

        <h2>Conclusion and Golden Tips</h2>
        <div class="summary-box bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl my-8">
          <h3 class="text-2xl font-bold text-blue-900 mb-6 text-center">
            <i class="fas fa-star text-yellow-500 mr-2"></i>
            What to Remember
          </h3>
          <ol class="space-y-4 text-blue-900">
            <li class="flex items-start">
              <span class="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 mt-1 font-bold">1</span>
              <span><strong>Early Screening Saves Lives:</strong> Start regular screening from age 40</span>
            </li>
            <li class="flex items-start">
              <span class="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 mt-1 font-bold">2</span>
              <span><strong>Diet Matters:</strong> More fiber and vegetables, less red meat</span>
            </li>
            <li class="flex items-start">
              <span class="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 mt-1 font-bold">3</span>
              <span><strong>Exercise Regularly:</strong> 30 minutes daily makes a big difference</span>
            </li>
          </ol>
        </div>
      </div>
    `
  }
};

/**
 * GET /articles/:slug
 * Single article page with full content
 */
articleSinglePage.get('/:slug', (c) => {
  const lang = c.get('lang');
  const slug = c.req.param('slug');
  
  const article = articlesData[slug as keyof typeof articlesData];
  
  if (!article) {
    return c.html(`
      <html>
        <body>
          <h1>Article not found</h1>
          <a href="/articles">Back to articles</a>
        </body>
      </html>
    `, 404);
  }
  
  const content = lang === 'ar' ? article.content_ar : article.content_en;
  const title = lang === 'ar' ? article.title_ar : article.title_en;
  
  return c.html(`
<!DOCTYPE html>
<html lang="${lang}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Dr. Mohammed Saeed</title>
    <meta name="description" content="${title}">
    <meta name="author" content="${article.author}">
    
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <style>
        * { font-family: 'IBM Plex Sans Arabic', 'Inter', sans-serif; }
        
        .article-content h2 {
            font-size: 1.875rem;
            font-weight: 700;
            color: #1e40af;
            margin-top: 2.5rem;
            margin-bottom: 1.5rem;
            padding-bottom: 0.75rem;
            border-bottom: 3px solid #3b82f6;
        }
        
        .article-content h3 {
            font-size: 1.5rem;
            font-weight: 600;
            color: #1e3a8a;
            margin-top: 2rem;
            margin-bottom: 1rem;
        }
        
        .article-content p {
            font-size: 1.125rem;
            line-height: 1.8;
            color: #374151;
            margin-bottom: 1.5rem;
        }
        
        .article-content ul {
            list-style: none;
            padding: 0;
        }
        
        .article-content li {
            font-size: 1.1rem;
            line-height: 1.8;
            color: #4b5563;
            margin-bottom: 0.75rem;
        }
        
        .article-content strong {
            color: #1f2937;
            font-weight: 600;
        }
        
        .share-btn {
            transition: all 0.3s ease;
        }
        
        .share-btn:hover {
            transform: translateY(-3px);
        }
        
        .article-content .info-box,
        .article-content .warning-box,
        .article-content .summary-box {
            transition: all 0.3s ease;
        }
        
        .article-content .info-box:hover,
        .article-content .warning-box:hover {
            transform: translateX(${lang === 'ar' ? '5px' : '-5px'});
        }
        
        @media print {
            nav, footer, .share-section, .related-articles {
                display: none;
            }
        }
    </style>
</head>
<body class="bg-gray-50">
    ${getNavigation(lang, '/articles')}

    <!-- Article Hero -->
    <article class="bg-white">
        <!-- Hero Image -->
        <div class="relative h-96 md:h-[500px] overflow-hidden">
            <img 
                src="${article.image}" 
                alt="${title}"
                class="w-full h-full object-cover"
                onerror="this.src='https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&h=900&fit=crop'"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            
            <!-- Title Overlay -->
            <div class="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <div class="container mx-auto max-w-4xl">
                    <span class="inline-block px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold mb-4">
                        ${lang === 'ar' ? article.category_ar : article.category_en}
                    </span>
                    <h1 class="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                        ${title}
                    </h1>
                </div>
            </div>
        </div>

        <!-- Article Meta -->
        <div class="border-b border-gray-200 bg-white">
            <div class="container mx-auto px-6 py-6 max-w-4xl">
                <div class="flex flex-wrap items-center justify-between gap-4">
                    <div class="flex items-center gap-6">
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <i class="fas fa-user-md text-xl text-blue-600"></i>
                            </div>
                            <div>
                                <div class="text-sm text-gray-500">${lang === 'ar' ? 'بواسطة' : 'By'}</div>
                                <div class="font-semibold text-gray-900">${article.author}</div>
                            </div>
                        </div>
                        
                        <div class="flex items-center gap-2 text-gray-600">
                            <i class="far fa-calendar"></i>
                            <span>${new Date(article.date).toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        
                        <div class="flex items-center gap-2 text-gray-600">
                            <i class="far fa-clock"></i>
                            <span>${article.readTime} ${lang === 'ar' ? 'دقائق' : 'min'}</span>
                        </div>
                    </div>
                    
                    <!-- Share Buttons -->
                    <div class="flex gap-3">
                        <button onclick="window.print()" class="share-btn w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-700" title="${lang === 'ar' ? 'طباعة' : 'Print'}">
                            <i class="fas fa-print"></i>
                        </button>
                        <a href="#" onclick="window.open('https://wa.me/?text=' + encodeURIComponent('${title.replace(/'/g, "\\'")}'  + ' - ' + window.location.href)); return false;" class="share-btn w-10 h-10 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white" title="WhatsApp">
                            <i class="fab fa-whatsapp"></i>
                        </a>
                        <a href="#" onclick="window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent('${title.replace(/'/g, "\\'")}'  ) + '&url=' + encodeURIComponent(window.location.href)); return false;" class="share-btn w-10 h-10 bg-blue-400 hover:bg-blue-500 rounded-full flex items-center justify-center text-white" title="Twitter">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="#" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href)); return false;" class="share-btn w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white" title="Facebook">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Article Content -->
        <div class="container mx-auto px-6 py-12 max-w-4xl">
            ${content}
        </div>

        <!-- Author Bio -->
        <div class="container mx-auto px-6 pb-12 max-w-4xl">
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
                <div class="flex items-start gap-6">
                    <div class="flex-shrink-0">
                        <img src="/doctor-mohammed-saeed.jpg" alt="Dr. Mohammed Saeed" class="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg" onerror="this.src='https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop'">
                    </div>
                    <div>
                        <h3 class="text-2xl font-bold text-blue-900 mb-2">${article.author}</h3>
                        <p class="text-blue-800 mb-4">
                            ${lang === 'ar' 
                                ? 'استشاري جراحة القولون والمستقيم - الجراحة الروبوتية المتقدمة. خبرة تزيد عن 15 عاماً في جراحات القولون والمستقيم المتقدمة.' 
                                : 'Consultant Colorectal Surgeon - Advanced Robotic Surgery. Over 15 years of experience in advanced colorectal surgeries.'}
                        </p>
                        <a href="/booking" class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors">
                            ${lang === 'ar' ? 'احجز موعدك الآن' : 'Book Your Appointment'}
                            <i class="fas fa-arrow-${lang === 'ar' ? 'left' : 'right'}"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Related Articles -->
        <div class="container mx-auto px-6 pb-16 max-w-6xl related-articles">
            <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">
                ${lang === 'ar' ? 'مقالات ذات صلة' : 'Related Articles'}
            </h2>
            <div class="grid md:grid-cols-3 gap-6">
                <a href="/articles/hemorrhoids-treatment" class="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                    <div class="h-48 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop" alt="Hemorrhoids" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                    </div>
                    <div class="p-6">
                        <h3 class="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            ${lang === 'ar' ? 'علاج البواسير: الخيارات الحديثة' : 'Hemorrhoids Treatment: Modern Options'}
                        </h3>
                        <p class="text-gray-600 text-sm">${lang === 'ar' ? '6 دقائق قراءة' : '6 min read'}</p>
                    </div>
                </a>
                
                <a href="/articles/ibs-management" class="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                    <div class="h-48 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&h=400&fit=crop" alt="IBS" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                    </div>
                    <div class="p-6">
                        <h3 class="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            ${lang === 'ar' ? 'التعايش مع القولون العصبي' : 'Living with IBS'}
                        </h3>
                        <p class="text-gray-600 text-sm">${lang === 'ar' ? '7 دقائق قراءة' : '7 min read'}</p>
                    </div>
                </a>
                
                <a href="/articles" class="group bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all flex items-center justify-center p-8 text-white text-center">
                    <div>
                        <i class="fas fa-newspaper text-5xl mb-4 opacity-75"></i>
                        <h3 class="text-xl font-bold mb-2">${lang === 'ar' ? 'عرض جميع المقالات' : 'View All Articles'}</h3>
                        <p class="text-blue-100">${lang === 'ar' ? 'اكتشف المزيد من المقالات الطبية' : 'Discover more medical articles'}</p>
                    </div>
                </a>
            </div>
        </div>
    </article>

    ${getFooter(lang)}
</body>
</html>
  `);
});

export default articleSinglePage;
