// NIVORA — Admin product editor
window.NivoraProductEditor = {
  serialize(form) {
    return Object.fromEntries(new FormData(form).entries());
  }
};
