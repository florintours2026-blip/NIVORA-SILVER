// NIVORA — Form validation
window.NivoraValidation = {
  required(value) { return String(value ?? "").trim().length > 0; },
  email(value) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "")); },
  phone(value) { return /^[+\d\s()-]{7,}$/.test(String(value || "")); }
};
