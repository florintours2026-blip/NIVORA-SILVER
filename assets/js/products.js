// assets/js/products.js
const productsData = [
    // ===== الفضة والمجوهرات =====
    {
        id: 1,
        nameAr: "خاتم فضة عيار 925",
        nameEn: "925 Silver Ring",
        category: "jewelry",
        categoryAr: "الفضة والمجوهرات",
        price: 1299,
        oldPrice: 1599,
        discount: 19,
        stock: 15,
        rating: 4.8,
        reviews: 48,
        descriptionAr: "خاتم فضة عيار 925 بتصميم فاخر ونقوش يدوية دقيقة. مثالي للإطلالات الراقية.",
        descriptionEn: "925 silver ring with a luxurious design and precise handmade engravings.",
        images: [
            "assets/images/products/jewelry/ring-1-1.jpg",
            "assets/images/products/jewelry/ring-1-2.jpg",
            "assets/images/products/jewelry/ring-1-3.jpg",
            "assets/images/products/jewelry/ring-1-4.jpg",
            "assets/images/products/jewelry/ring-1-5.jpg"
        ],
        featured: true,
        brand: "NIVORA"
    },
    {
        id: 2,
        nameAr: "سلسلة فضة رجالية",
        nameEn: "Men's Silver Necklace",
        category: "jewelry",
        categoryAr: "الفضة والمجوهرات",
        price: 1899,
        oldPrice: 2200,
        discount: 14,
        stock: 8,
        rating: 4.6,
        reviews: 32,
        descriptionAr: "سلسلة فضة رجالية بتصميم عصري وجذاب، مناسبة لجميع المناسبات.",
        descriptionEn: "Men's silver necklace with a modern and attractive design.",
        images: [
            "assets/images/products/jewelry/necklace-1-1.jpg",
            "assets/images/products/jewelry/necklace-1-2.jpg",
            "assets/images/products/jewelry/necklace-1-3.jpg",
            "assets/images/products/jewelry/necklace-1-4.jpg"
        ],
        featured: true,
        brand: "NIVORA"
    },
    // ===== العطور =====
    {
        id: 3,
        nameAr: "عطر Noir Élégance",
        nameEn: "Noir Élégance Perfume",
        category: "perfumes",
        categoryAr: "العطور",
        price: 899,
        oldPrice: 1100,
        discount: 18,
        stock: 25,
        rating: 4.9,
        reviews: 120,
        descriptionAr: "عطر فاخر برائحة خشبية ومسكية، يدوم طويلاً. Extrait de Parfum بتركيز 25-30%.",
        descriptionEn: "Luxury perfume with woody and musky notes, long-lasting. Extrait de Parfum 25-30%.",
        images: [
            "assets/images/products/perfumes/noir-1-1.jpg",
            "assets/images/products/perfumes/noir-1-2.jpg",
            "assets/images/products/perfumes/noir-1-3.jpg",
            "assets/images/products/perfumes/noir-1-4.jpg",
            "assets/images/products/perfumes/noir-1-5.jpg",
            "assets/images/products/perfumes/noir-1-6.jpg"
        ],
        featured: true,
        brand: "NIVORA"
    },
    {
        id: 4,
        nameAr: "عطر Amber Royale",
        nameEn: "Amber Royale Perfume",
        category: "perfumes",
        categoryAr: "العطور",
        price: 1050,
        oldPrice: 1300,
        discount: 19,
        stock: 3,
        rating: 4.7,
        reviews: 85,
        descriptionAr: "عطر شرقي دافئ بمزيج من العنبر والتوابل الفاخرة. لمسة من الفخامة.",
        descriptionEn: "Warm oriental perfume with amber and luxury spices.",
        images: [
            "assets/images/products/perfumes/amber-1-1.jpg",
            "assets/images/products/perfumes/amber-1-2.jpg",
            "assets/images/products/perfumes/amber-1-3.jpg",
            "assets/images/products/perfumes/amber-1-4.jpg"
        ],
        featured: false,
        brand: "NIVORA"
    },
    // ===== الساعات =====
    {
        id: 5,
        nameAr: "ساعة كلاسيك سيلفر",
        nameEn: "Classic Silver Watch",
        category: "watches",
        categoryAr: "الساعات",
        price: 2499,
        oldPrice: 2999,
        discount: 17,
        stock: 15,
        rating: 4.8,
        reviews: 60,
        descriptionAr: "ساعة كلاسيكية فاخرة بتصميم أنيق وميناء فضي، مقاومة للماء.",
        descriptionEn: "Luxury classic watch with an elegant design and silver dial, water-resistant.",
        images: [
            "assets/images/products/watches/classic-1-1.jpg",
            "assets/images/products/watches/classic-1-2.jpg",
            "assets/images/products/watches/classic-1-3.jpg",
            "assets/images/products/watches/classic-1-4.jpg",
            "assets/images/products/watches/classic-1-5.jpg"
        ],
        featured: true,
        brand: "NIVORA"
    },
    {
        id: 6,
        nameAr: "ساعة رولكس دايت جست",
        nameEn: "Rolex Datejust Watch",
        category: "watches",
        categoryAr: "الساعات",
        price: 48999,
        oldPrice: 62999,
        discount: 22,
        stock: 2,
        rating: 4.9,
        reviews: 15,
        descriptionAr: "ساعة رولكس دايت جست الأصلية، فخامة لا تُضاهى. تصميم خالد يجمع بين الأناقة والدقة.",
        descriptionEn: "Original Rolex Datejust, unmatched luxury. Timeless design.",
        images: [
            "assets/images/products/watches/rolex-1-1.jpg",
            "assets/images/products/watches/rolex-1-2.jpg",
            "assets/images/products/watches/rolex-1-3.jpg",
            "assets/images/products/watches/rolex-1-4.jpg",
            "assets/images/products/watches/rolex-1-5.jpg",
            "assets/images/products/watches/rolex-1-6.jpg",
            "assets/images/products/watches/rolex-1-7.jpg"
        ],
        featured: true,
        brand: "Rolex"
    },
    // ===== النظارات الشمسية =====
    {
        id: 7,
        nameAr: "نظارة شمسية Aviator",
        nameEn: "Aviator Sunglasses",
        category: "sunglasses",
        categoryAr: "النظارات الشمسية",
        price: 1299,
        oldPrice: 1600,
        discount: 19,
        stock: 22,
        rating: 4.6,
        reviews: 40,
        descriptionAr: "نظارة شمسية بتصميم Aviator كلاسيكي، حماية UV400، إطار معدني فاخر.",
        descriptionEn: "Classic Aviator sunglasses, UV400 protection, luxury metal frame.",
        images: [
            "assets/images/products/sunglasses/aviator-1-1.jpg",
            "assets/images/products/sunglasses/aviator-1-2.jpg",
            "assets/images/products/sunglasses/aviator-1-3.jpg",
            "assets/images/products/sunglasses/aviator-1-4.jpg"
        ],
        featured: true,
        brand: "NIVORA"
    },
    {
        id: 8,
        nameAr: "نظارة شمسية Square",
        nameEn: "Square Sunglasses",
        category: "sunglasses",
        categoryAr: "النظارات الشمسية",
        price: 950,
        oldPrice: 1200,
        discount: 21,
        stock: 18,
        rating: 4.5,
        reviews: 28,
        descriptionAr: "نظارة شمسية بتصميم مربع عصري، عدسات داكنة عالية الجودة.",
        descriptionEn: "Modern square sunglasses, high-quality dark lenses.",
        images: [
            "assets/images/products/sunglasses/square-1-1.jpg",
            "assets/images/products/sunglasses/square-1-2.jpg",
            "assets/images/products/sunglasses/square-1-3.jpg",
            "assets/images/products/sunglasses/square-1-4.jpg",
            "assets/images/products/sunglasses/square-1-5.jpg"
        ],
        featured: false,
        brand: "NIVORA"
    }
];

// تصدير البيانات للاستخدام
if (typeof module !== 'undefined' && module.exports) {
    module.exports = productsData;
      }

// assets/js/product.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. الحصول على معرف المنتج من الرابط
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (!productId) {
        window.location.href = 'shop.html';
        return;
    }
    
    // 2. البحث عن المنتج
    const product = productsData.find(p => p.id === productId);
    if (!product) {
        window.location.href = 'shop.html';
        return;
    }
    
    // 3. عرض بيانات المنتج
    renderProductDetails(product);
    
    // 4. تحميل المنتجات المشابهة
    loadRelatedProducts(product);
    
    // 5. تفعيل معرض الصور
    setupGallery(product.images);
    
    // 6. تفعيل التبويبات
    setupTabs();
    
    // 7. تفعيل عداد الكمية
    setupQuantity();
    
    // 8. تفعيل زر الإضافة للسلة
    setupAddToCart(product);
    
    // 9. تفعيل زر الشراء الآن
    document.getElementById('buy-now-btn').addEventListener('click', () => {
        addToCart(product, getQuantity());
        window.location.href = 'checkout.html';
    });
    
    // 10. تفعيل زر المفضلة
    document.getElementById('wishlist-btn').addEventListener('click', function() {
        this.classList.toggle('active');
        const icon = this.querySelector('i');
        if (this.classList.contains('active')) {
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');
            showToast('تمت الإضافة إلى المفضلة');
        } else {
            icon.classList.remove('fa-solid');
            icon.classList.add('fa-regular');
            showToast('تمت الإزالة من المفضلة');
        }
    });
});

// ========== عرض تفاصيل المنتج ==========
function renderProductDetails(product) {
    document.getElementById('breadcrumb-product').textContent = product.nameAr;
    document.getElementById('product-category').textContent = product.categoryAr;
    document.getElementById('product-title').textContent = product.nameAr;
    document.getElementById('product-price').textContent = `${product.price} ر.س`;
    
    if (product.oldPrice) {
        document.getElementById('product-old-price').textContent = `${product.oldPrice} ر.س`;
    }
    if (product.discount > 0) {
        document.getElementById('product-discount').textContent = `-${product.discount}%`;
    }
    
    document.getElementById('product-description').textContent = product.descriptionAr;
    document.getElementById('full-description').textContent = product.descriptionAr;
    
    // التقييم
    const ratingStars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
    document.getElementById('product-rating').textContent = ratingStars;
    document.getElementById('product-reviews').textContent = `(${product.reviews} تقييم)`;
    
    // المواصفات
    const specsList = document.getElementById('specs-list');
    specsList.innerHTML = `
        <li>العلامة التجارية: ${product.brand}</li>
        <li>القسم: ${product.categoryAr}</li>
        <li>التقييم: ${product.rating} / 5</li>
        <li>المخزون: ${product.stock} قطعة</li>
    `;
    
    // الصورة الرئيسية
    document.getElementById('main-image').src = product.images[0];
}

// ========== معرض الصور ==========
function setupGallery(images) {
    const thumbnailList = document.getElementById('thumbnail-list');
    const mainImage = document.getElementById('main-image');
    
    // إنشاء الصور المصغرة
    thumbnailList.innerHTML = '';
    images.forEach((img, index) => {
        const thumb = document.createElement('img');
        thumb.src = img;
        thumb.alt = `صورة ${index + 1}`;
        thumb.className = index === 0 ? 'active' : '';
        thumb.addEventListener('click', () => {
            mainImage.src = img;
            document.querySelectorAll('.thumbnail-list img').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
        thumbnailList.appendChild(thumb);
    });
    
    // تفعيل Fullscreen
    const viewer = document.getElementById('image-viewer');
    const viewerImg = document.getElementById('viewer-img');
    let currentIndex = 0;
    
    document.getElementById('fullscreen-btn').addEventListener('click', () => {
        currentIndex = images.indexOf(mainImage.src);
        viewerImg.src = images[currentIndex];
        viewer.classList.add('active');
    });
    
    document.getElementById('close-viewer').addEventListener('click', () => {
        viewer.classList.remove('active');
    });
    
    document.getElementById('viewer-prev').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        viewerImg.src = images[currentIndex];
    });
    
    document.getElementById('viewer-next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        viewerImg.src = images[currentIndex];
    });
}

// ========== التبويبات ==========
function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(`tab-${target}`).classList.add('active');
        });
    });
}

// ========== عداد الكمية ==========
function setupQuantity() {
    const qtyInput = document.getElementById('qty-input');
    
    document.getElementById('qty-minus').addEventListener('click', () => {
        let val = parseInt(qtyInput.value);
        if (val > 1) qtyInput.value = val - 1;
    });
    
    document.getElementById('qty-plus').addEventListener('click', () => {
        let val = parseInt(qtyInput.value);
        if (val < 99) qtyInput.value = val + 1;
    });
}

function getQuantity() {
    return parseInt(document.getElementById('qty-input').value) || 1;
}

// ========== إضافة للسلة ==========
function setupAddToCart(product) {
    document.getElementById('add-to-cart-btn').addEventListener('click', () => {
        addToCart(product, getQuantity());
        showToast('تمت الإضافة إلى السلة بنجاح!');
    });
}

// ========== منتجات مشابهة ==========
function loadRelatedProducts(currentProduct) {
    const grid = document.getElementById('related-products-grid');
    if (!grid) return;
    
    const related = productsData
        .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
        .slice(0, 4);
    
    if (related.length === 0) {
        grid.innerHTML = '<p style="color: var(--text-gray);">لا توجد منتجات مشابهة.</p>';
        return;
    }
    
    // استخدام نفس دالة العرض من main.js
    renderProductGrid(grid, related);
}

// ========== Toast Notification ==========
function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: var(--gold);
        color: #000;
        padding: 15px 25px;
        border-radius: 5px;
        font-weight: bold;
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}
