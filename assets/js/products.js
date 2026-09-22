// NIVORA — Product data and rendering helpers
window.NivoraProducts = {
  async list(params = {}) {
    if (window.NivoraAPI && !window.NIVORA_CONFIG?.enableDemoMode) {
      return NivoraAPI.request("/products" + (Object.keys(params).length ? "?" + new URLSearchParams(params) : ""));
    }
    return JSON.parse(localStorage.getItem("nivora_products") || "[]");
  },
  save(product) {
    const products = JSON.parse(localStorage.getItem("nivora_products") || "[]");
    const item = { ...product, id: product.id || crypto.randomUUID() };
    const index = products.findIndex(p => p.id === item.id);
    index >= 0 ? products[index] = item : products.push(item);
    localStorage.setItem("nivora_products", JSON.stringify(products));
    return item;
  }
};
