// ============================================
// Admin Panel JavaScript
// ============================================

const API_BASE = '/api/admin';
let authToken = null;
let currentArticleId = null;

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
        tab.classList.add('hidden');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('border-blue-600', 'text-blue-600');
        btn.classList.add('border-transparent', 'text-gray-600');
    });
    
    // Show selected tab
    document.getElementById(`${tabName}Tab`).classList.remove('hidden');
    
    // Add active class to clicked button
    event.target.closest('button').classList.add('border-blue-600', 'text-blue-600');
    event.target.closest('button').classList.remove('border-transparent', 'text-gray-600');
}

// ============================================
// Articles Management
// ============================================

async function loadArticles() {
    try {
        const response = await axios.get(`${API_BASE}/articles`);
        const articles = response.data.articles;
        
        const listDiv = document.getElementById('articlesList');
        
        if (articles.length === 0) {
            listDiv.innerHTML = `
                <div class="text-center py-12 text-gray-500">
                    <i class="fas fa-newspaper text-6xl mb-4"></i>
                    <p class="text-xl">لا توجد مقالات حتى الآن</p>
                    <p class="mt-2">ابدأ بإضافة أول مقال</p>
                </div>
            `;
            return;
        }
        
        listDiv.innerHTML = articles.map(article => `
            <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <div class="flex items-center space-x-3 space-x-reverse mb-2">
                            <h3 class="text-lg font-bold text-gray-800">${article.title_ar}</h3>
                            <span class="px-3 py-1 rounded-full text-xs ${article.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">
                                ${article.is_published ? 'منشور' : 'مسودة'}
                            </span>
                            ${article.category ? `<span class="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800">${getCategoryName(article.category)}</span>` : ''}
                        </div>
                        <p class="text-gray-600 text-sm mb-2">${article.title_en}</p>
                        ${article.excerpt_ar ? `<p class="text-gray-500 text-sm">${article.excerpt_ar.substring(0, 150)}...</p>` : ''}
                        <div class="flex items-center space-x-4 space-x-reverse mt-3 text-sm text-gray-500">
                            <span><i class="fas fa-eye mr-1"></i>${article.views || 0} مشاهدة</span>
                            <span><i class="fas fa-calendar mr-1"></i>${formatDate(article.created_at)}</span>
                        </div>
                    </div>
                    <div class="flex space-x-2 space-x-reverse mr-4">
                        <button onclick="editArticle(${article.id})" class="text-blue-600 hover:text-blue-800 p-2">
                            <i class="fas fa-edit text-xl"></i>
                        </button>
                        <button onclick="deleteArticle(${article.id}, '${article.title_ar}')" class="text-red-600 hover:text-red-800 p-2">
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

function showArticleForm() {
    currentArticleId = null;
    document.getElementById('formTitle').textContent = 'مقال جديد';
    document.getElementById('articleForm').reset();
    document.getElementById('articleId').value = '';
    document.getElementById('articleFormModal').classList.remove('hidden');
}

function closeArticleForm() {
    document.getElementById('articleFormModal').classList.add('hidden');
}

async function editArticle(id) {
    try {
        const response = await axios.get(`${API_BASE}/articles/${id}`);
        const article = response.data.article;
        
        currentArticleId = id;
        document.getElementById('formTitle').textContent = 'تعديل المقال';
        document.getElementById('articleId').value = id;
        document.getElementById('title_ar').value = article.title_ar;
        document.getElementById('title_en').value = article.title_en;
        document.getElementById('excerpt_ar').value = article.excerpt_ar || '';
        document.getElementById('excerpt_en').value = article.excerpt_en || '';
        document.getElementById('content_ar').value = article.content_ar;
        document.getElementById('content_en').value = article.content_en;
        document.getElementById('main_image_url').value = article.main_image_url || '';
        document.getElementById('category').value = article.category || '';
        document.getElementById('is_published').value = article.is_published;
        
        document.getElementById('articleFormModal').classList.remove('hidden');
    } catch (error) {
        console.error('Error loading article:', error);
        alert('فشل تحميل المقال');
    }
}

async function deleteArticle(id, title) {
    if (!confirm(`هل أنت متأكد من حذف المقال "${title}"؟`)) {
        return;
    }
    
    try {
        await axios.delete(`${API_BASE}/articles/${id}`);
        alert('تم حذف المقال بنجاح');
        loadArticles();
    } catch (error) {
        console.error('Error deleting article:', error);
        alert('فشل حذف المقال');
    }
}

document.getElementById('articleForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        title_ar: document.getElementById('title_ar').value,
        title_en: document.getElementById('title_en').value,
        excerpt_ar: document.getElementById('excerpt_ar').value,
        excerpt_en: document.getElementById('excerpt_en').value,
        content_ar: document.getElementById('content_ar').value,
        content_en: document.getElementById('content_en').value,
        main_image_url: document.getElementById('main_image_url').value,
        category: document.getElementById('category').value,
        is_published: parseInt(document.getElementById('is_published').value)
    };
    
    try {
        if (currentArticleId) {
            // Update existing article
            await axios.put(`${API_BASE}/articles/${currentArticleId}`, formData);
            alert('تم تحديث المقال بنجاح');
        } else {
            // Create new article
            await axios.post(`${API_BASE}/articles`, formData);
            alert('تم إضافة المقال بنجاح');
        }
        
        closeArticleForm();
        loadArticles();
    } catch (error) {
        console.error('Error saving article:', error);
        alert('فشل حفظ المقال');
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
        alert('تم حفظ الإعدادات بنجاح');
    } catch (error) {
        console.error('Error saving settings:', error);
        alert('فشل حفظ الإعدادات');
    }
}

// Logo preview
document.getElementById('site_logo_url').addEventListener('input', (e) => {
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
// Helper Functions
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
