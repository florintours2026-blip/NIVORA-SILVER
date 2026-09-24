// NIVORA — Wishlist
window.NivoraFavorites = {
  get() { return JSON.parse(localStorage.getItem("nivora_favorites") || "[]"); },
  toggle(id) {
    const items = this.get();
    const next = items.includes(id) ? items.filter(x => x !== id) : [...items, id];
    localStorage.setItem("nivora_favorites", JSON.stringify(next));
    return next;
  },
  has(id) { return this.get().includes(id); }
};
