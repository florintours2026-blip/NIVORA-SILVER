// NIVORA — Authentication
window.NivoraAuth = {
  getUser() { return JSON.parse(localStorage.getItem("nivora_user") || "null"); },
  setUser(user) { localStorage.setItem("nivora_user", JSON.stringify(user)); },
  logout() { localStorage.removeItem("nivora_user"); location.href = "login.html"; },
  isAuthenticated() { return !!this.getUser(); }
};
