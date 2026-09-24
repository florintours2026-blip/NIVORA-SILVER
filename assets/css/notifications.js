// NIVORA — UI notifications
window.NivoraNotify = function(message, type = "info") {
  const el = document.createElement("div");
  el.className = `nv-notification ${type}`;
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3500);
};
