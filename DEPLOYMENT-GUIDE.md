# 🚀 Deployment Guide - نشر المشروع على Cloudflare Pages

## 📋 المتطلبات | Prerequisites

✅ **قبل البدء تأكد من:**
1. حساب Cloudflare نشط
2. Cloudflare API Token (من Deploy tab)
3. GitHub repository (اختياري للـ CI/CD)
4. Domain name (اختياري للـ custom domain)

---

## 🔧 الإعداد الأولي | Initial Setup

### 1️⃣ Setup Cloudflare API Token

```bash
# Call setup tool (REQUIRED)
# سيطلب منك الذهاب لـ Deploy tab لإعداد API key
```

بعد الإعداد، تحقق:
```bash
npx wrangler whoami
# يجب أن يظهر بريدك الإلكتروني
```

---

### 2️⃣ Create Production D1 Database

```bash
# Create production database
npx wrangler d1 create doctor-db-production

# سيظهر لك database_id - انسخه
# Output example:
# {
#   "binding": "DB",
#   "database_name": "doctor-db-production",  
#   "database_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
# }
```

### 3️⃣ Update wrangler.jsonc

افتح `wrangler.jsonc` وحدّث `database_id`:
```jsonc
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "doctor-db-production",
      "database_id": "PASTE-YOUR-DATABASE-ID-HERE"  // <-- هنا
    }
  ]
}
```

### 4️⃣ Apply Production Migrations

```bash
# Apply schema to production database
npm run db:migrate:prod

# Verify
npx wrangler d1 execute doctor-db-production --command="SELECT name FROM sqlite_master WHERE type='table';"
```

---

## 🌐 Deployment Steps

### Option A: Direct Deployment (Manual)

#### Step 1: Build
```bash
npm run build
# Creates dist/ directory
```

#### Step 2: Create Cloudflare Pages Project
```bash
# IMPORTANT: Always use 'main' branch as production branch
npx wrangler pages project create doctor-surgeon \
  --production-branch main \
  --compatibility-date 2024-01-01
```

#### Step 3: Deploy
```bash
npm run deploy:prod
# Or manually:
# npx wrangler pages deploy dist --project-name doctor-surgeon
```

#### Step 4: Get Deployment URLs
بعد النشر ستحصل على:
- **Production**: `https://doctor-surgeon.pages.dev`
- **Branch**: `https://main.doctor-surgeon.pages.dev`

---

### Option B: GitHub Integration (Automatic CI/CD)

#### Step 1: Push to GitHub

```bash
# Setup GitHub environment first
# This configures git credentials

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/doctor-surgeon-website.git

# Push (force for new repo)
git push -f origin main
```

#### Step 2: Connect Cloudflare Pages to GitHub

1. اذهب إلى Cloudflare Dashboard
2. Pages → Create a project
3. Connect to Git → Select repository
4. Configure build:
   - **Build command**: `npm run build`
   - **Build output**: `dist`
   - **Root directory**: `/`
   - **Environment variables**: (see below)

#### Step 3: Set Environment Variables

في Cloudflare Dashboard → Project Settings → Environment Variables:
```
# Production
DATABASE_ID=your-database-id
NODE_VERSION=18

# Optional
ADMIN_EMAIL=admin@doctor.com
SITE_URL=https://doctor-surgeon.pages.dev
```

---

## 🔐 إعداد Secrets | Setup Secrets

```bash
# Admin password (example)
npx wrangler pages secret put ADMIN_PASSWORD --project-name doctor-surgeon
# Enter: your-secure-password

# JWT Secret
npx wrangler pages secret put JWT_SECRET --project-name doctor-surgeon
# Enter: generate-random-string-here

# Email API (if needed)
npx wrangler pages secret put SMTP_PASSWORD --project-name doctor-surgeon

# List secrets
npx wrangler pages secret list --project-name doctor-surgeon
```

---

## 🌍 Custom Domain Setup

### إضافة Domain مخصص:

```bash
npx wrangler pages domain add yourdomain.com --project-name doctor-surgeon
```

أو من Cloudflare Dashboard:
1. Pages → doctor-surgeon
2. Custom domains → Set up a custom domain
3. Enter your domain
4. Follow DNS instructions (CNAME record)
5. Wait for SSL certificate (automatic)

---

## ✅ Post-Deployment Checklist

### 1️⃣ Test Production URLs

```bash
# Test health endpoint
curl https://doctor-surgeon.pages.dev/api/health

# Test doctor profile
curl https://doctor-surgeon.pages.dev/api/doctor/profile

# Test homepage
curl https://doctor-surgeon.pages.dev/
```

### 2️⃣ Verify Database Connection

```bash
# Test production database
npx wrangler d1 execute doctor-db-production --command="SELECT COUNT(*) as count FROM users;"
```

### 3️⃣ Check Deployment Logs

```bash
npx wrangler pages deployment list --project-name doctor-surgeon
```

### 4️⃣ Setup Admin User (if needed)

```bash
# Insert admin user in production
npx wrangler d1 execute doctor-db-production --command="
INSERT INTO users (email, password_hash, full_name, role, status) 
VALUES ('admin@doctor.com', '\$2a\$12\$hash', 'Admin User', 'admin', 'active');
"
```

---

## 🔄 Update Deployment (Re-deploy)

### Manual Update:
```bash
# 1. Make changes
# 2. Commit
git add .
git commit -m "Update feature X"

# 3. Build and deploy
npm run deploy:prod
```

### Auto Update (GitHub):
```bash
# Just push to main branch
git push origin main
# Cloudflare will auto-deploy
```

---

## 📊 Monitoring & Analytics

### Check Deployment Status:
```bash
npx wrangler pages deployment list --project-name doctor-surgeon
```

### View Logs:
```bash
npx wrangler pages deployment tail --project-name doctor-surgeon
```

### Analytics:
- Cloudflare Dashboard → Pages → doctor-surgeon → Analytics
- Shows: Requests, Bandwidth, Errors, etc.

---

## 🐛 Troubleshooting

### Build Fails:
```bash
# Local build test
npm run build

# Check Node version
node --version  # Should be 18+

# Clear cache
rm -rf dist node_modules package-lock.json
npm install
npm run build
```

### Database Connection Error:
```bash
# Verify database ID in wrangler.jsonc
# Check migrations applied:
npx wrangler d1 migrations list doctor-db-production
```

### 404 Errors:
```bash
# Check dist/ contents after build
ls -la dist/

# Verify pages_build_output_dir in wrangler.jsonc
# Should be: "pages_build_output_dir": "./dist"
```

### Environment Variables Not Working:
```bash
# Set in Cloudflare Dashboard, not in wrangler.jsonc
# For secrets, use:
npx wrangler pages secret put SECRET_NAME --project-name doctor-surgeon
```

---

## 🔒 Security Checklist

- ✅ Change default admin password
- ✅ Set strong JWT_SECRET
- ✅ Enable HTTPS (automatic with Cloudflare)
- ✅ Review CORS settings
- ✅ Test rate limiting
- ✅ Verify input validation
- ✅ Check SQL injection prevention

---

## 📈 Performance Optimization

### After Deployment:

1. **Enable Caching**:
   - Cloudflare Dashboard → Caching → Configuration
   - Set cache rules for static assets

2. **Optimize Images**:
   - Use Cloudflare Images (optional)
   - Or compress before upload

3. **Enable Minification**:
   - Already done by Vite build

4. **Monitor Performance**:
   - Cloudflare Analytics
   - Web Vitals (Core Web Vitals)

---

## 🆘 Rollback (إذا حدثت مشاكل)

```bash
# List deployments
npx wrangler pages deployment list --project-name doctor-surgeon

# Rollback to specific deployment
npx wrangler pages deployment rollback <DEPLOYMENT_ID> --project-name doctor-surgeon
```

---

## 📞 Support

**إذا واجهت مشاكل:**
1. Check logs first
2. Verify configuration
3. Test locally
4. Review Cloudflare docs
5. Contact Cloudflare support

---

## ✨ Next Steps After Deployment

1. ✅ **Verify all pages work**
2. ✅ **Test booking system**
3. ✅ **Setup Google Analytics** (optional)
4. ✅ **Submit sitemap to Google** (after SEO implementation)
5. ✅ **Setup monitoring alerts**
6. ✅ **Test on mobile devices**
7. ✅ **Share URLs with stakeholders**

---

**Deployment URL**: https://doctor-surgeon.pages.dev  
**Status**: Ready for production! 🎉
