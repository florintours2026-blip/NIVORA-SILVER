// NIVORA — Reviews
window.NivoraReviews = {
  list(productId) { return JSON.parse(localStorage.getItem(`nivora_reviews_${productId}`) || "[]"); },
  add(productId, review) {
    const key = `nivora_reviews_${productId}`;
    const items = this.list(productId); items.push({ ...review, createdAt: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(items)); return items;
  }
};
