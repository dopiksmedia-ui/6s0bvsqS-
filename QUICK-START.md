# 🚀 Quick Start Guide

## للمطورين الجدد | For New Developers

### ⚡ التشغيل السريع | Quick Run

```bash
# 1. Navigate to project
cd /home/user/webapp

# 2. Build project
npm run build

# 3. Start server with PM2
pm2 start ecosystem.config.cjs

# 4. Test
curl http://localhost:3000/api/health
```

**الموقع سيعمل على:**
- Frontend: http://localhost:3000
- API: http://localhost:3000/api/*

---

## 🔍 اختبار سريع | Quick Test

### Test Homepage
```bash
curl http://localhost:3000
```

### Test API
```bash
# Health Check
curl http://localhost:3000/api/health

# Doctor Profile
curl http://localhost:3000/api/doctor/profile

# Articles (Arabic)
curl "http://localhost:3000/api/articles?lang=ar&limit=5"

# Available Booking Dates
curl "http://localhost:3000/api/booking/available-dates?month=2026-03"

# Available Time Slots
curl "http://localhost:3000/api/booking/available-slots?date=2026-03-01"
```

---

## 📊 PM2 Management

```bash
# List all processes
pm2 list

# View logs
pm2 logs doctor-surgeon-website --nostream

# Restart service
fuser -k 3000/tcp 2>/dev/null || true && pm2 restart doctor-surgeon-website

# Stop service
pm2 delete doctor-surgeon-website

# Full restart (clean)
fuser -k 3000/tcp 2>/dev/null || true
npm run build
pm2 start ecosystem.config.cjs
```

---

## 🗄️ Database Commands

```bash
# Reset database (drop + migrate + seed)
npm run db:reset

# Apply migrations only
npm run db:migrate:local

# Seed data only
npm run db:seed

# Database console (SQLite)
npm run db:console:local
```

---

## 📝 Common Tasks

### إضافة مستخدم جديد | Add New User
```bash
cd /home/user/webapp
npx wrangler d1 execute doctor-db-production --local --command="
INSERT INTO users (email, password_hash, full_name, role, status) 
VALUES ('user@example.com', '\$2a\$12\$hash', 'User Name', 'admin', 'active');
"
```

### إضافة مقال جديد | Add New Article
```bash
# Use API (coming soon) or direct database insert
npx wrangler d1 execute doctor-db-production --local --command="
INSERT INTO articles (title_ar, title_en, slug_ar, slug_en, content_ar, content_en, author_id, status, published_at) 
VALUES ('عنوان', 'Title', 'slug-ar', 'slug-en', '<p>Content</p>', '<p>Content</p>', 1, 'published', datetime('now'));
"
```

### إضافة حجز اختباري | Add Test Booking
```bash
curl -X POST http://localhost:3000/api/booking/create \
  -H "Content-Type: application/json" \
  -d '{
    "patient_name": "محمد أحمد",
    "patient_phone": "0512345678",
    "patient_email": "test@example.com",
    "booking_date": "2026-03-15",
    "booking_time": "16:30",
    "reason": "استشارة",
    "consent_privacy": true
  }'
```

---

## 🐛 Troubleshooting

### المنفذ 3000 مشغول | Port 3000 in use
```bash
fuser -k 3000/tcp 2>/dev/null || true
# أو
pm2 delete doctor-surgeon-website
```

### الموقع لا يعمل | Site not working
```bash
# 1. Check PM2 status
pm2 list

# 2. Check logs
pm2 logs doctor-surgeon-website --nostream --lines 50

# 3. Restart service
pm2 restart doctor-surgeon-website

# 4. Full rebuild
npm run build && pm2 restart doctor-surgeon-website
```

### قاعدة البيانات فارغة | Database is empty
```bash
npm run db:reset
```

### خطأ في الـ build | Build error
```bash
# Clean and rebuild
rm -rf dist node_modules
npm install
npm run build
```

---

## 📚 الملفات المهمة | Important Files

```
READ THESE FIRST:
├── README.md                 ← البداية من هنا
├── PROJECT-SUMMARY.md        ← ملخص الإنجاز
├── QUICK-START.md           ← هذا الملف

TECHNICAL DOCS:
├── ARCHITECTURE.md          ← بنية النظام
├── WIREFRAMES.md            ← تصاميم الصفحات
├── UI-STYLE-GUIDE.md        ← دليل التصميم
└── CONTENT-EXAMPLES.md      ← أمثلة المحتوى

CODE:
├── src/index.tsx            ← نقطة البداية
├── src/routes/              ← API Routes
├── src/middleware/          ← Middleware
└── migrations/              ← Database Schema
```

---

## 🌐 URLs

### Development (Sandbox)
- **Frontend**: https://3000-i1lbhn0vco2lmzbjr48gv-5185f4aa.sandbox.novita.ai
- **API Health**: https://3000-i1lbhn0vco2lmzbjr48gv-5185f4aa.sandbox.novita.ai/api/health

### Local
- **Frontend**: http://localhost:3000
- **API**: http://localhost:3000/api/*

### Production (Coming Soon)
- **URL**: Will be added after Cloudflare Pages deployment

---

## 💡 Tips

1. **Always build before starting**: `npm run build` 
2. **Use PM2 for services**: Never run `npm run dev:sandbox` directly
3. **Check logs first**: `pm2 logs --nostream` when debugging
4. **Clean port before restart**: `fuser -k 3000/tcp`
5. **Test APIs with curl**: Easier than browser for debugging

---

## 🆘 Need Help?

1. Check logs: `pm2 logs doctor-surgeon-website`
2. Read README.md for detailed info
3. Check PROJECT-SUMMARY.md for progress
4. Review ARCHITECTURE.md for system design

---

**Happy Coding! 🎉**
