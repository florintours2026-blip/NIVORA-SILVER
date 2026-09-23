
(function(){
"use strict";
const C={currency:"EGP",locale:"ar-EG"};
const imgs={
watch:["https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=700&q=70","https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=700&q=70"],
perfume:["https://images.unsplash.com/photo-1541643600914-78b084683601?w=700&q=70","https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=700&q=70"],
jewelry:["https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=700&q=70","https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=700&q=70"],
sunglasses:["https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=700&q=70","https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=700&q=70"]
};
let products=[
{id:"N001",name:"ساعة NIVORA Classic",cat:"watches",catName:"الساعات",price:2499,old:2999,stock:15,img:imgs.watch[0],desc:"ساعة فاخرة بتصميم كلاسيكي، مناسبة للإطلالات الرسمية واليومية."},
{id:"N002",name:"عطر Noir Élégance",cat:"perfumes",catName:"العطور",price:749,old:899,stock:24,img:imgs.perfume[0],desc:"عطر فاخر بنفحات خشبية ومسكية بلمسة عصرية."},
{id:"N003",name:"خاتم فضة 925",cat:"jewelry",catName:"المجوهرات",price:1299,old:1499,stock:8,img:imgs.jewelry[0],desc:"خاتم فضة عيار 925 بتفاصيل دقيقة وتشطيب فاخر."},
{id:"N004",name:"نظارة Aviator Luxury",cat:"sunglasses",catName:"النظارات",price:1199,old:1399,stock:22,img:imgs.sunglasses[0],desc:"نظارة Aviator بإطار أنيق وعدسات حماية UV400."},
{id:"N005",name:"ساعة Silver Heritage",cat:"watches",catName:"الساعات",price:2899,old:null,stock:7,img:imgs.watch[1],desc:"تصميم فضي فاخر مستوحى من الساعات الكلاسيكية."},
{id:"N006",name:"عطر Silver Oud",cat:"perfumes",catName:"العطور",price:899,old:1099,stock:13,img:imgs.perfume[1],desc:"مزيج فاخر من العود والتوابل والنفحات الشرقية."},
{id:"N007",name:"سوار فضة فاخر",cat:"jewelry",catName:"المجوهرات",price:999,old:1199,stock:18,img:imgs.jewelry[1],desc:"سوار فضة أنيق بتصميم قابل للتنسيق مع مختلف الإطلالات."},
{id:"N008",name:"نظارة Black Silver",cat:"sunglasses",catName:"النظارات",price:1099,old:null,stock:10,img:imgs.sunglasses[1],desc:"نظارة عصرية بإطار أسود ولمسات فضية."}
];
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const get=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}};
const set=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const money=v=>new Intl.NumberFormat(C.locale,{style:"currency",currency:C.currency,maximumFractionDigits:0}).format(v);
function toast(msg){let t=$("#toast");if(!t){t=document.createElement("div");t.id="toast";t.className="toast";document.body.append(t)}t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
function cart(){return get("nivora_cart",[])}
function saveCart(c){set("nivora_cart",c);updateHeader()}
function add(id){let c=cart(),i=c.find(x=>x.id===id);i?i.qty++:c.push({id,qty:1});saveCart(c);toast("تمت إضافة المنتج إلى السلة");}
function updateHeader(){let n=cart().reduce((a,x)=>a+x.qty,0);$$("[data-cart-count]").forEach(e=>e.textContent=n);let u=get("nivora_user",null);$$("[data-user-label]").forEach(e=>e.textContent=u?("مرحباً، "+(u.name||"حسابي")):"تسجيل الدخول")}
function header(active){return `<div class="topbar"><div class="container topbar-inner"><span>شحن آمن • تغليف فاخر • خدمة عملاء متاحة</span><span>الدفع عند الاستلام متاح حسب المنطقة</span></div></div><header class="header"><div class="container header-main"><div class="header-actions"><a class="icon-btn" href="cart.html" aria-label="السلة">🛒<b data-cart-count>0</b></a><a class="icon-btn" href="account.html" aria-label="الحساب">♙</a><a class="icon-btn hide-mobile" href="search.html" aria-label="البحث">⌕</a></div><a class="brand" href="index.html"><img src="assets/logo/logo-transparent.webp" alt="NIVORA SILVER"><span><strong>NIVORA</strong><small>SILVER • LUXURY STORE</small></span></a><div class="header-tools"><div class="search-box"><span>⌕</span><input aria-label="البحث" placeholder="ابحث عن منتج أو فئة..."></div><button class="icon-btn menu" aria-label="القائمة" onclick="document.querySelector('.nav').classList.toggle('mobile-open')">☰</button></div></div><nav class="nav ${active||""}"><div class="container nav-inner"><a class="${active==='home'?'active':''}" href="index.html">الرئيسية</a><a class="${active==='shop'?'active':''}" href="shop.html">المتجر</a><a href="jewelry.html">المجوهرات</a><a href="watches.html">الساعات</a><a href="perfumes.html">العطور</a><a href="sunglasses.html">النظارات</a><a href="offers.html">العروض</a></div></nav></header>`}
function footer(){return `<footer class="footer"><div class="container footer-grid"><div><div class="brand"><img src="assets/logo/logo-transparent.webp" alt="NIVORA SILVER"><span><strong>NIVORA</strong><small>SILVER • LUXURY STORE</small></span></div><p>مجوهرات فضة 925، ساعات، عطور ونظارات بتصميم فاخر.</p></div><div><b>روابط</b><p><a href="about.html">عن نيفورا</a></p><p><a href="contact.html">تواصل معنا</a></p><p><a href="shipping.html">الشحن</a></p></div><div><b>خدمة العملاء</b><p><a href="faq.html">الأسئلة الشائعة</a></p><p><a href="returns.html">الاسترجاع</a></p><p><a href="privacy.html">الخصوصية</a></p></div></div></footer>`}
function shell(content,active){document.body.innerHTML=header(active)+`<main>${content}</main>`+footer()+`<div id="toast" class="toast"></div>`;updateHeader()}
function card(p){let dis=p.old?Math.round((1-p.price/p.old)*100):0;return `<article class="card"><button class="fav" data-fav="${p.id}">♡</button><a href="product.html?id=${p.id}"><div class="card-media"><img src="${p.img}" alt="${p.name}" loading="lazy"></div></a><div class="card-body"><span class="tag">${p.catName}</span><h3>${p.name}</h3><div class="rating">★★★★★ <span class="muted">(${Math.floor(p.stock+3)})</span></div><div class="price">${money(p.price)} ${p.old?`<span class="old">${money(p.old)}</span>`:""}</div><div class="card-actions"><button class="btn-primary" data-add="${p.id}">أضف للسلة</button><a class="btn" href="product.html?id=${p.id}">التفاصيل</a></div></div></article>`}
function bind(){ $$("[data-add]").forEach(b=>b.onclick=()=>add(b.dataset.add)); $$("[data-fav]").forEach(b=>b.onclick=()=>{let f=get("nivora_fav",[]);f.includes(b.dataset.fav)?f=f.filter(x=>x!==b.dataset.fav):f.push(b.dataset.fav);set("nivora_fav",f);b.classList.toggle("active",f.includes(b.dataset.fav));b.textContent=f.includes(b.dataset.fav)?"♥":"♡"});updateHeader()}
function grid(list){return `<div class="grid">${list.map(card).join("")}</div>`}
function home(){shell(`<section class="hero"><div class="hero-bg"></div><div class="container hero-inner"><div class="hero-copy"><span class="eyebrow">أناقة تليق بك • NIVORA SILVER</span><h1>كل ما يميزك<br><span>في مكان واحد</span></h1><p>المجوهرات • الساعات • العطور • النظارات الشمسية</p><div class="hero-actions"><a class="btn-primary" href="shop.html">تسوق الآن ←</a><a class="btn" href="offers.html">اكتشف العروض</a></div><div class="hero-meta"><span>01 / 04</span><i></i><span>تشكيلة فاخرة مختارة بعناية</span></div></div></div></section><section class="section categories-section"><div class="container"><div class="section-head"><div><div class="eyebrow">COLLECTION</div><h2>تسوق حسب الفئة</h2><p class="muted">اكتشف مجموعات NIVORA SILVER المصممة لإطلالتك.</p></div><a class="btn" href="shop.html">عرض الكل</a></div><div class="categories">${[['jewelry','المجوهرات','تفاصيل تصنع الفارق',imgs.jewelry[0]],['watches','الساعات','دقة وأناقة خالدة',imgs.watch[0]],['perfumes','العطور','رائحة لا تُنسى',imgs.perfume[0]],['sunglasses','النظارات الشمسية','إطلالة تعكس شخصيتك',imgs.sunglasses[0]]].map(x=>`<a class="category" href="shop.html?category=${x[0]}" style="background-image:url('${x[3]}')"><div><span>${x[1]}</span><h3>${x[2]}</h3><small>اكتشف المجموعة ←</small></div></a>`).join("")}</div></div></section><section class="section products-section"><div class="container"><div class="section-head"><div><div class="eyebrow">NIVORA COLLECTION</div><h2>منتجات مختارة</h2><p class="muted">الأكثر طلباً من عملائنا.</p></div><a class="btn" href="shop.html">عرض الكل</a></div>${grid(products.slice(0,8))}</div></section><section class="luxury-banner"><div class="container"><div><span class="eyebrow">THE NIVORA EXPERIENCE</span><h2>فخامة تبدأ من التفاصيل</h2><p>تصميم أنيق، تغليف فاخر وتجربة شراء بسيطة وآمنة.</p></div><a class="btn-primary" href="shop.html">ابدأ التسوق</a></div></section>`,`home`);bind()}
function shop(category){let list=category?products.filter(p=>p.cat===category):products;let title=category?list[0]?.catName||"المتجر":"جميع المنتجات";shell(`<section class="page container"><div class="page-title"><div class="eyebrow">NIVORA COLLECTION</div><h1>${title}</h1><p class="muted">${list.length} منتجات متاحة</p></div><div class="toolbar"><input class="field search-field" id="q" placeholder="ابحث عن منتج..."><select class="field" id="sort"><option value="">ترتيب المنتجات</option><option value="low">السعر: الأقل</option><option value="high">السعر: الأعلى</option></select></div><div id="products-grid">${grid(list)}</div></section>`,"shop");function render(){let q=$("#q").value.trim().toLowerCase(),l=list.filter(p=>p.name.toLowerCase().includes(q));if($("#sort").value==="low")l.sort((a,b)=>a.price-b.price);if($("#sort").value==="high")l.sort((a,b)=>b.price-a.price);$("#products-grid").innerHTML=grid(l);bind()}$("#q").oninput=render;$("#sort").onchange=render;bind()}
function productPage(){let id=new URLSearchParams(location.search).get("id")||"N001",p=products.find(x=>x.id===id)||products[0];shell(`<section class="page container"><div class="product-detail"><div><div class="gallery-main"><img id="main-img" src="${p.img}" alt="${p.name}"></div><div class="thumbs">${[p.img,...imgs[p.cat]].slice(0,3).map(x=>`<img src="${x}" onclick="document.getElementById('main-img').src='${x}'">`).join("")}</div></div><div><span class="tag">${p.catName}</span><h1>${p.name}</h1><div class="rating">★★★★★ تقييم ممتاز</div><h2 class="price">${money(p.price)} ${p.old?`<span class="old">${money(p.old)}</span>`:""}</h2><p class="muted">${p.desc}</p><div class="notice">متوفر في المخزون: ${p.stock} قطعة</div><div style="display:flex;gap:10px;margin-top:20px"><button class="btn-primary" data-add="${p.id}">أضف للسلة</button><a class="btn" href="checkout.html?product=${p.id}">اشتر الآن</a></div></div></div></section>`);bind()}
function login(mode="customer"){
  const isAdminMode=mode==="admin", isEmployeeMode=mode==="employee";
  const title=isAdminMode?"دخول الإدارة":isEmployeeMode?"دخول الموظفين":"دخول العملاء";
  const eyebrow=isAdminMode?"NIVORA ADMIN":isEmployeeMode?"NIVORA STAFF":"NIVORA ACCOUNT";
  shell(`<section class="auth-screen"><div class="auth-backdrop"></div><div class="auth-modal"><button class="auth-close" onclick="location.href='login.html'">×</button><div class="auth-mark"><img src="assets/logo/logo-transparent.webp" alt="NIVORA"></div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p class="muted">${isAdminMode?"الدخول الآمن إلى لوحة الإدارة":isEmployeeMode?"الدخول إلى مساحة الموظفين المعتمدين":"ادخل إلى حسابك لمتابعة طلباتك ومفضلاتك"}</p><form class="form auth-form" id="login-form"><div id="msg" class="message"></div><div class="form-row"><label>البريد الإلكتروني</label><input autocomplete="email" class="field" id="email" type="email" required placeholder="name@example.com"></div><div class="form-row"><label>كلمة المرور</label><input autocomplete="current-password" class="field" id="pass" type="password" required minlength="6" placeholder="••••••••"></div><button class="btn-primary" id="login-submit" style="width:100%">${isAdminMode?"دخول الإدارة":isEmployeeMode?"دخول الموظفين":"دخول"}</button><div class="form-links"><a href="login.html">اختيار نوع الدخول</a>${!isAdminMode&&!isEmployeeMode?`<a href="register.html">إنشاء حساب</a><a href="forgot-password.html">نسيت كلمة المرور؟</a>`:""}</div></form></div></section>`);
  const form=$("#login-form");
  form.onsubmit=async e=>{
    e.preventDefault();
    const btn=$("#login-submit"),msg=$("#msg");
    btn.disabled=true; btn.textContent="جارٍ تسجيل الدخول...";
    msg.classList.remove("show");
    try{
      const api=window.NivoraFirebase || await window.NivoraFirebaseReady;
      if(!api?.enabled) throw new Error("تعذر الاتصال بخدمة تسجيل الدخول. تحقق من اتصال الإنترنت وإعداد Firebase.");
      const user=await api.login($("#email").value.trim(),$("#pass").value);
      const role=await api.getRole();
      if(isAdminMode && !["admin","manager"].includes(role)) throw new Error("هذا الحساب غير موجود ضمن admins أو لا يحمل صلاحية الإدارة.");
      if(isEmployeeMode && !["employee","manager","admin"].includes(role)) throw new Error("هذا الحساب غير مصرح له بدخول الموظفين.");
      if(!isAdminMode&&!isEmployeeMode){
        const u=await api.getCurrentUserProfile();
        set("nivora_user",u||{uid:user.uid,email:user.email,role:"customer"});
        location.href="account.html"; return;
      }
      set("nivora_admin",{uid:user.uid,email:user.email,role});
      location.href="admin.html";
    }catch(err){
      console.error("NIVORA login error",err);
      let text=err.code==="auth/invalid-credential"?"البريد الإلكتروني أو كلمة المرور غير صحيحة":err.code==="auth/too-many-requests"?"تم إيقاف المحاولات مؤقتاً لكثرة المحاولات. حاول لاحقاً.":err.code==="permission-denied"?"تم رفض قراءة صلاحية الحساب من Firestore. تأكد من نشر القواعد.":(err.message||"تعذر تسجيل الدخول");
      msg.textContent=text; msg.classList.add("show"); btn.disabled=false; btn.textContent=isAdminMode?"دخول الإدارة":isEmployeeMode?"دخول الموظفين":"دخول";
    }
  };
}
function loginHub(){
  shell(`<section class="page container auth-hub"><div class="auth-hero"><img src="assets/logo/logo-transparent.webp" alt="NIVORA" class="auth-logo"><div class="eyebrow">NIVORA • SILVER & LUXURY</div><h1>مرحباً بك في نيفورا</h1><p>اختر نوع الدخول المناسب للمتابعة</p></div><div class="auth-roles"><button class="auth-role" data-role="customer"><span class="auth-role-icon">👤</span><strong>دخول العملاء</strong><small>تسجيل الدخول أو إنشاء حساب جديد</small></button><button class="auth-role" data-role="employee"><span class="auth-role-icon">👨‍💼</span><strong>دخول الموظفين</strong><small>حسابات الموظفين المعتمدة</small></button><button class="auth-role" data-role="admin"><span class="auth-role-icon">🔐</span><strong>دخول الإدارة</strong><small>لوحة التحكم وإدارة المتجر</small></button></div></section>`);
  $$("[data-role]").forEach(b=>b.onclick=()=>{
    const role=b.dataset.role;
    if(role==="customer") login("customer");
    if(role==="employee") login("employee");
    if(role==="admin") login("admin");
  });
}
function indexGate(){
  document.body.innerHTML=`<div class="nv-splash"><div class="nv-splash-inner"><img src="assets/logo/logo-transparent.webp" alt="NIVORA" class="nv-splash-logo"><div class="eyebrow">SILVER • LUXURY STORE</div><h1>فخامة تبدأ من التفاصيل</h1><p>أناقة مختارة بعناية، وتجربة صنعت لتبقى.</p><div class="nv-loader"><i></i></div></div></div>`;
  const cached=get("nivora_user",null);
  // Do not wait for Firebase/Firestore before showing the login hub.
  setTimeout(()=>{
    if(cached){ home(); return; }
    loginHub();
  },260);
  window.addEventListener("nivora-auth-changed",e=>{
    if(e.detail && !cached && location.pathname.endsWith("index.html")) home();
  },{once:true});
}
function register(){shell(`<section class="page container"><form class="form" id="register-form"><div class="eyebrow">NIVORA ACCOUNT</div><h2>إنشاء حساب جديد</h2><p class="muted">أنشئ حسابك كعميل للمتابعة والشراء.</p><div id="msg" class="message"></div><div class="form-row"><label>الاسم</label><input autocomplete="name" class="field" id="name" required></div><div class="form-row"><label>البريد الإلكتروني</label><input autocomplete="email" class="field" id="email" type="email" required></div><div class="form-row"><label>كلمة المرور</label><input autocomplete="new-password" class="field" id="pass" type="password" minlength="6" required></div><button class="btn-primary" id="register-submit" style="width:100%">إنشاء الحساب</button><div class="form-links"><a href="login.html">العودة لتسجيل الدخول</a></div></form></section>`);$("#register-form").onsubmit=async e=>{e.preventDefault();const btn=$("#register-submit");btn.disabled=true;btn.textContent="جارٍ إنشاء الحساب...";try{if(!window.NivoraFirebase?.enabled)throw new Error("Firebase غير مهيأ");let u=await window.NivoraFirebase.register($("#name").value.trim(),$("#email").value.trim(),$("#pass").value);set("nivora_user",{uid:u.uid,name:u.displayName,email:u.email,role:"customer"});location.href="account.html"}catch(err){showMsg(err.code==="auth/email-already-in-use"?"البريد مستخدم بالفعل":err.message);btn.disabled=false;btn.textContent="إنشاء الحساب"}}}
async function account(){
  if(!window.NivoraFirebase?.enabled) return location.href="login.html";
  const user=await window.NivoraFirebase.currentUser();
  if(!user) return location.href="login.html";
  let u=await window.NivoraFirebase.getCurrentUserProfile();
  if(!u){u={uid:user.uid,name:user.displayName||user.email?.split("@")[0]||"",email:user.email,role:"customer"};}
  set("nivora_user",u);
  shell(`<section class="page container"><div class="page-title"><div class="eyebrow">MY ACCOUNT</div><h1>حسابي</h1></div><div class="stat-grid"><div class="stat"><span class="muted">الاسم</span><strong>${u.name||"—"}</strong></div><div class="stat"><span class="muted">البريد</span><strong style="font-size:16px">${u.email||"—"}</strong></div><div class="stat"><span class="muted">السلة</span><strong>${cart().reduce((a,x)=>a+x.qty,0)}</strong></div><div class="stat"><span class="muted">المفضلة</span><strong>${get("nivora_fav",[]).length}</strong></div></div><div class="panel"><h3>مرحباً بك في NIVORA</h3><p class="muted">يمكنك متابعة مشترياتك ومفضلاتك من هذا الحساب.</p><div class="toolbar"><a class="btn-primary" href="shop.html">متابعة التسوق</a><button class="btn" id="logout">تسجيل الخروج</button></div></div></section>`);
  $("#logout").onclick=async()=>{await window.NivoraFirebase.logout();localStorage.removeItem("nivora_user");location.href="login.html"};
}
function cartPage(){let c=cart();let items=c.map(x=>({...x,p:products.find(p=>p.id===x.id)})).filter(x=>x.p);let total=items.reduce((a,x)=>a+x.p.price*x.qty,0);shell(`<section class="page container"><div class="page-title"><div class="eyebrow">SHOPPING BAG</div><h1>سلة المشتريات</h1></div>${items.length?`<div class="panel">${items.map(x=>`<div class="cart-item"><img src="${x.p.img}"><div><h3>${x.p.name}</h3><p class="muted">${money(x.p.price)}</p><div class="qty"><button class="btn" data-dec="${x.id}">−</button><b>${x.qty}</b><button class="btn" data-inc="${x.id}">+</button></div></div><strong class="price">${money(x.p.price*x.qty)}</strong></div>`).join("")}<div style="display:flex;justify-content:space-between;padding-top:20px"><b>الإجمالي</b><b class="price">${money(total)}</b></div><a class="btn-primary" style="display:inline-block;margin-top:15px" href="checkout.html">إتمام الطلب</a></div>`:`<div class="empty">السلة فارغة<br><a class="btn-primary" style="display:inline-block;margin-top:15px" href="shop.html">ابدأ التسوق</a></div>`}</section>`);$$("[data-inc]").forEach(b=>b.onclick=()=>{let a=cart(),i=a.find(x=>x.id===b.dataset.inc);i.qty++;saveCart(a);cartPage()});$$("[data-dec]").forEach(b=>b.onclick=()=>{let a=cart(),i=a.find(x=>x.id===b.dataset.dec);i.qty--;a=a.filter(x=>x.qty>0);saveCart(a);cartPage()})}
function checkout(){if(!cart().length)return location.href="cart.html";shell(`<section class="page container"><form class="form" id="checkout-form"><div class="eyebrow">CHECKOUT</div><h2>إتمام الطلب</h2><div id="msg" class="message"></div><div class="form-row"><label>الاسم الكامل</label><input class="field" id="customer-name" required></div><div class="form-row"><label>رقم الهاتف</label><input class="field" id="customer-phone" required></div><div class="form-row"><label>العنوان</label><textarea class="field" id="customer-address" rows="3" required></textarea></div><div class="form-row"><label>طريقة الدفع</label><select class="field" id="payment-method"><option value="cod">الدفع عند الاستلام</option><option value="bank">تحويل بنكي</option><option value="card">بطاقة</option></select></div><button class="btn-primary" style="width:100%">تأكيد الطلب</button></form></section>`);$("#checkout-form").onsubmit=async e=>{e.preventDefault();try{if(!window.NivoraFirebase?.enabled)throw new Error("أكمل إعداد Firebase أولاً");if(!window.NivoraFirebase.auth.currentUser)return location.href="login.html";const items=cart().map(x=>{const p=products.find(p=>p.id===x.id);return {...x,name:p?.name,price:Number(p?.price||0)}});const total=items.reduce((a,x)=>a+x.price*x.qty,0);const id=await window.NivoraFirebase.createOrder({items,total,currency:"EGP",status:"جديد",paymentStatus:"pending",paymentMethod:$("#payment-method").value,customer:{name:$("#customer-name").value.trim(),phone:$("#customer-phone").value.trim(),address:$("#customer-address").value.trim()}});set("last_order_id",id);localStorage.removeItem("nivora_cart");location.href="order-success.html"}catch(err){showMsg(err.message)}}}
async function admin(){
  const cached=get("nivora_admin",null);
  const api=window.NivoraFirebase || await window.NivoraFirebaseReady;
  if(!api?.enabled)return simplePage("لوحة الإدارة","تعذر تهيئة Firebase.");
  const user=api.auth?.currentUser || await api.currentUser();
  if(!user)return location.href="admin-login.html";
  let role=cached?.uid===user.uid?cached.role:null;
  // Render the shell immediately; never wait for the orders query before showing the dashboard.
  if(!["admin","manager","employee"].includes(role)){
    try{ role=await api.getRole(); }catch(err){ console.error(err); return showAdminError(err); }
  }
  if(!["admin","manager","employee"].includes(role))return location.href="admin-login.html";
  shell(`<section class="admin-dashboard"><div class="container"><div class="admin-hero"><div><div class="eyebrow">NIVORA ${String(role).toUpperCase()}</div><h1>لوحة ${role==="employee"?"الموظفين":"الإدارة"}</h1><p class="muted">مرحباً ${user.displayName||user.email}. الصلاحية الحالية: ${role}.</p></div><a class="btn" href="index.html">العودة للمتجر</a></div><div class="stat-grid"><div class="stat"><span class="muted">المنتجات</span><strong>${products.length}</strong></div><div class="stat"><span class="muted">الطلبات</span><strong id="admin-orders-count">—</strong></div><div class="stat"><span class="muted">المبيعات</span><strong id="admin-sales-total">—</strong></div><div class="stat"><span class="muted">الصلاحية</span><strong style="font-size:20px">${role}</strong></div></div><div class="admin-layout"><aside class="admin-side"><a class="active" href="admin.html">الرئيسية</a><a href="admin-products.html">المنتجات</a><a href="admin-orders.html">الطلبات</a><a href="admin-customers.html">العملاء</a><a href="admin-offers.html">العروض والروابط</a><a href="admin-inventory.html">المخزون</a><a href="admin-accounting.html">المحاسبة</a><a href="admin-reports.html">التقارير</a><a href="admin-settings.html">الإعدادات</a><a href="#" id="admin-out">تسجيل الخروج</a></aside><div class="panel"><div class="section-head"><div><div class="eyebrow">LIVE OVERVIEW</div><h2>آخر الطلبات</h2></div><span id="admin-data-status" class="muted">جاري تحميل البيانات…</span></div><div id="admin-orders-area"><div class="admin-loading"><i></i><span>جاري تحميل الطلبات</span></div></div></div></div></div></section>`);
  $("#admin-out").onclick=async e=>{e.preventDefault();await api.logout();localStorage.removeItem("nivora_admin");localStorage.removeItem("nivora_user");location.href="login.html"};
  // Verify the cached role in the background so UI is fast without weakening Firestore security rules.
  try{
    const verifiedRole=await api.getRole();
    if(!["admin","manager","employee"].includes(verifiedRole))return location.href="admin-login.html";
    if(verifiedRole!==role){localStorage.setItem("nivora_admin",JSON.stringify({uid:user.uid,email:user.email,role:verifiedRole}));}
    let orders=[];
    try{orders=await api.listOrders(200);}catch(e){console.warn("orders read failed",e);$("#admin-data-status").textContent="تعذر تحميل الطلبات";$("#admin-orders-area").innerHTML=`<div class="message show">تعذر تحميل الطلبات: ${e.code==="permission-denied"?"صلاحيات Firestore تمنع القراءة.":e.message}</div>`;return;}
    const sales=orders.filter(o=>o.status!=="ملغي").reduce((a,o)=>a+Number(o.total||0),0);
    $("#admin-orders-count").textContent=orders.length; $("#admin-sales-total").textContent=money(sales); $("#admin-data-status").textContent="تم التحديث";
    $("#admin-orders-area").innerHTML=orders.length?`<div class="table-wrap"><table class="table"><tr><th>الطلب</th><th>التاريخ</th><th>الإجمالي</th><th>الحالة</th></tr>${orders.slice(0,8).map(o=>`<tr><td>${o.id}</td><td>${o.createdAt?.toDate?o.createdAt.toDate().toLocaleDateString("ar-EG"):"—"}</td><td>${money(o.total||0)}</td><td>${o.status||"جديد"}</td></tr>`).join("")}</table></div>`:`<div class="empty">لا توجد طلبات بعد.</div>`;
  }catch(err){showAdminError(err,true)}
}
function showAdminError(err,inline=false){
  const msg=err?.code==="permission-denied"?"Firestore رفض قراءة صلاحية الإدارة. تأكد من نشر firestore.rules مع السماح بقراءة admins/{UID}.":(err?.message||"حدث خطأ أثناء التحقق من صلاحية الإدارة.");
  if(inline && $("#admin-orders-area")){ $("#admin-orders-area").innerHTML=`<div class="message show">${msg}</div>`; $("#admin-data-status").textContent="تعذر التحقق"; return; }
  shell(`<section class="page container"><div class="panel"><h2>تعذر فتح لوحة الإدارة</h2><p class="message show">${msg}</p><a class="btn-primary" href="admin-login.html">العودة لتسجيل دخول الإدارة</a></div></section>`);
}
async function adminProducts(){if(!window.NivoraFirebase?.enabled)return simplePage("إدارة المنتجات","أكمل إعداد Firebase أولاً.");if(!(await window.NivoraFirebase.isAdmin()))return location.href="admin-login.html";shell(`<section class="page container"><div class="page-title"><div class="eyebrow">CATALOG</div><h1>إدارة المنتجات</h1><p class="muted">المنتجات المخزنة في Firestore، والأسعار بالجنيه المصري.</p></div><div class="toolbar"><button class="btn-primary" id="seed-products">رفع الكتالوج التجريبي إلى Firebase</button></div><div class="panel" style="margin-top:18px"><div class="table-wrap"><table class="table"><tr><th>الصورة</th><th>المنتج</th><th>الفئة</th><th>السعر</th><th>المخزون</th><th>الإجراء</th></tr>${products.map(p=>`<tr><td><img src="${p.img}" style="width:55px;height:55px;object-fit:cover;border-radius:7px"></td><td>${p.name}</td><td>${p.catName}</td><td>${money(p.price)}</td><td>${p.stock??0}</td><td><a class="btn" href="product.html?id=${p.id}">عرض</a></td></tr>`).join("")}</table></div></div></section>`);adminNav();$("#seed-products").onclick=async()=>{for(const p of products)await window.NivoraFirebase.saveProduct({...p,currency:"EGP"});alert("تم رفع الكتالوج إلى Firebase");location.reload()}}

async function adminAccounting(){if(!window.NivoraFirebase?.enabled)return simplePage("المحاسبة","أكمل إعداد Firebase أولاً.");if(!(await window.NivoraFirebase.isAdmin()))return location.href="admin-login.html";shell(`<section class="page container"><div class="page-title"><div class="eyebrow">NIVORA FINANCE</div><h1>المحاسبة</h1><p class="muted">نظام محاسبة مبني على الطلبات والمصروفات والقيود المالية — العملة الأساسية جنيه مصري.</p></div><div id="accounting-content" class="panel">جاري تحميل البيانات...</div></section>`);adminNav();const [orders,expenses,transactions]=await Promise.all([window.NivoraFirebase.listOrders(),window.NivoraFirebase.listExpenses(),window.NivoraFirebase.listTransactions()]);const sales=orders.filter(o=>o.status!=="ملغي").reduce((s,o)=>s+Number(o.total||0),0);const refunds=transactions.filter(t=>t.type==="refund").reduce((s,t)=>s+Number(t.amount||0),0);const fees=transactions.filter(t=>t.type==="fee").reduce((s,t)=>s+Number(t.amount||0),0);const expenseTotal=expenses.reduce((s,e)=>s+Number(e.amount||0),0);const net=sales-refunds;const profit=net-expenseTotal-fees;$("#accounting-content").innerHTML=`<div class="stat-grid"><div class="stat"><span class="muted">إجمالي المبيعات</span><strong>${money(sales)}</strong></div><div class="stat"><span class="muted">صافي المبيعات</span><strong>${money(net)}</strong></div><div class="stat"><span class="muted">المصروفات</span><strong>${money(expenseTotal)}</strong></div><div class="stat"><span class="muted">صافي الربح التشغيلي</span><strong>${money(profit)}</strong></div></div><div class="toolbar" style="margin-top:24px"><button class="btn-primary" id="add-expense">إضافة مصروف</button><button class="btn" id="add-fee">إضافة عمولة/رسوم</button></div><div id="expense-form" style="display:none;margin-top:20px"><div class="form-row"><label>بيان المصروف</label><input class="field" id="expense-title"></div><div class="form-row"><label>المبلغ بالجنيه</label><input class="field" id="expense-amount" type="number" min="0" step="0.01"></div><div class="form-row"><label>التصنيف</label><select class="field" id="expense-category"><option>تشغيل</option><option>شحن</option><option>تسويق</option><option>رواتب</option><option>مشتريات</option><option>أخرى</option></select></div><button class="btn-primary" id="save-expense">حفظ</button></div><div class="table-wrap" style="margin-top:28px"><table class="table"><tr><th>التاريخ</th><th>البيان</th><th>النوع</th><th>المبلغ</th></tr>${expenses.map(e=>`<tr><td>${e.date?.toDate?e.date.toDate().toLocaleDateString("ar-EG"):"—"}</td><td>${e.title||"—"}</td><td>${e.category||"مصروف"}</td><td>${money(e.amount)}</td></tr>`).join("")||`<tr><td colspan="4">لا توجد مصروفات بعد.</td></tr>`}</table></div>`;$("#add-expense").onclick=()=>$("#expense-form").style.display="block";$("#save-expense").onclick=async()=>{await window.NivoraFirebase.addExpense({title:$("#expense-title").value.trim(),amount:Number($("#expense-amount").value||0),category:$("#expense-category").value,date:new Date()});adminAccounting()};$("#add-fee").onclick=async()=>{const amount=Number(prompt("أدخل قيمة العمولة/الرسوم بالجنيه")||0);if(amount>0){await window.NivoraFirebase.addTransaction({type:"fee",amount,description:"رسوم/عمولة يدوية"});adminAccounting()}}}
function adminNav(){$(".header").insertAdjacentHTML("afterend",`<div class="container" style="padding-top:12px"><div class="toolbar"><a class="btn" href="admin.html">الرئيسية</a><a class="btn" href="admin-products.html">المنتجات</a><a class="btn" href="admin-orders.html">الطلبات</a><a class="btn" href="admin-customers.html">العملاء</a><a class="btn" href="admin-accounting.html">المحاسبة</a></div></div>`)}
function simplePage(title,text){shell(`<section class="page container"><div class="page-title"><div class="eyebrow">NIVORA SILVER</div><h1>${title}</h1></div><div class="panel"><p>${text}</p></div></section>`)}
async function publicOffers(){
  let offers=[];
  if(window.NivoraFirebase?.enabled){ try{ offers=await window.NivoraFirebase.listOffers(100); }catch(e){ console.warn("Offers unavailable",e); } }
  shell(`<section class="page container"><div class="page-title"><div class="eyebrow">NIVORA OFFERS</div><h1>العروض المميزة</h1><p class="muted">عروض وروابط مختارة من مصادر موثوقة.</p></div><div id="offers-grid" class="grid">${offers.length?offers.map(o=>`<article class="card"><div class="card-media"><img src="${o.image||'assets/logo/logo-transparent.webp'}" alt="${o.title||'عرض NIVORA'}" loading="lazy"></div><div class="card-body"><span class="tag">${o.source||'عرض'}</span><h3>${o.title||'عرض مميز'}</h3><p class="muted">${o.description||''}</p><div class="price">${o.price?money(Number(o.price)):''} ${o.oldPrice?`<span class="old">${money(Number(o.oldPrice))}</span>`:''}</div><div class="card-actions"><a class="btn-primary" href="${o.url||'#'}" target="_blank" rel="noopener noreferrer">عرض المنتج</a></div></div></article>`).join(''):`<div class="empty" style="grid-column:1/-1">لا توجد عروض منشورة حالياً.</div>`}</div></section>`,'');
}
function detectOfferSource(url){
  try{const h=new URL(url).hostname.toLowerCase();if(h.includes('amazon'))return 'Amazon';if(h.includes('aliexpress'))return 'AliExpress';if(h.includes('alibaba'))return 'Alibaba';if(h.includes('noon'))return 'Noon';return 'رابط خارجي';}catch{return 'رابط خارجي';}
}
async function adminOffers(){
  if(!window.NivoraFirebase?.enabled)return simplePage("إدارة العروض","Firebase غير مهيأ.");
  const user=await window.NivoraFirebase.currentUser();
  if(!user || !(await window.NivoraFirebase.isAdmin()))return location.href="admin-login.html";
  let offers=[];try{offers=await window.NivoraFirebase.listOffers(200)}catch(e){console.error(e)}
  shell(`<section class="page container"><div class="page-title"><div class="eyebrow">NIVORA ADMIN</div><h1>إدارة العروض والروابط</h1><p class="muted">ألصق رابط المنتج من المواقع المعتمدة، ثم راجع البيانات وانشر العرض.</p></div><div class="panel"><form id="offer-form"><div class="form-row"><label>رابط المنتج</label><input class="field" id="offer-url" type="url" required placeholder="https://..."></div><div class="form-row"><label>المصدر</label><select class="field" id="offer-source"><option>تلقائي</option><option>Amazon</option><option>AliExpress</option><option>Alibaba</option><option>Noon</option><option>رابط خارجي</option></select></div><div class="form-row"><label>اسم العرض</label><input class="field" id="offer-title" required></div><div class="form-row"><label>رابط الصورة</label><input class="field" id="offer-image" type="url" placeholder="https://..."></div><div class="toolbar"><input class="field" id="offer-price" type="number" min="0" step="0.01" placeholder="السعر"><input class="field" id="offer-old" type="number" min="0" step="0.01" placeholder="السعر قبل الخصم"></div><div class="form-row"><label>الوصف</label><textarea class="field" id="offer-description" rows="3"></textarea></div><button class="btn-primary" id="offer-save">نشر العرض</button><div id="offer-msg" class="message"></div></form></div><div class="panel" style="margin-top:20px"><h2>العروض المنشورة</h2><div class="table-wrap"><table class="table"><tr><th>العرض</th><th>المصدر</th><th>السعر</th><th>الرابط</th><th>الإجراء</th></tr>${offers.map(o=>`<tr><td>${o.title||'—'}</td><td>${o.source||'—'}</td><td>${o.price?money(Number(o.price)):'—'}</td><td><a class="btn" href="${o.url}" target="_blank" rel="noopener">فتح</a></td><td><button class="btn" data-delete-offer="${o.id}">حذف</button></td></tr>`).join('')||`<tr><td colspan="5">لا توجد عروض منشورة.</td></tr>`}</table></div></div></section>`);
  $("#offer-url").oninput=()=>{if($("#offer-source").value==="تلقائي"){$("#offer-source").title=detectOfferSource($("#offer-url").value)}};
  $("#offer-form").onsubmit=async e=>{e.preventDefault();const btn=$("#offer-save");btn.disabled=true;btn.textContent="جارٍ الحفظ...";try{const url=$("#offer-url").value.trim();const source=$("#offer-source").value==="تلقائي"?detectOfferSource(url):$("#offer-source").value;await window.NivoraFirebase.saveOffer({url,source,title:$("#offer-title").value.trim(),image:$("#offer-image").value.trim(),price:Number($("#offer-price").value||0),oldPrice:Number($("#offer-old").value||0),description:$("#offer-description").value.trim(),createdBy:user.uid});location.reload()}catch(err){$("#offer-msg").textContent=err.code==="permission-denied"?"تم رفض العملية من Firestore. انشر firestore.rules الجديدة.":err.message;$("#offer-msg").classList.add("show");btn.disabled=false;btn.textContent="نشر العرض"}};
  $$('[data-delete-offer]').forEach(b=>b.onclick=async()=>{if(!confirm("حذف هذا العرض؟"))return;try{await window.NivoraFirebase.deleteOffer(b.dataset.deleteOffer);location.reload()}catch(e){alert(e.message)}});
}

async function init(){
  const f=location.pathname.split("/").pop()||"index.html",q=new URLSearchParams(location.search);
  // Never block page rendering on Firestore product reads. The local catalog renders immediately.
  if(f==="index.html") indexGate();
  else if(f==="shop.html") shop(q.get("category"));
  else if(["jewelry.html","watches.html","perfumes.html","sunglasses.html"].includes(f)) shop(f.replace(".html",""));
  else if(f==="offers.html") publicOffers();
  else if(f==="product.html") productPage();
  else if(f==="login.html") loginHub();
  else if(f==="admin-login.html") login("admin");
  else if(f==="register.html") register();
  else if(f==="account.html") account();
  else if(f==="cart.html") cartPage();
  else if(f==="checkout.html") checkout();
  else if(f==="admin.html") admin();
  else if(["admin-products.html","admin-product.html"].includes(f)) adminProducts();
  else if(f==="admin-orders.html") { if(window.NivoraFirebase?.isStaff) { const ok=await window.NivoraFirebase.isStaff(); if(!ok)return location.href="admin-login.html"; } simplePage("إدارة الطلبات","افتح لوحة الإدارة لمتابعة الطلبات."); }
  else if(f==="admin-customers.html") simplePage("العملاء","إدارة العملاء متاحة من لوحة الإدارة.");
  else if(f==="admin-offers.html") adminOffers();
  else if(f==="admin-accounting.html") adminAccounting();
  else if(f==="admin-inventory.html") simplePage("المخزون","المخزون الحالي يعرض من كتالوج NIVORA.");
  else if(f==="admin-reports.html") simplePage("التقارير","صفحة التقارير جاهزة لبيانات المبيعات.");
  else if(f==="admin-settings.html") simplePage("الإعدادات","إعدادات المتجر والإدارة.");
  else if(f==="order-success.html") simplePage("تم استلام طلبك","شكراً لك. تم حفظ الطلب بنجاح.");
  else if(f==="search.html") shop();
  else if(f==="forgot-password.html") simplePage("استعادة كلمة المرور","استخدم صفحة تسجيل الدخول لإعادة تعيين كلمة المرور.");
  else if(f==="account-orders.html") simplePage("طلباتي","ستظهر الطلبات هنا بعد إتمام عملية شراء.");
  else if(f==="account-wishlist.html") simplePage("المفضلة",`عدد المنتجات في المفضلة: ${get("nivora_fav",[]).length}`);
  else if(f==="about.html") simplePage("عن NIVORA","NIVORA SILVER متجر فاخر.");
  else if(f==="contact.html") simplePage("تواصل معنا","يمكنك ربط هذه الصفحة بوسائل التواصل لاحقاً.");
  else simplePage(document.title.split("|")[0]||"NIVORA SILVER","هذه الصفحة جاهزة.");
}
document.addEventListener("DOMContentLoaded",()=>{ init().catch(err=>{console.error("NIVORA init error",err);document.body.insertAdjacentHTML("beforeend",`<div class="nv-runtime-error">حدث خطأ أثناء تحميل الصفحة. افتح وحدة التحكم لمعرفة التفاصيل.</div>`);}); });
})();
