// NIVORA — Reports
window.NivoraReports = {
  csv(rows = []) {
    return rows.map(row => Object.values(row).map(v => `"${String(v ?? "").replaceAll('"','""')}"`).join(",")).join("\n");
  }
};
