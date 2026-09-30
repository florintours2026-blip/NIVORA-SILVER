const { URL } = require("url");
const dns = require("dns").promises;
const net = require("net");
const env = require("../config/env");

const ALLOWED_HOSTS = [
  /(^|\.)amazon\./i,
  /(^|\.)noon\./i,
  /(^|\.)aliexpress\./i,
  /(^|\.)alibaba\./i
];

function clean(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function detectSource(rawUrl) {
  const host = new URL(rawUrl).hostname.toLowerCase().replace(/^www\./, "");
  if (/^amazon\.[a-z.]+$/i.test(host) || /^.+\.amazon\.[a-z.]+$/i.test(host)) return "amazon";
  if (/^noon\.[a-z.]+$/i.test(host) || /^.+\.noon\.[a-z.]+$/i.test(host)) return "noon";
  if (/^aliexpress\.[a-z.]+$/i.test(host) || /^.+\.aliexpress\.[a-z.]+$/i.test(host)) return "aliexpress";
  if (/^alibaba\.[a-z.]+$/i.test(host) || /^.+\.alibaba\.[a-z.]+$/i.test(host)) return "alibaba";
  return "unknown";
}

function isPrivateIp(ip) {
  if (net.isIPv4(ip)) {
    const [a, b] = ip.split(".").map(Number);
    return a === 10 || a === 127 || (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) || a === 0;
  }
  if (net.isIPv6(ip)) {
    const value = ip.toLowerCase();
    return value === "::1" || value.startsWith("fc") || value.startsWith("fd") ||
      value.startsWith("fe8") || value.startsWith("fe9") ||
      value.startsWith("fea") || value.startsWith("feb");
  }
  return true;
}

async function assertSafeUrl(rawUrl) {
  let url;
  try { url = new URL(rawUrl); } catch {
    const e = new Error("رابط غير صالح");
    e.statusCode = 400;
    throw e;
  }
  if (!["http:", "https:"].includes(url.protocol)) {
    const e = new Error("يسمح فقط بروابط HTTP وHTTPS");
    e.statusCode = 400;
    throw e;
  }
  if (detectSource(url.href) === "unknown") {
    const e = new Error("المصدر غير مدعوم. استخدم Amazon أو Noon أو Alibaba أو AliExpress.");
    e.statusCode = 400;
    throw e;
  }

  const addresses = await dns.lookup(url.hostname, { all: true }).catch(() => []);
  if (!addresses.length || addresses.some(x => isPrivateIp(x.address))) {
    const e = new Error("تعذر التحقق من أمان عنوان المصدر");
    e.statusCode = 400;
    throw e;
  }
  return url;
}

function abs(base, value) {
  try { return new URL(value, base).href; } catch { return ""; }
}

function meta(html, name) {
  const safe = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`<meta[^>]+(?:property|name)=["']${safe}["'][^>]+content=["']([^"']+)["'][^>]*>`, "i");
  return re.exec(html)?.[1] || "";
}

function allMeta(html, name) {
  const safe = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`<meta[^>]+(?:property|name)=["']${safe}["'][^>]+content=["']([^"']+)["'][^>]*>`, "gi");
  return [...html.matchAll(re)].map(x => x[1]).filter(Boolean);
}

function jsonLd(html) {
  const out = [];
  const blocks = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  for (const block of blocks) {
    try {
      const value = JSON.parse(block[1].trim());
      if (Array.isArray(value)) out.push(...value);
      else if (value?.["@graph"]) out.push(...value["@graph"]);
      else out.push(value);
    } catch {}
  }
  return out;
}

function pickProduct(data) {
  return data.find(item => {
    const types = Array.isArray(item?.["@type"]) ? item["@type"] : [item?.["@type"]];
    return types.some(v => /product/i.test(String(v)));
  }) || data[0] || null;
}

function imageList(product, html, base) {
  const urls = [];
  const add = value => {
    if (typeof value !== "string") return;
    const url = abs(base, value);
    if (url && !urls.includes(url)) urls.push(url);
  };
  const images = product?.image;
  if (Array.isArray(images)) images.forEach(add);
  else add(images);
  allMeta(html, "og:image").forEach(add);
  allMeta(html, "twitter:image").forEach(add);
  return urls.slice(0, 20);
}

function embeddedProduct(html) {
  const patterns = [
    /<script[^>]+id=["']__NEXT_DATA__["'][^>]*>([\s\S]*?)<\/script>/i,
    /<script[^>]+type=["']application\/json["'][^>]*>([\s\S]*?)<\/script>/gi
  ];
  const values = [];
  for (const re of patterns) {
    for (const m of html.matchAll(re)) {
      try {
        const value = JSON.parse(m[1].trim());
        values.push(value);
      } catch {}
    }
  }
  const walk = (value, depth = 0) => {
    if (!value || depth > 8) return null;
    if (Array.isArray(value)) {
      for (const item of value) { const found = walk(item, depth + 1); if (found) return found; }
      return null;
    }
    if (typeof value !== "object") return null;
    const hasProductShape = value.name || value.title;
    const hasPrice = value.price || value.priceAmount || value.salePrice || value.currentPrice;
    const hasImage = value.image || value.images || value.mainImage || value.imageUrl;
    if (hasProductShape && (hasPrice || hasImage)) return value;
    for (const child of Object.values(value)) {
      const found = walk(child, depth + 1); if (found) return found;
    }
    return null;
  };
  return values.map(v => walk(v)).find(Boolean) || null;
}

function extract(html, url, source) {
  const product = pickProduct(jsonLd(html)) || embeddedProduct(html) || {};
  const offer = Array.isArray(product?.offers) ? product.offers[0] : product?.offers;
  const price = offer?.price ?? product?.price ?? product?.priceAmount ?? product?.salePrice ?? product?.currentPrice ?? meta(html, "product:price:amount");
  const currency = offer?.priceCurrency ?? product?.priceCurrency ?? product?.currency ?? meta(html, "product:price:currency");
  const name = clean(product?.name || product?.title || product?.productTitle || meta(html, "og:title") || meta(html, "twitter:title"));
  const description = clean(product?.description || product?.shortDescription || meta(html, "og:description") || meta(html, "description"));
  const brand = clean(typeof product?.brand === "object" ? product.brand.name : product?.brand || "");
  const sku = clean(product?.sku || product?.mpn || product?.productID || product?.itemId || product?.item_id || "");
  const availability = clean(offer?.availability || "").split("/").pop();
  const imageSource = product?.images || product?.mainImage || product?.imageUrl || product?.image;
  const normalizedProduct = imageSource ? {...product, image:imageSource} : product;
  const images = imageList(normalizedProduct, html, url);
  const numericPrice = price !== "" && price != null
    ? Number(String(price).replace(/[^0-9.]/g, ""))
    : null;
  const category = clean(
    product?.category ||
    meta(html, "product:category") ||
    "other"
  ) || "other";

  return {
    source,
    sourceUrl: url,
    url,
    title: name,
    name,
    description,
    brand,
    sku,
    price: Number.isFinite(numericPrice) ? numericPrice : null,
    currency: currency || "",
    availability,
    images,
    sourceProductId: sku || null,
    externalProductId: sku || null,
    category,
    categoryName: category === "other" ? "أخرى" : category,
    variants: [],
    status: "preview",
    importedAt: new Date().toISOString()
  };
}

async function fetchHtml(rawUrl) {
  let current = await assertSafeUrl(rawUrl);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), env.importTimeoutMs);

  try {
    for (let redirects = 0; redirects <= 5; redirects++) {
      const res = await fetch(current, {
        signal: controller.signal,
        redirect: "manual",
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; NIVORA-Product-Importer/1.0)",
          Accept: "text/html,application/xhtml+xml"
        }
      });

      if (res.status >= 300 && res.status < 400) {
        const location = res.headers.get("location");
        if (!location) throw Object.assign(new Error("المصدر أعاد إعادة توجيه غير صالحة"), { statusCode: 502 });
        current = await assertSafeUrl(new URL(location, current).href);
        continue;
      }

      if (!res.ok) {
        throw Object.assign(new Error(`المصدر أعاد HTTP ${res.status}`), { statusCode: 502 });
      }

      const type = res.headers.get("content-type") || "";
      if (!/text\/html|application\/xhtml\+xml/i.test(type)) {
        throw Object.assign(new Error("الرابط لا يعيد صفحة HTML"), { statusCode: 422 });
      }

      const text = await res.text();
      if (text.length > 8 * 1024 * 1024) {
        throw Object.assign(new Error("صفحة المصدر كبيرة جدًا"), { statusCode: 413 });
      }
      return { html: text, finalUrl: current.href };
    }
    throw Object.assign(new Error("تجاوز المصدر الحد المسموح لإعادة التوجيه"), { statusCode: 502 });
  } finally {
    clearTimeout(timer);
  }
}

async function importProduct(rawUrl) {
  const url = await assertSafeUrl(rawUrl);
  const { html, finalUrl } = await fetchHtml(url.href);
  const source = detectSource(finalUrl);
  const product = extract(html, finalUrl, source);

  if (!product.title) {
    throw Object.assign(
      new Error(`تعذر استخراج بيانات المنتج من ${source}. قد تحتاج إلى تفعيل API/Feed رسمي للمصدر.`),
      { statusCode: 422 }
    );
  }

  product.importMethod = "page-metadata";
  product.notice = "البيانات المتاحة تعتمد على ما تسمح به صفحة المصدر. للمزامنة التجارية الكاملة استخدم API/Feed رسمي أو مصرح به.";
  return product;
}

module.exports = { detectSource, importProduct };
