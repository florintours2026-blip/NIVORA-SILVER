// NIVORA — Offers and coupons
window.NivoraOffers = {
  apply(total, coupon, offers = []) {
    const offer = offers.find(o => o.code?.toLowerCase() === String(coupon || "").toLowerCase());
    if (!offer) return { total, discount: 0 };
    const discount = offer.type === "percent" ? total * (Number(offer.value) / 100) : Number(offer.value);
    return { total: Math.max(0, total - discount), discount };
  }
};
