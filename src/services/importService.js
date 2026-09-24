const { URL } = require("url");
const env = require("../config/env");

function detectSource(rawUrl){
  const host=new URL(rawUrl).hostname.toLowerCase().replace(/^www\./,"");
  if(host.includes("amazon."))return "amazon";
  if(host.includes("noon."))return "noon";
  if(host.includes("aliexpress."))return "aliexpress";
  if(host.includes("alibaba."))return "alibaba";
  return "unknown";
}
function clean(value){return String(value??"").replace(/\s+/g," ").trim()}
function abs(base,value){try{return new URL(value,base).href}catch{return ""}}
function meta(html,name){const re=new RegExp(`<meta[^>]+(?:property|name)=["']${name.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}["'][^>]+content=["']([^"']+)["'][^>]*>`,`i`);return re.exec(html)?.[1]||""}
function allMeta(html,name){const re=new RegExp(`<meta[^>]+(?:property|name)=["']${name.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}["'][^>]+content=["']([^"']+)["'][^>]*>`,`gi`);return [...html.matchAll(re)].map(x=>x[1]).filter(Boolean)}
function jsonLd(html){const out=[];const blocks=[...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];for(const b of blocks){try{const v=JSON.parse(b[1].trim());if(Array.isArray(v))out.push(...v);else if(v?.['@graph'])out.push(...v['@graph']);else out.push(v)}catch{}}return out}
function pickProduct(data){return data.find(x=>{const t=Array.isArray(x?.['@type'])?x['@type']: [x?.['@type']];return t.some(v=>/product/i.test(String(v)))})||data[0]||null}
function imageList(product,html,base){const urls=[];const add=x=>{if(typeof x!=="string")return;const u=abs(base,x);if(u&&!urls.includes(u))urls.push(u)};const imgs=product?.image;Array.isArray(imgs)?imgs.forEach(add):add(imgs);allMeta(html,"og:image").forEach(add);allMeta(html,"twitter:image").forEach(add);return urls.slice(0,20)}
function extract(html,url,source){
  const product=pickProduct(jsonLd(html));const offer=Array.isArray(product?.offers)?product.offers[0]:product?.offers;
  const price=offer?.price??product?.price??meta(html,"product:price:amount");
  const currency=offer?.priceCurrency??product?.priceCurrency??meta(html,"product:price:currency");
  const name=clean(product?.name||meta(html,"og:title")||meta(html,"twitter:title"));
  const description=clean(product?.description||meta(html,"og:description")||meta(html,"description"));
  const brand=clean(typeof product?.brand==="object"?product.brand.name:product?.brand||"");
  const sku=clean(product?.sku||product?.mpn||product?.productID||"");
  const availability=clean(offer?.availability||"").split("/").pop();
  return {source,url,name,description,brand,sku,price:price!==""?Number(String(price).replace(/[^0-9.]/g,"")):null,currency,availability,images:imageList(product,html,url),sourceProductId:sku||null,variants:[],status:"preview"}
}
async function fetchHtml(url){
  const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),env.importTimeoutMs);
  try{
    const res=await fetch(url,{signal:controller.signal,redirect:"follow",headers:{"User-Agent":"Mozilla/5.0 (compatible; NIVORA-Product-Importer/1.0)",Accept:"text/html,application/xhtml+xml"}});
    if(!res.ok)throw new Error(`المصدر أعاد HTTP ${res.status}`);
    const type=res.headers.get("content-type")||"";if(!/text\/html|application\/xhtml\+xml/i.test(type))throw new Error("الرابط لا يعيد صفحة HTML");
    const text=await res.text();if(text.length>8*1024*1024)throw new Error("صفحة المصدر كبيرة جدًا");return text;
  }finally{clearTimeout(timer)}
}
async function importProduct(rawUrl){
  let url;try{url=new URL(rawUrl).href}catch{const e=new Error("رابط غير صالح");e.statusCode=400;throw e}
  const source=detectSource(url);if(source==="unknown"){const e=new Error("المصدر غير مدعوم. استخدم Amazon أو Noon أو Alibaba أو AliExpress.");e.statusCode=400;throw e}
  const html=await fetchHtml(url);const product=extract(html,url,source);
  if(!product.name){const e=new Error(`تعذر استخراج بيانات المنتج من ${source}. قد تحتاج إلى تفعيل API/Feed رسمي للمصدر.`);e.statusCode=422;throw e}
  product.importMethod="page-metadata";product.notice="البيانات المتاحة تعتمد على ما تسمح به صفحة المصدر. للمزامنة التجارية الكاملة استخدم API/Feed رسمي أو مصرح به.";
  return product;
}
module.exports={detectSource,importProduct};
