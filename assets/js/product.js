// assets/js/product.js

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (!productId) {
        window.location.href = 'shop.html';
        return;
    }
    
    const product = productsData.find(p => p.id === productId);
    if (!product) {
        window.location.href = 'shop.html';
        return;
    }
    
    renderProductDetails(product);
    loadRelatedProducts(product);
    setupGallery(product.images);
    setupTabs();
    setupQuantity();
    setupAddToCart(product);
    
    document.getElementById('buy-now-btn').addEventListener('click', () => {
        addToCart(product, getQuantity());
        window.location.href = 'checkout.html';
    });
    
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
    
    const ratingStars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
    document.getElementById('product-rating').textContent = ratingStars;
    document.getElementById('product-reviews').textContent = `(${product.reviews} تقييم)`;
    
    const specsList = document.getElementById('specs-list');
    specsList.innerHTML = `
        <li>العلامة التجارية: ${product.brand}</li>
        <li>القسم: ${product.categoryAr}</li>
        <li>التقييم: ${product.rating} / 5</li>
        <li>المخزون: ${product.stock} قطعة</li>
    `;
    
    document.getElementById('main-image').src = product.images[0];
}

function setupGallery(images) {
    const thumbnailList = document.getElementById('thumbnail-list');
    const mainImage = document.getElementById('main-image');
    
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

function setupAddToCart(product) {
    document.getElementById('add-to-cart-btn').addEventListener('click', () => {
        addToCart(product, getQuantity());
        showToast('تمت الإضافة إلى السلة بنجاح!');
    });
}

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
    
    renderProductGrid(grid, related);
}

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
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}
