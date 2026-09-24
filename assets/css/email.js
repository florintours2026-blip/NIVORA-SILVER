// NIVORA — Email notification abstraction
window.NivoraEmail = {
  async orderCreated(order) {
    if (window.NivoraAPI && !window.NIVORA_CONFIG?.enableDemoMode)
      return NivoraAPI.request("/emails/order-created", {method:"POST", body:JSON.stringify(order)});
    return { queued: false, mode: "demo" };
  }
};
