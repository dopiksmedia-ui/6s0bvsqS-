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
    <title>${lang === 'ar' ? 'د. محمد سعيد بن علي - استشاري جراحة القولون والمستقيم' : 'Dr. Mohammed Saeed bin Ali - Consultant Colorectal Surgeon'}</title>
    <meta name="description" content="${lang === 'ar' ? 'د. محمد سعيد بن علي - استشاري جراحة القولون والمستقيم مع خبرة بريطانية متميزة' : 'Dr. Mohammed Saeed bin Ali - Consultant Colorectal Surgeon with distinguished British experience'}">
    
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <style>
        * { font-family: 'IBM Plex Sans Arabic', 'Inter', sans-serif; }
        
        .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        
        /* Smooth modal animation */
        #video-modal {
            animation: fadeIn 0.3s ease-in-out;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        
        /* YouTube play button pulse effect */
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
        }
        
        .animate-pulse-slow {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
    </style>
</head>
<body class="bg-gray-50">
    ${getNavigation(lang, '/')}

    <!-- Hero Section with Doctor Image -->
    <section class="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white overflow-hidden">
        <!-- Background Pattern -->
        <div class="absolute inset-0 opacity-10">
            <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.4\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
        </div>
        
        <div class="container mx-auto px-6 py-20 relative z-10">
            <div class="grid lg:grid-cols-2 gap-12 items-center">
                <!-- Text Content -->
                <div class="${lang === 'ar' ? 'lg:order-2' : 'lg:order-1'} text-center lg:text-${lang === 'ar' ? 'right' : 'left'}">
                    <!-- Badge -->
                    <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
                        <i class="fas fa-certificate text-yellow-300"></i>
                        <span class="text-sm font-medium">
                            ${lang === 'ar' ? 'زمالات بريطانية معتمدة' : 'Certified UK Fellowships'}
                        </span>
                    </div>
                    
                    <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                        ${lang === 'ar' ? 'د. محمد سعيد بن علي' : 'Dr. Mohammed Saeed bin Ali'}
                    </h1>
                    
                    <div class="h-1 w-24 bg-gradient-to-r from-blue-400 to-teal-400 mb-6 ${lang === 'ar' ? 'mr-auto lg:mr-0' : 'ml-auto lg:ml-0'} mx-auto lg:mx-0"></div>
                    
                    <p class="text-xl md:text-2xl mb-6 text-blue-100 font-light">
                        ${lang === 'ar' 
                            ? 'استشاري جراحة القولون والمستقيم' 
                            : 'Consultant Colorectal Surgeon'}
                    </p>
                    
                    <p class="text-lg mb-8 text-blue-200 max-w-xl mx-auto lg:mx-0">
                        ${lang === 'ar'
                            ? 'خبرة بريطانية متميزة في علاج أمراض القولون والمستقيم بأحدث التقنيات'
                            : 'Distinguished British experience in treating colorectal diseases with the latest techniques'}
                    </p>
                    
                    <!-- Call to Action Buttons -->
                    <div class="flex gap-4 justify-center lg:justify-start flex-wrap">
                        <a href="/booking?lang=${lang}" class="group bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105 inline-flex items-center gap-2">
                            <i class="fas fa-calendar-check group-hover:scale-110 transition-transform"></i>
                            ${lang === 'ar' ? 'احجز موعدك الآن' : 'Book Appointment'}
                        </a>
                        <a href="https://wa.me/966569925966" target="_blank" class="group bg-green-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-600 transition-all shadow-xl hover:shadow-2xl hover:scale-105 inline-flex items-center gap-2">
                            <i class="fab fa-whatsapp text-2xl group-hover:scale-110 transition-transform"></i>
                            ${lang === 'ar' ? 'تواصل واتساب' : 'WhatsApp'}
                        </a>
                    </div>
                </div>
                
                <!-- Doctor Image -->
                <div class="${lang === 'ar' ? 'lg:order-1' : 'lg:order-2'} relative">
                    <div class="relative max-w-lg mx-auto">
                        <!-- Decorative Elements -->
                        <div class="absolute -top-6 -${lang === 'ar' ? 'right' : 'left'}-6 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
                        <div class="absolute -bottom-6 -${lang === 'ar' ? 'left' : 'right'}-6 w-72 h-72 bg-teal-400/20 rounded-full blur-3xl"></div>
                        
                        <!-- Main Image Container -->
                        <div class="relative z-10">
                            <!-- Floating Badge -->
                            <div class="absolute -top-4 ${lang === 'ar' ? '-left-4' : '-right-4'} z-20 bg-gradient-to-br from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-2xl shadow-2xl transform rotate-3 animate-pulse-slow">
                                <div class="text-sm font-bold">${lang === 'ar' ? 'خبرة بريطانية' : 'UK Experience'}</div>
                                <div class="text-xs opacity-90">${lang === 'ar' ? 'معتمدة' : 'Certified'}</div>
                            </div>
                            
                            <!-- Image Frame -->
                            <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-2 border-2 border-white/20 shadow-2xl">
                                <img 
                                    src="/api/media/doctor-profile.jpg" 
                                    alt="${lang === 'ar' ? 'د. محمد سعيد بن علي' : 'Dr. Mohammed Saeed bin Ali'}" 
                                    class="w-full h-auto rounded-2xl shadow-2xl"
                                    onerror="this.src='https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=800&fit=crop&q=80'"
                                >
                                
                                <!-- Trust Badge -->
                                <div class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white text-blue-600 px-8 py-4 rounded-2xl shadow-2xl">
                                    <div class="flex items-center gap-3">
                                        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                            <i class="fas fa-shield-alt text-2xl text-blue-600"></i>
                                        </div>
                                        <div class="text-${lang === 'ar' ? 'right' : 'left'}">
                                            <div class="text-sm font-bold text-gray-800">${lang === 'ar' ? 'رعاية موثوقة' : 'Trusted Care'}</div>
                                            <div class="text-xs text-gray-600">${lang === 'ar' ? 'تجربة متميزة' : 'Excellence'}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Scroll Down Indicator -->
            <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                <a href="#about" class="text-white/80 hover:text-white transition-colors group">
                    <div class="text-sm mb-2">${lang === 'ar' ? 'اكتشف المزيد' : 'Discover More'}</div>
                    <i class="fas fa-chevron-down text-2xl animate-bounce group-hover:text-blue-200"></i>
                </a>
            </div>
        </div>
    </section>
    
    <!-- Trust Statistics Bar -->
    <section class="py-16 bg-white">
        <div class="container mx-auto px-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
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
                        ? 'د. محمد سعيد بن علي - استشاري متخصص في جراحة القولون والمستقيم مع خبرة بريطانية متميزة. حاصل على زمالات من أبرز المستشفيات في المملكة المتحدة، ويجمع بين الخبرة الأكاديمية والمهارات السريرية المتقدمة في علاج أمراض القولون والمستقيم.'
                        : 'Dr. Mohammed Saeed bin Ali - A specialized consultant in colorectal surgery with distinguished British experience. Holds fellowships from the most prominent hospitals in the United Kingdom, combining academic expertise with advanced clinical skills in treating colorectal diseases.'}
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

    <!-- Media Appearances Section -->
    <section class="py-20 bg-white">
        <div class="container mx-auto px-6">
            <div class="text-center mb-12">
                <h2 class="text-4xl font-bold text-gray-800 mb-4">
                    <i class="fas fa-video text-red-600 mr-3"></i>
                    ${lang === 'ar' ? 'الظهور الإعلامي' : 'Media Appearances'}
                </h2>
                <p class="text-xl text-gray-600">
                    ${lang === 'ar' 
                        ? 'أحدث الفيديوهات والمقابلات الطبية للدكتور محمد سعيد' 
                        : 'Latest Videos and Medical Interviews by Dr. Mohammed Saeed'}
                </p>
            </div>

            <!-- Videos Grid -->
            <div id="videos-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <!-- Videos will be loaded here -->
                <div class="col-span-full text-center py-12">
                    <i class="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
                    <p class="text-gray-600">${lang === 'ar' ? 'جاري تحميل الفيديوهات...' : 'Loading videos...'}</p>
                </div>
            </div>

            <!-- Load More Button -->
            <div class="text-center">
                <button id="load-more-btn" class="hidden bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition inline-flex items-center gap-2">
                    <i class="fas fa-plus-circle"></i>
                    ${lang === 'ar' ? 'عرض المزيد' : 'Load More'}
                </button>
            </div>

            <!-- YouTube Channel Link -->
            <div class="text-center mt-8">
                <a href="https://youtube.com/@dr.mohammedsaeedali?si=w8Tobr16n2UV6c02" target="_blank" rel="noopener noreferrer" 
                   class="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold text-lg">
                    <i class="fab fa-youtube text-2xl"></i>
                    ${lang === 'ar' ? 'زيارة قناة اليوتيوب' : 'Visit YouTube Channel'}
                    <i class="fas fa-external-link-alt text-sm"></i>
                </a>
            </div>
        </div>
    </section>

    <!-- Video Modal -->
    <div id="video-modal" class="hidden fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4" onclick="closeVideoModal(event)">
        <div class="relative w-full max-w-6xl bg-gray-900 rounded-lg overflow-hidden" onclick="event.stopPropagation()">
            <button onclick="closeVideoModal()" class="absolute top-4 ${lang === 'ar' ? 'left-4' : 'right-4'} z-10 bg-red-600 text-white w-10 h-10 rounded-full hover:bg-red-700 transition flex items-center justify-center">
                <i class="fas fa-times"></i>
            </button>
            <div class="relative pt-[56.25%]">
                <iframe id="video-iframe" class="absolute inset-0 w-full h-full" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div id="video-info" class="p-6 text-white">
                <h3 id="video-title" class="text-2xl font-bold mb-2"></h3>
                <p id="video-description" class="text-gray-300"></p>
            </div>
        </div>
    </div>

    <script>
        // YouTube Channel configuration
        const CHANNEL_HANDLE = '@Dr.MohammedSaeedAli';
        const VIDEOS_PER_PAGE = 4;
        let currentPage = 0;
        let allVideos = [];

        // Fetch videos from API
        async function fetchVideos() {
            try {
                const response = await fetch('/api/youtube/videos');
                const data = await response.json();
                
                if (data.success && data.videos && data.videos.length > 0) {
                    allVideos = data.videos;
                    console.log('Loaded', allVideos.length, 'videos from', data.source);
                } else {
                    console.warn('No videos found, using fallback');
                    allVideos = getFallbackVideos();
                }
            } catch (error) {
                console.error('Error fetching videos:', error);
                allVideos = getFallbackVideos();
            }
            
            // Load first page
            loadVideos();
        }

        // Fallback videos (in case API fails)
        function getFallbackVideos() {
            return [
                {
                    id: 'dQw4w9WgXcQ',
                    title: '${lang === 'ar' ? 'نصائح للوقاية من سرطان القولون' : 'Tips for Colon Cancer Prevention'}',
                    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
                    description: '${lang === 'ar' ? 'فيديو توعوي حول أهمية الكشف المبكر' : 'Educational video about early detection importance'}'
                },
                {
                    id: 'dQw4w9WgXcQ',
                    title: '${lang === 'ar' ? 'الجراحة الروبوتية في علاج القولون' : 'Robotic Surgery in Colorectal Treatment'}',
                    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
                    description: '${lang === 'ar' ? 'شرح تقنيات الجراحة الحديثة' : 'Explanation of modern surgical techniques'}'
                },
                {
                    id: 'dQw4w9WgXcQ',
                    title: '${lang === 'ar' ? 'أسئلة شائعة حول أمراض القولون' : 'Common Questions About Colorectal Diseases'}',
                    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
                    description: '${lang === 'ar' ? 'إجابات عن أكثر الأسئلة شيوعاً' : 'Answers to most common questions'}'
                },
                {
                    id: 'dQw4w9WgXcQ',
                    title: '${lang === 'ar' ? 'نمط حياة صحي للوقاية من البواسير' : 'Healthy Lifestyle for Hemorrhoid Prevention'}',
                    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
                    description: '${lang === 'ar' ? 'نصائح عملية للحياة اليومية' : 'Practical tips for daily life'}'
                },
                {
                    id: 'dQw4w9WgXcQ',
                    title: '${lang === 'ar' ? 'متى يجب زيارة الطبيب؟' : 'When Should You Visit a Doctor?'}',
                    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
                    description: '${lang === 'ar' ? 'علامات تستوجب الفحص الطبي' : 'Signs requiring medical examination'}'
                },
                {
                    id: 'dQw4w9WgXcQ',
                    title: '${lang === 'ar' ? 'التغذية السليمة لصحة القولون' : 'Proper Nutrition for Colon Health'}',
                    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
                    description: '${lang === 'ar' ? 'أطعمة مفيدة وأخرى يجب تجنبها' : 'Beneficial foods and what to avoid'}'
                },
                {
                    id: 'dQw4w9WgXcQ',
                    title: '${lang === 'ar' ? 'منظار القولون: ماذا تتوقع؟' : 'Colonoscopy: What to Expect?'}',
                    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
                    description: '${lang === 'ar' ? 'دليل شامل للتحضير والإجراء' : 'Comprehensive guide for preparation and procedure'}'
                },
                {
                    id: 'dQw4w9WgXcQ',
                    title: '${lang === 'ar' ? 'قصص نجاح المرضى' : 'Patient Success Stories'}',
                    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
                    description: '${lang === 'ar' ? 'تجارب إيجابية للشفاء' : 'Positive recovery experiences'}'
                }
            ];
        }

        function loadVideos() {
            const start = currentPage * VIDEOS_PER_PAGE;
            const end = start + VIDEOS_PER_PAGE;
            const videosToShow = allVideos.slice(start, end);

            if (videosToShow.length === 0) return;

            const container = document.getElementById('videos-container');
            
            // Clear loading message on first load
            if (currentPage === 0) {
                container.innerHTML = '';
            }

            videosToShow.forEach(video => {
                const videoCard = createVideoCard(video);
                container.innerHTML += videoCard;
            });

            currentPage++;

            // Show/hide load more button
            const loadMoreBtn = document.getElementById('load-more-btn');
            if (end >= allVideos.length) {
                loadMoreBtn.classList.add('hidden');
            } else {
                loadMoreBtn.classList.remove('hidden');
            }
        }

        function createVideoCard(video) {
            return \`
                <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105" 
                     onclick="openVideo('\${video.id}', '\${video.title.replace(/'/g, "\\'")}', '\${video.description.replace(/'/g, "\\'")}')">
                    <div class="relative group">
                        <img src="\${video.thumbnail}" alt="\${video.title}" class="w-full h-48 object-cover">
                        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                            <div class="bg-red-600 text-white w-16 h-16 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                                <i class="fas fa-play text-2xl ${lang === 'ar' ? 'mr-1' : 'ml-1'}"></i>
                            </div>
                        </div>
                        <div class="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                            <i class="fab fa-youtube text-red-500 mr-1"></i>
                            YouTube
                        </div>
                    </div>
                    <div class="p-4">
                        <h3 class="font-bold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition">
                            \${video.title}
                        </h3>
                        <p class="text-gray-600 text-sm line-clamp-2">
                            \${video.description}
                        </p>
                        <div class="mt-3 flex items-center text-gray-500 text-sm">
                            <i class="fas fa-user-md mr-2"></i>
                            <span>${lang === 'ar' ? 'د. محمد سعيد' : 'Dr. Mohammed Saeed'}</span>
                        </div>
                    </div>
                </div>
            \`;
        }

        function openVideo(videoId, title, description) {
            const modal = document.getElementById('video-modal');
            const iframe = document.getElementById('video-iframe');
            const titleEl = document.getElementById('video-title');
            const descEl = document.getElementById('video-description');

            iframe.src = \`https://www.youtube.com/embed/\${videoId}?autoplay=1\`;
            titleEl.textContent = title;
            descEl.textContent = description;

            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }

        function closeVideoModal(event) {
            if (event && event.target !== event.currentTarget) return;
            
            const modal = document.getElementById('video-modal');
            const iframe = document.getElementById('video-iframe');

            iframe.src = '';
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }

        // Load more button handler
        document.getElementById('load-more-btn').addEventListener('click', loadVideos);

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeVideoModal();
            }
        });

        // Fetch videos on page load
        fetchVideos();
    </script>

    <!-- Latest Articles Section -->
    <section class="py-20 bg-gray-50">
        <div class="container mx-auto px-6">
            <div class="text-center mb-12">
                <h2 class="text-4xl font-bold text-gray-800 mb-4">
                    <i class="fas fa-newspaper text-blue-600 ${lang === 'ar' ? 'ml-3' : 'mr-3'}"></i>
                    ${lang === 'ar' ? 'أحدث المقالات' : 'Latest Articles'}
                </h2>
                <p class="text-xl text-gray-600">
                    ${lang === 'ar' 
                        ? 'مقالات طبية متخصصة في جراحة القولون والمستقيم' 
                        : 'Specialized medical articles in colorectal surgery'}
                </p>
            </div>

            <!-- Articles Grid -->
            <div id="articles-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <!-- Articles will be loaded here -->
                <div class="col-span-full text-center py-12">
                    <i class="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
                    <p class="text-gray-600">${lang === 'ar' ? 'جاري تحميل المقالات...' : 'Loading articles...'}</p>
                </div>
            </div>

            <!-- View All Articles Button -->
            <div class="text-center">
                <a href="/articles?lang=${lang}" class="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition inline-flex items-center gap-2">
                    <i class="fas fa-book-open"></i>
                    ${lang === 'ar' ? 'المزيد من المقالات' : 'More Articles'}
                    <i class="fas fa-arrow-${lang === 'ar' ? 'left' : 'right'}"></i>
                </a>
            </div>
        </div>
    </section>

    <script>
        // Fetch and display latest articles
        async function fetchLatestArticles() {
            try {
                const response = await fetch('/api/articles?limit=4&lang=${lang}');
                const result = await response.json();
                
                const container = document.getElementById('articles-container');
                
                if (result.success && result.data && result.data.length > 0) {
                    container.innerHTML = result.data.map(article => createArticleCard(article)).join('');
                } else {
                    // Show empty state
                    container.innerHTML = \`
                        <div class="col-span-full text-center py-12">
                            <i class="fas fa-folder-open text-6xl text-gray-300 mb-4"></i>
                            <p class="text-gray-600 text-lg">\${${lang === 'ar' ? "'لا توجد مقالات متاحة حالياً'" : "'No articles available yet'"}}</p>
                        </div>
                    \`;
                }
            } catch (error) {
                console.error('Error fetching articles:', error);
                document.getElementById('articles-container').innerHTML = \`
                    <div class="col-span-full text-center py-12">
                        <i class="fas fa-exclamation-circle text-6xl text-red-300 mb-4"></i>
                        <p class="text-gray-600">\${${lang === 'ar' ? "'حدث خطأ في تحميل المقالات'" : "'Error loading articles'"}}</p>
                    </div>
                \`;
            }
        }

        function createArticleCard(article) {
            // Get correct slug based on language
            const slug = ${lang === 'ar' ? 'article.slug_ar' : 'article.slug_en'} || article.slug_ar || article.slug_en;
            
            // Get excerpt or summary
            const excerpt = ${lang === 'ar' ? 'article.summary_ar' : 'article.summary_en'} || ${lang === 'ar' ? 'article.content_ar' : 'article.content_en'}?.substring(0, 120) + '...' || '';
            
            // Format publish date
            const publishDate = article.published_at ? new Date(article.published_at).toLocaleDateString('${lang === 'ar' ? 'ar-SA' : 'en-US'}', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }) : '';

            return \`
                <article class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <a href="/articles/\${slug}?lang=${lang}" class="block">
                        <div class="relative h-48 bg-gradient-to-br from-blue-100 to-blue-200 overflow-hidden">
                            \${article.featured_image 
                                ? \`<img src="\${article.featured_image}" alt="\${${lang === 'ar' ? 'article.title_ar' : 'article.title_en'}}" class="w-full h-full object-cover">\`
                                : \`<div class="w-full h-full flex items-center justify-center">
                                    <i class="fas fa-file-medical text-6xl text-blue-400"></i>
                                   </div>\`
                            }
                            <div class="absolute top-3 ${lang === 'ar' ? 'right-3' : 'left-3'}">
                                <span class="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                    \${(${lang === 'ar' ? 'article.category_ar' : 'article.category_en'}) || (${lang === 'ar' ? "'طب عام'" : "'General'"})}
                                </span>
                            </div>
                        </div>
                        <div class="p-5">
                            <h3 class="font-bold text-gray-800 text-lg mb-3 line-clamp-2 hover:text-blue-600 transition min-h-[56px]">
                                \${${lang === 'ar' ? 'article.title_ar' : 'article.title_en'}}
                            </h3>
                            <p class="text-gray-600 text-sm mb-4 line-clamp-3 min-h-[60px]">
                                \${excerpt}
                            </p>
                            <div class="flex items-center justify-between text-sm text-gray-500 pt-3 border-t border-gray-100">
                                <div class="flex items-center gap-2">
                                    <i class="fas fa-user-md text-blue-600"></i>
                                    <span>${lang === 'ar' ? 'د. محمد سعيد' : 'Dr. Mohammed Saeed'}</span>
                                </div>
                                \${publishDate ? \`
                                    <div class="flex items-center gap-2">
                                        <i class="fas fa-calendar-alt text-gray-400"></i>
                                        <span>\${publishDate}</span>
                                    </div>
                                \` : ''}
                            </div>
                        </div>
                    </a>
                </article>
            \`;
        }

        // Load articles on page load
        fetchLatestArticles();
    </script>

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
                <a href="https://wa.me/966569925966" class="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-600 transition inline-flex items-center gap-2">
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
