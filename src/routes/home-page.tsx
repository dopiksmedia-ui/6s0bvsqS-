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
                <a href="https://wa.me/966569925966" class="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-600 transition inline-flex items-center gap-2">
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
