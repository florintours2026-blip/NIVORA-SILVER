// NIVORA — Inventory
window.NivoraInventory = {
  status(stock, threshold = 5) {
    if (Number(stock) <= 0) return "out";
    if (Number(stock) <= threshold) return "low";
    return "in-stock";
  }
};
