/**
 * Footer Component
 * Reusable footer for all pages
 */

export function getFooter(lang: 'ar' | 'en' = 'ar'): string {
  const isRTL = lang === 'ar';
  
  return `
    <footer class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 mt-16">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <!-- About Column -->
          <div>
            <div class="flex items-center space-x-3 mb-4 ${isRTL ? 'space-x-reverse' : ''}">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                <i class="fas fa-stethoscope text-white text-xl"></i>
              </div>
              <div>
                <h3 class="text-xl font-bold">
                  ${lang === 'ar' ? 'د. محمد سعيد' : 'Dr. Mohammed Saeed'}
                </h3>
                <p class="text-xs text-gray-400">
                  ${lang === 'ar' ? 'استشاري جراحة القولون والمستقيم' : 'Consultant Colorectal Surgeon'}
                </p>
              </div>
            </div>
            <p class="text-gray-400 text-sm leading-relaxed">
              ${lang === 'ar' 
                ? 'استشاري متخصص في جراحة القولون والمستقيم بخبرة بريطانية متميزة. نقدم أحدث التقنيات الجراحية مع رعاية طبية شاملة.'
                : 'A specialized consultant in colorectal surgery with distinguished British experience. We provide the latest surgical techniques with comprehensive medical care.'}
            </p>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="text-lg font-bold mb-4 text-blue-400">
              ${lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h3>
            <ul class="space-y-2">
              <li>
                <a href="/" class="text-gray-400 hover:text-white transition-colors flex items-center">
                  <i class="fas fa-chevron-${isRTL ? 'left' : 'right'} text-xs ml-2"></i>
                  ${lang === 'ar' ? 'الرئيسية' : 'Home'}
                </a>
              </li>
              <li>
                <a href="/about" class="text-gray-400 hover:text-white transition-colors flex items-center">
                  <i class="fas fa-chevron-${isRTL ? 'left' : 'right'} text-xs ml-2"></i>
                  ${lang === 'ar' ? 'عن الدكتور' : 'About Doctor'}
                </a>
              </li>
              <li>
                <a href="/services" class="text-gray-400 hover:text-white transition-colors flex items-center">
                  <i class="fas fa-chevron-${isRTL ? 'left' : 'right'} text-xs ml-2"></i>
                  ${lang === 'ar' ? 'الخدمات' : 'Services'}
                </a>
              </li>
              <li>
                <a href="/articles" class="text-gray-400 hover:text-white transition-colors flex items-center">
                  <i class="fas fa-chevron-${isRTL ? 'left' : 'right'} text-xs ml-2"></i>
                  ${lang === 'ar' ? 'المقالات' : 'Articles'}
                </a>
              </li>
              <li>
                <a href="/booking" class="text-gray-400 hover:text-white transition-colors flex items-center">
                  <i class="fas fa-chevron-${isRTL ? 'left' : 'right'} text-xs ml-2"></i>
                  ${lang === 'ar' ? 'احجز موعد' : 'Book Appointment'}
                </a>
              </li>
              <li>
                <a href="/contact" class="text-gray-400 hover:text-white transition-colors flex items-center">
                  <i class="fas fa-chevron-${isRTL ? 'left' : 'right'} text-xs ml-2"></i>
                  ${lang === 'ar' ? 'اتصل بنا' : 'Contact Us'}
                </a>
              </li>
            </ul>
          </div>

          <!-- Services -->
          <div>
            <h3 class="text-lg font-bold mb-4 text-blue-400">
              ${lang === 'ar' ? 'خدماتنا' : 'Our Services'}
            </h3>
            <ul class="space-y-2">
              <li class="text-gray-400 text-sm flex items-center">
                <i class="fas fa-check-circle text-teal-500 ml-2"></i>
                ${lang === 'ar' ? 'علاج أورام القولون والمستقيم' : 'Colorectal Cancer Treatment'}
              </li>
              <li class="text-gray-400 text-sm flex items-center">
                <i class="fas fa-check-circle text-teal-500 ml-2"></i>
                ${lang === 'ar' ? 'جراحات الروبوت' : 'Robotic Surgery'}
              </li>
              <li class="text-gray-400 text-sm flex items-center">
                <i class="fas fa-check-circle text-teal-500 ml-2"></i>
                ${lang === 'ar' ? 'جراحات المناظير المتقدمة' : 'Advanced Laparoscopic Surgery'}
              </li>
              <li class="text-gray-400 text-sm flex items-center">
                <i class="fas fa-check-circle text-teal-500 ml-2"></i>
                ${lang === 'ar' ? 'علاج البواسير والنواسير' : 'Hemorrhoids & Fistula Treatment'}
              </li>
              <li class="text-gray-400 text-sm flex items-center">
                <i class="fas fa-check-circle text-teal-500 ml-2"></i>
                ${lang === 'ar' ? 'حقن البوتكس للشرخ الشرجي' : 'Botox for Anal Fissure'}
              </li>
              <li class="text-gray-400 text-sm flex items-center">
                <i class="fas fa-check-circle text-teal-500 ml-2"></i>
                ${lang === 'ar' ? 'مناظير تشخيصية وعلاجية' : 'Diagnostic & Therapeutic Endoscopy'}
              </li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div>
            <h3 class="text-lg font-bold mb-4 text-blue-400">
              ${lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </h3>
            <ul class="space-y-3">
              <li class="flex items-start">
                <i class="fas fa-phone text-teal-500 ml-3 mt-1"></i>
                <div>
                  <p class="text-gray-400 text-sm">
                    ${lang === 'ar' ? 'الهاتف' : 'Phone'}
                  </p>
                  <a href="tel:+966XXXXXXXXX" class="text-white hover:text-teal-400 transition-colors">
                    +966 XX XXX XXXX
                  </a>
                </div>
              </li>
              <li class="flex items-start">
                <i class="fas fa-envelope text-teal-500 ml-3 mt-1"></i>
                <div>
                  <p class="text-gray-400 text-sm">
                    ${lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  </p>
                  <a href="mailto:info@drmohammed.sa" class="text-white hover:text-teal-400 transition-colors">
                    info@drmohammed.sa
                  </a>
                </div>
              </li>
              <li class="flex items-start">
                <i class="fas fa-map-marker-alt text-teal-500 ml-3 mt-1"></i>
                <div>
                  <p class="text-gray-400 text-sm">
                    ${lang === 'ar' ? 'العنوان' : 'Address'}
                  </p>
                  <p class="text-white">
                    ${lang === 'ar' 
                      ? 'مستشفى المملكة، الرياض، المملكة العربية السعودية' 
                      : 'Kingdom Hospital, Riyadh, Saudi Arabia'}
                  </p>
                </div>
              </li>
              <li class="flex items-start">
                <i class="fas fa-clock text-teal-500 ml-3 mt-1"></i>
                <div>
                  <p class="text-gray-400 text-sm">
                    ${lang === 'ar' ? 'ساعات العمل' : 'Working Hours'}
                  </p>
                  <p class="text-white text-sm">
                    ${lang === 'ar' ? 'السبت - الخميس: 4 مساءً - 10 مساءً' : 'Sat - Thu: 4 PM - 10 PM'}
                  </p>
                </div>
              </li>
            </ul>

            <!-- Social Media -->
            <div class="mt-6">
              <h4 class="text-sm font-semibold mb-3 text-gray-400">
                ${lang === 'ar' ? 'تابعنا' : 'Follow Us'}
              </h4>
              <div class="flex space-x-3 ${isRTL ? 'space-x-reverse' : ''}">
                <a href="#" class="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all transform hover:scale-110">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#" class="w-10 h-10 bg-gray-700 hover:bg-blue-400 rounded-full flex items-center justify-center transition-all transform hover:scale-110">
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="#" class="w-10 h-10 bg-gray-700 hover:bg-pink-600 rounded-full flex items-center justify-center transition-all transform hover:scale-110">
                  <i class="fab fa-instagram"></i>
                </a>
                <a href="#" class="w-10 h-10 bg-gray-700 hover:bg-green-500 rounded-full flex items-center justify-center transition-all transform hover:scale-110">
                  <i class="fab fa-whatsapp"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="border-t border-gray-700 mt-8 pt-8">
          <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p class="text-gray-400 text-sm text-center md:text-${isRTL ? 'right' : 'left'}">
              © 2024 ${lang === 'ar' ? 'د. محمد سعيد' : 'Dr. Mohammed Saeed'}. 
              ${lang === 'ar' ? 'جميع الحقوق محفوظة' : 'All rights reserved'}.
            </p>
            <div class="flex space-x-4 ${isRTL ? 'space-x-reverse' : ''}">
              <a href="/privacy" class="text-gray-400 hover:text-white text-sm transition-colors">
                ${lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
              </a>
              <span class="text-gray-600">|</span>
              <a href="/terms" class="text-gray-400 hover:text-white text-sm transition-colors">
                ${lang === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `;
}
