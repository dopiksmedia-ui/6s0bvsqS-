/**
 * Navigation Component
 * Reusable navigation bar for all pages
 */

export function getNavigation(lang: 'ar' | 'en' = 'ar', currentPath: string = '/'): string {
  const isRTL = lang === 'ar';
  
  return `
    <nav class="bg-white shadow-lg sticky top-0 z-50">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center py-4">
          <!-- Logo & Brand -->
          <div class="flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
              <i class="fas fa-stethoscope text-white text-xl"></i>
            </div>
            <div>
              <h1 class="text-xl font-bold text-gray-800">
                ${lang === 'ar' ? 'د. محمد سعيد بن علي' : 'Dr. Mohammed Saeed bin Ali'}
              </h1>
              <p class="text-xs text-gray-600">
                ${lang === 'ar' ? 'استشاري جراحة القولون والمستقيم' : 'Consultant Colorectal Surgeon'}
              </p>
            </div>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-6 ${isRTL ? 'space-x-reverse' : ''}">
            <a href="/?lang=${lang}" class="nav-link ${currentPath === '/' ? 'text-blue-600 font-semibold' : 'text-gray-700'} hover:text-blue-600 transition-colors">
              <i class="fas fa-home ml-2"></i>
              ${lang === 'ar' ? 'الرئيسية' : 'Home'}
            </a>
            <a href="/about?lang=${lang}" class="nav-link ${currentPath === '/about' ? 'text-blue-600 font-semibold' : 'text-gray-700'} hover:text-blue-600 transition-colors">
              <i class="fas fa-user-md ml-2"></i>
              ${lang === 'ar' ? 'عن الدكتور' : 'About Doctor'}
            </a>
            <a href="/articles?lang=${lang}" class="nav-link ${currentPath === '/articles' ? 'text-blue-600 font-semibold' : 'text-gray-700'} hover:text-blue-600 transition-colors">
              <i class="fas fa-newspaper ml-2"></i>
              ${lang === 'ar' ? 'المقالات' : 'Articles'}
            </a>
            <a href="/contact?lang=${lang}" class="nav-link ${currentPath === '/contact' ? 'text-blue-600 font-semibold' : 'text-gray-700'} hover:text-blue-600 transition-colors">
              <i class="fas fa-envelope ml-2"></i>
              ${lang === 'ar' ? 'التواصل' : 'Contact'}
            </a>
            
            <!-- Language Switcher -->
            <button onclick="toggleLanguage()" class="px-3 py-1 text-sm rounded-full border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-all">
              <i class="fas fa-globe ml-1"></i>
              ${lang === 'ar' ? 'EN' : 'عربي'}
            </button>
            
            <!-- Book Now Button -->
            <a href="/booking?lang=${lang}" class="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              <i class="fas fa-calendar-check ml-2"></i>
              ${lang === 'ar' ? 'احجز الآن' : 'Book Now'}
            </a>
          </div>

          <!-- Mobile Menu Button -->
          <button onclick="toggleMobileMenu()" class="md:hidden text-gray-700 text-2xl">
            <i id="mobile-menu-icon" class="fas fa-bars"></i>
          </button>
        </div>

        <!-- Mobile Navigation -->
        <div id="mobile-menu" class="hidden md:hidden pb-4 border-t border-gray-200 mt-2">
          <div class="flex flex-col space-y-3 pt-4">
            <a href="/?lang=${lang}" class="nav-link ${currentPath === '/' ? 'text-blue-600 font-semibold' : 'text-gray-700'} hover:text-blue-600 transition-colors py-2">
              <i class="fas fa-home ml-2"></i>
              ${lang === 'ar' ? 'الرئيسية' : 'Home'}
            </a>
            <a href="/about?lang=${lang}" class="nav-link ${currentPath === '/about' ? 'text-blue-600 font-semibold' : 'text-gray-700'} hover:text-blue-600 transition-colors py-2">
              <i class="fas fa-user-md ml-2"></i>
              ${lang === 'ar' ? 'عن الدكتور' : 'About Doctor'}
            </a>
            <a href="/articles?lang=${lang}" class="nav-link ${currentPath === '/articles' ? 'text-blue-600 font-semibold' : 'text-gray-700'} hover:text-blue-600 transition-colors py-2">
              <i class="fas fa-newspaper ml-2"></i>
              ${lang === 'ar' ? 'المقالات' : 'Articles'}
            </a>
            <a href="/contact?lang=${lang}" class="nav-link ${currentPath === '/contact' ? 'text-blue-600 font-semibold' : 'text-gray-700'} hover:text-blue-600 transition-colors py-2">
              <i class="fas fa-envelope ml-2"></i>
              ${lang === 'ar' ? 'التواصل' : 'Contact'}
            </a>
            <button onclick="toggleLanguage()" class="text-left px-3 py-2 text-sm rounded-lg border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-all">
              <i class="fas fa-globe ml-1"></i>
              ${lang === 'ar' ? 'English' : 'عربي'}
            </button>
            <a href="/booking?lang=${lang}" class="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-6 py-2.5 rounded-full font-semibold text-center hover:shadow-lg">
              <i class="fas fa-calendar-check ml-2"></i>
              ${lang === 'ar' ? 'احجز الآن' : 'Book Now'}
            </a>
          </div>
        </div>
      </div>
    </nav>

    <script>
      // Mobile Menu Toggle
      function toggleMobileMenu() {
        const menu = document.getElementById('mobile-menu');
        const icon = document.getElementById('mobile-menu-icon');
        if (menu.classList.contains('hidden')) {
          menu.classList.remove('hidden');
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          menu.classList.add('hidden');
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }

      // Language Toggle
      function toggleLanguage() {
        const currentLang = document.documentElement.lang || 'ar';
        const newLang = currentLang === 'ar' ? 'en' : 'ar';
        
        // Get current URL without any existing lang parameter
        const url = new URL(window.location.href);
        url.searchParams.delete('lang');
        url.searchParams.set('lang', newLang);
        
        // Reload with new language (will be saved to cookie)
        window.location.href = url.toString();
      }
    </script>
  `;
}
