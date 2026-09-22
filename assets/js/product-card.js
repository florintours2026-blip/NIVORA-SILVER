// NIVORA — Product card renderer
window.renderProductCard = function(product) {
  const image = product.images?.[0] || product.image || "";
  return `<article class="product-card" data-product-id="${product.id}">
    <a class="product-card-media" href="product.html?id=${encodeURIComponent(product.id)}">
      <img src="${image}" alt="${product.name || "NIVORA product"}" loading="lazy">
    </a>
    <div class="product-card-body">
      <h3 class="product-card-title">${product.name || ""}</h3>
      <div class="product-card-price">${product.price ?? ""} ${product.currency || "SAR"}</div>
    </div>
  </article>`;
};
