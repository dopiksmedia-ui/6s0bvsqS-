-- Migration 0008: Create media_files table for base64 storage
-- This table stores base64-encoded image data for serving via /api/media/:filename

CREATE TABLE IF NOT EXISTS media_files (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  filename TEXT UNIQUE NOT NULL,
  content_type TEXT NOT NULL,
  file_data TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_media_files_filename ON media_files(filename);
