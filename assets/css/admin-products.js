// NIVORA — Admin product management
window.NivoraAdminProducts = {
  list() { return NivoraProducts.list(); },
  save(product) { return NivoraProducts.save(product); },
  delete(id) {
    const items = JSON.parse(localStorage.getItem("nivora_products") || "[]").filter(p => p.id !== id);
    localStorage.setItem("nivora_products", JSON.stringify(items)); return items;
  }
};
