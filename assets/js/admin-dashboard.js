// NIVORA — Admin dashboard calculations
window.NivoraDashboard = {
  summarize(orders = []) {
    return orders.reduce((s, o) => {
      s.orders++;
      s.revenue += Number(o.total || 0);
      s.cost += Number(o.cost || 0);
      s.profit = s.revenue - s.cost;
      return s;
    }, { orders: 0, revenue: 0, cost: 0, profit: 0 });
  }
};
