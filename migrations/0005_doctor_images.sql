-- Migration: Doctor Images Management System
-- Created: 2026-02-27
-- Description: Create doctor_images table for managing doctor photos in About and Contact pages

-- Doctor Images Table
CREATE TABLE IF NOT EXISTS doctor_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  image_type TEXT NOT NULL CHECK(image_type IN ('about_hero', 'contact_profile', 'other')),
  image_url TEXT NOT NULL,
  alt_text_ar TEXT,
  alt_text_en TEXT,
  is_active INTEGER DEFAULT 1,
  display_order INTEGER DEFAULT 0,
  uploaded_by INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_doctor_images_type ON doctor_images(image_type);
CREATE INDEX IF NOT EXISTS idx_doctor_images_active ON doctor_images(is_active);
CREATE INDEX IF NOT EXISTS idx_doctor_images_order ON doctor_images(display_order);

-- Insert default/placeholder images
INSERT INTO doctor_images (image_type, image_url, alt_text_ar, alt_text_en, is_active, display_order) 
VALUES 
  ('about_hero', '/static/uploads/doctor-about.jpg', 'د. محمد سعيد - استشاري جراحة القولون والمستقيم', 'Dr. Mohammed Saeed - Consultant Colorectal Surgeon', 1, 1),
  ('contact_profile', '/static/uploads/doctor-profile.jpg', 'د. محمد سعيد ابن محسن علي', 'Dr. Mohammed Saeed bin Mohsen Ali', 1, 1);
