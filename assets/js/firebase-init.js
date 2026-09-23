if (!window.NIVORA_NEEDS_FIREBASE) {
  window.NivoraFirebase = { enabled:false };
  window.NivoraFirebaseReady = Promise.resolve(window.NivoraFirebase);
} else {
  window.NivoraFirebaseReady = (async () => {
    const [{initializeApp},{getAuth,onAuthStateChanged,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,updateProfile,sendPasswordResetEmail},{getFirestore,collection,doc,getDoc,getDocs,addDoc,setDoc,query,orderBy,limit,serverTimestamp,deleteDoc}] = await Promise.all([
      import("https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js"),
      import("https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js"),
      import("https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js")
    ]);
    const config=window.NIVORA_FIREBASE_CONFIG||{};
    if(!(config.apiKey && config.projectId && !String(config.apiKey).startsWith("YOUR_"))){
      window.NivoraFirebase={enabled:false}; return window.NivoraFirebase;
    }
    const app=initializeApp(config), auth=getAuth(app), db=getFirestore(app);
    async function getRoleForUser(user=auth.currentUser){
      if(!user)return null;
      const a=await getDoc(doc(db,"admins",user.uid));
      if(a.exists()){
        const r=String(a.data().role||"").toLowerCase();
        if(r==="admin"||r==="manager")return r;
      }
      const u=await getDoc(doc(db,"users",user.uid));
      if(u.exists()){
        const r=String(u.data().role||"customer").toLowerCase();
        if(r==="employee")return "employee";
        if(r==="admin"||r==="manager")return r;
        return "customer";
      }
      return "customer";
    }
    const api={
      enabled:true,app,auth,db,onAuthStateChanged,
      async register(name,email,password){
        const c=await createUserWithEmailAndPassword(auth,email,password);
        if(name)await updateProfile(c.user,{displayName:name});
        await setDoc(doc(db,"users",c.user.uid),{uid:c.user.uid,name:name||email.split("@")[0],email:c.user.email,role:"customer",createdAt:serverTimestamp(),updatedAt:serverTimestamp()},{merge:true});
        return c.user;
      },
      async login(email,password){return (await signInWithEmailAndPassword(auth,email,password)).user;},
      async logout(){return signOut(auth);},
      async resetPassword(email){return sendPasswordResetEmail(auth,email);},
      async getRole(){return getRoleForUser();},
      async isAdmin(){const r=await getRoleForUser();return r==="admin"||r==="manager";},
      async getCurrentUserProfile(){if(!auth.currentUser)return null;const s=await getDoc(doc(db,"users",auth.currentUser.uid));return s.exists()?{id:s.id,...s.data()}:null;},
      async createOrder(order){
        if(!auth.currentUser)throw new Error("يجب تسجيل الدخول قبل إتمام الطلب");
        const r=doc(collection(db,"orders")),now=serverTimestamp();
        await setDoc(r,{...order,customerId:auth.currentUser.uid,createdAt:now,updatedAt:now,id:r.id});return r.id;
      },
      async listOrders(max=200){const s=await getDocs(query(collection(db,"orders"),orderBy("createdAt","desc"),limit(max)));return s.docs.map(d=>({id:d.id,...d.data()}));},
      async listProducts(max=200){const s=await getDocs(query(collection(db,"products"),limit(max)));return s.docs.map(d=>({id:d.id,...d.data()}));},
      async saveProduct(p){const id=p.id||doc(collection(db,"products")).id;await setDoc(doc(db,"products",id),{...p,id,updatedAt:serverTimestamp()},{merge:true});return id;},
      async listOffers(max=100){const s=await getDocs(query(collection(db,"offers"),orderBy("createdAt","desc"),limit(max)));return s.docs.map(d=>({id:d.id,...d.data()}));},
      async saveOffer(o){const id=o.id||doc(collection(db,"offers")).id;await setDoc(doc(db,"offers",id),{...o,id,updatedAt:serverTimestamp()},{merge:true});return id;},
      async deleteOffer(id){await deleteDoc(doc(db,"offers",id));},
      async listExpenses(max=500){const s=await getDocs(query(collection(db,"expenses"),orderBy("date","desc"),limit(max)));return s.docs.map(d=>({id:d.id,...d.data()}));},
      async addExpense(e){const r=await addDoc(collection(db,"expenses"),{...e,amount:Number(e.amount||0),currency:"EGP",createdAt:serverTimestamp()});return r.id;},
      async addTransaction(t){const r=await addDoc(collection(db,"transactions"),{...t,amount:Number(t.amount||0),currency:"EGP",createdAt:serverTimestamp()});return r.id;},
      async listTransactions(max=500){const s=await getDocs(query(collection(db,"transactions"),orderBy("createdAt","desc"),limit(max)));return s.docs.map(d=>({id:d.id,...d.data()}));}
    };
    window.NivoraFirebase=api;
    await new Promise(resolve=>{let done=false;const finish=()=>{if(!done){done=true;resolve()}};onAuthStateChanged(auth,finish);setTimeout(finish,1200)});
    return api;
  })().catch(err=>{console.error("NIVORA Firebase init",err);window.NivoraFirebase={enabled:false,error:err};return window.NivoraFirebase;});
}
