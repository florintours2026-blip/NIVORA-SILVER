// NIVORA — Navigation
document.addEventListener("DOMContentLoaded", () => {
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a[href]").forEach(link => {
    if (link.getAttribute("href") === current) link.classList.add("active");
  });
});
