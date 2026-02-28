-- Production Database Setup Script
-- Run this in Cloudflare D1 Console: https://dash.cloudflare.com/d1

-- 1. Create media_files table for storing base64 image data
CREATE TABLE IF NOT EXISTS media_files (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  filename TEXT UNIQUE NOT NULL,
  content_type TEXT NOT NULL,
  file_data TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_media_files_filename ON media_files(filename);

-- 2. Add admin user for foreign key constraints
INSERT OR IGNORE INTO users (id, email, password_hash, full_name, role, status) 
VALUES (1, 'admin@doctor-surgeon.com', 'dummy_hash', 'Admin User', 'admin', 'active');

-- 3. Verify setup
SELECT 'Media Files Table Created:' as status, COUNT(*) as count FROM sqlite_master WHERE type='table' AND name='media_files';
SELECT 'Admin User Created:' as status, COUNT(*) as count FROM users WHERE id=1;
