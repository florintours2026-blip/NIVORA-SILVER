const express=require("express"),path=require("path"),fs=require("fs");
const app=express(),PORT=process.env.PORT||3000,ROOT=__dirname,DATA=path.join(ROOT,"data"),ORDERS=path.join(DATA,"orders.json");
app.use(express.json({limit:"1mb"})); app.use(express.urlencoded({extended:true}));
function read(f,d){try{return JSON.parse(fs.readFileSync(f,"utf8"))}catch{return d}}
function save(f,d){fs.mkdirSync(path.dirname(f),{recursive:true});fs.writeFileSync(f,JSON.stringify(d,null,2),"utf8")}
app.get("/api/health",(q,r)=>r.json({ok:true,service:"NIVORA SILVER API"}));
app.get("/api/products",(q,r)=>r.json(read(path.join(DATA,"products.json"),[])));
app.get("/api/products/:id",(q,r)=>{const p=read(path.join(DATA,"products.json"),[]).find(x=>x.id===q.params.id);p?r.json(p):r.status(404).json({error:"Product not found"})});
app.get("/api/categories",(q,r)=>r.json(read(path.join(DATA,"categories.json"),[])));
app.post("/api/orders",(q,r)=>{
  const {customer,items,totals,paymentMethod}=q.body||{};
  if(!customer?.name||!customer?.phone||!Array.isArray(items)||!items.length)return r.status(400).json({error:"بيانات الطلب غير مكتملة"});
  const orders=read(ORDERS,[]),order={id:"NIV-"+Date.now(),createdAt:new Date().toISOString(),status:"pending",customer,items,totals:totals||{},paymentMethod:paymentMethod||"cash"};
  orders.unshift(order);save(ORDERS,orders);r.status(201).json({ok:true,order});
});
app.get("/api/orders",(q,r)=>r.json(read(ORDERS,[])));
app.use(express.static(ROOT));
app.use((q,r)=>q.path.startsWith("/api/")?r.status(404).json({error:"API route not found"}):r.sendFile(path.join(ROOT,"index.html")));
app.listen(PORT,()=>console.log("NIVORA SILVER: http://localhost:"+PORT));
