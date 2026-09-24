// NIVORA — Product filters
window.NivoraFilters = {
  apply(products, filters = {}) {
    return products.filter(p => {
      if (filters.category && p.category !== filters.category) return false;
      if (filters.minPrice != null && Number(p.price) < Number(filters.minPrice)) return false;
      if (filters.maxPrice != null && Number(p.price) > Number(filters.maxPrice)) return false;
      return true;
    });
  }
};
