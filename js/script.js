// script.js

// ==========================================
// 1. وظائف واجهة المستخدم (Splash & Login)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // التأكد من أننا في الصفحة الرئيسية
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
            }, 1000); // وقت التلاشي
        }, 3500);

        // 2. التعامل مع نموذج تسجيل الدخول
        const loginForm = document.getElementById('login-form');
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // منع إعادة تحميل الصفحة
            loginScreen.classList.add('hidden');
            mainStore.classList.remove('hidden');
            
            // محاكاة تحميل المنتجات في المتجر
            loadStoreProducts();
        });
    }
});

// ==========================================
// 2. وظائف لوحة الإدارة (Admin Panel)
// ==========================================

// مصفوفة لتخزين المنتجات (محاكاة قاعدة البيانات)
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

    // 1. حساب السعر النهائي
    const totalCost = basePrice + shipping;
    const profitAmount = totalCost * (margin / 100);
    const finalPrice = totalCost + profitAmount;

    // 2. إنشاء كائن المنتج
    const newProduct = {
        id: Date.now(),
        url: url,
        basePrice: basePrice,
        shipping: shipping,
        finalPrice: finalPrice.toFixed(2),
        margin: margin
    };

    // 3. إضافة المنتج إلى "قاعدة البيانات"
    productsDB.push(newProduct);

    // 4. تحديث الواجهة
    renderAdminProducts();
    alert(`تم استيراد المنتج بنجاح!\nالسعر النهائي للعميل: $${finalPrice.toFixed(2)}`);
    
    // تفريغ الحقول
    document.getElementById('product-url').value = '';
    document.getElementById('base-price').value = '';
    document.getElementById('shipping-cost').value = '';
}

function renderAdminProducts() {
    const listContainer = document.getElementById('admin-product-list');
    if (!listContainer) return; // إذا لم نكن في صفحة الإدارة

    // الحفاظ على العنوان
    let html = '<h3 style="color:var(--gold); margin-bottom:15px;">المنتجات المستوردة</h3>';
    
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
    // محاكاة جلب المنتجات من قاعدة البيانات وعرضها في الصفحة الرئيسية
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    // إذا كانت قاعدة البيانات فارغة، نضع منتجات وهمية للعرض
    if (productsDB.length === 0) {
        productsDB = [
            { id: 1, name: 'Noir Élégance', price: '120.00', img: 'https://via.placeholder.com/300x300/1A1A1A/D4AF37?text=Noir' },
            { id: 2, name: 'Amber Royale', price: '150.00', img: 'https://via.placeholder.com/300x300/1A1A1A/D4AF37?text=Amber' },
            { id: 3, name: 'Velvet Santal', price: '135.00', img: 'https://via.placeholder.com/300x300/1A1A1A/D4AF37?text=Velvet' }
        ];
    }

    grid.innerHTML = ''; // تفريغ الشبكة
    productsDB.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${p.img || 'https://via.placeholder.com/300x300/1A1A1A/D4AF37?text=Product'}" alt="${p.name || 'منتج'}">
            <h4>${p.name || 'منتج جديد'}</h4>
            <p>$${p.price || p.finalPrice}</p>
            <button class="btn-primary" style="margin-top:10px; padding:10px; font-size:0.8rem;">عرض التفاصيل</button>
        `;
        grid.appendChild(card);
    });
}
