# 🎥 YouTube API Integration Guide

## Overview
This guide explains how to set up YouTube Data API v3 to automatically fetch videos from Dr. Mohammed Saeed's YouTube channel.

---

## 📋 Prerequisites

1. A Google Cloud account
2. Access to YouTube channel: [@Dr.MohammedSaeedAli](https://www.youtube.com/@Dr.MohammedSaeedAli/shorts)
3. Project deployed to Cloudflare Pages

---

## 🔑 Step 1: Get YouTube API Key

### 1. Go to Google Cloud Console
Visit: https://console.cloud.google.com/

### 2. Create a New Project (or select existing)
- Click "Select a project" → "New Project"
- Name: `Doctor Website YouTube API`
- Click "Create"

### 3. Enable YouTube Data API v3
- Go to "APIs & Services" → "Library"
- Search for "YouTube Data API v3"
- Click on it and press "Enable"

### 4. Create Credentials
- Go to "APIs & Services" → "Credentials"
- Click "+ CREATE CREDENTIALS" → "API key"
- Copy the API key (example: `AIzaSyC...xyz`)
- (Optional) Click "RESTRICT KEY":
  - Application restrictions: "HTTP referrers"
  - Add your domain: `*.pages.dev/*`
  - API restrictions: "YouTube Data API v3"
  - Click "Save"

---

## 🔧 Step 2: Configure API Key

### For Local Development (.dev.vars)

Create a `.dev.vars` file in your project root:

```bash
YOUTUBE_API_KEY=AIzaSyC...xyz
```

**Important:** Add `.dev.vars` to `.gitignore` (already done)

### For Production (Cloudflare Pages)

Use Wrangler to add the secret:

```bash
# Set the secret
npx wrangler pages secret put YOUTUBE_API_KEY --project-name webapp

# Enter your API key when prompted
# Example: AIzaSyC...xyz

# Verify the secret
npx wrangler pages secret list --project-name webapp
```

---

## 📺 Step 3: Get YouTube Channel ID

### Option 1: From Channel URL
Your channel: `https://www.youtube.com/@Dr.MohammedSaeedAli`

To get the Channel ID:
1. Visit: https://www.youtube.com/@Dr.MohammedSaeedAli
2. Right-click → "View Page Source"
3. Search for `channelId` or `externalId`
4. Copy the ID (format: `UC...`)

### Option 2: Using API
```bash
curl "https://www.googleapis.com/youtube/v3/channels?part=id&forHandle=Dr.MohammedSaeedAli&key=YOUR_API_KEY"
```

### Update the Channel ID
Edit `src/routes/api/youtube.ts`:

```typescript
const CHANNEL_ID = 'UC-lHJZR3Gqxm24_Vd_AJ5Yw'; // Replace with actual ID
```

---

## 🧪 Step 4: Test the Integration

### Test API Endpoint
```bash
# Local
curl http://localhost:3000/api/youtube/videos

# Production
curl https://your-site.pages.dev/api/youtube/videos
```

### Expected Response
```json
{
  "success": true,
  "videos": [
    {
      "id": "VIDEO_ID",
      "title": "Video Title",
      "description": "Video description...",
      "thumbnail": "https://...",
      "publishedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "source": "youtube-api",
  "total": 20
}
```

### Test Homepage
Visit: http://localhost:3000/

Check browser console for:
```
Loaded 20 videos from youtube-api
```

---

## 🔄 How It Works

### 1. Homepage Loads
- Page loads with loading spinner
- JavaScript calls `fetchVideos()`

### 2. Fetch Videos
- Frontend: `GET /api/youtube/videos`
- Backend: Calls YouTube Data API v3
- Returns latest 20 videos from channel

### 3. Display Videos
- Shows 4 videos initially
- "Load More" button shows 4 more
- Videos open in modal player (inside website)

### 4. Fallback System
If API fails (no key, rate limit, error):
- Uses fallback data (12 sample videos)
- Still shows video section
- Console logs: `source: "fallback"`

---

## 📊 API Quota & Limits

### YouTube Data API v3 Quotas
- **Free quota:** 10,000 units per day
- **Search request:** 100 units
- **Max requests/day:** ~100 searches

### Optimization Tips
1. **Cache results** (future enhancement):
   ```typescript
   // Cache videos for 1 hour
   const CACHE_DURATION = 3600000;
   ```

2. **Reduce max results:**
   ```typescript
   maxResults=20  // Default
   maxResults=10  // Use less quota
   ```

3. **Monitor usage:**
   - Visit: https://console.cloud.google.com/apis/api/youtube.googleapis.com/quotas

---

## 🚨 Troubleshooting

### Problem: "YouTube API key not found"
**Solution:** 
- Check `.dev.vars` exists for local
- Check secret is set for production: `wrangler pages secret list`

### Problem: "YouTube API error: 403"
**Solution:**
- API key is invalid or restricted
- Check key restrictions in Google Cloud Console
- Make sure YouTube Data API v3 is enabled

### Problem: "Videos not loading"
**Solution:**
- Check browser console for errors
- Check API endpoint: `/api/youtube/videos`
- Fallback videos should still show

### Problem: "Quota exceeded"
**Solution:**
- Wait 24 hours for quota reset
- Reduce `maxResults` in API call
- Implement caching (future enhancement)

---

## 🔐 Security Best Practices

### ✅ Do's
- ✅ Store API key in secrets (not in code)
- ✅ Use `.dev.vars` for local (in .gitignore)
- ✅ Use `wrangler secret` for production
- ✅ Restrict API key to your domain
- ✅ Monitor API usage regularly

### ❌ Don'ts
- ❌ Never commit API keys to Git
- ❌ Never expose keys in frontend code
- ❌ Never share API keys publicly
- ❌ Never use API keys without restrictions

---

## 📈 Future Enhancements

### 1. Video Caching
```typescript
// Cache videos in KV storage
const cached = await env.KV.get('youtube_videos');
if (cached) return JSON.parse(cached);
```

### 2. Filter Shorts Only
```typescript
// Add video duration check
const shorts = videos.filter(v => v.duration < 60);
```

### 3. Video Statistics
```typescript
// Get views, likes, comments
const statsUrl = `...&part=statistics`;
```

### 4. Pagination
```typescript
// Load more with pagination token
const nextPageUrl = `...&pageToken=${token}`;
```

---

## 📞 Support

### Resources
- YouTube Data API Docs: https://developers.google.com/youtube/v3
- Google Cloud Console: https://console.cloud.google.com/
- Wrangler Docs: https://developers.cloudflare.com/workers/wrangler/

### Contact
- For API issues: Check Google Cloud Console
- For website issues: Check browser console and server logs

---

## ✅ Quick Setup Checklist

- [ ] Create Google Cloud project
- [ ] Enable YouTube Data API v3
- [ ] Create API key
- [ ] (Optional) Restrict API key
- [ ] Get YouTube Channel ID
- [ ] Update Channel ID in code
- [ ] Add API key to `.dev.vars` (local)
- [ ] Add API key to Cloudflare secrets (production)
- [ ] Test API endpoint
- [ ] Test homepage video section
- [ ] Monitor API quota usage

---

**Last Updated:** 2026-02-27
**Status:** ✅ Ready to use (with API key configuration)
