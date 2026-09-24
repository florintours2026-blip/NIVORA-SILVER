// NIVORA — Privacy-conscious behavioral events
window.NivoraTracking = {
  event(name, data = {}) {
    const event = { name, data, path: location.pathname, at: new Date().toISOString() };
    const events = JSON.parse(localStorage.getItem("nivora_events") || "[]");
    events.push(event); localStorage.setItem("nivora_events", JSON.stringify(events.slice(-500)));
  }
};
