// NIVORA — Product search
window.NivoraSearch = {
  filter(products, query) {
    const q = String(query || "").trim().toLowerCase();
    if (!q) return products;
    return products.filter(p =>
      [p.name, p.description, p.category].some(v => String(v || "").toLowerCase().includes(q))
    );
  }
};
