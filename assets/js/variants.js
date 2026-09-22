// NIVORA — Product variants
window.NivoraVariants = {
  selected: {},
  select(group, value) { this.selected[group] = value; return { ...this.selected }; },
  get() { return { ...this.selected }; }
};
