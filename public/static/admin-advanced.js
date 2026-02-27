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
