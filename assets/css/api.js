// NIVORA — secure API client
window.NivoraAPI = {
  async request(path, options = {}) {
    const base = window.NIVORA_CONFIG?.apiBaseUrl || "/api";
    const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
    try {
      const firebase = window.NivoraFirebase;
      const user = firebase?.auth?.currentUser;
      if (user?.getIdToken) headers.Authorization = `Bearer ${await user.getIdToken(false)}`;
    } catch (e) { console.warn("NIVORA token attach failed", e); }
    const response = await fetch(base.replace(/\/$/, "") + path, { ...options, headers });
    const body = response.status === 204 ? null : await response.json().catch(() => null);
    if (!response.ok) {
      const error = new Error(body?.error || `API error: ${response.status}`);
      error.status = response.status;
      error.code = body?.code;
      throw error;
    }
    return body;
  }
};
