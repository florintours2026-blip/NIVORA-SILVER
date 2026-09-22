// NIVORA — Store settings
window.NivoraSettings = {
  get() { return JSON.parse(localStorage.getItem("nivora_settings") || "{}"); },
  set(key, value) {
    const s = this.get(); s[key] = value; localStorage.setItem("nivora_settings", JSON.stringify(s)); return s;
  }
};
