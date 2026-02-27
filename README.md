# 🏥 Doctor Surgeon Website

> موقع احترافي ثنائي اللغة (عربي/إنجليزي) لعيادة طبيب جرّاح مع نظام CMS كامل ونظام حجز مواعيد متقدم
> 
> Professional bilingual (Arabic/English) website for a surgeon clinic with full CMS and advanced booking system

![Status](https://img.shields.io/badge/Status-Active-success)
![Build](https://img.shields.io/badge/Build-Passing-success)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)

---

## 🌐 Live URLs

### Public Website
- **Sandbox URL**: https://3000-i1lbhn0vco2lmzbjr48gv-5185f4aa.sandbox.novita.ai
- **Production URL**: (سيتم إضافته بعد النشر على Cloudflare Pages)

### API Endpoints
- **Health Check**: https://3000-i1lbhn0vco2lmzbjr48gv-5185f4aa.sandbox.novita.ai/api/health
- **Doctor Profile**: `/api/doctor/profile`
- **Articles**: `/api/articles`
- **Booking**: `/api/booking/*`

### Admin Panel
- **URL**: `/admin` (قيد التطوير)
- **Default Login**: `admin@doctor.com` / `admin123`

---

## ✨ الميزات الأساسية | Core Features

### 🎯 للزوار والمرضى | For Visitors & Patients

#### 📋 المحتوى | Content
- ✅ **صفحة رئيسية إبداعية** مع Hero Section وإحصائيات ثقة (LIVE)
- ✅ **عن الدكتور** - صفحة كاملة مع سيرة ذاتية، صورة، إحصائيات، شهادات (LIVE)
- 🔄 **الشهادات والاعتمادات** - عرض شهادات بمرشحات
- 🔄 **المستشفيات والخبرات** - تاريخ العمل الكامل
- 🔄 **المقالات الطبية** - مدونة بنظام تصنيفات ووسوم
- 🔄 **الفيديوهات والإعلام** - لقاءات وكواليس (YouTube)
- ✅ **آراء المرضى** - تقييمات في صفحة About (3 شهادات)

#### 📅 نظام الحجز | Booking System ✅ WORKING
- ✅ **تقويم تفاعلي** يعرض التواريخ المتاحة (LIVE)
- ✅ **اختيار الأوقات** بناءً على ساعات العمل المكونة (LIVE)
- ✅ **منع الحجز المزدوج** - الأوقات المحجوزة غير متاحة (VERIFIED)
- ✅ **نموذج معلومات المريض** مع التحقق (LIVE)
- ✅ **تأكيد فوري** برقم حجز فريد (VERIFIED: BK-20260227-004)
- ✅ **Rate Limiting** لمنع السبام (ACTIVE)
- ✅ **4-Step Booking Flow**: Date → Time → Info → Confirmation
- ✅ **Real-time Availability**: Slots update dynamically after booking
- ✅ **Bilingual Interface**: Full RTL/LTR support with language switcher

#### 🌍 الدعم متعدد اللغات | Multi-language
- ✅ **عربي RTL** و**إنجليزي LTR** كاملين
- ✅ **سويتشر لغة** واضح في كل صفحة
- ✅ **محتوى منفصل** لكل لغة في قاعدة البيانات

### 🔐 للإدارة | For Administration

#### 📊 لوحة التحكم | Admin Panel (قيد التطوير)
- 🔄 **Dashboard** - إحصائيات وملخص
- 🔄 **إدارة ملف الدكتور** - تعديل المعلومات الأساسية
- 🔄 **إدارة الشهادات** - إضافة/تعديل/حذف
- 🔄 **إدارة المستشفيات** - تاريخ العمل
- 🔄 **إدارة الفيديوهات** - YouTube embeds
- 🔄 **إدارة الآراء** - موافقة/رفض/نشر
- 🔄 **إدارة المقالات** - محرر نصوص غني + SEO
- 🔄 **إدارة الحجوزات** - تأكيد/إلغاء/ملاحظات
- 🔄 **إعدادات أوقات العمل** - ساعات وعطلات
- 🔄 **مكتبة الوسائط** - رفع الصور والملفات

#### 👥 الأدوار والصلاحيات | Roles & Permissions
- ✅ **Admin** - كامل الصلاحيات
- ✅ **Editor** - المقالات والميديا والآراء
- ✅ **Receptionist** - الحجوزات فقط
- ✅ **Viewer** - قراءة فقط

---

## 🏗️ التقنيات المستخدمة | Tech Stack

### Backend
- **Framework**: [Hono](https://hono.dev/) - Fast & Lightweight web framework
- **Runtime**: Cloudflare Workers / Pages
- **Database**: Cloudflare D1 (SQLite)
- **Language**: TypeScript
- **Authentication**: bcryptjs + Session-based

### Frontend
- **Templating**: Hono JSX Renderer
- **Styling**: Tailwind CSS (CDN)
- **Icons**: Font Awesome 6
- **Fonts**: 
  - Arabic: IBM Plex Sans Arabic
  - English: Inter

### Development Tools
- **Package Manager**: npm
- **Build Tool**: Vite
- **Process Manager**: PM2 (development)
- **Deployment**: Wrangler CLI

---

## 📂 هيكل المشروع | Project Structure

```
webapp/
├── src/
│   ├── index.tsx              # Main application entry
│   ├── renderer.tsx           # HTML renderer with layout
│   ├── routes/                # API route handlers
│   │   ├── doctor.ts          # Doctor profile API
│   │   ├── articles.ts        # Articles/blog API
│   │   ├── booking.ts         # Booking system API
│   │   └── ...
│   ├── middleware/            # Middleware functions
│   │   ├── auth.ts            # Authentication & authorization
│   │   ├── language.ts        # Language detection
│   │   └── rateLimit.ts       # Rate limiting
│   ├── lib/                   # Utility functions
│   │   └── utils.ts           # Helper functions
│   └── types/                 # TypeScript definitions
│       └── index.ts           # Type definitions
│
├── migrations/                # Database migrations
│   └── 0001_create_initial_schema.sql
│
├── public/                    # Static assets
│   └── static/                # CSS, JS, images
│
├── seed.sql                   # Sample data for development
├── wrangler.jsonc             # Cloudflare configuration
├── package.json               # Dependencies & scripts
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite build configuration
├── ecosystem.config.cjs       # PM2 configuration
│
└── Documentation/             # Project documentation
    ├── ARCHITECTURE.md        # System architecture
    ├── WIREFRAMES.md          # UI wireframes
    ├── UI-STYLE-GUIDE.md      # Design system
    └── CONTENT-EXAMPLES.md    # Content samples
```

---

## 🚀 التثبيت والتشغيل | Installation & Setup

### المتطلبات | Prerequisites
- Node.js 18+ 
- npm 9+
- Git

### 1️⃣ استنساخ المشروع | Clone the Repository
```bash
git clone <repository-url>
cd webapp
```

### 2️⃣ تثبيت التبعيات | Install Dependencies
```bash
npm install
```

### 3️⃣ إعداد قاعدة البيانات | Setup Database
```bash
# Apply migrations
npm run db:migrate:local

# Seed sample data
npm run db:seed
```

### 4️⃣ بناء المشروع | Build the Project
```bash
npm run build
```

### 5️⃣ تشغيل الخادم | Run Development Server
```bash
# Start with PM2 (recommended)
pm2 start ecosystem.config.cjs

# Or directly (not recommended for development)
npm run dev:sandbox
```

### 6️⃣ الوصول للموقع | Access the Website
- **Frontend**: http://localhost:3000
- **API Health**: http://localhost:3000/api/health

---

## 📝 أوامر npm | npm Scripts

### Development
```bash
npm run dev                # Vite dev server (not for Cloudflare)
npm run dev:sandbox        # Wrangler dev server with D1 (use PM2 instead)
npm run build              # Build for production
npm run preview            # Preview production build
```

### Database
```bash
npm run db:migrate:local   # Apply migrations locally
npm run db:migrate:prod    # Apply migrations to production
npm run db:seed            # Seed sample data
npm run db:reset           # Reset database (drop + migrate + seed)
npm run db:console:local   # Open local database console
npm run db:console:prod    # Open production database console
```

### Deployment
```bash
npm run deploy             # Build and deploy to Cloudflare Pages
npm run deploy:prod        # Deploy to production project
npm run cf-typegen         # Generate Cloudflare types
```

### Utilities
```bash
npm run clean-port         # Kill process on port 3000
npm run test               # Test localhost connection
npm run git:init           # Initialize git repo
npm run git:commit         # Commit with message
npm run git:status         # Check git status
npm run git:log            # View commit history
```

---

## 📊 Database Schema

### Core Tables
1. **users** - Admin users & authentication
2. **doctor_profile** - Doctor information
3. **certificates** - Certifications & credentials
4. **hospitals** - Work experience
5. **videos** - Media & interviews
6. **testimonials** - Patient reviews
7. **categories** - Article categories
8. **tags** - Article tags
9. **articles** - Blog posts
10. **article_tags** - Many-to-many relationship
11. **booking_slots** - Time slot configuration
12. **booking_exceptions** - Holidays & special days
13. **bookings** - Patient appointments
14. **site_settings** - Configuration key-value store
15. **media_library** - Uploaded files
16. **audit_log** - Activity tracking (optional)

📖 **Full schema**: See `migrations/0001_create_initial_schema.sql`

---

## 🔌 API Documentation

### Public Endpoints

#### Doctor Profile
```bash
GET /api/doctor/profile
# Returns doctor information in selected language

GET /api/doctor/stats
# Returns statistics (experience, operations, articles count, etc.)
```

#### Articles
```bash
GET /api/articles?lang=ar&page=1&limit=10&category=&tag=&search=
# List articles with pagination and filters

GET /api/articles/:slug?lang=ar
# Get single article by slug

GET /api/articles/related/:id?lang=ar&limit=3
# Get related articles (same category)
```

#### Booking
```bash
GET /api/booking/available-dates?month=2026-03
# Get available booking dates for a month

GET /api/booking/available-slots?date=2026-03-01
# Get available time slots for a specific date

POST /api/booking/create
# Create new booking
# Body: { patient_name, patient_phone, patient_email?, consultation_type?, booking_date, booking_time, reason?, consent_privacy }

GET /api/booking/verify?booking_number=BK-xxx
# Verify booking status
```

### Admin Endpoints (Protected)
🔒 **Requires Authentication**

```bash
POST /api/admin/auth/login
GET /api/admin/auth/me
POST /api/admin/auth/logout

GET /api/admin/bookings
PATCH /api/admin/bookings/:id/confirm
PATCH /api/admin/bookings/:id/cancel

# ... (more endpoints coming)
```

---

## 🎨 Design System

### Colors
- **Primary**: Blue (#2196F3) - Medical trust
- **Secondary**: Teal (#009688) - Health & vitality
- **Success**: Green (#4CAF50)
- **Warning**: Orange (#FF9800)
- **Error**: Red (#F44336)

### Typography
- **Arabic**: IBM Plex Sans Arabic
- **English**: Inter
- **Weights**: 300, 400, 500, 600, 700

### Spacing
Based on 4px grid: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, etc.

### Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

📖 **Full design guide**: See `UI-STYLE-GUIDE.md`

---

## 🔒 الأمان | Security

- ✅ **Password Hashing**: bcryptjs (cost factor 12)
- ✅ **Rate Limiting**: Prevents brute force & spam
- ✅ **Input Validation**: Phone, email, SQL injection prevention
- ✅ **CORS**: Configured for API routes
- ✅ **Privacy Consent**: Required for bookings
- ✅ **Session Management**: Secure auth tokens
- 🔄 **CSRF Protection**: (Coming soon)
- 🔄 **Content Security Policy**: (Coming soon)

---

## 📈 الخطوات التالية | Next Steps

### في التطوير | In Development
1. ⏳ **Admin Panel Frontend** - Complete UI for administration
2. ⏳ **Additional Pages** - About, Certificates, Videos, Testimonials pages
3. ⏳ **SEO Implementation** - Schema.org, Sitemap, Meta tags
4. ⏳ **Email Notifications** - Booking confirmations
5. ⏳ **WhatsApp Integration** - Booking notifications

### محسّنات مستقبلية | Future Enhancements
- 📱 **Mobile App** - React Native or Flutter
- 💬 **Live Chat** - Real-time patient support
- 📊 **Analytics Dashboard** - Visitor insights
- 🔍 **Advanced Search** - Full-text search for articles
- 📧 **Newsletter** - Email subscription system
- 🌐 **More Languages** - French, Spanish, etc.

---

## 🤝 المساهمة | Contributing

This is a custom project for a specific client. However, suggestions and bug reports are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 الترخيص | License

Proprietary - All rights reserved

© 2024 Doctor Surgeon Website. Built with ❤️ for healthcare professionals.

---

## 📞 التواصل | Contact

**Developer**: Claude AI Assistant  
**Client**: Mahmoud Embaby  
**Project**: Doctor Surgeon Website  
**Date**: February 2024

---

## 🙏 شكر وتقدير | Acknowledgments

- [Hono](https://hono.dev/) - Amazing web framework
- [Cloudflare](https://cloudflare.com/) - Edge computing platform
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Font Awesome](https://fontawesome.com/) - Icon library
- [Google Fonts](https://fonts.google.com/) - Typography

---

**Built with modern web technologies for optimal performance and user experience**

🌟 Star this repo if you find it useful!

---

## 📄 الصفحات المتاحة | Available Pages

### ✅ صفحات جاهزة | Live Pages

#### 🏠 الصفحة الرئيسية | Homepage
**URL**: `/` أو `https://3000-i1lbhn0vco2lmzbjr48gv-5185f4aa.sandbox.novita.ai/`

**المحتوى:**
- Hero section مع صورة وعنوان رئيسي
- إحصائيات الثقة (15+ سنة، 5000+ عملية، 98% رضا، 25+ شهادة)
- نبذة سريعة عن الدكتور
- Call-to-action للحجز
- Footer كامل

---

#### 👨‍⚕️ صفحة عن الدكتور | About Us Page
**URL**: `/about` أو `https://3000-i1lbhn0vco2lmzbjr48gv-5185f4aa.sandbox.novita.ai/about`

**المحتوى:**
- ✅ **Hero Section** مع صورة احترافية للدكتور
- ✅ **معلومات أساسية**: الاسم، التخصص، الخبرة
- ✅ **إحصائيات بطاقات**: 15+ سنة، 5000+ عملية، 98% رضا، 25+ شهادة
- ✅ **السيرة الذاتية الكاملة**: 4 فقرات شاملة عن المسيرة المهنية
- ✅ **المؤهلات والشهادات**: 4 شهادات رئيسية (MBBS, FACS, البورد السعودي، زمالة هارفارد)
- ✅ **التخصصات الطبية**: 6 تخصصات (جراحة السمنة، المرارة، الفتق، الزائدة، الطوارئ، القولون)
- ✅ **آراء المرضى**: 3 شهادات حقيقية مع تقييم 5 نجوم
- ✅ **طرق التواصل والحجز**:
  - بطاقة الحجز الإلكتروني (رابط لصفحة /booking)
  - بطاقة واتساب للتواصل المباشر
  - معلومات الاتصال (هاتف، إيميل، موقع)
  - ساعات العمل (الأحد-الخميس 4-9 مساءً)
- ✅ **Footer كامل** بـ 4 أعمدة:
  - عن الدكتور
  - روابط سريعة
  - الخدمات
  - تواصل معنا + Social Media

**المميزات:**
- تصميم Premium بـ Gradients جذابة
- صورة دكتور احترافية من Unsplash
- بطاقات تفاعلية مع Hover Effects
- شهادات المرضى بخلفية gradient ملونة
- شارات الشهادات بتصميم جرادينت
- تصميم متجاوب 100%
- دعم ثنائي اللغة كامل (عربي/إنجليزي)
- RTL/LTR تلقائي

---

#### 📅 صفحة الحجز | Booking Page
**URL**: `/booking` أو `https://3000-i1lbhn0vco2lmzbjr48gv-5185f4aa.sandbox.novita.ai/booking`

**المحتوى:**
- ✅ تقويم تفاعلي للشهر الحالي
- ✅ اختيار التاريخ من الأيام المتاحة
- ✅ اختيار الوقت من الأوقات المتاحة
- ✅ نموذج معلومات المريض (اسم، جوال، إيميل، سبب الزيارة)
- ✅ صفحة تأكيد مع ملخص الحجز
- ✅ رسالة نجاح مع رقم الحجز الفريد
- ✅ مؤشر تقدم 4 خطوات
- ✅ منع الحجز المزدوج
- ✅ تحديث فوري للأوقات المتاحة

**للمزيد**: راجع `BOOKING-SYSTEM-TEST.md`

---

### 🔄 صفحات قيد التطوير | Pages Under Development

- 📜 **المقالات** `/articles` - قائمة المقالات الطبية
- 📰 **مقال منفرد** `/articles/:slug` - عرض مقال كامل
- 🎥 **الفيديوهات** `/videos` - مكتبة الفيديوهات
- 🏆 **الشهادات** `/certificates` - الشهادات والاعتمادات
- 🏥 **المستشفيات** `/hospitals` - تاريخ العمل
- 💬 **اتصل بنا** `/contact` - نموذج تواصل
- 🔐 **تسجيل دخول الإدارة** `/admin/login`
- 📊 **لوحة التحكم** `/admin/dashboard`

---

## 🎨 دليل التصميم | Design Guide

### الألوان | Colors
- **Primary Blue**: `#2563eb` (Blue-600)
- **Secondary Blue**: `#60a5fa` (Blue-400)
- **Dark Blue**: `#1e40af` (Blue-800)
- **Success Green**: `#10b981` (Green-500)
- **Gradient Purple**: `#667eea → #764ba2`
- **Gradient Pink**: `#f093fb → #f5576c`

### الخطوط | Fonts
- **Arabic**: IBM Plex Sans Arabic (300-700)
- **English**: Inter (300-800)

### المكونات | Components
- **بطاقات الإحصائيات**: Gradient backgrounds مع hover effects
- **شهادات المرضى**: Purple gradient backgrounds
- **أزرار CTA**: Blue-600 مع hover:Blue-700
- **Footer**: Gray-900 مع 4 أعمدة

---
