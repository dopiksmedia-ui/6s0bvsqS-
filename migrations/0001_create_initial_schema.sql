-- =====================================================
-- Doctor Surgeon Website - Initial Database Schema
-- Migration: 0001
-- Created: 2024-02-26
-- =====================================================

-- Users & Authentication
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'viewer',
  status TEXT NOT NULL DEFAULT 'active',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- Doctor Profile (Single Record)
CREATE TABLE IF NOT EXISTS doctor_profile (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  title_en TEXT NOT NULL,
  specialty_ar TEXT NOT NULL,
  specialty_en TEXT NOT NULL,
  bio_short_ar TEXT,
  bio_short_en TEXT,
  bio_full_ar TEXT,
  bio_full_en TEXT,
  philosophy_ar TEXT,
  philosophy_en TEXT,
  years_of_experience INTEGER,
  total_operations INTEGER,
  profile_image TEXT,
  video_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Certificates & Credentials
CREATE TABLE IF NOT EXISTS certificates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title_ar TEXT NOT NULL,
  title_en TEXT NOT NULL,
  issuer_ar TEXT NOT NULL,
  issuer_en TEXT NOT NULL,
  year INTEGER NOT NULL,
  type TEXT NOT NULL,
  description_ar TEXT,
  description_en TEXT,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_certificates_year ON certificates(year);
CREATE INDEX idx_certificates_status ON certificates(status);

-- Hospitals & Work Experience
CREATE TABLE IF NOT EXISTS hospitals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  city_ar TEXT,
  city_en TEXT,
  country_ar TEXT,
  country_en TEXT,
  position_ar TEXT,
  position_en TEXT,
  start_date DATE,
  end_date DATE,
  is_current BOOLEAN DEFAULT 0,
  description_ar TEXT,
  description_en TEXT,
  logo_url TEXT,
  website TEXT,
  display_order INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_hospitals_status ON hospitals(status);

-- Media Videos (YouTube Only)
CREATE TABLE IF NOT EXISTS videos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title_ar TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_ar TEXT,
  description_en TEXT,
  youtube_url TEXT NOT NULL,
  youtube_embed_code TEXT,
  thumbnail_url TEXT,
  category TEXT NOT NULL,
  tags TEXT,
  view_count INTEGER DEFAULT 0,
  published_date DATE,
  display_order INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_videos_category ON videos(category);
CREATE INDEX idx_videos_status ON videos(status);

-- Patient Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  patient_name_ar TEXT,
  patient_name_en TEXT,
  rating INTEGER DEFAULT 5,
  testimonial_ar TEXT NOT NULL,
  testimonial_en TEXT NOT NULL,
  type TEXT NOT NULL,
  media_url TEXT,
  consent_given BOOLEAN DEFAULT 0,
  display_on_home BOOLEAN DEFAULT 0,
  display_order INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft',
  submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  approved_at DATETIME,
  approved_by INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (approved_by) REFERENCES users(id)
);

CREATE INDEX idx_testimonials_status ON testimonials(status);

-- Article Categories
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  slug_ar TEXT UNIQUE NOT NULL,
  slug_en TEXT UNIQUE NOT NULL,
  description_ar TEXT,
  description_en TEXT,
  display_order INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_categories_slug_ar ON categories(slug_ar);
CREATE INDEX idx_categories_slug_en ON categories(slug_en);

-- Article Tags
CREATE TABLE IF NOT EXISTS tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  slug_ar TEXT UNIQUE NOT NULL,
  slug_en TEXT UNIQUE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tags_slug_ar ON tags(slug_ar);
CREATE INDEX idx_tags_slug_en ON tags(slug_en);

-- Articles/Blog Posts
CREATE TABLE IF NOT EXISTS articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title_ar TEXT NOT NULL,
  title_en TEXT NOT NULL,
  slug_ar TEXT UNIQUE NOT NULL,
  slug_en TEXT UNIQUE NOT NULL,
  summary_ar TEXT,
  summary_en TEXT,
  content_ar TEXT NOT NULL,
  content_en TEXT NOT NULL,
  featured_image TEXT,
  youtube_video_url TEXT,
  author_id INTEGER NOT NULL,
  category_id INTEGER,
  reading_time INTEGER,
  view_count INTEGER DEFAULT 0,
  meta_title_ar TEXT,
  meta_title_en TEXT,
  meta_description_ar TEXT,
  meta_description_en TEXT,
  meta_keywords_ar TEXT,
  meta_keywords_en TEXT,
  canonical_url TEXT,
  published_at DATETIME,
  status TEXT NOT NULL DEFAULT 'draft',
  display_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE INDEX idx_articles_slug_ar ON articles(slug_ar);
CREATE INDEX idx_articles_slug_en ON articles(slug_en);
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_category ON articles(category_id);
CREATE INDEX idx_articles_published ON articles(published_at);

-- Article Tags (Many-to-Many)
CREATE TABLE IF NOT EXISTS article_tags (
  article_id INTEGER NOT NULL,
  tag_id INTEGER NOT NULL,
  PRIMARY KEY (article_id, tag_id),
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- Booking Time Slots Configuration
CREATE TABLE IF NOT EXISTS booking_slots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  day_of_week INTEGER NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  slot_duration INTEGER NOT NULL DEFAULT 30,
  max_bookings_per_slot INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Booking Exceptions (Holidays/Special Days)
CREATE TABLE IF NOT EXISTS booking_exceptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  exception_date DATE NOT NULL UNIQUE,
  reason_ar TEXT,
  reason_en TEXT,
  is_available BOOLEAN DEFAULT 0,
  special_hours TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Patient Bookings
CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  booking_number TEXT UNIQUE NOT NULL,
  patient_name TEXT NOT NULL,
  patient_phone TEXT NOT NULL,
  patient_email TEXT,
  consultation_type_ar TEXT,
  consultation_type_en TEXT,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  reason TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  notes TEXT,
  reminder_sent BOOLEAN DEFAULT 0,
  consent_privacy BOOLEAN DEFAULT 1,
  ip_address TEXT,
  user_agent TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  confirmed_at DATETIME,
  confirmed_by INTEGER,
  cancelled_at DATETIME,
  cancellation_reason TEXT,
  FOREIGN KEY (confirmed_by) REFERENCES users(id)
);

CREATE INDEX idx_bookings_date ON bookings(booking_date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_phone ON bookings(patient_phone);
CREATE INDEX idx_bookings_number ON bookings(booking_number);

-- Site Settings (Key-Value Store)
CREATE TABLE IF NOT EXISTS site_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  setting_key TEXT UNIQUE NOT NULL,
  setting_value TEXT,
  setting_type TEXT DEFAULT 'text',
  group_name TEXT,
  description TEXT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_site_settings_key ON site_settings(setting_key);
CREATE INDEX idx_site_settings_group ON site_settings(group_name);

-- Media Assets Library
CREATE TABLE IF NOT EXISTS media_library (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  mime_type TEXT,
  file_size INTEGER,
  width INTEGER,
  height INTEGER,
  alt_text_ar TEXT,
  alt_text_en TEXT,
  uploaded_by INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (uploaded_by) REFERENCES users(id)
);

-- Audit Log (Optional)
CREATE TABLE IF NOT EXISTS audit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id INTEGER,
  old_value TEXT,
  new_value TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_audit_log_user ON audit_log(user_id);
CREATE INDEX idx_audit_log_entity ON audit_log(entity_type, entity_id);
CREATE INDEX idx_audit_log_created ON audit_log(created_at);
