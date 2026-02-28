-- Migration: Create media_files table for storing uploaded images
-- This table stores images as base64 encoded data in D1 database

CREATE TABLE IF NOT EXISTS media_files (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  filename TEXT UNIQUE NOT NULL,
  content_type TEXT NOT NULL,
  file_data TEXT NOT NULL,  -- Base64 encoded image data
  file_size INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_media_filename ON media_files(filename);
CREATE INDEX IF NOT EXISTS idx_media_created ON media_files(created_at DESC);
