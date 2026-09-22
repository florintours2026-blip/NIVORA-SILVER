/* NIVORA Core: phone-first storefront/admin data layer. */
(function(){
  const cfg = window.NIVORA_CONFIG || {};
  const hasSupabase = !!(cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY && window.supabase);
  const money = (v) => new Intl.NumberFormat(cfg.STORE_LOCALE || 'ar-SA',{style:'currency',currency:cfg.STORE_CURRENCY||'SAR',maximumFractionDigits:2}).format(Number(v||0));
  const getLocal = (k, fallback) => { try { return JSON.parse(localStorage.getItem(k)) ?? fallback; } catch { return fallback; } };
  const setLocal = (k,v) => localStorage.setItem(k, JSON.stringify(v));
  const demoProducts = [
    {id:'demo-watch-1',name_ar:'ساعة كلاسيك سيلفر',slug:'classic-silver-watch',category:'watches',price:2499,cost_price:1450,stock_qty:15,status:'active',featured:true,images:['https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1000','https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=1000','https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=1000','https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=1000'],description_ar:'ساعة كلاسيكية فاخرة بتصميم أنيق وميناء فضي.'},
    {id:'demo-perfume-1',name_ar:'عطر Noir Élégance',slug:'noir-elegance',category:'perfumes',price:749,cost_price:380,stock_qty:24,status:'active',featured:true,images:['https://images.unsplash.com/photo-1541643600914-78b084683601?w=1000','https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1000','https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=1000','https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=1000'],description_ar:'عطر فاخر برائحة خشبية ومسكية.'},
    {id:'demo-ring-1',name_ar:'خاتم فضة فاخر',slug:'luxury-silver-ring',category:'jewelry',price:1299,cost_price:650,stock_qty:8,status:'active',featured:true,images:['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1000','https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1000','https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1000','https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1000'],description_ar:'خاتم فضة عيار 925 بتصميم فاخر.'},
    {id:'demo-sunglasses-1',name_ar:'نظارة شمسية Aviator',slug:'aviator-sunglasses',category:'sunglasses',price:1299,cost_price:690,stock_qty:22,status:'active',featured:true,images:['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=1000','https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1000','https://images.unsplash.com/photo-1577803645773-f96470509666?w=1000','https://images.unsplash.com/photo-1508296695146-257a814070b4?w=1000'],description_ar:'نظارة شمسية Aviator بحماية UV400.'}
  ];
  async function getProducts(filters={}){
    if(hasSupabase){
      let q=window.supabase.from('products').select('*').eq('status','active').order('created_at',{ascending:false});
      if(filters.category) q=q.eq('category',filters.category);
      if(filters.featured) q=q.eq('featured',true);
      if(filters.limit) q=q.limit(filters.limit);
      const {data,error}=await q; if(!error && data) return data;
    }
    let p=getLocal('nivora_demo_products',demoProducts); if(filters.category) p=p.filter(x=>x.category===filters.category); if(filters.featured) p=p.filter(x=>x.featured); return filters.limit?p.slice(0,filters.limit):p;
  }
  async function getProduct(id){ const p=await getProducts(); const raw=p.find(x=>String(x.id)===String(id)||x.slug===id)||p[0]; if(!raw)return null; if(raw.name_ar)return {...raw,nameAr:raw.name_ar,nameEn:raw.name_en||raw.name_ar,categoryAr:({jewelry:'الفضة والمجوهرات',perfumes:'العطور',watches:'الساعات',sunglasses:'النظارات الشمسية'})[raw.category]||raw.category,stock:raw.stock_qty,oldPrice:raw.compare_at_price||null,discount:raw.compare_at_price?Math.max(0,Math.round((1-raw.price/raw.compare_at_price)*100)):0,descriptionAr:raw.description_ar||'',rating:raw.rating||5,reviews:raw.review_count||0}; return raw; }
  async function track(event_type, product_id=null, meta={}){
    const payload={event_type,product_id,metadata:meta,session_id:getLocal('nivora_session',null)||crypto.randomUUID()}; setLocal('nivora_session',payload.session_id);
    if(hasSupabase) { try { await window.supabase.from('customer_events').insert(payload); } catch(e){} }
    const events=getLocal('nivora_events',[]); events.push({...payload,created_at:new Date().toISOString()}); setLocal('nivora_events',events.slice(-500));
  }
  window.Nivora={money,getProducts,getProduct,track,getLocal,setLocal,hasSupabase,demoProducts};
})();
