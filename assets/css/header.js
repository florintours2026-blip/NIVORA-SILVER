// NIVORA — Header interactions
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-mobile-menu]").forEach(btn => {
    btn.addEventListener("click", () => document.body.classList.toggle("menu-open"));
  });
});
