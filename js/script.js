// script.js

// ==========================================
// 1. وظائف واجهة المستخدم (Splash & Login)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const splash = document.getElementById('splash-screen');
    const loginScreen = document.getElementById('login-screen');
    const mainStore = document.getElementById('main-store');

    if (splash && loginScreen && mainStore) {
        // 1. إخفاء شاشة البداية بعد 3.5 ثانية
        setTimeout(() => {
            splash.style.opacity = '0';
            setTimeout(() => {
                splash.classList.add('hidden');
                loginScreen.classList.remove('hidden');
            }, 1000);
        }, 3500);

        // 2. التعامل مع نموذج تسجيل الدخول
        const loginForm = document.getElementById('login-form');
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            loginScreen.classList.add('hidden');
            mainStore.classList.remove('hidden');
            loadStoreProducts();
        });
    }
});

// ==========================================
// 2. وظائف لوحة الإدارة (Admin Panel)
// ==========================================

let productsDB = [];

function importProduct() {
    const url = document.getElementById('product-url').value;
    const basePrice = parseFloat(document.getElementById('base-price').value);
    const shipping = parseFloat(document.getElementById('shipping-cost').value);
    const margin = parseFloat(document.getElementById('profit-margin').value);

    if (!url || isNaN(basePrice) || isNaN(shipping)) {
        alert('يرجى ملء جميع الحقول بشكل صحيح.');
        return;
    }

    const totalCost = basePrice + shipping;
    const profitAmount = totalCost * (margin / 100);
    const finalPrice = totalCost + profitAmount;

    const newProduct = {
        id: Date.now(),
        url: url,
        basePrice: basePrice,
        shipping: shipping,
        finalPrice: finalPrice.toFixed(2),
        margin: margin
    };

    productsDB.push(newProduct);
    renderAdminProducts();
    
    alert(`تم استيراد المنتج بنجاح!\nالسعر النهائي للعميل: $${finalPrice.toFixed(2)}`);
    
    document.getElementById('product-url').value = '';
    document.getElementById('base-price').value = '';
    document.getElementById('shipping-cost').value = '';
}

function renderAdminProducts() {
    const listContainer = document.getElementById('admin-product-list');
    if (!listContainer) return;

    let html = '<h3 style="color:var(--silver); margin-bottom:15px;">المنتجات المستوردة</h3>';
    
    productsDB.forEach(product => {
        html += `
            <div class="product-item">
                <span>رابط: ${product.url.substring(0, 30)}...</span>
                <span>التكلفة: $${(product.basePrice + product.shipping).toFixed(2)}</span>
                <span>الربح: ${product.margin}%</span>
                <span class="price">السعر النهائي: $${product.finalPrice}</span>
            </div>
        `;
    });

    listContainer.innerHTML = html;
}

// ==========================================
// 3. وظائف المتجر (Store)
// ==========================================

function loadStoreProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    // منتجات وهمية لـ NIVORA
    if (productsDB.length === 0) {
        productsDB = [
            { id: 1, name: 'خاتم فضة عيار 925', price: '95.00', img: 'https://via.placeholder.com/300x300/1A1A1A/C0C0C0?text=Ring' },
            { id: 2, name: 'سلسلة فضة رجالية', price: '120.00', img: 'https://via.placeholder.com/300x300/1A1A1A/C0C0C0?text=Necklace' },
            { id: 3, name: 'أسورة فضة فاخرة', price: '110.00', img: 'https://via.placeholder.com/300x300/1A1A1A/C0C0C0?text=Bracelet' }
        ];
    }

    grid.innerHTML = '';
    productsDB.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${p.img || 'https://via.placeholder.com/300x300/1A1A1A/C0C0C0?text=Product'}" alt="${p.name || 'منتج'}">
            <h4>${p.name || 'منتج جديد'}</h4>
            <p>$${p.price || p.finalPrice}</p>
            <button class="btn-primary" style="margin-top:10px; padding:10px; font-size:0.8rem;">عرض التفاصيل</button>
        `;
        grid.appendChild(card);
    });
}
