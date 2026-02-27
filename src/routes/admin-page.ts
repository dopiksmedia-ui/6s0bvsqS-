import { Hono } from 'hono'
import { readFile } from 'fs/promises'
import { join } from 'path'

const adminPage = new Hono()

adminPage.get('/', async (c) => {
  try {
    // Read admin.html from public directory
    const html = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>لوحة التحكم - إدارة الموقع</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
</head>
<body class="bg-gray-50">
    <div class="min-h-screen flex items-center justify-center">
        <div class="text-center">
            <i class="fas fa-tools text-6xl text-blue-600 mb-4"></i>
            <h1 class="text-3xl font-bold text-gray-800 mb-4">لوحة التحكم</h1>
            <p class="text-gray-600 mb-6">يرجى الانتقال إلى:</p>
            <a href="/static/admin.html" class="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                <i class="fas fa-external-link-alt mr-2"></i>
                فتح لوحة التحكم
            </a>
        </div>
    </div>
</body>
</html>`
    
    return c.html(html)
  } catch (error) {
    return c.text('خطأ في تحميل صفحة الإدارة', 500)
  }
})

export default adminPage
