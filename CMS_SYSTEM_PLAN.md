# 🎛️ نظام إدارة المحتوى (CMS) - دليل شامل

## 📋 نظرة عامة

تم تصميم نظام إدارة محتوى متكامل للتحكم الكامل في موقع الدكتور محمد سعيد.

---

## 🗄️ قاعدة البيانات (Database Schema)

### الجداول الرئيسية (12 جدول):

#### 1. **users** - المستخدمين (الأدمن)
```sql
- id, username, email, password_hash
- full_name, role (admin/editor)
- is_active, last_login
- created_at, updated_at
```

#### 2. **doctor_info** - معلومات الدكتور
```sql
- full_name (ar/en), title (ar/en)
- bio (ar/en)
- specialties, fellowships, education (JSON)
- experience_years
- photo_url, signature_url, cv_url
```

#### 3. **articles** - المقالات
```sql
- slug, title (ar/en)
- excerpt (ar/en), content (ar/en)
- main_image_url, category, tags
- author_id, read_time, views
- is_published, published_at
- SEO: meta_title, meta_description, meta_keywords, og_image
```

#### 4. **article_images** - صور المقالات
```sql
- article_id, image_url
- caption (ar/en), alt_text (ar/en)
- display_order
```

#### 5. **site_settings** - إعدادات الموقع
```sql
- setting_key, setting_value
- setting_type (text/number/json/boolean/color)
- category (general/contact/social/theme/seo)
```

#### 6. **contact_info** - معلومات الاتصال
```sql
- type (phone/email/address/whatsapp/hours)
- label (ar/en), value
- icon, display_order, is_active
```

#### 7. **social_media** - وسائل التواصل
```sql
- platform, url, icon
- display_order, is_active
```

#### 8. **menu_items** - عناصر القوائم
```sql
- menu_location (header/footer)
- label (ar/en), url
- icon, parent_id, display_order, is_active
```

#### 9. **media_library** - مكتبة الوسائط
```sql
- filename, file_path, file_url
- file_type (image/video/document)
- mime_type, file_size, width, height
- alt_text (ar/en), uploaded_by
```

#### 10. **youtube_settings** - إعدادات يوتيوب
```sql
- api_key, channel_id, channel_handle
- max_videos, auto_update, cache_duration
```

#### 11. **page_content** - محتوى الصفحات الديناميكي
```sql
- page_slug, page_title (ar/en)
- content (ar/en), sections (JSON)
- SEO fields, is_published
```

#### 12. **analytics** - إحصائيات الزيارات
```sql
- page_path, user_agent, ip_address
- referrer, language
- visit_date, visit_time
```

---

## 🔐 نظام المصادقة (Authentication)

### المميزات:
- ✅ تسجيل دخول آمن (JWT Token)
- ✅ تشفير كلمات المرور (bcrypt)
- ✅ Session Management
- ✅ Role-Based Access Control (Admin/Editor)
- ✅ Password Reset
- ✅ Login History

### API Endpoints:
```
POST   /api/auth/login         - تسجيل الدخول
POST   /api/auth/logout        - تسجيل الخروج
POST   /api/auth/refresh       - تجديد Token
GET    /api/auth/me            - معلومات المستخدم الحالي
POST   /api/auth/change-password - تغيير كلمة المرور
```

---

## 🎨 لوحة التحكم (Admin Dashboard)

### الأقسام الرئيسية:

#### 1. **Dashboard (الرئيسية)**
- نظرة عامة على الإحصائيات
- عدد المقالات المنشورة
- عدد الزيارات
- آخر التعليقات
- آخر المقالات

#### 2. **Articles Management (إدارة المقالات)**
- عرض جميع المقالات
- إضافة مقالة جديدة
- تعديل المقالات
- حذف المقالات
- معاينة قبل النشر
- إدارة الصور
- تحسين SEO

#### 3. **Doctor Info (معلومات الدكتور)**
- تحديث البيانات الشخصية
- إدارة الصور (الشخصية، التوقيع)
- التخصصات والزمالات
- التعليم والخبرات
- السيرة الذاتية

#### 4. **Site Settings (إعدادات الموقع)**
- **General**: اسم الموقع، الشعار، اللغة الافتراضية
- **Theme**: الألوان، الخطوط
- **Contact**: معلومات الاتصال
- **Social Media**: روابط التواصل
- **SEO**: Meta tags, Google Analytics
- **YouTube**: API Key, Channel ID

#### 5. **Menus (القوائم)**
- إدارة قائمة الهيدر
- إدارة قائمة الفوتر
- إضافة/تعديل/حذف عناصر
- ترتيب العناصر (Drag & Drop)
- قوائم فرعية (Nested Menus)

#### 6. **Media Library (مكتبة الوسائط)**
- رفع الصور
- رفع المستندات
- إدارة الملفات
- بحث وفلترة
- معاينة الصور

#### 7. **Pages (الصفحات)**
- تعديل محتوى الصفحات الثابتة
- عن الدكتور
- صفحة الاتصال
- الشروط والأحكام
- سياسة الخصوصية

#### 8. **Analytics (التحليلات)**
- إحصائيات الزيارات
- الصفحات الأكثر زيارة
- مصادر الزوار
- الدول والمدن
- الأجهزة والمتصفحات

#### 9. **Users (المستخدمين)**
- إدارة مستخدمي لوحة التحكم
- إضافة مستخدم جديد
- تعديل الصلاحيات
- حذف المستخدمين

---

## 📡 API Endpoints (الكاملة)

### Authentication APIs
```
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh
GET    /api/auth/me
POST   /api/auth/change-password
```

### Articles APIs
```
GET    /api/admin/articles           - جميع المقالات
GET    /api/admin/articles/:id       - مقالة واحدة
POST   /api/admin/articles           - إضافة مقالة
PUT    /api/admin/articles/:id       - تعديل مقالة
DELETE /api/admin/articles/:id       - حذف مقالة
POST   /api/admin/articles/:id/publish - نشر مقالة
POST   /api/admin/articles/:id/images  - إضافة صور
```

### Doctor Info APIs
```
GET    /api/admin/doctor             - معلومات الدكتور
PUT    /api/admin/doctor             - تحديث المعلومات
POST   /api/admin/doctor/photo       - رفع صورة
DELETE /api/admin/doctor/photo       - حذف صورة
```

### Site Settings APIs
```
GET    /api/admin/settings           - جميع الإعدادات
GET    /api/admin/settings/:key      - إعداد محدد
PUT    /api/admin/settings/:key      - تحديث إعداد
POST   /api/admin/settings/bulk      - تحديث متعدد
```

### Contact Info APIs
```
GET    /api/admin/contact            - جميع معلومات الاتصال
POST   /api/admin/contact            - إضافة معلومة
PUT    /api/admin/contact/:id        - تعديل معلومة
DELETE /api/admin/contact/:id        - حذف معلومة
```

### Social Media APIs
```
GET    /api/admin/social             - جميع وسائل التواصل
POST   /api/admin/social             - إضافة وسيلة
PUT    /api/admin/social/:id         - تعديل وسيلة
DELETE /api/admin/social/:id         - حذف وسيلة
```

### Menu APIs
```
GET    /api/admin/menus/:location    - عناصر القائمة
POST   /api/admin/menus              - إضافة عنصر
PUT    /api/admin/menus/:id          - تعديل عنصر
DELETE /api/admin/menus/:id          - حذف عنصر
POST   /api/admin/menus/reorder      - إعادة ترتيب
```

### Media APIs
```
GET    /api/admin/media              - جميع الملفات
POST   /api/admin/media/upload       - رفع ملف
DELETE /api/admin/media/:id          - حذف ملف
GET    /api/admin/media/:id          - تفاصيل ملف
```

### Pages APIs
```
GET    /api/admin/pages              - جميع الصفحات
GET    /api/admin/pages/:slug        - صفحة محددة
PUT    /api/admin/pages/:slug        - تحديث صفحة
```

### Analytics APIs
```
GET    /api/admin/analytics/overview - نظرة عامة
GET    /api/admin/analytics/pages    - صفحات
GET    /api/admin/analytics/sources  - مصادر
GET    /api/admin/analytics/devices  - أجهزة
```

### YouTube APIs
```
GET    /api/admin/youtube/settings   - إعدادات يوتيوب
PUT    /api/admin/youtube/settings   - تحديث إعدادات
POST   /api/admin/youtube/refresh    - تحديث الفيديوهات
```

---

## 🎨 واجهة المستخدم (Admin UI)

### التقنيات المستخدمة:
- **Framework**: React (or Vue.js)
- **UI Library**: Tailwind CSS + DaisyUI
- **Icons**: Font Awesome
- **Rich Text Editor**: TinyMCE or Quill
- **Forms**: React Hook Form
- **State Management**: Context API or Zustand
- **HTTP Client**: Axios
- **Routing**: React Router

### المكونات الرئيسية:
```
/admin
  /dashboard       - الرئيسية
  /articles        - المقالات
    /list          - القائمة
    /new           - إضافة جديد
    /edit/:id      - تعديل
  /doctor          - معلومات الدكتور
  /settings        - الإعدادات
    /general       - عام
    /theme         - السمة
    /contact       - الاتصال
    /social        - التواصل
    /seo           - SEO
    /youtube       - يوتيوب
  /menus           - القوائم
  /media           - المكتبة
  /pages           - الصفحات
  /analytics       - التحليلات
  /users           - المستخدمين
```

---

## 🔧 SEO Optimization

### للمقالات:
- ✅ Meta Title (عربي/إنجليزي)
- ✅ Meta Description (عربي/إنجليزي)
- ✅ Meta Keywords
- ✅ Open Graph Tags
- ✅ Twitter Cards
- ✅ Canonical URL
- ✅ Schema Markup (Article)
- ✅ Alt Text للصور
- ✅ Sitemap XML
- ✅ Robots.txt

### للموقع:
- ✅ Sitemap Generator
- ✅ Robots.txt Editor
- ✅ Google Analytics Integration
- ✅ Google Search Console
- ✅ Schema.org Markup
- ✅ Structured Data
- ✅ 404 Page Optimization
- ✅ Page Speed Optimization

---

## 📱 المميزات الإضافية

### 1. **Image Optimization**
- Auto-resize images
- WebP conversion
- Lazy loading
- CDN integration (Cloudflare)

### 2. **Caching System**
- Page caching
- API response caching
- Static asset caching
- Cache invalidation

### 3. **Backup System**
- Automatic database backup
- Manual backup trigger
- Backup restoration
- Export/Import functionality

### 4. **Notifications**
- Email notifications
- In-app notifications
- System alerts

### 5. **Version Control**
- Content versioning
- Revision history
- Rollback capability

---

## 🔒 الأمان (Security)

### المميزات:
- ✅ JWT Authentication
- ✅ Password Hashing (bcrypt)
- ✅ CSRF Protection
- ✅ XSS Protection
- ✅ SQL Injection Prevention
- ✅ Rate Limiting
- ✅ IP Whitelisting
- ✅ Activity Logging
- ✅ Secure File Upload
- ✅ Input Validation
- ✅ Output Sanitization

---

## 📦 البنية التقنية

### Backend:
```
src/
  routes/
    admin/
      auth.ts           - المصادقة
      articles.ts       - المقالات
      doctor.ts         - معلومات الدكتور
      settings.ts       - الإعدادات
      contact.ts        - الاتصال
      social.ts         - التواصل
      menus.ts          - القوائم
      media.ts          - الوسائط
      pages.ts          - الصفحات
      analytics.ts      - التحليلات
      users.ts          - المستخدمين
      youtube.ts        - يوتيوب
  middleware/
    auth.ts             - مصادقة JWT
    validate.ts         - التحقق من البيانات
    upload.ts           - رفع الملفات
    rateLimiter.ts      - تحديد المعدل
  services/
    auth.service.ts
    article.service.ts
    doctor.service.ts
    media.service.ts
    seo.service.ts
  utils/
    hash.ts             - تشفير
    jwt.ts              - JWT
    validator.ts        - التحقق
    imageOptimizer.ts   - تحسين الصور
```

### Frontend (Admin Dashboard):
```
admin-dashboard/
  src/
    components/
      layout/
        Sidebar.tsx
        Header.tsx
        Footer.tsx
      common/
        Button.tsx
        Input.tsx
        Card.tsx
        Modal.tsx
        Table.tsx
      articles/
        ArticleList.tsx
        ArticleForm.tsx
        ArticleEditor.tsx
      doctor/
        DoctorProfile.tsx
        DoctorPhotos.tsx
      settings/
        GeneralSettings.tsx
        ThemeSettings.tsx
        ContactSettings.tsx
    pages/
      Dashboard.tsx
      Articles.tsx
      Doctor.tsx
      Settings.tsx
      Menus.tsx
      Media.tsx
    hooks/
      useAuth.ts
      useApi.ts
      useToast.ts
    contexts/
      AuthContext.tsx
      ThemeContext.tsx
    services/
      api.service.ts
      auth.service.ts
    utils/
      helpers.ts
      constants.ts
```

---

## 🚀 خطة التنفيذ

### المرحلة 1: البنية التحتية (3-5 أيام)
- [x] إنشاء schema قاعدة البيانات
- [ ] إعداد D1 Database
- [ ] إنشاء Migrations
- [ ] نظام Authentication الأساسي
- [ ] Middleware للمصادقة

### المرحلة 2: APIs الأساسية (5-7 أيام)
- [ ] Articles CRUD APIs
- [ ] Doctor Info APIs
- [ ] Settings APIs
- [ ] Contact & Social APIs
- [ ] Menu APIs
- [ ] Media Upload API

### المرحلة 3: Admin Dashboard (7-10 أيام)
- [ ] بنية Dashboard الأساسية
- [ ] صفحة تسجيل الدخول
- [ ] Dashboard الرئيسية
- [ ] إدارة المقالات
- [ ] إدارة معلومات الدكتور
- [ ] إدارة الإعدادات

### المرحلة 4: المميزات المتقدمة (5-7 أيام)
- [ ] Rich Text Editor
- [ ] Image Optimization
- [ ] SEO Management
- [ ] Analytics Dashboard
- [ ] Media Library
- [ ] Menus Management

### المرحلة 5: الربط والاختبار (3-5 أيام)
- [ ] ربط الصفحات الأمامية بالـ APIs
- [ ] اختبار شامل
- [ ] تحسين الأداء
- [ ] Security Hardening
- [ ] Documentation

### المرحلة 6: النشر (2-3 أيام)
- [ ] إعداد Production Database
- [ ] Deploy Backend
- [ ] Deploy Admin Dashboard
- [ ] Testing في Production
- [ ] Training & Handover

---

## 📊 الإحصائيات المتوقعة

### حجم المشروع:
- **Backend APIs**: ~3,000 lines
- **Admin Dashboard**: ~5,000 lines
- **Database Schema**: ~500 lines
- **Documentation**: ~1,000 lines
- **Total**: ~9,500 lines

### الوقت المتوقع:
- **Development**: 25-35 أيام
- **Testing**: 5-7 أيام
- **Deployment**: 2-3 أيام
- **Total**: 32-45 يوم عمل

---

## 💰 التكلفة المقدرة

### Cloudflare Services:
- **D1 Database**: Free (First 5GB)
- **R2 Storage**: $0.015/GB/month
- **Workers**: $5/month (Paid Plan)
- **Pages**: Free

### Estimated Monthly Cost:
- **Storage (10GB)**: ~$0.15
- **Workers**: $5.00
- **Total**: ~$5.15/month

---

## 📞 الدعم والصيانة

### ما يشمله:
- ✅ Bug fixes
- ✅ Security updates
- ✅ Feature enhancements
- ✅ Performance optimization
- ✅ Backup management
- ✅ Technical support

---

## ✅ الحالة الحالية

- [x] Database Schema - **مكتمل**
- [ ] Authentication System - **قيد التطوير**
- [ ] Admin APIs - **لم يبدأ**
- [ ] Admin Dashboard - **لم يبدأ**
- [ ] Frontend Integration - **لم يبدأ**
- [ ] Testing - **لم يبدأ**
- [ ] Deployment - **لم يبدأ**

---

## 📝 الخطوات التالية

### للبدء الفوري:
1. ✅ تأكيد متطلبات المشروع
2. ⏳ إنشاء D1 Database
3. ⏳ تطبيق Migrations
4. ⏳ بناء Authentication System
5. ⏳ بناء أول API (Articles)
6. ⏳ بناء Admin Login Page

---

**آخر تحديث:** 2026-02-27  
**الحالة:** Schema جاهز، بانتظار الموافقة للبدء بالتطوير  
**المدة المتوقعة:** 6-8 أسابيع للنظام الكامل
