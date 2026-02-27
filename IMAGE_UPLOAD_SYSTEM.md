# 📸 نظام رفع الصور من الجهاز

## ✅ تم التنفيذ بنجاح

### 🎯 المميزات الجديدة

#### 1. **Backend API - رفع الصور**

**Endpoint:** `POST /api/admin/media/upload-file`

**الوصف:** رفع صور من الجهاز مباشرة (multipart/form-data)

**المعايير:**
- نوع الملف: `multipart/form-data`
- أنواع الصور المدعومة: JPEG, JPG, PNG, WebP, GIF
- الحد الأقصى للحجم: 5MB
- التخزين:
  - **التطوير المحلي:** قاعدة البيانات + Base64 للمعاينة
  - **الإنتاج:** Cloudflare R2 Bucket

**Request:**
```javascript
const formData = new FormData();
formData.append('file', imageFile);
formData.append('alt_text_ar', 'وصف الصورة بالعربي');
formData.append('alt_text_en', 'Image description in English');

axios.post('/api/admin/media/upload-file', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
```

**Response (نجاح):**
```json
{
  "success": true,
  "message": "File uploaded successfully",
  "media": {
    "id": 1,
    "filename": "1772229123456-abc123.jpg",
    "original_filename": "my-image.jpg",
    "file_url": "/static/uploads/1772229123456-abc123.jpg",
    "file_type": "image/jpeg",
    "file_size": 245678,
    "base64": "data:image/jpeg;base64,/9j/4AAQSkZJRg..." // للتطوير المحلي فقط
  }
}
```

**Response (خطأ):**
```json
{
  "error": "Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed."
}
// أو
{
  "error": "File too large. Maximum size is 5MB."
}
```

---

#### 2. **الأمان والتحقق**

✅ **التحقق من نوع الملف:**
```javascript
const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
if (!validTypes.includes(file.type)) {
  return error
}
```

✅ **التحقق من حجم الملف:**
```javascript
const maxSize = 5 * 1024 * 1024 // 5MB
if (file.size > maxSize) {
  return error
}
```

✅ **اسم ملف فريد:**
```javascript
const timestamp = Date.now()
const randomString = Math.random().toString(36).substring(2, 8)
const filename = `${timestamp}-${randomString}.${extension}`
// مثال: 1772229123456-abc123.jpg
```

---

#### 3. **صفحة الاختبار - Upload Test**

**الرابط:** `/static/upload-test.html`

**المميزات:**
- ✅ واجهة سحب وإفلات (Drag & Drop)
- ✅ معاينة الصورة قبل الرفع
- ✅ عرض حجم الملف واسمه
- ✅ حقول وصف الصورة (عربي/إنجليزي)
- ✅ شريط تقدم الرفع
- ✅ رسائل نجاح/فشل
- ✅ مكتبة صور تفاعلية
- ✅ نسخ رابط الصورة
- ✅ حذف الصور

**كيفية الاستخدام:**
1. افتح: `https://your-domain.com/static/upload-test.html`
2. اسحب صورة أو اضغط للاختيار
3. أضف وصف الصورة (اختياري)
4. اضغط "رفع الصورة"
5. شاهد الصورة في مكتبة الصور

---

#### 4. **قاعدة البيانات - جدول media_library**

**الحقول المستخدمة:**
```sql
CREATE TABLE media_library (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  filename TEXT NOT NULL,                -- اسم الملف الفريد
  original_filename TEXT,                -- الاسم الأصلي
  file_url TEXT NOT NULL,                -- رابط الملف
  file_type TEXT DEFAULT 'image',        -- نوع الملف
  mime_type TEXT,                        -- نوع MIME
  file_size INTEGER DEFAULT 0,           -- حجم الملف بالبايت
  width INTEGER DEFAULT 0,               -- عرض الصورة
  height INTEGER DEFAULT 0,              -- ارتفاع الصورة
  alt_text_ar TEXT,                      -- وصف عربي
  alt_text_en TEXT,                      -- وصف إنجليزي
  caption_ar TEXT,                       -- تعليق عربي
  caption_en TEXT,                       -- تعليق إنجليزي
  uploaded_by INTEGER,                   -- معرف المستخدم
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

#### 5. **API Endpoints الإضافية**

**GET /api/admin/media**
- جلب جميع الصور من المكتبة
- فلترة حسب النوع: `?type=image`

**DELETE /api/admin/media/:id**
- حذف صورة من المكتبة
- حذف من قاعدة البيانات
- TODO: حذف من R2 في الإنتاج

**GET /api/admin/articles/:id/images**
- جلب صور مقال معين

**POST /api/admin/articles/:id/images**
- ربط صورة بمقال

**DELETE /api/admin/articles/:articleId/images/:imageId**
- حذف صورة من مقال

---

### 📁 البنية التقنية

#### **التطوير المحلي (Development):**
```
المستخدم → رفع صورة → Backend API
          ↓
    تحويل إلى Base64
          ↓
    حفظ في قاعدة البيانات
          ↓
    إرجاع Base64 للمعاينة
```

#### **الإنتاج (Production with R2):**
```
المستخدم → رفع صورة → Backend API
          ↓
    رفع إلى Cloudflare R2
          ↓
    حفظ metadata في قاعدة البيانات
          ↓
    إرجاع R2 URL
```

---

### 🔧 الإعداد للإنتاج

#### 1. **إنشاء R2 Bucket:**
```bash
npx wrangler r2 bucket create doctor-media-bucket
```

#### 2. **تحديث wrangler.jsonc:**
```jsonc
{
  "r2_buckets": [
    {
      "binding": "MEDIA_BUCKET",
      "bucket_name": "doctor-media-bucket"
    }
  ]
}
```

#### 3. **إضافة Custom Domain لـ R2:**
```bash
# في Cloudflare Dashboard
R2 → doctor-media-bucket → Settings → Public Access
→ Connect Domain: media.your-domain.com
```

#### 4. **تحديث file_url في الكود:**
```javascript
// قبل:
fileUrl = `/static/uploads/${filename}`

// بعد:
fileUrl = `https://media.your-domain.com/${filename}`
```

---

### 📊 أمثلة الاستخدام

#### **رفع صورة رئيسية لمقال:**
```javascript
// 1. رفع الصورة
const formData = new FormData();
formData.append('file', imageFile);
formData.append('alt_text_ar', 'صورة المقال الرئيسية');

const uploadResponse = await axios.post('/api/admin/media/upload-file', formData);
const imageUrl = uploadResponse.data.media.file_url;

// 2. إضافة مقال مع الصورة
await axios.post('/api/admin/articles', {
  title_ar: 'عنوان المقال',
  content_ar: '<p>المحتوى</p>',
  main_image_url: imageUrl, // استخدام الرابط المرفوع
  is_published: 1
});
```

#### **رفع صور متعددة داخل المحتوى:**
```javascript
// رفع صورة
const response = await axios.post('/api/admin/media/upload-file', formData);
const imageUrl = response.data.media.file_url;

// إدراج في المحتوى
const content = `
<p>فقرة نصية...</p>
<img src="${imageUrl}" alt="صورة توضيحية" />
<p>فقرة أخرى...</p>
`;
```

---

### 🎨 التكامل مع محرر النصوص

#### **مع Quill.js:**
```javascript
// إضافة زر رفع صورة مخصص
const quill = new Quill('#editor', {
  modules: {
    toolbar: {
      handlers: {
        image: function() {
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');
          input.click();

          input.onchange = async () => {
            const file = input.files[0];
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post('/api/admin/media/upload-file', formData);
            const imageUrl = response.data.media.file_url;

            // إدراج في المحرر
            const range = quill.getSelection();
            quill.insertEmbed(range.index, 'image', imageUrl);
          };
        }
      }
    }
  }
});
```

---

### ⚡ الأداء والتحسينات

#### **الضغط التلقائي (TODO):**
```javascript
// ضغط الصورة قبل الرفع (في Frontend)
async function compressImage(file, maxWidth = 1920) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ratio = Math.min(maxWidth / img.width, 1);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob(resolve, 'image/jpeg', 0.9);
    };
    img.src = URL.createObjectURL(file);
  });
}
```

#### **WebP Conversion (TODO):**
```javascript
// تحويل إلى WebP في Backend
import sharp from 'sharp'

const webpBuffer = await sharp(buffer)
  .webp({ quality: 80 })
  .toBuffer()
```

---

### 📝 الخطوات التالية (Roadmap)

- [ ] إضافة ضغط تلقائي للصور
- [ ] تحويل إلى WebP
- [ ] إنشاء نسخ مصغرة (Thumbnails)
- [ ] معالج صور متقدم (تدوير، قص، فلاتر)
- [ ] دعم رفع متعدد (Batch Upload)
- [ ] معرض صور (Image Gallery)
- [ ] بحث في مكتبة الصور
- [ ] تصنيفات للصور (Tags)
- [ ] مجلدات تنظيمية

---

### 🔗 الروابط السريعة

- **صفحة رفع الصور:** `/static/upload-test.html`
- **API Endpoint:** `POST /api/admin/media/upload-file`
- **مكتبة الصور:** `GET /api/admin/media`
- **حذف صورة:** `DELETE /api/admin/media/:id`

---

### 📞 الدعم والمساعدة

إذا واجهت أي مشاكل:
1. تحقق من نوع الملف وحجمه
2. افتح Console في المتصفح
3. تحقق من الـ Network Tab
4. راجع أكواد الخطأ في Response

---

**تاريخ التحديث:** 2026-02-27  
**الحالة:** ✅ جاهز للاستخدام الفوري (Development)  
**الحالة:** ⏳ يحتاج إعداد R2 (Production)
