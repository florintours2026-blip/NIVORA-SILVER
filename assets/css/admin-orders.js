// NIVORA — Admin order management
window.NivoraAdminOrders = {
  setStatus(order, status) { return { ...order, status, updatedAt: new Date().toISOString() }; },
  setPayment(order, status) { return { ...order, paymentStatus: status, updatedAt: new Date().toISOString() }; }
};
