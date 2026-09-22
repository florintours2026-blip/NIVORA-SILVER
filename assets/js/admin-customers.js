// NIVORA — Admin customers
window.NivoraAdminCustomers = {
  interests(events = []) {
    return events.reduce((map, e) => {
      const key = e.data?.category || e.data?.productId || e.name;
      map[key] = (map[key] || 0) + 1;
      return map;
    }, {});
  }
};
