import { collection, query, orderBy, limit, getDocs, updateDoc, doc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const $=s=>document.querySelector(s);
let imported=null;
const statusMap={requested:"طلب جديد",reviewing:"قيد المراجعة",approved:"جاهز للشراء",ordered:"تم الطلب من المورد",shipping:"في الشحن",delivered:"تم التسليم",cancelled:"ملغي"};

function esc(v=""){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
function showMessage(text,type=""){const el=$("#import-message");el.textContent=text;el.className="message show"+(type?` ${type}`:"");}
function sourceFrom(url){try{const h=new URL(url).hostname.toLowerCase();if(h.includes("amazon"))return"Amazon";if(h.includes("noon"))return"Noon";if(h.includes("aliexpress"))return"AliExpress";if(h.includes("alibaba"))return"Alibaba";return"Unknown"}catch{return"Unknown"}}
async function adminGuard(){const api=await window.NivoraFirebaseReady;if(!api?.enabled)throw new Error("Firebase غير مهيأ.");const user=await api.currentUser();if(!user)location.href="admin-login.html";const role=await api.getRole();if(!["admin","manager"].includes(String(role).toLowerCase()))location.href="admin-login.html";return{api,user};}
async function apiRequest(path,options={}){const api=await window.NivoraFirebaseReady;const user=api.auth?.currentUser;if(!user)throw new Error("انتهت جلسة الإدارة.");const token=await user.getIdToken();const base=window.NIVORA_CONFIG?.apiBaseUrl||"/api";const res=await fetch(base+path,{...options,headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`,...(options.headers||{})}});let data=null;try{data=await res.json()}catch{}if(!res.ok)throw new Error(data?.error||data?.message||`API ${res.status}`);return data}

async function importProduct(url){
  const btn=$("#preview-btn");btn.disabled=true;btn.textContent="جاري جلب البيانات…";showMessage("جاري تحليل الرابط…");
  try{imported=await apiRequest("/imports/product",{method:"POST",body:JSON.stringify({url,source:sourceFrom(url)})});renderPreview(imported);$("#preview-section").classList.remove("hidden");showMessage("تم جلب البيانات. راجعها قبل الحفظ.","ok");}
  catch(e){showMessage(e.message,"error");}
  finally{btn.disabled=false;btn.textContent="جلب بيانات المنتج";}
}
function renderPreview(p){
  const images=Array.isArray(p.images)?p.images.filter(Boolean):[];const first=images[0]||"";
  $("#preview").innerHTML=`<div class="preview-card"><div><img class="main-image" src="${esc(first)}" alt="${esc(p.name||"Product")}" onerror="this.style.opacity=.25"></div><div><h3>${esc(p.name||"منتج بدون اسم")}</h3><p>${esc(p.description||"لا يوجد وصف متاح من المصدر.")}</p><div class="meta"><div>المصدر<br><b>${esc(p.source||"—")}</b></div><div>السعر الأصلي<br><b>${esc(p.price??"—")} ${esc(p.currency||"")}</b></div><div>SKU<br><b>${esc(p.sku||"—")}</b></div></div><div class="gallery">${images.slice(0,10).map(x=>`<img src="${esc(x)}" loading="lazy" onerror="this.remove()">`).join("")}</div></div></div>`;
  $("#sale-price").value=Number(p.price||0);$("#stock").value=Number(p.stock||0);
}
async function saveImported(){
  if(!imported) return;const btn=$("#save-product");btn.disabled=true;btn.textContent="جاري الحفظ…";
  try{
    const api=window.NivoraFirebase;const id=await api.saveProduct({
      name:imported.name||"منتج مستورد",description:imported.description||"",price:Number($("#sale-price").value||0),costPrice:Number(imported.price||0),stock:Number($("#stock").value||0),sku:imported.sku||null,images:imported.images||[],img:imported.images?.[0]||"",currency:"EGP",source:imported.source,sourceUrl:imported.url,sourceProductId:imported.sourceProductId||null,brand:imported.brand||"",variants:imported.variants||[],importedAt:serverTimestamp(),importedBy:api.auth.currentUser.uid,active:true
    });
    showMessage(`تم حفظ المنتج بنجاح. رقم المنتج: ${id}`,"ok");$("#preview-section").classList.add("hidden");$("#import-form").reset();imported=null;
  }catch(e){showMessage(e.message,"error");}
  finally{btn.disabled=false;btn.textContent="حفظ المنتج في المتجر";}
}
async function loadRequests(){
  const state=$("#requests-state"),body=$("#requests-body");try{
    const api=window.NivoraFirebase;const snap=await getDocs(query(collection(api.db,"productRequests"),orderBy("createdAt","desc"),limit(100)));const rows=snap.docs.map(d=>({id:d.id,...d.data()}));
    state.className="message";state.textContent=rows.length?`عدد الطلبات: ${rows.length}`:"لا توجد طلبات شراء بالطلب حتى الآن.";
    body.innerHTML=rows.map(r=>`<tr><td>${esc(r.customer?.name||r.customerName||"—")}<br><small>${esc(r.customer?.phone||r.customerPhone||"")}</small></td><td><div class="request-product"><img src="${esc(r.image||r.productImage||"")}" onerror="this.style.opacity=.2"><span>${esc(r.productName||r.name||"منتج")}</span></div></td><td>${esc(r.source||sourceFrom(r.url||""))}</td><td>${esc(r.quantity||1)}</td><td><span class="status">${esc(statusMap[r.status]||r.status||"طلب جديد")}</span></td><td><div class="request-actions"><button data-status="approved" data-id="${esc(r.id)}">جاهز للشراء</button><button data-status="ordered" data-id="${esc(r.id)}">تم الطلب</button><button data-status="shipping" data-id="${esc(r.id)}">في الشحن</button><button data-status="delivered" data-id="${esc(r.id)}">تم التسليم</button></div></td></tr>`).join("");
    body.querySelectorAll("button[data-id]").forEach(b=>b.onclick=()=>updateRequest(b.dataset.id,b.dataset.status));
  }catch(e){state.className="message show error";state.textContent=`تعذر تحميل طلبات العملاء: ${e.message}`}
}
async function updateRequest(id,status){try{await updateDoc(doc(window.NivoraFirebase.db,"productRequests",id),{status,updatedAt:serverTimestamp(),updatedBy:window.NivoraFirebase.auth.currentUser.uid});await loadRequests()}catch(e){alert(e.message)}}

(async()=>{try{await adminGuard();$("#import-form").onsubmit=e=>{e.preventDefault();importProduct($("#product-url").value.trim())};$("#save-product").onclick=saveImported;$("#cancel-preview").onclick=()=>{$("#preview-section").classList.add("hidden");imported=null};await loadRequests()}catch(e){showMessage(e.message,"error")}})();
