// assets/js/main.js

document.addEventListener('DOMContentLoaded', async () => {
    // 0. تحميل الكتالوج الحقيقي عند توفر Supabase، وإلا استخدم بيانات العرض التجريبية.
    if (window.Nivora) {
        try {
            const live = await window.Nivora.getProducts();
            if (live && live.length) {
                productsData = live.map(p => ({
                    id: p.id, nameAr: p.name_ar, nameEn: p.name_en || p.name_ar,
                    category: p.category, categoryAr: ({jewelry:'الفضة والمجوهرات',perfumes:'العطور',watches:'الساعات',sunglasses:'النظارات الشمسية'})[p.category] || p.category,
                    price: Number(p.price||0), oldPrice: Number(p.compare_at_price||0)||null,
                    discount: p.compare_at_price ? Math.max(0,Math.round((1-p.price/p.compare_at_price)*100)) : 0,
                    stock: Number(p.stock_qty||0), rating: Number(p.rating||5), reviews: Number(p.review_count||0),
                    descriptionAr: p.description_ar || '', images: Array.isArray(p.images)?p.images:[], featured: !!p.featured, brand: p.brand || 'NIVORA',
                    cost_price: Number(p.cost_price||0)
                }));
            }
        } catch(e) { console.warn('NIVORA demo catalog fallback', e); }
    }
    // 1. تحميل المنتجات المميزة في الصفحة الرئيسية
    loadFeaturedProducts();
    
    // 2. تحميل المنتجات في صفحة المتجر
    loadShopProducts();
    
    // 3. تفعيل البحث
    setupSearch();
    
    // 4. تفعيل الفلاتر
    setupFilters();
    
    // 5. تفعيل قائمة الجوال
    setupMobileMenu();
    
    // 6. تفعيل تبديل اللغة
    setupLanguageSwitch();
    
    // 7. تحديث عداد السلة
    updateCartCount();
    
    // 8. تفعيل زر إضافة إلى السلة في جميع الصفحات
    setupAddToCartButtons();
    
    // 9. تفعيل زر المفضلة
    setupWishlistButtons();
});

// ========== 1. تحميل المنتجات المميزة ==========
function loadFeaturedProducts() {
    const grid = document.getElementById('featured-products-grid');
    if (!grid) return;
    
    const featured = productsData.filter(p => p.featured === true);
    renderProductGrid(grid, featured);
}

// ========== 2. تحميل منتجات المتجر ==========
function loadShopProducts() {
    const grid = document.getElementById('shop-products-grid');
    if (!grid) return;
    
    // التحقق من وجود باراميتر في الرابط (مثل ?category=watches)
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    let filtered = productsData;
    if (category) {
        filtered = productsData.filter(p => p.category === category);
    }
    
    renderProductGrid(grid, filtered);
}

// ========== 3. رسم شبكة المنتجات ==========
function renderProductGrid(container, products) {
    if (!container) return;
    
    if (products.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-gray); padding: 50px;">لا توجد منتجات مطابقة.</p>';
        return;
    }
    
    let html = '';
    products.forEach(product => {
        const discountHtml = product.discount > 0 
            ? `<span class="badge">-${product.discount}%</span>` 
            : '';
        const oldPriceHtml = product.oldPrice 
            ? `<span class="old-price">${product.oldPrice} ج.م</span>` 
            : '';
        
        html += `
            <div class="product-card" data-id="${product.id}">
                ${discountHtml}
                <i class="fa-regular fa-heart wishlist" data-id="${product.id}"></i>
                <img src="${product.images[0]}" alt="${product.nameAr}" onerror="this.src='https://via.placeholder.com/300x300/111111/888888?text=Product'">
                <p class="category-name">${product.categoryAr}</p>
                <h4>${product.nameAr}</h4>
                <div class="rating">
                    ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                    <span style="color: var(--text-gray);">(${product.reviews})</span>
                </div>
                <div class="price">
                    ${product.price} ج.م
                    ${oldPriceHtml}
                </div>
                <div class="actions">
                    <button class="btn-add" data-id="${product.id}">
                        <i class="fa-solid fa-cart-plus"></i> أضف للسلة
                    </button>
                    <a href="product.html?id=${product.id}" class="btn-view">
                        <i class="fa-regular fa-eye"></i>
                    </a>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// ========== 4. البحث ==========
function setupSearch() {
    const searchInputs = document.querySelectorAll('.search-box');
    searchInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const grid = document.getElementById('shop-products-grid') || document.getElementById('featured-products-grid');
            if (!grid) return;
            
            const filtered = productsData.filter(p => 
                p.nameAr.includes(query) || 
                p.nameEn.toLowerCase().includes(query) ||
                p.categoryAr.includes(query)
            );
            renderProductGrid(grid, filtered);
        });
    });
}

// ========== 5. الفلاتر ==========
function setupFilters() {
    const filterCheckboxes = document.querySelectorAll('.filter-group input[type="checkbox"]');
    const priceRange = document.querySelector('.filter-group input[type="range"]');
    
    const applyFilters = () => {
        const grid = document.getElementById('shop-products-grid');
        if (!grid) return;
        
        let filtered = [...productsData];
        
        // فلترة الأقسام
        const activeCategories = Array.from(document.querySelector
