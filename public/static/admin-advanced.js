// ============================================
// Advanced Admin Panel JavaScript
// ============================================

const API_BASE = '/api/admin';
let authToken = null;
let currentArticleId = null;
let quillEditorAr = null;
let quillEditorEn = null;
let selectedMediaIds = [];
let allArticles = [];

// ============================================
// Authentication
// ============================================

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await axios.post(`${API_BASE}/auth/login`, {
            username,
            password
        });
        
        if (response.data.success) {
            authToken = response.data.token;
            document.getElementById('loginModal').classList.add('hidden');
            document.getElementById('dashboard').classList.remove('hidden');
            
            // Load initial data
            loadArticles();
            loadSettings();
            loadMedia();
        }
    } catch (error) {
        const errorDiv = document.getElementById('loginError');
        errorDiv.textContent = 'خطأ في اسم المستخدم أو كلمة المرور';
        errorDiv.classList.remove('hidden');
    }
});

function logout() {
    authToken = null;
    document.getElementById('loginModal').classList.remove('hidden');
    document.getElementById('dashboard').classList.add('hidden');
}

// ============================================
// Tab Navigation
// ============================================

function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('border-blue-600', 'text-blue-600');
        btn.classList.add('border-transparent', 'text-gray-600');
    });
    
    // Show selected tab
    document.getElementById(`${tabName}Tab`).classList.add('active');
    
    // Add active class to clicked button
    const activeBtn = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeBtn) {
        activeBtn.classList.add('border-blue-600', 'text-blue-600');
        activeBtn.classList.remove('border-transparent', 'text-gray-600');
    }
    
    // Load data if needed
    if (tabName === 'media') {
        loadMedia();
    }
}

// ============================================
// Articles Management
// ============================================

async function loadArticles() {
    try {
        const response = await axios.get(`${API_BASE}/articles`);
        allArticles = response.data.articles;
        
        const listDiv = document.getElementById('articlesList');
        
        if (allArticles.length === 0) {
            listDiv.innerHTML = `
                <div class="text-center py-12 text-gray-500">
                    <i class="fas fa-newspaper text-6xl mb-4 text-gray-300"></i>
                    <p class="text-xl font-semibold">لا توجد مقالات حتى الآن</p>
                    <p class="mt-2">ابدأ بإضافة أول مقال</p>
                </div>
            `;
            return;
        }
        
        listDiv.innerHTML = allArticles.map(article => `
            <div class="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all bg-gradient-to-r from-white to-gray-50">
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <div class="flex items-center space-x-3 space-x-reverse mb-3">
                            <h3 class="text-xl font-bold text-gray-800">${article.title_ar}</h3>
                            <span class="px-3 py-1 rounded-full text-xs font-semibold ${article.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">
                                ${article.is_published ? 'منشور' : 'مسودة'}
                            </span>
                            ${article.category ? `<span class="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">${getCategoryName(article.category)}</span>` : ''}
                        </div>
                        <p class="text-gray-600 text-sm mb-2 font-medium">${article.title_en}</p>
                        ${article.excerpt_ar ? `<p class="text-gray-500 text-sm leading-relaxed">${article.excerpt_ar.substring(0, 150)}...</p>` : ''}
                        <div class="flex items-center space-x-6 space-x-reverse mt-4 text-sm text-gray-500">
                            <span><i class="fas fa-eye mr-1 text-blue-500"></i>${article.views || 0} مشاهدة</span>
                            <span><i class="fas fa-calendar mr-1 text-green-500"></i>${formatDate(article.created_at)}</span>
                            ${article.read_time ? `<span><i class="fas fa-clock mr-1 text-purple-500"></i>${article.read_time} دقيقة</span>` : ''}
                        </div>
                    </div>
                    <div class="flex space-x-2 space-x-reverse mr-4">
                        <button onclick="editArticle(${article.id})" class="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-3 rounded-lg transition-all" title="تعديل">
                            <i class="fas fa-edit text-xl"></i>
                        </button>
                        <button onclick="deleteArticle(${article.id}, '${article.title_ar.replace(/'/g, "\\'")})')" class="text-red-600 hover:text-red-800 hover:bg-red-50 p-3 rounded-lg transition-all" title="حذف">
                            <i class="fas fa-trash text-xl"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading articles:', error);
    }
}

async function deleteArticle(id, title) {
    if (!confirm(`هل أنت متأكد من حذف المقال "${title}"؟\n\nهذا الإجراء لا يمكن التراجع عنه.`)) {
        return;
    }
    
    try {
        await axios.delete(`${API_BASE}/articles/${id}`);
        showNotification('تم حذف المقال بنجاح', 'success');
        loadArticles();
    } catch (error) {
        console.error('Error deleting article:', error);
        showNotification('فشل حذف المقال', 'error');
    }
}

// ============================================
// Media Library
// ============================================

async function loadMedia() {
    try {
        const response = await axios.get(`${API_BASE}/media`);
        const media = response.data.media;
        
        const gridDiv = document.getElementById('mediaGrid');
        
        if (media.length === 0) {
            gridDiv.innerHTML = `
                <div class="col-span-full text-center py-12 text-gray-500">
                    <i class="fas fa-images text-6xl mb-4 text-gray-300"></i>
                    <p class="text-xl font-semibold">لا توجد وسائط</p>
                    <p class="mt-2">ابدأ برفع أول صورة</p>
                </div>
            `;
            return;
        }
        
        gridDiv.innerHTML = media.map(item => `
            <div class="media-item relative group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all" 
                 onclick="selectMedia(${item.id})" 
                 data-media-id="${item.id}">
                <img src="${item.file_url}" 
                     alt="${item.alt_text_ar || 'صورة'}" 
                     class="w-full h-40 object-cover">
                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                    <div class="hidden group-hover:flex space-x-2 space-x-reverse">
                        <button onclick="event.stopPropagation(); copyImageUrl('${item.file_url}')" 
                                class="bg-white text-blue-600 p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                                title="نسخ الرابط">
                            <i class="fas fa-copy"></i>
                        </button>
                        <button onclick="event.stopPropagation(); deleteMedia(${item.id})" 
                                class="bg-white text-red-600 p-2 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
                                title="حذف">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="absolute top-2 right-2">
                    <input type="checkbox" class="w-5 h-5 text-blue-600 rounded" 
                           onchange="toggleMediaSelection(${item.id}, this.checked)">
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading media:', error);
    }
}

function selectMedia(mediaId) {
    // Toggle selection
    const checkbox = event.currentTarget.querySelector('input[type="checkbox"]');
    if (checkbox) {
        checkbox.checked = !checkbox.checked;
        toggleMediaSelection(mediaId, checkbox.checked);
    }
}

function toggleMediaSelection(mediaId, isSelected) {
    if (isSelected) {
        if (!selectedMediaIds.includes(mediaId)) {
            selectedMediaIds.push(mediaId);
        }
    } else {
        selectedMediaIds = selectedMediaIds.filter(id => id !== mediaId);
    }
    console.log('Selected media:', selectedMediaIds);
}

function copyImageUrl(url) {
    navigator.clipboard.writeText(url).then(() => {
        showNotification('تم نسخ رابط الصورة', 'success');
    });
}

async function deleteMedia(id) {
    if (!confirm('هل أنت متأكد من حذف هذه الصورة؟')) {
        return;
    }
    
    try {
        await axios.delete(`${API_BASE}/media/${id}`);
        showNotification('تم حذف الصورة بنجاح', 'success');
        loadMedia();
    } catch (error) {
        console.error('Error deleting media:', error);
        showNotification('فشل حذف الصورة', 'error');
    }
}

function showUploadForm() {
    document.getElementById('uploadModal').classList.remove('hidden');
}

function closeUploadForm() {
    document.getElementById('uploadModal').classList.add('hidden');
    document.getElementById('uploadForm').reset();
}

document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const url = document.getElementById('upload_image_url').value;
    const altAr = document.getElementById('upload_alt_ar').value;
    const altEn = document.getElementById('upload_alt_en').value;
    
    const filename = url.split('/').pop().split('?')[0] || `image-${Date.now()}.jpg`;
    
    try {
        await axios.post(`${API_BASE}/media/upload`, {
            filename: filename,
            file_url: url,
            file_type: 'image',
            mime_type: 'image/jpeg',
            alt_text_ar: altAr,
            alt_text_en: altEn
        });
        
        showNotification('تم رفع الصورة بنجاح', 'success');
        closeUploadForm();
        loadMedia();
    } catch (error) {
        console.error('Error uploading image:', error);
        showNotification('فشل رفع الصورة', 'error');
    }
});

// ============================================
// Settings Management
// ============================================

async function loadSettings() {
    try {
        const response = await axios.get(`${API_BASE}/settings`);
        const settings = response.data.settings;
        
        settings.forEach(setting => {
            const element = document.getElementById(setting.setting_key);
            if (element) {
                if (element.type === 'checkbox') {
                    element.checked = setting.setting_value === '1';
                } else {
                    element.value = setting.setting_value;
                }
                
                // Update logo preview
                if (setting.setting_key === 'site_logo_url' && setting.setting_value) {
                    updateLogoPreview(setting.setting_value);
                }
            }
        });
    } catch (error) {
        console.error('Error loading settings:', error);
    }
}

async function saveSettings() {
    const settings = {
        site_logo_url: document.getElementById('site_logo_url').value,
        primary_language: document.getElementById('primary_language').value,
        secondary_language: document.getElementById('secondary_language').value,
        enable_secondary_language: document.getElementById('enable_secondary_language').checked ? '1' : '0'
    };
    
    try {
        await axios.post(`${API_BASE}/settings/bulk`, { settings });
        showNotification('تم حفظ الإعدادات بنجاح', 'success');
    } catch (error) {
        console.error('Error saving settings:', error);
        showNotification('فشل حفظ الإعدادات', 'error');
    }
}

// Logo preview
document.getElementById('site_logo_url')?.addEventListener('input', (e) => {
    updateLogoPreview(e.target.value);
});

function updateLogoPreview(url) {
    const img = document.getElementById('logoImage');
    if (url) {
        img.src = url;
        img.classList.remove('hidden');
    } else {
        img.classList.add('hidden');
    }
}

// ============================================
// Articles Management (continued)
// ============================================

function showArticleForm() {
    currentArticleId = null;
    
    // Create and show a simple article form since we don't have the full modal yet
    const formHtml = `
        <div id="simpleArticleForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div class="bg-white rounded-lg max-w-4xl w-full p-8 my-8">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-2xl font-bold">مقال جديد</h3>
                    <button onclick="closeSimpleArticleForm()" class="text-gray-600 hover:text-gray-800">
                        <i class="fas fa-times text-2xl"></i>
                    </button>
                </div>
                
                <form id="simpleArticleFormElement" class="space-y-6">
                    <input type="hidden" id="article_id">
                    
                    <!-- Titles -->
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-gray-700 font-semibold mb-2">عنوان المقال (عربي) *</label>
                            <input type="text" id="article_title_ar" required 
                                   class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
                        </div>
                        <div>
                            <label class="block text-gray-700 font-semibold mb-2">Article Title (English) *</label>
                            <input type="text" id="article_title_en" required
                                   class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
                        </div>
                    </div>
                    
                    <!-- Excerpts -->
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-gray-700 font-semibold mb-2">مقتطف (عربي)</label>
                            <textarea id="article_excerpt_ar" rows="3"
                                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"></textarea>
                        </div>
                        <div>
                            <label class="block text-gray-700 font-semibold mb-2">Excerpt (English)</label>
                            <textarea id="article_excerpt_en" rows="3"
                                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"></textarea>
                        </div>
                    </div>
                    
                    <!-- Content -->
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-gray-700 font-semibold mb-2">المحتوى (عربي) *</label>
                            <textarea id="article_content_ar" rows="10" required
                                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 font-mono"></textarea>
                        </div>
                        <div>
                            <label class="block text-gray-700 font-semibold mb-2">Content (English) *</label>
                            <textarea id="article_content_en" rows="10" required
                                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 font-mono"></textarea>
                        </div>
                    </div>
                    
                    <!-- Image & Category -->
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-gray-700 font-semibold mb-2">رابط الصورة الرئيسية</label>
                            <input type="url" id="article_main_image"
                                   class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                   placeholder="https://images.unsplash.com/...">
                        </div>
                        <div>
                            <label class="block text-gray-700 font-semibold mb-2">التصنيف</label>
                            <select id="article_category"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
                                <option value="">اختر التصنيف</option>
                                <option value="health">صحة</option>
                                <option value="surgery">جراحة</option>
                                <option value="prevention">وقاية</option>
                                <option value="nutrition">تغذية</option>
                            </select>
                        </div>
                    </div>
                    
                    <!-- SEO Fields -->
                    <div class="border-t pt-6">
                        <h4 class="text-lg font-bold mb-4">إعدادات SEO (اختياري)</h4>
                        <div class="grid md:grid-cols-2 gap-6 mb-4">
                            <div>
                                <label class="block text-gray-700 mb-2">عنوان SEO (عربي)</label>
                                <input type="text" id="article_meta_title_ar" maxlength="60"
                                       class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
                            </div>
                            <div>
                                <label class="block text-gray-700 mb-2">SEO Title (English)</label>
                                <input type="text" id="article_meta_title_en" maxlength="60"
                                       class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
                            </div>
                        </div>
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-gray-700 mb-2">وصف SEO (عربي)</label>
                                <textarea id="article_meta_description_ar" rows="2" maxlength="160"
                                          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"></textarea>
                            </div>
                            <div>
                                <label class="block text-gray-700 mb-2">SEO Description (English)</label>
                                <textarea id="article_meta_description_en" rows="2" maxlength="160"
                                          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"></textarea>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Publish Status -->
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">حالة النشر</label>
                        <select id="article_is_published"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
                            <option value="0">مسودة</option>
                            <option value="1">منشور</option>
                        </select>
                    </div>
                    
                    <!-- Buttons -->
                    <div class="flex justify-end space-x-4 space-x-reverse pt-6 border-t">
                        <button type="button" onclick="closeSimpleArticleForm()"
                                class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                            إلغاء
                        </button>
                        <button type="submit"
                                class="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md">
                            <i class="fas fa-save mr-2"></i>
                            حفظ المقال
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', formHtml);
    
    // Add form submit handler
    document.getElementById('simpleArticleFormElement').addEventListener('submit', handleArticleSubmit);
}

function closeSimpleArticleForm() {
    const form = document.getElementById('simpleArticleForm');
    if (form) {
        form.remove();
    }
}

async function editArticle(id) {
    try {
        const response = await axios.get(`${API_BASE}/articles/${id}`);
        const article = response.data.article;
        
        currentArticleId = id;
        showArticleForm();
        
        // Wait for form to be created
        setTimeout(() => {
            // Fill form with article data
            document.getElementById('article_id').value = id;
            document.getElementById('article_title_ar').value = article.title_ar || '';
            document.getElementById('article_title_en').value = article.title_en || '';
            document.getElementById('article_excerpt_ar').value = article.excerpt_ar || '';
            document.getElementById('article_excerpt_en').value = article.excerpt_en || '';
            document.getElementById('article_content_ar').value = article.content_ar || '';
            document.getElementById('article_content_en').value = article.content_en || '';
            document.getElementById('article_main_image').value = article.main_image_url || '';
            document.getElementById('article_category').value = article.category || '';
            document.getElementById('article_is_published').value = article.is_published || 0;
            
            // SEO fields
            document.getElementById('article_meta_title_ar').value = article.meta_title_ar || '';
            document.getElementById('article_meta_title_en').value = article.meta_title_en || '';
            document.getElementById('article_meta_description_ar').value = article.meta_description_ar || '';
            document.getElementById('article_meta_description_en').value = article.meta_description_en || '';
            
            // Update form title
            document.querySelector('#simpleArticleForm h3').textContent = 'تعديل المقال';
        }, 100);
    } catch (error) {
        console.error('Error loading article:', error);
        showNotification('فشل تحميل المقال', 'error');
    }
}

async function handleArticleSubmit(e) {
    e.preventDefault();
    
    const articleData = {
        title_ar: document.getElementById('article_title_ar').value,
        title_en: document.getElementById('article_title_en').value,
        excerpt_ar: document.getElementById('article_excerpt_ar').value,
        excerpt_en: document.getElementById('article_excerpt_en').value,
        content_ar: document.getElementById('article_content_ar').value,
        content_en: document.getElementById('article_content_en').value,
        main_image_url: document.getElementById('article_main_image').value,
        category: document.getElementById('article_category').value,
        is_published: parseInt(document.getElementById('article_is_published').value),
        meta_title_ar: document.getElementById('article_meta_title_ar').value,
        meta_title_en: document.getElementById('article_meta_title_en').value,
        meta_description_ar: document.getElementById('article_meta_description_ar').value,
        meta_description_en: document.getElementById('article_meta_description_en').value,
        tags: [],
        meta_keywords: [],
        related_articles: [],
        read_time: 5
    };
    
    try {
        if (currentArticleId) {
            // Update existing article
            await axios.put(`${API_BASE}/articles/${currentArticleId}`, articleData);
            showNotification('تم تحديث المقال بنجاح', 'success');
        } else {
            // Create new article
            await axios.post(`${API_BASE}/articles`, articleData);
            showNotification('تم إضافة المقال بنجاح', 'success');
        }
        
        closeSimpleArticleForm();
        loadArticles();
    } catch (error) {
        console.error('Error saving article:', error);
        showNotification('فشل حفظ المقال: ' + (error.response?.data?.error || error.message), 'error');
    }
}

// ============================================
// Helper Functions (continued)
// ============================================

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function getCategoryName(category) {
    const categories = {
        'health': 'صحة',
        'surgery': 'جراحة',
        'prevention': 'وقاية',
        'nutrition': 'تغذية'
    };
    return categories[category] || category;
}

function showNotification(message, type = 'info') {
    const colors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500',
        warning: 'bg-yellow-500'
    };
    
    const notification = document.createElement('div');
    notification.className = `fixed top-20 left-1/2 transform -translate-x-1/2 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
