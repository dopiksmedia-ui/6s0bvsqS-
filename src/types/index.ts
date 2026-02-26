// Database Types
export interface User {
  id: number;
  email: string;
  password_hash: string;
  full_name: string;
  role: 'admin' | 'editor' | 'receptionist' | 'viewer';
  status: 'active' | 'inactive' | 'suspended';
  created_at: string;
  updated_at: string;
}

export interface DoctorProfile {
  id: number;
  name_ar: string;
  name_en: string;
  title_ar: string;
  title_en: string;
  specialty_ar: string;
  specialty_en: string;
  bio_short_ar?: string;
  bio_short_en?: string;
  bio_full_ar?: string;
  bio_full_en?: string;
  philosophy_ar?: string;
  philosophy_en?: string;
  years_of_experience?: number;
  total_operations?: number;
  profile_image?: string;
  video_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Certificate {
  id: number;
  title_ar: string;
  title_en: string;
  issuer_ar: string;
  issuer_en: string;
  year: number;
  type: 'degree' | 'certification' | 'membership' | 'award';
  description_ar?: string;
  description_en?: string;
  image_url?: string;
  display_order: number;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
}

export interface Hospital {
  id: number;
  name_ar: string;
  name_en: string;
  city_ar?: string;
  city_en?: string;
  country_ar?: string;
  country_en?: string;
  position_ar?: string;
  position_en?: string;
  start_date?: string;
  end_date?: string;
  is_current: boolean;
  description_ar?: string;
  description_en?: string;
  logo_url?: string;
  website?: string;
  display_order: number;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
}

export interface Video {
  id: number;
  title_ar: string;
  title_en: string;
  description_ar?: string;
  description_en?: string;
  youtube_url: string;
  youtube_embed_code?: string;
  thumbnail_url?: string;
  category: 'interview' | 'tv' | 'podcast' | 'behind_scenes';
  tags?: string;
  view_count: number;
  published_date?: string;
  display_order: number;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: number;
  patient_name_ar?: string;
  patient_name_en?: string;
  rating: number;
  testimonial_ar: string;
  testimonial_en: string;
  type: 'text' | 'image' | 'video';
  media_url?: string;
  consent_given: boolean;
  display_on_home: boolean;
  display_order: number;
  status: 'draft' | 'published';
  submitted_at: string;
  approved_at?: string;
  approved_by?: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name_ar: string;
  name_en: string;
  slug_ar: string;
  slug_en: string;
  description_ar?: string;
  description_en?: string;
  display_order: number;
  status: 'published' | 'draft';
  created_at: string;
  updated_at: string;
}

export interface Tag {
  id: number;
  name_ar: string;
  name_en: string;
  slug_ar: string;
  slug_en: string;
  created_at: string;
}

export interface Article {
  id: number;
  title_ar: string;
  title_en: string;
  slug_ar: string;
  slug_en: string;
  summary_ar?: string;
  summary_en?: string;
  content_ar: string;
  content_en: string;
  featured_image?: string;
  youtube_video_url?: string;
  author_id: number;
  category_id?: number;
  reading_time?: number;
  view_count: number;
  meta_title_ar?: string;
  meta_title_en?: string;
  meta_description_ar?: string;
  meta_description_en?: string;
  meta_keywords_ar?: string;
  meta_keywords_en?: string;
  canonical_url?: string;
  published_at?: string;
  status: 'draft' | 'published' | 'archived';
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface BookingSlot {
  id: number;
  day_of_week: number;
  start_time: string;
  end_time: string;
  slot_duration: number;
  max_bookings_per_slot: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BookingException {
  id: number;
  exception_date: string;
  reason_ar?: string;
  reason_en?: string;
  is_available: boolean;
  special_hours?: string;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: number;
  booking_number: string;
  patient_name: string;
  patient_phone: string;
  patient_email?: string;
  consultation_type_ar?: string;
  consultation_type_en?: string;
  booking_date: string;
  booking_time: string;
  reason?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no_show';
  notes?: string;
  reminder_sent: boolean;
  consent_privacy: boolean;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
  updated_at: string;
  confirmed_at?: string;
  confirmed_by?: number;
  cancelled_at?: string;
  cancellation_reason?: string;
}

export interface SiteSetting {
  id: number;
  setting_key: string;
  setting_value?: string;
  setting_type: 'text' | 'json' | 'boolean' | 'number';
  group_name?: string;
  description?: string;
  updated_at: string;
}

export interface MediaLibrary {
  id: number;
  file_name: string;
  file_path: string;
  file_type: 'image' | 'video' | 'document';
  mime_type?: string;
  file_size?: number;
  width?: number;
  height?: number;
  alt_text_ar?: string;
  alt_text_en?: string;
  uploaded_by?: number;
  created_at: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Language Types
export type Language = 'ar' | 'en';

// Cloudflare Bindings
export type Bindings = {
  DB: D1Database;
};

// Context type for Hono
export type AppContext = {
  Bindings: Bindings;
  Variables: {
    user?: User;
    lang: Language;
  };
};
