// NIVORA — Product gallery
window.NivoraGallery = {
  select(image, target) {
    if (target && image) target.src = image;
  },
  render(images = [], container) {
    if (!container) return;
    container.innerHTML = images.map(src => `<button type="button" data-gallery-image><img src="${src}" alt=""></button>`).join("");
    container.querySelectorAll("[data-gallery-image]").forEach(btn => {
      btn.addEventListener("click", () => this.select(btn.querySelector("img")?.src, document.querySelector("[data-main-image]")));
    });
  }
};
