// NIVORA — Admin activity log
window.NivoraAdminActivity = {
  log(action, data = {}) {
    const key = "nivora_admin_activity";
    const rows = JSON.parse(localStorage.getItem(key) || "[]");
    rows.push({ action, data, at: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(rows.slice(-1000)));
  }
};
