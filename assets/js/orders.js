// NIVORA — Orders
window.NivoraOrders = {
  getLocal() { return JSON.parse(localStorage.getItem("nivora_orders") || "[]"); },
  saveLocal(order) {
    const orders = this.getLocal();
    const item = { ...order, id: order.id || `NV-${Date.now()}` };
    orders.push(item); localStorage.setItem("nivora_orders", JSON.stringify(orders)); return item;
  }
};
