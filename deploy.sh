#!/bin/bash

# ============================================
# Doctor Surgeon Website - Deployment Script
# ============================================

set -e  # Exit on error

echo "🚀 بدء عملية النشر إلى Cloudflare Pages..."
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="${PROJECT_NAME:-doctor-surgeon}"
BRANCH="${BRANCH:-main}"
DB_NAME="doctor-db-production"

# ============================================
# Step 1: Pre-flight checks
# ============================================
echo "${BLUE}📋 الخطوة 1: التحقق من المتطلبات...${NC}"

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "${RED}❌ wrangler غير مثبت${NC}"
    echo "قم بتثبيته باستخدام: npm install -g wrangler"
    exit 1
fi
echo "${GREEN}✅ wrangler مثبت${NC}"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "${YELLOW}⚠️  node_modules غير موجود، جاري التثبيت...${NC}"
    npm install
fi
echo "${GREEN}✅ Dependencies جاهزة${NC}"

# Check if dist exists, if not build
if [ ! -d "dist" ]; then
    echo "${YELLOW}⚠️  dist غير موجود، جاري البناء...${NC}"
    npm run build
fi
echo "${GREEN}✅ Build جاهز${NC}"

echo ""

# ============================================
# Step 2: Check authentication
# ============================================
echo "${BLUE}📋 الخطوة 2: التحقق من المصادقة...${NC}"

# Check if logged in
if ! wrangler whoami &> /dev/null; then
    echo "${YELLOW}⚠️  غير مسجل دخول في Wrangler${NC}"
    echo "جاري تسجيل الدخول..."
    wrangler login
fi
echo "${GREEN}✅ تم تسجيل الدخول${NC}"

echo ""

# ============================================
# Step 3: Create/Check Pages Project
# ============================================
echo "${BLUE}📋 الخطوة 3: التحقق من مشروع Cloudflare Pages...${NC}"

# Check if project exists
if ! wrangler pages project list | grep -q "$PROJECT_NAME"; then
    echo "${YELLOW}⚠️  المشروع غير موجود، جاري الإنشاء...${NC}"
    wrangler pages project create "$PROJECT_NAME" \
        --production-branch "$BRANCH"
    echo "${GREEN}✅ تم إنشاء المشروع: $PROJECT_NAME${NC}"
else
    echo "${GREEN}✅ المشروع موجود: $PROJECT_NAME${NC}"
fi

echo ""

# ============================================
# Step 4: Check D1 Database
# ============================================
echo "${BLUE}📋 الخطوة 4: التحقق من قاعدة البيانات D1...${NC}"

# Check if database exists
if ! wrangler d1 list | grep -q "$DB_NAME"; then
    echo "${YELLOW}⚠️  قاعدة البيانات غير موجودة، جاري الإنشاء...${NC}"
    wrangler d1 create "$DB_NAME"
    echo "${GREEN}✅ تم إنشاء قاعدة البيانات: $DB_NAME${NC}"
    echo ""
    echo "${YELLOW}⚠️  يجب تحديث database_id في wrangler.jsonc${NC}"
    echo "قم بنسخ database_id من الأعلى وحدّث ملف wrangler.jsonc"
    echo ""
    read -p "هل قمت بتحديث database_id؟ (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "${RED}❌ يرجى تحديث database_id أولاً${NC}"
        exit 1
    fi
else
    echo "${GREEN}✅ قاعدة البيانات موجودة: $DB_NAME${NC}"
fi

# Check if migrations need to be applied
echo "${YELLOW}⚠️  هل تريد تطبيق الهجرات على قاعدة الإنتاج؟${NC}"
read -p "Apply migrations to production? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "جاري تطبيق الهجرات..."
    wrangler d1 migrations apply "$DB_NAME" --remote
    echo "${GREEN}✅ تم تطبيق الهجرات${NC}"
fi

echo ""

# ============================================
# Step 5: Build Project
# ============================================
echo "${BLUE}📋 الخطوة 5: بناء المشروع...${NC}"

npm run build

# Check build size
BUILD_SIZE=$(du -sh dist/ | cut -f1)
echo "${GREEN}✅ تم البناء بنجاح (حجم: $BUILD_SIZE)${NC}"

# Check if size is reasonable (< 25MB)
BUILD_SIZE_MB=$(du -sm dist/ | cut -f1)
if [ "$BUILD_SIZE_MB" -gt 25 ]; then
    echo "${YELLOW}⚠️  تحذير: حجم البناء كبير ($BUILD_SIZE_MB MB)${NC}"
    echo "الحد الأقصى لـ Cloudflare Workers هو 25MB"
fi

echo ""

# ============================================
# Step 6: Deploy
# ============================================
echo "${BLUE}📋 الخطوة 6: النشر إلى Cloudflare Pages...${NC}"

wrangler pages deploy dist \
    --project-name "$PROJECT_NAME" \
    --branch "$BRANCH"

echo ""
echo "${GREEN}✅ تم النشر بنجاح!${NC}"

echo ""

# ============================================
# Step 7: Post-deployment info
# ============================================
echo "${BLUE}📋 معلومات النشر:${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "${GREEN}🌐 الموقع:${NC}"
echo "   https://$PROJECT_NAME.pages.dev"
echo ""
echo "${GREEN}📊 لوحة التحكم:${NC}"
echo "   https://dash.cloudflare.com/"
echo ""
echo "${GREEN}📝 الخطوات التالية:${NC}"
echo "   1. اختبر الموقع على الرابط أعلاه"
echo "   2. أضف Custom Domain من لوحة التحكم"
echo "   3. أضف Environment Variables (YOUTUBE_API_KEY, إلخ)"
echo "   4. أضف البيانات الأولية إلى قاعدة البيانات"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo ""
echo "${GREEN}🎉 النشر اكتمل بنجاح!${NC}"
