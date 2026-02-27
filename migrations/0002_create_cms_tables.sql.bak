-- ============================================
-- CMS Database Schema for Doctor Website
-- ============================================

-- 1. USERS TABLE (Admin Users)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT DEFAULT 'admin' CHECK(role IN ('admin', 'editor')),
  is_active INTEGER DEFAULT 1,
  last_login DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. DOCTOR INFO TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS doctor_info (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  full_name_ar TEXT NOT NULL,
  full_name_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  title_en TEXT NOT NULL,
  bio_ar TEXT,
  bio_en TEXT,
  specialties_ar TEXT, -- JSON array
  specialties_en TEXT, -- JSON array
  fellowships_ar TEXT, -- JSON array
  fellowships_en TEXT, -- JSON array
  education_ar TEXT, -- JSON array
  education_en TEXT, -- JSON array
  experience_years INTEGER,
  photo_url TEXT,
  signature_url TEXT,
  cv_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. ARTICLES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title_ar TEXT NOT NULL,
  title_en TEXT NOT NULL,
  excerpt_ar TEXT,
  excerpt_en TEXT,
  content_ar TEXT NOT NULL,
  content_en TEXT NOT NULL,
  main_image_url TEXT,
  category TEXT, -- 'الأورام', 'أمراض الشرج', 'الجهاز الهضمي'
  tags TEXT, -- JSON array
  author_id INTEGER,
  read_time INTEGER, -- minutes
  views INTEGER DEFAULT 0,
  is_published INTEGER DEFAULT 0,
  published_at DATETIME,
  -- SEO Fields
  meta_title_ar TEXT,
  meta_title_en TEXT,
  meta_description_ar TEXT,
  meta_description_en TEXT,
  meta_keywords TEXT, -- JSON array
  og_image_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(is_published);

-- 4. ARTICLE IMAGES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS article_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  article_id INTEGER NOT NULL,
  image_url TEXT NOT NULL,
  caption_ar TEXT,
  caption_en TEXT,
  alt_text_ar TEXT,
  alt_text_en TEXT,
  display_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_article_images_article ON article_images(article_id);

-- 5. SITE SETTINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS site_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  setting_key TEXT UNIQUE NOT NULL,
  setting_value TEXT,
  setting_type TEXT DEFAULT 'text' CHECK(setting_type IN ('text', 'number', 'json', 'boolean', 'color')),
  category TEXT, -- 'general', 'contact', 'social', 'theme', 'seo'
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_settings_category ON site_settings(category);

-- 6. CONTACT INFO TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS contact_info (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL, -- 'phone', 'email', 'address', 'whatsapp', 'hours'
  label_ar TEXT NOT NULL,
  label_en TEXT NOT NULL,
  value TEXT NOT NULL,
  icon TEXT,
  display_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 7. SOCIAL MEDIA TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS social_media (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  platform TEXT NOT NULL, -- 'facebook', 'instagram', 'twitter', 'youtube', 'tiktok', 'snapchat'
  url TEXT NOT NULL,
  icon TEXT,
  display_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 8. MENU ITEMS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS menu_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  menu_location TEXT NOT NULL, -- 'header', 'footer'
  label_ar TEXT NOT NULL,
  label_en TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT,
  parent_id INTEGER,
  display_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES menu_items(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_menu_location ON menu_items(menu_location);

-- 9. MEDIA LIBRARY TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS media_library (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT, -- 'image', 'video', 'document'
  mime_type TEXT,
  file_size INTEGER, -- bytes
  width INTEGER,
  height INTEGER,
  alt_text_ar TEXT,
  alt_text_en TEXT,
  uploaded_by INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (uploaded_by) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_media_type ON media_library(file_type);

-- 10. YOUTUBE SETTINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS youtube_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  api_key TEXT,
  channel_id TEXT,
  channel_handle TEXT,
  max_videos INTEGER DEFAULT 20,
  auto_update INTEGER DEFAULT 1,
  cache_duration INTEGER DEFAULT 3600, -- seconds
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 11. PAGE CONTENT TABLE (for dynamic pages)
-- ============================================
CREATE TABLE IF NOT EXISTS page_content (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  page_slug TEXT UNIQUE NOT NULL,
  page_title_ar TEXT NOT NULL,
  page_title_en TEXT NOT NULL,
  content_ar TEXT,
  content_en TEXT,
  sections TEXT, -- JSON array of sections
  is_published INTEGER DEFAULT 1,
  -- SEO Fields
  meta_title_ar TEXT,
  meta_title_en TEXT,
  meta_description_ar TEXT,
  meta_description_en TEXT,
  meta_keywords TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_page_slug ON page_content(page_slug);

-- 12. ANALYTICS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS analytics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  page_path TEXT NOT NULL,
  user_agent TEXT,
  ip_address TEXT,
  referrer TEXT,
  language TEXT,
  visit_date DATE,
  visit_time TIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_analytics_date ON analytics(visit_date);
CREATE INDEX IF NOT EXISTS idx_analytics_path ON analytics(page_path);

-- ============================================
-- INSERT DEFAULT DATA
-- ============================================

-- Default Admin User (password: admin123 - CHANGE THIS!)
-- Password hash for 'admin123' using bcrypt
INSERT OR IGNORE INTO users (username, email, password_hash, full_name, role)
VALUES ('admin', 'admin@drmohammedsaeed.com', '$2a$10$rO5G5xH8KlV8P9J7eQZXBeY5t.ZYmO3vG6XZqK8kqH7P5K6xG8K5G', 'Admin User', 'admin');

-- Default Doctor Info
INSERT OR IGNORE INTO doctor_info (
  full_name_ar, full_name_en,
  title_ar, title_en,
  bio_ar, bio_en,
  specialties_ar, specialties_en,
  fellowships_ar, fellowships_en,
  experience_years
) VALUES (
  'د. محمد سعيد بن محسن علي',
  'Dr. Mohammed Saeed Bin Mohsen Ali',
  'استشاري جراحة القولون والمستقيم',
  'Consultant Colorectal Surgeon',
  'استشاري متخصص في جراحة القولون والمستقيم مع خبرة بريطانية متميزة',
  'Specialized consultant in colorectal surgery with distinguished British experience',
  '["جراحة القولون والمستقيم","علاج أورام القولون","الجراحة الروبوتية"]',
  '["Colorectal Surgery","Colon Cancer Treatment","Robotic Surgery"]',
  '["زمالة المملكة المتحدة","زمالة جراحة القولون المتقدمة","زمالة الجراحة التنظيرية"]',
  '["UK Fellowship","Advanced Colorectal Fellowship","Laparoscopic Surgery Fellowship"]',
  15
);

-- Default Site Settings
INSERT OR IGNORE INTO site_settings (setting_key, setting_value, setting_type, category, description) VALUES
('site_name_ar', 'د. محمد سعيد - استشاري جراحة القولون', 'text', 'general', 'اسم الموقع بالعربية'),
('site_name_en', 'Dr. Mohammed Saeed - Colorectal Surgeon', 'text', 'general', 'Site name in English'),
('site_tagline_ar', 'خبرة بريطانية متميزة في جراحة القولون', 'text', 'general', 'الشعار بالعربية'),
('site_tagline_en', 'Distinguished UK Experience in Colorectal Surgery', 'text', 'general', 'Tagline in English'),
('primary_color', '#2563eb', 'color', 'theme', 'اللون الأساسي'),
('secondary_color', '#10b981', 'color', 'theme', 'اللون الثانوي'),
('accent_color', '#f59e0b', 'color', 'theme', 'لون التمييز'),
('default_language', 'ar', 'text', 'general', 'اللغة الافتراضية');

-- Default Contact Info
INSERT OR IGNORE INTO contact_info (type, label_ar, label_en, value, icon, display_order) VALUES
('phone', 'الهاتف', 'Phone', '+966127444444', 'fas fa-phone', 1),
('whatsapp', 'واتساب', 'WhatsApp', '+966569925966', 'fab fa-whatsapp', 2),
('email', 'البريد الإلكتروني', 'Email', 'info@drmohammedsaeed.com', 'fas fa-envelope', 3),
('address', 'العنوان', 'Address', 'مستشفى د. سليمان الحبيب - فرع الفيحاء، جدة', 'fas fa-map-marker-alt', 4),
('hours', 'ساعات العمل', 'Working Hours', 'السبت - الخميس: 4 مساءً - 10 مساءً', 'fas fa-clock', 5);

-- Default Social Media
INSERT OR IGNORE INTO social_media (platform, url, icon, display_order) VALUES
('facebook', 'https://www.facebook.com/share/14MXfmjiznb/?mibextid=wwXIfr', 'fab fa-facebook', 1),
('instagram', 'https://www.instagram.com/dr_mohammed.saeed.ali', 'fab fa-instagram', 2),
('youtube', 'https://youtube.com/@dr.mohammedsaeedali?si=w8Tobr16n2UV6c02', 'fab fa-youtube', 3),
('tiktok', 'http://www.tiktok.com/@mohammedsaeedali51', 'fab fa-tiktok', 4),
('twitter', 'https://x.com/dr_mohammed_ali?s=21', 'fab fa-x-twitter', 5),
('snapchat', 'https://snapchat.com/t/gpVQciif', 'fab fa-snapchat', 6);

-- Default Menu Items (Header)
INSERT OR IGNORE INTO menu_items (menu_location, label_ar, label_en, url, display_order) VALUES
('header', 'الرئيسية', 'Home', '/', 1),
('header', 'عن الدكتور', 'About', '/about', 2),
('header', 'المقالات', 'Articles', '/articles', 3),
('header', 'الحجز', 'Booking', '/booking', 4),
('header', 'اتصل بنا', 'Contact', '/contact', 5);

-- Default Menu Items (Footer)
INSERT OR IGNORE INTO menu_items (menu_location, label_ar, label_en, url, display_order) VALUES
('footer', 'الرئيسية', 'Home', '/', 1),
('footer', 'عن الدكتور', 'About', '/about', 2),
('footer', 'المقالات', 'Articles', '/articles', 3),
('footer', 'احجز موعد', 'Book Appointment', '/booking', 4),
('footer', 'اتصل بنا', 'Contact Us', '/contact', 5),
('footer', 'سياسة الخصوصية', 'Privacy Policy', '/privacy', 6),
('footer', 'الشروط والأحكام', 'Terms & Conditions', '/terms', 7);

-- Default YouTube Settings
INSERT OR IGNORE INTO youtube_settings (channel_handle, channel_id, max_videos) VALUES
('@Dr.MohammedSaeedAli', 'UC-lHJZR3Gqxm24_Vd_AJ5Yw', 20);

-- ============================================
-- END OF SCHEMA
-- ============================================
