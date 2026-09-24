// NIVORA — Customer account
window.NivoraAccount = {
  profile() { return NivoraAuth?.getUser?.() || null; },
  requireLogin() { if (!this.profile()) location.href = "login.html"; }
};
