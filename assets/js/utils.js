// NIVORA — Shared utilities
window.NivoraUtils = {
  money(value, currency = "EGP") { return `${new Intl.NumberFormat("ar-EG",{minimumFractionDigits:2,maximumFractionDigits:2}).format(Number(value)||0)} ${currency}`; },
  qs(selector, root=document) { return root.querySelector(selector); },
  qsa(selector, root=document) { return [...root.querySelectorAll(selector)]; },
  escape(value) { const d=document.createElement("div"); d.textContent=String(value ?? ""); return d.innerHTML; }
};
