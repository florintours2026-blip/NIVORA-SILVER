// NIVORA — API client
window.NivoraAPI = {
  async request(path, options = {}) {
    const base = window.NIVORA_CONFIG?.apiBaseUrl || "/api";
    const response = await fetch(base + path, {
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
      ...options
    });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return response.status === 204 ? null : response.json();
  }
};
