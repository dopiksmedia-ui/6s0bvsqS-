# 🚀 دليل نشر الموقع على Cloudflare Pages

## خطوات النشر الكاملة

### المتطلبات الأساسية
- ✅ حساب Cloudflare (مجاني)
- ✅ Cloudflare API Token
- ✅ دومين خاص (اختياري، يمكن استخدام subdomain من Cloudflare)

---

## 📋 الخطوة 1: إعداد Cloudflare API Key

### 1.1 الحصول على API Token من Cloudflare:

1. اذهب إلى: https://dash.cloudflare.com/profile/api-tokens
2. اضغط على **"Create Token"**
3. اختر **"Edit Cloudflare Workers"** template أو **"Custom Token"**
4. أعط التوكن الصلاحيات التالية:
   - **Account** → Cloudflare Pages → Edit
   - **Account** → D1 → Edit
   - **Account** → R2 → Edit
5. اضغط **"Continue to summary"** ثم **"Create Token"**
6. **انسخ التوكن** (لن يظهر مرة أخرى!)

### 1.2 إضافة API Token في GenSpark:

1. اذهب إلى تبويب **Deploy** في الشريط الجانبي
2. ابحث عن **Cloudflare Pages**
3. الصق API Token
4. احفظ الإعدادات

---

## 📋 الخطوة 2: إعداد GitHub Repository (موصى به)

### 2.1 إنشاء GitHub Repository:

```bash
# في الـ terminal
cd /home/user/webapp

# التأكد من أن git initialized
git status

# إذا لم يكن initialized
git init
git add .
git commit -m "Initial commit"
```

### 2.2 Push إلى GitHub:

**هام:** قبل Push إلى GitHub، **يجب** استدعاء `setup_github_environment` لإعداد المصادقة.

```bash
# في GenSpark، استخدم أداة setup_github_environment أولاً
# ثم في terminal:

# أضف remote repository (استبدل USERNAME و REPO)
git remote add origin https://github.com/USERNAME/REPO.git

# Push الكود
git push -u origin main
```

---

## 📋 الخطوة 3: إنشاء مشروع Cloudflare Pages

### الطريقة 1: عبر Wrangler CLI (موصى به)

```bash
cd /home/user/webapp

# 1. تسجيل الدخول
npx wrangler login

# 2. بناء المشروع
npm run build

# 3. إنشاء المشروع على Cloudflare Pages
npx wrangler pages project create doctor-surgeon \
  --production-branch main

# 4. رفع المشروع
npx wrangler pages deploy dist \
  --project-name doctor-surgeon \
  --branch main
```

### الطريقة 2: عبر Cloudflare Dashboard + GitHub

1. اذهب إلى: https://dash.cloudflare.com/
2. اختر **"Workers & Pages"** من القائمة الجانبية
3. اضغط **"Create application"**
4. اختر **"Pages"** → **"Connect to Git"**
5. اختر **GitHub** وأذن بالوصول
6. اختر Repository الخاص بك
7. إعدادات البناء:
   ```
   Build command: npm run build
   Build output directory: dist
   Root directory: /
   ```
8. اضغط **"Save and Deploy"**

---

## 📋 الخطوة 4: إنشاء قاعدة بيانات D1 (Production)

```bash
# 1. إنشاء قاعدة بيانات الإنتاج
npx wrangler d1 create doctor-db-production

# 2. انسخ database_id من الناتج
# مثال: database_id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"

# 3. حدّث wrangler.jsonc
# استبدل "your-database-id-from-cloudflare" بـ database_id الحقيقي
```

### تطبيق الهجرات على قاعدة الإنتاج:

```bash
# تطبيق جميع الهجرات
npx wrangler d1 migrations apply doctor-db-production --remote

# التحقق من الجداول
npx wrangler d1 execute doctor-db-production \
  --remote \
  --command="SELECT name FROM sqlite_master WHERE type='table';"
```

### إضافة بيانات أولية:

```bash
# إضافة مستخدم admin
npx wrangler d1 execute doctor-db-production --remote --command="
INSERT INTO users (email, password_hash, full_name, role, status)
VALUES ('admin@drmohammedsaeed.com', '\$2a\$10\$xYzAbc123...', 'Admin User', 'admin', 'active');
"

# إضافة أوقات عمل
npx wrangler d1 execute doctor-db-production --remote --command="
INSERT INTO booking_slots (day_of_week, start_time, end_time, slot_duration, is_active)
VALUES 
  (0, '09:00', '13:00', 30, 1),
  (0, '16:00', '20:00', 30, 1),
  (2, '09:00', '13:00', 30, 1),
  (2, '16:00', '20:00', 30, 1),
  (4, '16:00', '20:00', 30, 1);
"

# إضافة إعدادات الموقع
npx wrangler d1 execute doctor-db-production --remote --command="
INSERT INTO site_settings (setting_key, setting_value, setting_type, group_name)
VALUES 
  ('site_logo_url', '/static/logo.png', 'text', 'general'),
  ('site_name_ar', 'د. محمد سعيد علي', 'text', 'general'),
  ('site_name_en', 'Dr. Mohammed Saeed Ali', 'text', 'general'),
  ('primary_language', 'ar', 'text', 'language'),
  ('secondary_language', 'en', 'text', 'language'),
  ('enable_secondary_language', '1', 'boolean', 'language'),
  ('phone_number', '0127444444', 'text', 'contact'),
  ('youtube_api_key', 'YOUR_YOUTUBE_API_KEY', 'text', 'integrations');
"
```

---

## 📋 الخطوة 5: إنشاء R2 Bucket للصور (اختياري)

```bash
# 1. إنشاء R2 bucket
npx wrangler r2 bucket create doctor-media-bucket

# 2. تفعيل Public Access (للصور)
# اذهب إلى: Cloudflare Dashboard → R2 → doctor-media-bucket → Settings
# فعّل "Public Access"
# أو ربط Custom Domain
```

---

## 📋 الخطوة 6: ربط الدومين

### 6.1 إذا كان الدومين في Cloudflare:

1. اذهب إلى: Workers & Pages → doctor-surgeon → Custom domains
2. اضغط **"Set up a custom domain"**
3. أدخل الدومين (مثال: `drmohammedsaeed.com` أو `www.drmohammedsaeed.com`)
4. اضغط **"Continue"**
5. Cloudflare سيضيف DNS records تلقائياً
6. انتظر حتى يظهر **"Active"** (عادة 1-5 دقائق)

### 6.2 إذا كان الدومين في مزود آخر (GoDaddy, Namecheap, إلخ):

#### الخيار 1: نقل الـ DNS إلى Cloudflare (موصى به):

1. اذهب إلى: Cloudflare Dashboard → Add site
2. أدخل الدومين واتبع التعليمات
3. غيّر Nameservers في مزود الدومين إلى:
   ```
   clara.ns.cloudflare.com
   griffin.ns.cloudflare.com
   ```
4. انتظر حتى ينشط (24-48 ساعة)
5. ثم اتبع خطوات 6.1

#### الخيار 2: إضافة CNAME فقط:

1. اذهب إلى لوحة تحكم الدومين
2. أضف CNAME record:
   ```
   Type: CNAME
   Name: www (أو @ للدومين الرئيسي)
   Value: doctor-surgeon.pages.dev
   ```
3. احفظ
4. في Cloudflare Pages، أضف custom domain واختر **"External DNS"**

---

## 📋 الخطوة 7: إعداد Environment Variables

```bash
# إضافة متغيرات البيئة (Secrets)
npx wrangler pages secret put YOUTUBE_API_KEY --project-name doctor-surgeon
npx wrangler pages secret put JWT_SECRET --project-name doctor-surgeon

# أو عبر Dashboard:
# Workers & Pages → doctor-surgeon → Settings → Environment variables
```

**المتغيرات المهمة:**
- `YOUTUBE_API_KEY` - مفتاح YouTube API للفيديوهات
- `JWT_SECRET` - سر JWT للمصادقة (لاحقاً)
- `ADMIN_PASSWORD_HASH` - هاش كلمة مرور الأدمن

---

## 📋 الخطوة 8: التحقق من النشر

### 8.1 اختبار الموقع:

```bash
# URL المؤقت من Cloudflare
https://doctor-surgeon.pages.dev

# أو الدومين المخصص بعد الربط
https://drmohammedsaeed.com
```

### 8.2 اختبار API:

```bash
# Health check
curl https://drmohammedsaeed.com/api/health

# Articles API
curl https://drmohammedsaeed.com/api/articles

# Bookings API
curl https://drmohammedsaeed.com/api/booking/available-dates?month=2026-03
```

### 8.3 اختبار قاعدة البيانات:

```bash
# من terminal محلي
npx wrangler d1 execute doctor-db-production --remote \
  --command="SELECT COUNT(*) as count FROM articles;"

npx wrangler d1 execute doctor-db-production --remote \
  --command="SELECT COUNT(*) as count FROM bookings;"
```

---

## 🔧 استكشاف الأخطاء (Troubleshooting)

### ❌ خطأ: "Database not found"

**الحل:**
```bash
# تأكد من database_id في wrangler.jsonc
npx wrangler d1 list

# إذا لم يكن موجوداً، أنشئه
npx wrangler d1 create doctor-db-production
```

### ❌ خطأ: "No such table: bookings"

**الحل:**
```bash
# طبّق الهجرات على الإنتاج
npx wrangler d1 migrations apply doctor-db-production --remote
```

### ❌ خطأ: "Deployment failed"

**الحل:**
```bash
# تحقق من build محلياً
npm run build

# تحقق من حجم dist/
du -sh dist/

# إذا كان أكبر من 25MB، قلل الحجم
```

### ❌ الدومين لا يعمل:

**الحل:**
```bash
# تحقق من DNS propagation
dig drmohammedsaeed.com +short

# أو استخدم
https://dnschecker.org/
```

---

## 📊 مراقبة الموقع

### في Cloudflare Dashboard:

1. **Analytics:**
   - Workers & Pages → doctor-surgeon → Analytics
   - عدد الزيارات، الـ requests، bandwidth

2. **Logs:**
   - Workers & Pages → doctor-surgeon → Logs (Real-time)
   - Tail logs: `npx wrangler pages deployment tail`

3. **Database:**
   - R2 & Databases → D1 → doctor-db-production
   - حجم القاعدة، عدد الـ queries

---

## 🔄 التحديثات المستقبلية

### عبر Git + Cloudflare (تلقائي):

1. عدّل الكود محلياً
2. Commit و Push إلى GitHub
3. Cloudflare سيبني وينشر تلقائياً!

```bash
git add .
git commit -m "تحديث: إضافة ميزة جديدة"
git push origin main
```

### عبر Wrangler (يدوي):

```bash
npm run build
npx wrangler pages deploy dist --project-name doctor-surgeon
```

---

## 📝 Checklist قبل النشر

- [ ] البناء يعمل محلياً (`npm run build`)
- [ ] جميع الـ environment variables معرّفة
- [ ] قاعدة البيانات منشأة ومهيأة
- [ ] الهجرات مطبقة على الإنتاج
- [ ] البيانات الأولية مضافة (admin user, settings)
- [ ] API Keys جاهزة (YouTube, إلخ)
- [ ] الدومين جاهز (إذا كنت تستخدم واحد)
- [ ] اختبار شامل للموقع

---

## 🔐 الأمان (مهم جداً!)

### قبل النشر:

1. **غيّر كلمة مرور الأدمن:**
   ```bash
   # استخدم bcrypt لتوليد hash
   # ثم حدّث في قاعدة البيانات
   ```

2. **أضف JWT authentication:**
   - بدلاً من `simple-auth-token`
   - استخدم JWT tokens حقيقية

3. **فعّل HTTPS فقط:**
   - Cloudflare يوفر HTTPS تلقائياً
   - لا تقبل HTTP requests

4. **Rate limiting:**
   - مطبّق بالفعل في الكود
   - راقب ال logs للأنشطة المشبوهة

5. **Backup قاعدة البيانات:**
   ```bash
   # Export قاعدة البيانات دورياً
   npx wrangler d1 export doctor-db-production --remote \
     --output=backup-$(date +%Y%m%d).sql
   ```

---

## 💰 التكلفة

### Cloudflare Pages (Free Tier):
- ✅ 500 builds/month
- ✅ Unlimited requests
- ✅ Unlimited bandwidth
- ✅ Unlimited sites

### D1 Database (Free Tier):
- ✅ 5 databases
- ✅ 100,000 reads/day
- ✅ 1,000 writes/day

### R2 Storage (Free Tier):
- ✅ 10 GB storage
- ✅ 1,000,000 reads/month
- ✅ 1,000,000 writes/month

**الموقع يعمل مجاناً بالكامل على Free Tier!** 🎉

---

## 🆘 الدعم

إذا واجهت أي مشكلة:
1. راجع logs: `npx wrangler pages deployment tail`
2. تحقق من [Cloudflare Status](https://www.cloudflarestatus.com/)
3. راجع [Cloudflare Docs](https://developers.cloudflare.com/pages/)
4. Cloudflare Community: https://community.cloudflare.com/

---

## 📚 موارد إضافية

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Cloudflare D1 Docs](https://developers.cloudflare.com/d1/)
- [Cloudflare R2 Docs](https://developers.cloudflare.com/r2/)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)

---

**جاهز للنشر؟** ابدأ من الخطوة 1! 🚀
