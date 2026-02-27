# 📅 نظام إدارة حجز المواعيد - دليل شامل

## ✅ تم التنفيذ بالكامل

### 🎯 نظرة عامة

نظام حجز المواعيد يسمح للمرضى بحجز مواعيد من خلال الموقع مع:
- التسجيل برقم الهاتف والاسم والبريد الإلكتروني (اختياري)
- اختيار التاريخ والوقت المناسب
- تأكيد الموافقة على سياسة الخصوصية
- الحصول على رقم حجز فريد
- إدارة كاملة للحجوزات من لوحة التحكم
- تصدير الحجوزات إلى Excel

---

## 🔗 الروابط السريعة

### 📋 لوحة إدارة الحجوزات
**الرابط:** https://3000-i1lbhn0vco2lmzbjr48gv-5185f4aa.sandbox.novita.ai/static/bookings-admin.html

**المميزات:**
- ✅ عرض جميع الحجوزات في جدول تفاعلي
- ✅ إحصائيات فورية (إجمالي، قيد الانتظار، مؤكدة، قادمة)
- ✅ تصفية حسب الحالة، الشهر، التاريخ
- ✅ بحث بالاسم أو رقم الجوال أو رقم الحجز
- ✅ عرض تفاصيل كل حجز
- ✅ تأكيد / إلغاء الحجوزات
- ✅ تصدير إلى Excel (CSV مع UTF-8 BOM)
- ✅ واجهة عربية RTL جميلة

---

### 🎫 صفحة الحجز للمرضى
**الرابط:** https://3000-i1lbhn0vco2lmzbjr48gv-5185f4aa.sandbox.novita.ai/booking

**خطوات الحجز:**
1. اختيار التاريخ المناسب
2. اختيار الوقت المتاح
3. إدخال البيانات:
   - الاسم (مطلوب)
   - رقم الجوال (مطلوب)
   - البريد الإلكتروني (اختياري)
   - سبب الزيارة (اختياري)
4. الموافقة على سياسة الخصوصية
5. تأكيد الحجز
6. الحصول على رقم حجز فريد (مثال: BK-20260227-021)

---

## 📊 API النظام

### 1. **API للمرضى (Frontend)**

#### 🔹 جلب التواريخ المتاحة
```bash
GET /api/booking/available-dates?month=2026-03
```

**Response:**
```json
{
  "success": true,
  "data": {
    "month": "2026-03",
    "dates": [
      "2026-03-01",
      "2026-03-02",
      "2026-03-03",
      "2026-03-05",
      "2026-03-08"
    ]
  }
}
```

---

#### 🔹 جلب الأوقات المتاحة لتاريخ محدد
```bash
GET /api/booking/available-slots?date=2026-03-01
```

**Response:**
```json
{
  "success": true,
  "data": {
    "date": "2026-03-01",
    "slots": [
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "14:00",
      "14:30",
      "15:00"
    ]
  }
}
```

---

#### 🔹 إنشاء حجز جديد
```bash
POST /api/booking/create
Content-Type: application/json

{
  "patient_name": "أحمد محمد",
  "patient_phone": "0501234567",
  "patient_email": "ahmed@example.com",
  "booking_date": "2026-03-01",
  "booking_time": "10:00",
  "reason": "فحص دوري",
  "consent_privacy": true
}
```

**Response (نجاح):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "booking_number": "BK-20260227-021",
    "patient_name": "أحمد محمد",
    "patient_phone": "0501234567",
    "patient_email": "ahmed@example.com",
    "booking_date": "2026-03-01",
    "booking_time": "10:00",
    "reason": "فحص دوري",
    "status": "pending",
    "created_at": "2026-02-27 22:11:32"
  },
  "message": "تم حجز موعدك بنجاح! ستصلك رسالة تأكيد قريباً."
}
```

**Response (خطأ - موعد محجوز):**
```json
{
  "success": false,
  "error": "هذا الموعد محجوز بالفعل"
}
```

**Response (خطأ - رقم جوال غير صحيح):**
```json
{
  "success": false,
  "error": "رقم الجوال غير صحيح"
}
```

---

#### 🔹 التحقق من حالة الحجز
```bash
GET /api/booking/verify?booking_number=BK-20260227-021
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "booking_number": "BK-20260227-021",
    "patient_name": "أحمد محمد",
    "status": "confirmed",
    "booking_date": "2026-03-01",
    "booking_time": "10:00"
  }
}
```

---

### 2. **API للإدارة (Admin)**

#### 🔹 عرض جميع الحجوزات
```bash
GET /api/admin/bookings

# مع فلاتر
GET /api/admin/bookings?status=pending
GET /api/admin/bookings?month=2026-03
GET /api/admin/bookings?date=2026-03-01
GET /api/admin/bookings?limit=20&offset=0
```

**Response:**
```json
{
  "success": true,
  "bookings": [
    {
      "id": 1,
      "booking_number": "BK-20260227-021",
      "patient_name": "أحمد محمد",
      "patient_phone": "0501234567",
      "patient_email": "ahmed@example.com",
      "booking_date": "2026-03-01",
      "booking_time": "10:00",
      "status": "pending",
      "reason": "فحص دوري",
      "created_at": "2026-02-27 22:11:32"
    }
  ],
  "pagination": {
    "total": 25,
    "limit": 20,
    "offset": 0,
    "hasMore": true
  }
}
```

---

#### 🔹 إحصائيات الحجوزات
```bash
GET /api/admin/bookings/stats
GET /api/admin/bookings/stats?month=2026-03
```

**Response:**
```json
{
  "success": true,
  "stats": {
    "total": 50,
    "today": 5,
    "upcoming": 12,
    "byStatus": [
      { "status": "pending", "count": 15 },
      { "status": "confirmed", "count": 30 },
      { "status": "cancelled", "count": 3 },
      { "status": "completed", "count": 2 }
    ]
  }
}
```

---

#### 🔹 عرض تفاصيل حجز واحد
```bash
GET /api/admin/bookings/1
```

**Response:**
```json
{
  "success": true,
  "booking": {
    "id": 1,
    "booking_number": "BK-20260227-021",
    "patient_name": "أحمد محمد",
    "patient_phone": "0501234567",
    "patient_email": "ahmed@example.com",
    "booking_date": "2026-03-01",
    "booking_time": "10:00",
    "status": "pending",
    "reason": "فحص دوري",
    "notes": null,
    "created_at": "2026-02-27 22:11:32",
    "confirmed_at": null,
    "cancelled_at": null
  }
}
```

---

#### 🔹 تحديث حالة الحجز
```bash
PUT /api/admin/bookings/1/status
Content-Type: application/json

{
  "status": "confirmed",
  "notes": "تم التأكيد عبر الهاتف"
}

# أو للإلغاء
{
  "status": "cancelled",
  "cancellation_reason": "طلب المريض إلغاء الموعد"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Booking status updated successfully"
}
```

**الحالات المتاحة:**
- `pending` - قيد الانتظار
- `confirmed` - مؤكدة
- `cancelled` - ملغاة
- `completed` - مكتملة

---

#### 🔹 تعديل بيانات الحجز
```bash
PUT /api/admin/bookings/1
Content-Type: application/json

{
  "patient_name": "أحمد محمد علي",
  "patient_phone": "0501234567",
  "patient_email": "ahmed@example.com",
  "booking_date": "2026-03-02",
  "booking_time": "11:00",
  "notes": "تم تغيير الموعد بناء على طلب المريض"
}
```

---

#### 🔹 حذف حجز
```bash
DELETE /api/admin/bookings/1
```

**Response:**
```json
{
  "success": true,
  "message": "Booking deleted successfully"
}
```

---

#### 🔹 تصدير الحجوزات إلى Excel
```bash
GET /api/admin/bookings/export/csv

# مع فلاتر
GET /api/admin/bookings/export/csv?status=pending
GET /api/admin/bookings/export/csv?month=2026-03
```

**Response:**
- ملف CSV مع BOM للـ UTF-8
- جاهز للفتح في Excel مباشرة
- يحتوي على جميع الحقول المهمة

---

## 🗄️ قاعدة البيانات

### جدول `bookings`

```sql
CREATE TABLE bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  booking_number TEXT UNIQUE NOT NULL,
  patient_name TEXT NOT NULL,
  patient_phone TEXT NOT NULL,
  patient_email TEXT,
  consultation_type_ar TEXT,
  consultation_type_en TEXT,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  reason TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  notes TEXT,
  reminder_sent BOOLEAN DEFAULT 0,
  consent_privacy BOOLEAN DEFAULT 1,
  ip_address TEXT,
  user_agent TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  confirmed_at DATETIME,
  confirmed_by INTEGER,
  cancelled_at DATETIME,
  cancellation_reason TEXT,
  FOREIGN KEY (confirmed_by) REFERENCES users(id)
);
```

### جدول `booking_slots` (إعدادات الأوقات)

```sql
CREATE TABLE booking_slots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  day_of_week INTEGER NOT NULL,  -- 0=Sunday, 6=Saturday
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  slot_duration INTEGER NOT NULL DEFAULT 30,  -- بالدقائق
  max_bookings_per_slot INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**مثال للإدخال:**
```sql
-- السبت: 9:00 صباحاً - 1:00 ظهراً، كل 30 دقيقة
INSERT INTO booking_slots (day_of_week, start_time, end_time, slot_duration)
VALUES (6, '09:00', '13:00', 30);

-- الأحد: 2:00 ظهراً - 6:00 مساءً، كل 30 دقيقة
INSERT INTO booking_slots (day_of_week, start_time, end_time, slot_duration)
VALUES (0, '14:00', '18:00', 30);
```

### جدول `booking_exceptions` (الإجازات والعطلات)

```sql
CREATE TABLE booking_exceptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  exception_date DATE NOT NULL UNIQUE,
  reason_ar TEXT,
  reason_en TEXT,
  is_available BOOLEAN DEFAULT 0,
  special_hours TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**مثال للإدخال:**
```sql
-- إجازة عيد الفطر
INSERT INTO booking_exceptions (exception_date, reason_ar, reason_en, is_available)
VALUES ('2026-04-21', 'عطلة عيد الفطر', 'Eid Al-Fitr Holiday', 0);

-- يوم عمل إضافي
INSERT INTO booking_exceptions (exception_date, reason_ar, reason_en, is_available, special_hours)
VALUES ('2026-03-15', 'يوم عمل إضافي', 'Extra Working Day', 1, '10:00-14:00');
```

---

## 🎨 واجهة لوحة التحكم

### المميزات:
1. **بطاقات الإحصائيات:**
   - إجمالي الحجوزات
   - قيد الانتظار (pending)
   - مؤكدة (confirmed)
   - قادمة خلال 7 أيام

2. **الفلاتر:**
   - حسب الحالة (pending, confirmed, cancelled, completed)
   - حسب الشهر (YYYY-MM)
   - حسب تاريخ محدد (YYYY-MM-DD)
   - بحث نصي (الاسم، رقم الجوال، رقم الحجز)

3. **الجدول:**
   - رقم الحجز
   - اسم المريض
   - رقم الجوال (قابل للاتصال مباشرة)
   - التاريخ (عربي منسق)
   - الوقت
   - الحالة (badges ملونة)
   - الإجراءات (عرض، تأكيد، إلغاء)

4. **نافذة التفاصيل Modal:**
   - كل معلومات الحجز
   - معلومات المريض
   - تفاصيل الموعد
   - معلومات النظام (IP, User Agent, التواريخ)
   - أزرار إجراء سريعة

5. **التصدير:**
   - تصدير إلى Excel (CSV مع UTF-8 BOM)
   - مع الفلاتر المطبقة
   - جاهز للفتح في Excel مباشرة

---

## 🔒 الأمان والتحقق

### التحقق من البيانات:
- ✅ الاسم: مطلوب، نص
- ✅ رقم الجوال: مطلوب، صيغة سعودية (05xxxxxxxx)
- ✅ البريد الإلكتروني: اختياري، صيغة صحيحة
- ✅ التاريخ: لا يقبل تواريخ ماضية
- ✅ الوقت: يجب أن يكون متاحاً
- ✅ الموافقة: مطلوبة على سياسة الخصوصية

### معلومات التتبع:
- ✅ عنوان IP
- ✅ User Agent
- ✅ تاريخ الإنشاء
- ✅ تاريخ التعديل
- ✅ تاريخ التأكيد
- ✅ من أكد الحجز

### منع التكرار:
- ✅ لا يمكن حجز نفس الموعد مرتين
- ✅ تحقق فوري من التوفر

---

## 📱 استخدام عملي

### 1. إضافة أوقات عمل:
```bash
npx wrangler d1 execute doctor-db-production --local --command="
INSERT INTO booking_slots (day_of_week, start_time, end_time, slot_duration)
VALUES 
  (0, '09:00', '13:00', 30),  -- الأحد صباحاً
  (0, '16:00', '20:00', 30),  -- الأحد مساءً
  (2, '09:00', '13:00', 30),  -- الثلاثاء صباحاً
  (4, '16:00', '20:00', 30);  -- الخميس مساءً
"
```

### 2. إضافة إجازة:
```bash
npx wrangler d1 execute doctor-db-production --local --command="
INSERT INTO booking_exceptions (exception_date, reason_ar, is_available)
VALUES ('2026-04-21', 'عطلة عيد الفطر', 0);
"
```

### 3. عرض الحجوزات اليوم:
```bash
curl "http://localhost:3000/api/admin/bookings?date=$(date +%Y-%m-%d)" | jq
```

### 4. تأكيد حجز:
```bash
curl -X PUT http://localhost:3000/api/admin/bookings/1/status \
  -H "Content-Type: application/json" \
  -d '{"status": "confirmed"}'
```

---

## 📊 تقارير وإحصائيات

### إحصائيات الشهر الحالي:
```bash
MONTH=$(date +%Y-%m)
curl "http://localhost:3000/api/admin/bookings/stats?month=$MONTH" | jq
```

### تصدير حجوزات الشهر:
```bash
MONTH=$(date +%Y-%m)
wget "http://localhost:3000/api/admin/bookings/export/csv?month=$MONTH" -O bookings-$MONTH.csv
```

---

## 🚀 الخطوات التالية المقترحة

1. **إشعارات تلقائية:**
   - إرسال SMS للمريض عند التأكيد
   - إرسال تذكير قبل الموعد بـ 24 ساعة
   - إشعار بالبريد الإلكتروني

2. **تكامل WhatsApp:**
   - تأكيد الحجز عبر WhatsApp
   - تذكير قبل الموعد
   - رابط للإلغاء/التعديل

3. **حجز الفيديو:**
   - دعم الاستشارات عن بُعد
   - رابط Zoom/Google Meet

4. **ملف المريض:**
   - حفظ سجل الحجوزات السابقة
   - ملاحظات طبية
   - مرفقات (صور، تقارير)

5. **التقويم الشهري:**
   - عرض بصري للحجوزات
   - سحب وإفلات لتعديل المواعيد
   - طباعة جدول أسبوعي

---

## 📚 الوثائق

- **API Reference:** جميع endpoints موثقة أعلاه
- **Database Schema:** جداول bookings, booking_slots, booking_exceptions
- **UI Components:** Tailwind CSS + Font Awesome icons
- **Authentication:** لم يتم تطبيق JWT بعد (TODO)

---

**تاريخ:** 2026-02-27  
**الحالة:** ✅ جاهز للاستخدام الفوري  
**الإصدار:** 1.0
