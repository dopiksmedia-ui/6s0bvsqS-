import { Hono } from 'hono'

const testAdmin = new Hono()

testAdmin.get('/', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>اختبار إضافة مقال</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
</head>
<body class="bg-gray-50 p-4">
    <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h1 class="text-3xl font-bold mb-2 text-blue-600">🔧 صفحة اختبار - إضافة مقال</h1>
            <p class="text-gray-600 mb-6">استخدم هذا النموذج لإضافة مقالات بسرعة</p>
            
            <form id="articleForm" class="space-y-4">
                <div class="grid md:grid-cols-2 gap-4">
                    <div>
                        <label class="block font-bold mb-2 text-gray-700">عنوان المقال (عربي) *</label>
                        <input type="text" id="title_ar" class="w-full p-3 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200" required placeholder="مثال: فوائد الرياضة اليومية">
                    </div>
                    
                    <div>
                        <label class="block font-bold mb-2 text-gray-700">Article Title (English) *</label>
                        <input type="text" id="title_en" class="w-full p-3 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200" required placeholder="Example: Benefits of Daily Exercise">
                    </div>
                </div>
                
                <div class="grid md:grid-cols-2 gap-4">
                    <div>
                        <label class="block font-bold mb-2 text-gray-700">مقتطف قصير (عربي)</label>
                        <textarea id="excerpt_ar" rows="2" class="w-full p-3 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200" placeholder="ملخص قصير..."></textarea>
                    </div>
                    
                    <div>
                        <label class="block font-bold mb-2 text-gray-700">Short Excerpt (English)</label>
                        <textarea id="excerpt_en" rows="2" class="w-full p-3 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200" placeholder="Short summary..."></textarea>
                    </div>
                </div>
                
                <div class="grid md:grid-cols-2 gap-4">
                    <div>
                        <label class="block font-bold mb-2 text-gray-700">المحتوى (عربي) *</label>
                        <textarea id="content_ar" rows="6" class="w-full p-3 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 font-mono" required placeholder="<p>المحتوى هنا...</p>"></textarea>
                    </div>
                    
                    <div>
                        <label class="block font-bold mb-2 text-gray-700">Content (English) *</label>
                        <textarea id="content_en" rows="6" class="w-full p-3 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 font-mono" required placeholder="<p>Content here...</p>"></textarea>
                    </div>
                </div>
                
                <div class="grid md:grid-cols-3 gap-4">
                    <div>
                        <label class="block font-bold mb-2 text-gray-700">رابط الصورة</label>
                        <input type="url" id="main_image" class="w-full p-3 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200" placeholder="https://...">
                    </div>
                    
                    <div>
                        <label class="block font-bold mb-2 text-gray-700">التصنيف</label>
                        <select id="category" class="w-full p-3 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                            <option value="health">صحة</option>
                            <option value="surgery">جراحة</option>
                            <option value="prevention">وقاية</option>
                            <option value="nutrition">تغذية</option>
                        </select>
                    </div>
                    
                    <div>
                        <label class="block font-bold mb-2 text-gray-700">حالة النشر</label>
                        <select id="is_published" class="w-full p-3 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                            <option value="1">منشور</option>
                            <option value="0">مسودة</option>
                        </select>
                    </div>
                </div>
                
                <button type="submit" class="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-lg hover:from-blue-700 hover:to-blue-800 font-bold text-lg shadow-lg">
                    <i class="fas fa-save mr-2"></i>
                    حفظ المقال
                </button>
            </form>
            
            <div id="result" class="mt-6 p-4 rounded-lg hidden"></div>
        </div>
        
        <div class="bg-white rounded-lg shadow-lg p-8">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-gray-800">📚 المقالات الموجودة</h2>
                <button onclick="loadArticles()" class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                    <i class="fas fa-sync-alt mr-2"></i>
                    تحديث
                </button>
            </div>
            <div id="articlesList" class="space-y-3"></div>
        </div>
    </div>

    <script>
        // Load articles on page load
        loadArticles();

        document.getElementById('articleForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const data = {
                title_ar: document.getElementById('title_ar').value,
                title_en: document.getElementById('title_en').value,
                excerpt_ar: document.getElementById('excerpt_ar').value,
                excerpt_en: document.getElementById('excerpt_en').value,
                content_ar: document.getElementById('content_ar').value,
                content_en: document.getElementById('content_en').value,
                main_image_url: document.getElementById('main_image').value,
                category: document.getElementById('category').value,
                is_published: parseInt(document.getElementById('is_published').value),
                tags: [],
                meta_keywords: [],
                related_articles: [],
                read_time: 5
            };
            
            const resultDiv = document.getElementById('result');
            resultDiv.classList.remove('hidden');
            resultDiv.className = 'mt-6 p-4 rounded-lg bg-blue-100 text-blue-800';
            resultDiv.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> جاري الحفظ...';
            
            try {
                const response = await axios.post('/api/admin/articles', data);
                
                resultDiv.className = 'mt-6 p-4 rounded-lg bg-green-100 border-2 border-green-400 text-green-800';
                resultDiv.innerHTML = \`
                    <div class="flex items-center">
                        <i class="fas fa-check-circle text-2xl mr-3"></i>
                        <div>
                            <p class="font-bold">✅ تم إضافة المقال بنجاح!</p>
                            <p class="text-sm">رقم المقال: \${response.data.id}</p>
                        </div>
                    </div>
                \`;
                
                // Clear form
                document.getElementById('articleForm').reset();
                
                // Reload articles
                setTimeout(() => loadArticles(), 500);
            } catch (error) {
                resultDiv.className = 'mt-6 p-4 rounded-lg bg-red-100 border-2 border-red-400 text-red-800';
                resultDiv.innerHTML = \`
                    <div class="flex items-center">
                        <i class="fas fa-exclamation-circle text-2xl mr-3"></i>
                        <div>
                            <p class="font-bold">❌ خطأ في الحفظ</p>
                            <p class="text-sm">\${error.response?.data?.error || error.message}</p>
                        </div>
                    </div>
                \`;
            }
        });
        
        async function loadArticles() {
            try {
                const response = await axios.get('/api/admin/articles');
                const articles = response.data.articles;
                
                const listDiv = document.getElementById('articlesList');
                
                if (articles.length === 0) {
                    listDiv.innerHTML = '<p class="text-gray-500 text-center py-8">لا توجد مقالات بعد</p>';
                    return;
                }
                
                listDiv.innerHTML = articles.map(a => \`
                    <div class="border-2 border-gray-200 p-4 rounded-lg hover:border-blue-400 hover:shadow-md transition-all">
                        <div class="flex justify-between items-start">
                            <div class="flex-1">
                                <h3 class="font-bold text-lg text-gray-800">\${a.title_ar}</h3>
                                <p class="text-sm text-gray-600 mt-1">\${a.title_en}</p>
                                <div class="flex items-center space-x-4 space-x-reverse mt-2 text-xs text-gray-500">
                                    <span class="px-2 py-1 rounded bg-gray-100">ID: \${a.id}</span>
                                    <span class="px-2 py-1 rounded \${a.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100'}">
                                        \${a.is_published ? 'منشور' : 'مسودة'}
                                    </span>
                                    <span class="px-2 py-1 rounded bg-blue-100 text-blue-700">\${getCategoryName(a.category)}</span>
                                    <span><i class="fas fa-eye mr-1"></i>\${a.views || 0}</span>
                                </div>
                            </div>
                            <button onclick="deleteArticle(\${a.id}, '\${a.title_ar}')" class="text-red-600 hover:text-red-800 p-2">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                \`).join('');
            } catch (error) {
                console.error('Error loading articles:', error);
                document.getElementById('articlesList').innerHTML = '<p class="text-red-500">خطأ في تحميل المقالات</p>';
            }
        }
        
        async function deleteArticle(id, title) {
            if (!confirm(\`هل أنت متأكد من حذف المقال "\${title}"؟\`)) {
                return;
            }
            
            try {
                await axios.delete(\`/api/admin/articles/\${id}\`);
                alert('تم حذف المقال بنجاح');
                loadArticles();
            } catch (error) {
                alert('فشل حذف المقال');
            }
        }
        
        function getCategoryName(category) {
            const names = {
                'health': 'صحة',
                'surgery': 'جراحة',
                'prevention': 'وقاية',
                'nutrition': 'تغذية'
            };
            return names[category] || category;
        }
    </script>
</body>
</html>
  `)
})

export default testAdmin
