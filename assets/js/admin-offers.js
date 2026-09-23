// NIVORA — Admin offers
window.NivoraAdminOffers = {
  create(data) {
    const offers = JSON.parse(localStorage.getItem("nivora_offers") || "[]");
    const item = { ...data, id: data.id || crypto.randomUUID() };
    offers.push(item); localStorage.setItem("nivora_offers", JSON.stringify(offers)); return item;
  }
};
