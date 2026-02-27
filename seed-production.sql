-- =====================================================
-- Initial Data for Production Database
-- Run this after applying migrations
-- =====================================================

-- =====================================================
-- 1. Admin User
-- =====================================================
-- Password: admin123 (change this immediately!)
-- Use bcrypt to generate a new hash for production
INSERT INTO users (email, password_hash, full_name, role, status)
VALUES (
  'admin@drmohammedsaeed.com',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
  'Admin User',
  'admin',
  'active'
);

-- =====================================================
-- 2. Site Settings
-- =====================================================
INSERT INTO site_settings (setting_key, setting_value, setting_type, group_name, description)
VALUES 
  -- General
  ('site_logo_url', '/static/logo.png', 'text', 'general', 'موقع شعار الموقع'),
  ('site_name_ar', 'د. محمد سعيد علي', 'text', 'general', 'اسم الموقع بالعربي'),
  ('site_name_en', 'Dr. Mohammed Saeed Ali', 'text', 'general', 'اسم الموقع بالإنجليزي'),
  ('site_description_ar', 'استشاري جراحة عامة وجراحات السمنة', 'text', 'general', 'وصف الموقع بالعربي'),
  ('site_description_en', 'General Surgery and Bariatric Surgery Consultant', 'text', 'general', 'وصف الموقع بالإنجليزي'),
  
  -- Language
  ('primary_language', 'ar', 'text', 'language', 'اللغة الأساسية'),
  ('secondary_language', 'en', 'text', 'language', 'اللغة الثانوية'),
  ('enable_secondary_language', '1', 'boolean', 'language', 'تفعيل اللغة الثانوية'),
  
  -- Contact
  ('phone_number', '0127444444', 'text', 'contact', 'رقم الهاتف'),
  ('email', 'info@drmohammedsaeed.com', 'text', 'contact', 'البريد الإلكتروني'),
  ('whatsapp_number', '966501234567', 'text', 'contact', 'رقم واتساب (مع كود الدولة)'),
  ('address_ar', 'الرياض، المملكة العربية السعودية', 'text', 'contact', 'العنوان بالعربي'),
  ('address_en', 'Riyadh, Saudi Arabia', 'text', 'contact', 'العنوان بالإنجليزي'),
  
  -- Social Media
  ('facebook_url', '', 'text', 'social', 'رابط فيسبوك'),
  ('twitter_url', '', 'text', 'social', 'رابط تويتر'),
  ('instagram_url', '', 'text', 'social', 'رابط إنستغرام'),
  ('youtube_url', 'https://youtube.com/@dr.mohammedsaeedali', 'text', 'social', 'رابط يوتيوب'),
  ('linkedin_url', '', 'text', 'social', 'رابط لينكد إن'),
  
  -- Integrations
  ('youtube_api_key', '', 'text', 'integrations', 'مفتاح YouTube API'),
  ('google_analytics_id', '', 'text', 'integrations', 'معرف Google Analytics'),
  ('facebook_pixel_id', '', 'text', 'integrations', 'معرف Facebook Pixel'),
  
  -- SEO
  ('meta_keywords_ar', 'جراحة, سمنة, دكتور محمد سعيد', 'text', 'seo', 'الكلمات المفتاحية بالعربي'),
  ('meta_keywords_en', 'surgery, bariatric, doctor mohammed saeed', 'text', 'seo', 'الكلمات المفتاحية بالإنجليزي'),
  
  -- Booking
  ('booking_enabled', '1', 'boolean', 'booking', 'تفعيل نظام الحجز'),
  ('booking_advance_days', '30', 'number', 'booking', 'عدد الأيام المتاحة للحجز المسبق'),
  ('booking_cancellation_hours', '24', 'number', 'booking', 'الحد الأدنى للإلغاء (ساعات)');

-- =====================================================
-- 3. Booking Slots (أوقات العمل)
-- =====================================================
-- day_of_week: 0=Sunday, 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday

-- الأحد: 9:00 صباحاً - 1:00 ظهراً، 4:00 - 8:00 مساءً
INSERT INTO booking_slots (day_of_week, start_time, end_time, slot_duration, max_bookings_per_slot, is_active)
VALUES 
  (0, '09:00', '13:00', 30, 1, 1),
  (0, '16:00', '20:00', 30, 1, 1);

-- الاثنين: مغلق (no entries)

-- الثلاثاء: 9:00 صباحاً - 1:00 ظهراً، 4:00 - 8:00 مساءً
INSERT INTO booking_slots (day_of_week, start_time, end_time, slot_duration, max_bookings_per_slot, is_active)
VALUES 
  (2, '09:00', '13:00', 30, 1, 1),
  (2, '16:00', '20:00', 30, 1, 1);

-- الأربعاء: 9:00 صباحاً - 1:00 ظهراً
INSERT INTO booking_slots (day_of_week, start_time, end_time, slot_duration, max_bookings_per_slot, is_active)
VALUES 
  (3, '09:00', '13:00', 30, 1, 1);

-- الخميس: 4:00 - 8:00 مساءً
INSERT INTO booking_slots (day_of_week, start_time, end_time, slot_duration, max_bookings_per_slot, is_active)
VALUES 
  (4, '16:00', '20:00', 30, 1, 1);

-- الجمعة: مغلق (no entries)
-- السبت: مغلق (no entries)

-- =====================================================
-- 4. Sample Doctor Profile
-- =====================================================
INSERT INTO doctor_profile (
  name_ar, name_en,
  title_ar, title_en,
  specialty_ar, specialty_en,
  bio_short_ar, bio_short_en,
  bio_full_ar, bio_full_en,
  years_of_experience, total_operations
)
VALUES (
  'د. محمد سعيد علي',
  'Dr. Mohammed Saeed Ali',
  'استشاري جراحة عامة وجراحات السمنة',
  'General Surgery and Bariatric Surgery Consultant',
  'جراحة عامة، جراحات السمنة، جراحات المناظير',
  'General Surgery, Bariatric Surgery, Laparoscopic Surgery',
  'استشاري جراحة عامة وجراحات السمنة مع خبرة تزيد عن 15 عاماً في المجال الطبي',
  'General Surgery and Bariatric Surgery Consultant with over 15 years of medical experience',
  '<p>د. محمد سعيد علي استشاري جراحة عامة وجراحات السمنة، حاصل على شهادات دولية في مجال الجراحة العامة وجراحات السمنة والمناظير.</p><p>يتمتع بخبرة واسعة في إجراء جميع أنواع العمليات الجراحية بأحدث التقنيات الطبية.</p>',
  '<p>Dr. Mohammed Saeed Ali is a General Surgery and Bariatric Surgery Consultant with international certifications in general surgery, bariatric surgery, and laparoscopic procedures.</p><p>He has extensive experience in performing all types of surgical operations using the latest medical techniques.</p>',
  15,
  3500
);

-- =====================================================
-- 5. Sample Article Categories
-- =====================================================
INSERT INTO categories (name_ar, name_en, slug_ar, slug_en, description_ar, description_en, display_order, status)
VALUES 
  ('صحة عامة', 'General Health', 'health', 'health', 'مقالات عن الصحة العامة والوقاية', 'Articles about general health and prevention', 1, 'published'),
  ('جراحات السمنة', 'Bariatric Surgery', 'bariatric', 'bariatric', 'معلومات عن جراحات السمنة', 'Information about bariatric surgery', 2, 'published'),
  ('التغذية', 'Nutrition', 'nutrition', 'nutrition', 'نصائح غذائية صحية', 'Healthy nutrition tips', 3, 'published'),
  ('الوقاية', 'Prevention', 'prevention', 'prevention', 'نصائح للوقاية من الأمراض', 'Disease prevention tips', 4, 'published');

-- =====================================================
-- 6. Sample Tags
-- =====================================================
INSERT INTO tags (name_ar, name_en, slug_ar, slug_en)
VALUES 
  ('نصائح صحية', 'Health Tips', 'health-tips', 'health-tips'),
  ('تغذية', 'Nutrition', 'nutrition', 'nutrition'),
  ('رياضة', 'Exercise', 'exercise', 'exercise'),
  ('وقاية', 'Prevention', 'prevention', 'prevention'),
  ('جراحة', 'Surgery', 'surgery', 'surgery'),
  ('سمنة', 'Obesity', 'obesity', 'obesity');

-- =====================================================
-- Notes:
-- =====================================================
-- 1. Change admin password immediately after deployment!
-- 2. Add real YouTube API key in site_settings
-- 3. Update doctor profile with actual information
-- 4. Add real contact information
-- 5. Update booking slots according to actual working hours
-- 6. Add booking exceptions for holidays

-- =====================================================
-- To apply this file:
-- =====================================================
-- npx wrangler d1 execute doctor-db-production --remote --file=./seed-production.sql
