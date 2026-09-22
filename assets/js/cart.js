// NIVORA — Shopping cart
window.NivoraCart = {
  get() { return JSON.parse(localStorage.getItem("nivora_cart") || "[]"); },
  save(items) { localStorage.setItem("nivora_cart", JSON.stringify(items)); },
  add(product, quantity = 1) {
    const items = this.get();
    const existing = items.find(i => i.id === product.id);
    if (existing) existing.quantity += quantity;
    else items.push({ ...product, quantity });
    this.save(items); return items;
  },
  remove(id) { const items = this.get().filter(i => i.id !== id); this.save(items); return items; },
  clear() { this.save([]); },
  total() { return this.get().reduce((sum, i) => sum + Number(i.price || 0) * Number(i.quantity || 0), 0); }
};
