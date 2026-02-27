import { Hono } from 'hono';
import type { AppContext } from '../types';
import { getNavigation } from '../components/navigation';
import { getFooter } from '../components/footer';

const articlesPage = new Hono<AppContext>();

// Sample articles data (in production, this would come from D1 database)
const articles = [
  {
    id: 1,
    slug: 'colon-cancer-prevention',
    title_ar: 'الوقاية من سرطان القولون: دليلك الشامل للحماية والكشف المبكر',
    title_en: 'Colon Cancer Prevention: Your Complete Guide to Protection and Early Detection',
    excerpt_ar: 'سرطان القولون من أكثر أنواع السرطانات شيوعاً، لكن الخبر السار أنه يمكن الوقاية منه والكشف عنه مبكراً. تعرف على أهم طرق الوقاية والأعراض التحذيرية.',
    excerpt_en: 'Colon cancer is one of the most common cancers, but the good news is it can be prevented and detected early. Learn about the most important prevention methods and warning symptoms.',
    image: '/articles/colon-cancer.jpg',
    date: '2024-02-20',
    readTime: 8,
    category_ar: 'الأورام',
    category_en: 'Cancer',
    author: 'Dr. Mohammed Saeed'
  },
  {
    id: 2,
    slug: 'hemorrhoids-treatment',
    title_ar: 'علاج البواسير: الخيارات الحديثة وطرق الوقاية',
    title_en: 'Hemorrhoids Treatment: Modern Options and Prevention Methods',
    excerpt_ar: 'البواسير حالة شائعة تؤثر على الكثيرين. تعرف على أحدث طرق العلاج غير الجراحية والجراحية، وكيفية الوقاية منها.',
    excerpt_en: 'Hemorrhoids are a common condition affecting many people. Learn about the latest non-surgical and surgical treatment methods, and how to prevent them.',
    image: '/articles/hemorrhoids.jpg',
    date: '2024-02-15',
    readTime: 6,
    category_ar: 'أمراض الشرج',
    category_en: 'Anorectal Diseases',
    author: 'Dr. Mohammed Saeed'
  },
  {
    id: 3,
    slug: 'ibs-management',
    title_ar: 'التعايش مع القولون العصبي: نصائح عملية لحياة أفضل',
    title_en: 'Living with IBS: Practical Tips for a Better Life',
    excerpt_ar: 'القولون العصبي يؤثر على نوعية الحياة اليومية. اكتشف استراتيجيات فعالة لإدارة الأعراض وتحسين جودة حياتك.',
    excerpt_en: 'IBS affects daily quality of life. Discover effective strategies for managing symptoms and improving your quality of life.',
    image: '/articles/ibs.jpg',
    date: '2024-02-10',
    readTime: 7,
    category_ar: 'أمراض الجهاز الهضمي',
    category_en: 'Digestive Diseases',
    author: 'Dr. Mohammed Saeed'
  }
];

/**
 * GET /articles
 * Articles list page with all published articles
 */
articlesPage.get('/', (c) => {
  const lang = c.get('lang');
  
  return c.html(`
<!DOCTYPE html>
<html lang="${lang}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${lang === 'ar' ? 'المقالات الطبية' : 'Medical Articles'} - Dr. Mohammed Saeed</title>
    <meta name="description" content="${lang === 'ar' ? 'مقالات طبية متخصصة في جراحة القولون والمستقيم وأمراض الجهاز الهضمي من د. محمد سعيد' : 'Specialized medical articles on colorectal surgery and digestive diseases by Dr. Mohammed Saeed'}">
    
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <style>
        * { font-family: 'IBM Plex Sans Arabic', 'Inter', sans-serif; }
        .article-card {
            transition: all 0.3s ease;
        }
        .article-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
        }
        .article-image {
            position: relative;
            overflow: hidden;
        }
        .article-image img {
            transition: transform 0.5s ease;
        }
        .article-card:hover .article-image img {
            transform: scale(1.1);
        }
        .category-badge {
            backdrop-filter: blur(10px);
            background: rgba(255, 255, 255, 0.9);
        }
        .search-box {
            transition: all 0.3s ease;
        }
        .search-box:focus-within {
            transform: scale(1.02);
            box-shadow: 0 10px 25px rgba(59, 130, 246, 0.2);
        }
    </style>
</head>
<body class="bg-gray-50">
    ${getNavigation(lang, '/articles')}

    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-20 overflow-hidden">
        <div class="absolute inset-0 opacity-10">
            <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
        </div>
        
        <div class="container mx-auto px-6 relative z-10">
            <div class="max-w-4xl mx-auto text-center">
                <div class="inline-flex items-center justify-center w-24 h-24 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
                    <i class="fas fa-newspaper text-5xl"></i>
                </div>
                <h1 class="text-4xl md:text-5xl font-bold mb-4">
                    ${lang === 'ar' ? 'المقالات الطبية' : 'Medical Articles'}
                </h1>
                <p class="text-xl text-blue-100 mb-8">
                    ${lang === 'ar' 
                        ? 'معلومات طبية موثوقة ومقالات متخصصة في جراحة القولون والمستقيم' 
                        : 'Reliable medical information and specialized articles on colorectal surgery'}
                </p>
                
                <!-- Search Box -->
                <div class="max-w-2xl mx-auto">
                    <div class="search-box relative">
                        <input 
                            type="text" 
                            placeholder="${lang === 'ar' ? 'ابحث في المقالات...' : 'Search articles...'}"
                            class="w-full px-6 py-4 pr-12 rounded-full text-gray-800 text-lg focus:outline-none"
                            id="searchInput"
                        >
                        <button class="absolute ${lang === 'ar' ? 'left-2' : 'right-2'} top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Categories Filter -->
    <section class="py-8 bg-white border-b border-gray-200">
        <div class="container mx-auto px-6">
            <div class="flex flex-wrap justify-center gap-3">
                <button class="category-filter-btn px-6 py-2 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors" data-category="all">
                    ${lang === 'ar' ? 'جميع المقالات' : 'All Articles'}
                </button>
                <button class="category-filter-btn px-6 py-2 rounded-full bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-colors" data-category="cancer">
                    ${lang === 'ar' ? 'الأورام' : 'Cancer'}
                </button>
                <button class="category-filter-btn px-6 py-2 rounded-full bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-colors" data-category="anorectal">
                    ${lang === 'ar' ? 'أمراض الشرج' : 'Anorectal Diseases'}
                </button>
                <button class="category-filter-btn px-6 py-2 rounded-full bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-colors" data-category="digestive">
                    ${lang === 'ar' ? 'الجهاز الهضمي' : 'Digestive System'}
                </button>
            </div>
        </div>
    </section>

    <!-- Articles Grid -->
    <section class="py-16">
        <div class="container mx-auto px-6">
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8" id="articlesGrid">
                ${articles.map(article => `
                    <article class="article-card bg-white rounded-2xl overflow-hidden shadow-lg" data-category="${article.category_en.toLowerCase().replace(' ', '-')}">
                        <!-- Article Image -->
                        <a href="/articles/${article.slug}" class="article-image block relative h-56">
                            <img 
                                src="${article.image}" 
                                alt="${lang === 'ar' ? article.title_ar : article.title_en}"
                                class="w-full h-full object-cover"
                                onerror="this.src='https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop'"
                            >
                            <div class="absolute top-4 ${lang === 'ar' ? 'right-4' : 'left-4'}">
                                <span class="category-badge px-4 py-2 rounded-full text-sm font-semibold text-blue-600">
                                    ${lang === 'ar' ? article.category_ar : article.category_en}
                                </span>
                            </div>
                        </a>

                        <!-- Article Content -->
                        <div class="p-6">
                            <!-- Meta Info -->
                            <div class="flex items-center justify-between text-sm text-gray-500 mb-3">
                                <div class="flex items-center gap-2">
                                    <i class="far fa-calendar"></i>
                                    <span>${new Date(article.date).toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <i class="far fa-clock"></i>
                                    <span>${article.readTime} ${lang === 'ar' ? 'دقائق' : 'min'}</span>
                                </div>
                            </div>

                            <!-- Title -->
                            <h3 class="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                                <a href="/articles/${article.slug}">
                                    ${lang === 'ar' ? article.title_ar : article.title_en}
                                </a>
                            </h3>

                            <!-- Excerpt -->
                            <p class="text-gray-600 mb-4 line-clamp-3">
                                ${lang === 'ar' ? article.excerpt_ar : article.excerpt_en}
                            </p>

                            <!-- Read More Button -->
                            <a href="/articles/${article.slug}" class="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors group">
                                ${lang === 'ar' ? 'اقرأ المزيد' : 'Read More'}
                                <i class="fas fa-arrow-${lang === 'ar' ? 'left' : 'right'} group-hover:translate-x-1 transition-transform"></i>
                            </a>
                        </div>
                    </article>
                `).join('')}
            </div>

            <!-- No Results Message -->
            <div id="noResults" class="hidden text-center py-20">
                <div class="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
                    <i class="fas fa-search text-4xl text-gray-400"></i>
                </div>
                <h3 class="text-2xl font-bold text-gray-800 mb-2">
                    ${lang === 'ar' ? 'لم يتم العثور على نتائج' : 'No Results Found'}
                </h3>
                <p class="text-gray-600">
                    ${lang === 'ar' ? 'جرب البحث بكلمات مختلفة' : 'Try searching with different keywords'}
                </p>
            </div>
        </div>
    </section>

    <!-- Newsletter Section -->
    <section class="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div class="container mx-auto px-6">
            <div class="max-w-3xl mx-auto text-center">
                <div class="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
                    <i class="fas fa-envelope text-3xl"></i>
                </div>
                <h2 class="text-3xl md:text-4xl font-bold mb-4">
                    ${lang === 'ar' ? 'اشترك في نشرتنا الطبية' : 'Subscribe to Our Medical Newsletter'}
                </h2>
                <p class="text-xl text-blue-100 mb-8">
                    ${lang === 'ar' 
                        ? 'احصل على أحدث المقالات والنصائح الطبية مباشرة في بريدك الإلكتروني' 
                        : 'Get the latest articles and medical tips directly in your email'}
                </p>
                <form class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input 
                        type="email" 
                        placeholder="${lang === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}"
                        class="flex-1 px-6 py-3 rounded-full text-gray-800 focus:outline-none"
                        required
                    >
                    <button type="submit" class="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-colors whitespace-nowrap">
                        ${lang === 'ar' ? 'اشترك الآن' : 'Subscribe Now'}
                    </button>
                </form>
            </div>
        </div>
    </section>

    ${getFooter(lang)}

    <!-- Search & Filter JavaScript -->
    <script>
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const articlesGrid = document.getElementById('articlesGrid');
        const noResults = document.getElementById('noResults');
        const articles = articlesGrid.querySelectorAll('.article-card');

        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            let visibleCount = 0;

            articles.forEach(article => {
                const text = article.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    article.style.display = 'block';
                    visibleCount++;
                } else {
                    article.style.display = 'none';
                }
            });

            noResults.classList.toggle('hidden', visibleCount > 0);
        });

        // Category filter
        const filterButtons = document.querySelectorAll('.category-filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.dataset.category;
                
                // Update active button
                filterButtons.forEach(btn => {
                    btn.classList.remove('bg-blue-600', 'text-white');
                    btn.classList.add('bg-gray-200', 'text-gray-700');
                });
                button.classList.remove('bg-gray-200', 'text-gray-700');
                button.classList.add('bg-blue-600', 'text-white');
                
                // Filter articles
                let visibleCount = 0;
                articles.forEach(article => {
                    if (category === 'all' || article.dataset.category === category) {
                        article.style.display = 'block';
                        visibleCount++;
                    } else {
                        article.style.display = 'none';
                    }
                });

                noResults.classList.toggle('hidden', visibleCount > 0);
                searchInput.value = '';
            });
        });
    </script>
</body>
</html>
  `);
});

export default articlesPage;
