// NIVORA — Payment abstraction
window.NivoraPayment = {
  async start(order) {
    if (window.NivoraAPI && !window.NIVORA_CONFIG?.enableDemoMode) {
      return NivoraAPI.request("/payments/create", { method: "POST", body: JSON.stringify(order) });
    }
    return { status: "pending", orderId: order.id || crypto.randomUUID() };
  }
};
