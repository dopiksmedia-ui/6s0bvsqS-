-- ============================================
-- Enhanced CMS Schema - Advanced Features
-- ============================================

-- Add SEO and media columns to articles table
ALTER TABLE articles ADD COLUMN meta_title_ar TEXT;
ALTER TABLE articles ADD COLUMN meta_title_en TEXT;
ALTER TABLE articles ADD COLUMN meta_description_ar TEXT;
ALTER TABLE articles ADD COLUMN meta_description_en TEXT;
ALTER TABLE articles ADD COLUMN meta_keywords TEXT; -- JSON array
ALTER TABLE articles ADD COLUMN featured_video_embed TEXT;
ALTER TABLE articles ADD COLUMN featured_video_thumbnail TEXT;
ALTER TABLE articles ADD COLUMN seo_index INTEGER DEFAULT 1; -- 1=index, 0=noindex
ALTER TABLE articles ADD COLUMN seo_follow INTEGER DEFAULT 1; -- 1=follow, 0=nofollow
ALTER TABLE articles ADD COLUMN canonical_url TEXT;
ALTER TABLE articles ADD COLUMN og_image_url TEXT;
ALTER TABLE articles ADD COLUMN related_articles TEXT; -- JSON array of article IDs

-- Create media_library table for uploaded files
CREATE TABLE IF NOT EXISTS media_library (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  filename TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL, -- image/video/document
  mime_type TEXT NOT NULL,
  file_size INTEGER, -- in bytes
  width INTEGER,
  height INTEGER,
  alt_text_ar TEXT,
  alt_text_en TEXT,
  caption_ar TEXT,
  caption_en TEXT,
  uploaded_by INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (uploaded_by) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_media_type ON media_library(file_type);
CREATE INDEX IF NOT EXISTS idx_media_created ON media_library(created_at);

-- Update article_images to reference media_library
-- Note: In production, you'd migrate existing data first
DROP TABLE IF EXISTS article_images;

CREATE TABLE article_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  article_id INTEGER NOT NULL,
  media_id INTEGER NOT NULL,
  display_order INTEGER DEFAULT 0,
  position_in_content INTEGER, -- paragraph number or position
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
  FOREIGN KEY (media_id) REFERENCES media_library(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_article_images_article ON article_images(article_id);
CREATE INDEX IF NOT EXISTS idx_article_images_media ON article_images(media_id);

-- ============================================
-- Default values for existing articles
-- ============================================

UPDATE articles 
SET 
  meta_title_ar = title_ar,
  meta_title_en = title_en,
  meta_description_ar = excerpt_ar,
  meta_description_en = excerpt_en,
  meta_keywords = '[]',
  seo_index = 1,
  seo_follow = 1,
  related_articles = '[]'
WHERE meta_title_ar IS NULL;
