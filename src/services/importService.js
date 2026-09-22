const { URL } = require("url");

function detectSource(rawUrl) {
  const host = new URL(rawUrl).hostname.toLowerCase();
  if (host.includes("aliexpress")) return "aliexpress";
  if (host.includes("amazon")) return "amazon";
  if (host.includes("alibaba")) return "alibaba";
  if (host.includes("noon")) return "noon";
  return "unknown";
}

async function importProduct(rawUrl) {
  const source = detectSource(rawUrl);

  if (source === "unknown") {
    const err = new Error("Unsupported product source");
    err.statusCode = 400;
    throw err;
  }

  // Adapter hook only. Production adapters must use permitted/official access.
  return {
    source,
    url: rawUrl,
    status: "adapter_required",
    message: "Connect a permitted marketplace/affiliate/feed adapter here."
  };
}

module.exports = { detectSource, importProduct };
