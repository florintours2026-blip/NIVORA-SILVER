// NIVORA — Product details
document.addEventListener("DOMContentLoaded", async () => {
  const id = new URLSearchParams(location.search).get("id");
  if (!id || !window.NivoraProducts) return;
  const products = await NivoraProducts.list();
  const product = products.find(p => String(p.id) === String(id));
  if (!product) return;
  document.querySelectorAll("[data-product-name]").forEach(el => el.textContent = product.name || "");
  document.querySelectorAll("[data-product-price]").forEach(el => el.textContent = `${product.price ?? ""} ${product.currency || "SAR"}`);
});
