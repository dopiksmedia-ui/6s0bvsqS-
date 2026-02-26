-- =====================================================
-- Doctor Surgeon Website - Seed Data
-- =====================================================

-- Insert default admin user (password: admin123)
INSERT OR IGNORE INTO users (id, email, password_hash, full_name, role, status) VALUES 
  (1, 'admin@doctor.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5d/zHRFjvNt1u', 'Admin User', 'admin', 'active');

-- Insert doctor profile
INSERT OR IGNORE INTO doctor_profile (
  id, name_ar, name_en, title_ar, title_en, specialty_ar, specialty_en,
  bio_short_ar, bio_short_en,
  bio_full_ar, bio_full_en,
  philosophy_ar, philosophy_en,
  years_of_experience, total_operations, profile_image
) VALUES (
  1,
  'د. أحمد محمد الشريف',
  'Dr. Ahmed Mohammed Al-Shareef',
  'استشاري جراحة عامة ومناظير | زمالة البورد الأمريكي',
  'Consultant General & Laparoscopic Surgeon | FACS',
  'جراحة عامة ومناظير',
  'General & Laparoscopic Surgery',
  'خبرة تمتد لأكثر من 15 عاماً في الجراحة الدقيقة',
  'Over 15 years of excellence in precision surgery',
  'د. أحمد محمد الشريف هو استشاري جراحة عامة ومناظير معتمد من البورد الأمريكي، يتمتع بخبرة تزيد عن 15 عاماً في مجال الجراحة الدقيقة والمعقدة. حاصل على البورد الأمريكي في الجراحة العامة، وشهادة الزمالة في جراحة المناظير المتقدمة من جامعة هارفارد.',
  'Dr. Ahmed Mohammed Al-Shareef is an American Board-certified consultant in general and laparoscopic surgery with over 15 years of experience in precision and complex surgical procedures. Board-certified by the American College of Surgeons (FACS).',
  'أهدف دائماً لتحقيق أفضل النتائج الطبية مع الحفاظ على راحة المريض وطمأنته',
  'I always strive to achieve the best medical outcomes while ensuring patient comfort and peace of mind',
  15,
  5000,
  '/static/images/doctor-profile.jpg'
);

-- Insert sample certificates
INSERT OR IGNORE INTO certificates (title_ar, title_en, issuer_ar, issuer_en, year, type, status) VALUES 
  ('البورد الأمريكي في الجراحة العامة', 'American Board of Surgery', 'الكلية الأمريكية للجراحين', 'American College of Surgeons', 2013, 'degree', 'published'),
  ('زمالة جراحة المناظير المتقدمة', 'Advanced Laparoscopic Surgery Fellowship', 'جامعة هارفارد', 'Harvard Medical School', 2015, 'certification', 'published'),
  ('بكالوريوس الطب والجراحة', 'MBBS', 'جامعة الملك سعود', 'King Saud University', 2005, 'degree', 'published');

-- Insert sample hospitals
INSERT OR IGNORE INTO hospitals (name_ar, name_en, city_ar, city_en, country_ar, country_en, position_ar, position_en, start_date, end_date, is_current, status) VALUES 
  ('مستشفى السلام الدولي', 'Al-Salam International Hospital', 'الرياض', 'Riyadh', 'السعودية', 'Saudi Arabia', 'استشاري ورئيس قسم الجراحة العامة', 'Consultant & Head of General Surgery', '2020-01-01', NULL, 1, 'published'),
  ('مستشفى الملك عبدالله الجامعي', 'King Abdullah University Hospital', 'الرياض', 'Riyadh', 'السعودية', 'Saudi Arabia', 'استشاري جراحة عامة', 'General Surgery Consultant', '2017-01-01', '2019-12-31', 0, 'published');

-- Insert sample categories
INSERT OR IGNORE INTO categories (name_ar, name_en, slug_ar, slug_en, description_ar, description_en, status) VALUES 
  ('جراحة عامة', 'General Surgery', 'general-surgery', 'general-surgery', 'مقالات عن الجراحة العامة', 'Articles about general surgery', 'published'),
  ('جراحة المناظير', 'Laparoscopic Surgery', 'laparoscopic-surgery', 'laparoscopic-surgery', 'مقالات عن جراحة المناظير', 'Articles about laparoscopic surgery', 'published'),
  ('جراحة السمنة', 'Bariatric Surgery', 'bariatric-surgery', 'bariatric-surgery', 'مقالات عن جراحة السمنة', 'Articles about bariatric surgery', 'published'),
  ('نصائح صحية', 'Health Tips', 'health-tips', 'health-tips', 'نصائح صحية عامة', 'General health tips', 'published');

-- Insert sample tags
INSERT OR IGNORE INTO tags (name_ar, name_en, slug_ar, slug_en) VALUES 
  ('جراحة', 'Surgery', 'surgery', 'surgery'),
  ('صحة', 'Health', 'health', 'health'),
  ('مناظير', 'Laparoscopy', 'laparoscopy', 'laparoscopy'),
  ('نصائح', 'Tips', 'tips', 'tips'),
  ('تعافي', 'Recovery', 'recovery', 'recovery');

-- Insert sample article
INSERT OR IGNORE INTO articles (
  title_ar, title_en, slug_ar, slug_en,
  summary_ar, summary_en,
  content_ar, content_en,
  author_id, category_id,
  reading_time, status, published_at
) VALUES (
  'دليلك الشامل لجراحة المناظير',
  'Your Complete Guide to Laparoscopic Surgery',
  'guide-to-laparoscopic-surgery',
  'guide-to-laparoscopic-surgery',
  'جراحة المناظير أحدثت ثورة في عالم الطب الحديث',
  'Laparoscopic surgery has revolutionized modern medicine',
  '<h2>ما هي جراحة المناظير؟</h2><p>جراحة المناظير، المعروفة أيضاً بالجراحة طفيفة التوغل، هي تقنية جراحية حديثة تستخدم شقوقاً صغيرة.</p>',
  '<h2>What is Laparoscopic Surgery?</h2><p>Laparoscopic surgery, also known as minimally invasive surgery, is a modern surgical technique.</p>',
  1, 2, 8, 'published', datetime('now')
);

-- Link article with tags
INSERT OR IGNORE INTO article_tags (article_id, tag_id) VALUES 
  (1, 1), (1, 3);

-- Insert sample videos
INSERT OR IGNORE INTO videos (
  title_ar, title_en,
  description_ar, description_en,
  youtube_url, category, status
) VALUES 
  ('لقاء تلفزيوني عن جراحة المناظير', 'TV Interview about Laparoscopic Surgery',
   'لقاء تلفزيوني شامل عن فوائد جراحة المناظير', 'Comprehensive TV interview about laparoscopy benefits',
   'https://www.youtube.com/watch?v=example1', 'interview', 'published'),
  ('كواليس عملية جراحية', 'Behind the Scenes: Surgical Procedure',
   'نظرة خلف الكواليس على عملية جراحية ناجحة', 'Behind-the-scenes look at a successful surgery',
   'https://www.youtube.com/watch?v=example2', 'behind_scenes', 'published');

-- Insert sample testimonials
INSERT OR IGNORE INTO testimonials (
  patient_name_ar, patient_name_en,
  rating, testimonial_ar, testimonial_en,
  type, consent_given, display_on_home, status, approved_at, approved_by
) VALUES 
  ('م. أ.', 'M. A.',
   5, 'تجربة رائعة من البداية للنهاية. الدكتور أحمد شرح لي الإجراء بالتفصيل وكان متابعاً لحالتي باستمرار.',
   'Exceptional experience from start to finish. Dr. Ahmed explained the procedure in detail.',
   'text', 1, 1, 'published', datetime('now'), 1),
  ('ف. ك.', 'F. K.',
   5, 'أفضل جراح تعاملت معه. الاحترافية والإنسانية في التعامل كانت واضحة.',
   'The best surgeon I have dealt with. Professionalism and compassion were evident.',
   'text', 1, 1, 'published', datetime('now'), 1);

-- Insert default booking slots (Sunday to Thursday, 4-9 PM)
INSERT OR IGNORE INTO booking_slots (day_of_week, start_time, end_time, slot_duration, is_active) VALUES 
  (0, '16:00', '21:00', 30, 1), -- Sunday
  (1, '16:00', '21:00', 30, 1), -- Monday
  (2, '16:00', '21:00', 30, 1), -- Tuesday
  (3, '16:00', '21:00', 30, 1), -- Wednesday
  (4, '16:00', '21:00', 30, 1), -- Thursday
  (6, '10:00', '14:00', 30, 1); -- Saturday

-- Insert site settings
INSERT OR IGNORE INTO site_settings (setting_key, setting_value, setting_type, group_name) VALUES 
  ('site_name_ar', 'د. أحمد محمد الشريف', 'text', 'general'),
  ('site_name_en', 'Dr. Ahmed Mohammed Al-Shareef', 'text', 'general'),
  ('clinic_phone', '+966 XX XXX XXXX', 'text', 'contact'),
  ('clinic_whatsapp', '+966 5X XXX XXXX', 'text', 'contact'),
  ('clinic_email', 'info@doctor.com', 'text', 'contact'),
  ('clinic_address_ar', 'مستشفى السلام الدولي، الرياض', 'text', 'contact'),
  ('clinic_address_en', 'Al-Salam International Hospital, Riyadh', 'text', 'contact'),
  ('facebook_url', 'https://facebook.com/doctor', 'text', 'social'),
  ('instagram_url', 'https://instagram.com/doctor', 'text', 'social'),
  ('twitter_url', 'https://twitter.com/doctor', 'text', 'social'),
  ('youtube_url', 'https://youtube.com/doctor', 'text', 'social'),
  ('linkedin_url', 'https://linkedin.com/in/doctor', 'text', 'social');
