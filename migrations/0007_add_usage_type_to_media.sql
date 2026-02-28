-- Migration 0007: Add usage_type to media_library for better categorization
-- This allows us to identify specific images like doctor profile, article images, etc.

-- Add usage_type column to media_library
ALTER TABLE media_library ADD COLUMN usage_type TEXT DEFAULT 'general';

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_media_usage_type ON media_library(usage_type);

-- Update existing records (if any)
-- Common usage types:
-- 'doctor_profile' - صورة الدكتور الرئيسية
-- 'article' - صور المقالات
-- 'certificate' - صور الشهادات
-- 'hospital' - صور المستشفيات
-- 'general' - صور عامة
