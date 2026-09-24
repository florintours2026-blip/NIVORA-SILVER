// NIVORA — Accounting
window.NivoraAccounting = {
  calculate({ revenue=0, productCost=0, shipping=0, fees=0, discounts=0, refunds=0 }) {
    const netRevenue = Number(revenue) - Number(discounts) - Number(refunds);
    const totalCost = Number(productCost) + Number(shipping) + Number(fees);
    return { netRevenue, totalCost, profit: netRevenue - totalCost };
  }
};
