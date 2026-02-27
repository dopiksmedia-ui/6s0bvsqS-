-- ============================================
-- CMS Basic Schema - Articles & Settings Only
-- ============================================

-- 1. USERS TABLE (Admin Users)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  is_active INTEGER DEFAULT 1,
  last_login DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. ARTICLES TABLE
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
  category TEXT,
  tags TEXT, -- JSON array
  author_id INTEGER,
  read_time INTEGER,
  views INTEGER DEFAULT 0,
  is_published INTEGER DEFAULT 0,
  published_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(is_published);

-- 3. ARTICLE IMAGES TABLE
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

-- 4. SITE SETTINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS site_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  setting_key TEXT UNIQUE NOT NULL,
  setting_value TEXT,
  setting_type TEXT DEFAULT 'text',
  category TEXT,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_settings_key ON site_settings(setting_key);

-- ============================================
-- INSERT DEFAULT DATA
-- ============================================

-- Default Admin User (username: admin, password: admin123)
-- Password hash for 'admin123' - CHANGE THIS AFTER FIRST LOGIN!
INSERT OR IGNORE INTO users (id, username, email, password_hash, full_name)
VALUES (1, 'admin', 'admin@drmohammedsaeed.com', '$2a$10$rO5G5xH8KlV8P9J7eQZXBeY5t.ZYmO3vG6XZqK8kqH7P5K6xG8K5G', 'Admin User');

-- Default Site Settings
INSERT OR IGNORE INTO site_settings (setting_key, setting_value, setting_type, category, description) VALUES
('site_logo_url', '/static/logo.png', 'text', 'general', 'رابط شعار الموقع'),
('site_name_ar', 'د. محمد سعيد', 'text', 'general', 'اسم الموقع بالعربية'),
('site_name_en', 'Dr. Mohammed Saeed', 'text', 'general', 'اسم الموقع بالإنجليزية'),
('primary_language', 'ar', 'text', 'language', 'اللغة الأساسية'),
('secondary_language', 'en', 'text', 'language', 'اللغة الثانوية'),
('enable_secondary_language', '1', 'text', 'language', 'تفعيل اللغة الثانوية');

-- ============================================
-- END OF BASIC SCHEMA
-- ============================================
