// NIVORA — Checkout
window.NivoraCheckout = {
  validate(data) {
    return Boolean(data?.name && data?.email && data?.phone && data?.address);
  },
  buildOrder(customer, items) {
    return { customer, items, paymentStatus: "pending", status: "new", createdAt: new Date().toISOString() };
  }
};
