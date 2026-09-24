// NIVORA — Product URL import interface
window.NivoraImporter = {
  detectSource(url = "") {
    if (/aliexpress/i.test(url)) return "aliexpress";
    if (/amazon/i.test(url)) return "amazon";
    if (/alibaba/i.test(url)) return "alibaba";
    if (/noon/i.test(url)) return "noon";
    return "unknown";
  },
  async import(url) {
    const source = this.detectSource(url);
    if (window.NivoraAPI && !window.NIVORA_CONFIG?.enableDemoMode)
      return NivoraAPI.request("/imports/product", {method:"POST", body:JSON.stringify({url,source})});
    return { source, url, status: "needs-backend-importer" };
  }
};
