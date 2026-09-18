// assets/js/cart.js

// ========== إدارة السلة باستخدام localStorage ==========
const CART_KEY = 'nivora_cart';

// الحصول على السلة
function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

// حفظ السلة
function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
}

// إضافة منتج للسلة
function addToCart(product, quantity = 1) {
    let cart = getCart();
    const existing = cart.find(item => item.id === product.id);
    
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            nameAr: product.nameAr,
            price: product.price,
            image: product.images[0],
            quantity: quantity
        });
    }
    
    saveCart(cart);
    return cart;
}

// حذف منتج من السلة
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    renderCartPage();
}

// تحديث كمية منتج
function updateQuantity(productId, newQuantity) {
    let cart = getCart();
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity = Math.max(1, newQuantity);
        saveCart(cart);
        renderCartPage();
    }
}

// حساب الإجمالي
function calculateTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// تحديث عداد السلة في الهيدر
function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('#cart-count').forEach(el => {
        el.textContent = count;
    });
}

// ========== رسم صفحة السلة ==========
function renderCartPage() {
    const container = document.getElementById('cart-items-container');
    if (!container) return;
    
    const cart = getCart();
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-cart-shopping"></i>
                <h3>سلة التسوق فارغة</h3>
                <p style="margin: 15px 0;">لم تقم بإضافة أي منتجات بعد.</p>
                <a href="shop.html" class="btn-gold" style="display: inline-block; padding: 12px 30px; margin-top: 15px;">تسوق الآن</a>
            </div>
        `;
        document.getElementById('cart-summary').style.display = 'none';
        return;
    }
    
    document.getElementById('cart-summary').style.display = 'block';
    
    let html = '';
    cart.forEach(item => {
        html += `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.nameAr}">
                <div class="cart-item-info">
                    <h4>${item.nameAr}</h4>
                    <p>${item.price} ر.س</p>
                </div>
                <div class="cart-item-actions">
                    <div class="cart-qty">
                        <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" value="${item.quantity}" readonly>
                        <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <i class="fa-solid fa-trash remove-item" onclick="removeFromCart(${item.id})"></i>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    
    // تحديث الإجمالي
    const subtotal = calculateTotal();
    document.getElementById('subtotal').textContent = `${subtotal} ر.س`;
    document.getElementById('total').textContent = `${subtotal} ر.س`;
}

// ========== تشغيل عند تحميل الصفحة ==========
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderCartPage();
});
