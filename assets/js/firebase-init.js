import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { getFirestore, collection, doc, getDoc, getDocs, addDoc, setDoc, updateDoc, deleteDoc, query, orderBy, limit, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const config = window.NIVORA_FIREBASE_CONFIG || {};
const configured = !!(config.apiKey && config.projectId && !String(config.apiKey).startsWith("YOUR_"));

if (!configured) {
  const api = { enabled:false, auth:null, db:null, storage:null };
  window.NivoraFirebase = api;
  window.NivoraFirebaseReady = Promise.resolve(api);
  window.NivoraAuthReady = Promise.resolve(null);
} else {
  try {
    const app = initializeApp(config);
    const auth = getAuth(app);
    const db = getFirestore(app);
    let storage = null;
    let resolveAuthReady;
    const authReady = new Promise(resolve => { resolveAuthReady = resolve; });
    let firstAuthState = true;

    onAuthStateChanged(auth, user => {
      if (firstAuthState) {
        firstAuthState = false;
        resolveAuthReady(user || null);
      }
      window.dispatchEvent(new CustomEvent("nivora-auth-changed", { detail:user || null }));
    });

    const api = {
      enabled:true, app, auth, db, get storage(){ return storage; },
      authReady,
      onAuthStateChanged,
      async register(name,email,password){
        const cred = await createUserWithEmailAndPassword(auth,email,password);
        if(name) await updateProfile(cred.user,{displayName:name});
        await setDoc(doc(db,"users",cred.user.uid),{
          uid:cred.user.uid,
          name:name || email.split("@")[0],
          email:cred.user.email,
          role:"customer",
          createdAt:serverTimestamp(),
          updatedAt:serverTimestamp()
        },{merge:true});
        return cred.user;
      },
      async login(email,password){
        const cred = await signInWithEmailAndPassword(auth,email,password);
        return cred.user;
      },
      async logout(){ return signOut(auth); },
      async resetPassword(email){ return sendPasswordResetEmail(auth,email); },
      async currentUser(){
        await authReady;
        return auth.currentUser || null;
      },
      async getCurrentUserProfile(){
        const user = await api.currentUser();
        if(!user) return null;
        const snap = await getDoc(doc(db,"users",user.uid));
        return snap.exists()?{id:snap.id,...snap.data()}:{uid:user.uid,email:user.email,name:user.displayName||user.email?.split("@")[0]||"",role:"customer"};
      },
      async getAdminRecord(){
        const user = await api.currentUser();
        if(!user) return null;
        const snap = await getDoc(doc(db,"admins",user.uid));
        return snap.exists()?{id:snap.id,...snap.data()}:null;
      },
      async getRole(){
        const user = await api.currentUser();
        if(!user) return null;
        const adminRecord = await api.getAdminRecord();
        if(adminRecord?.role) return String(adminRecord.role).toLowerCase();
        const profile = await api.getCurrentUserProfile();
        return profile?.role || "customer";
      },
      async isAdmin(){
        const role = await api.getRole();
        return role === "admin" || role === "manager";
      },
      async isStaff(){
        const role = await api.getRole();
        return ["admin","manager","employee"].includes(role);
      },
      async createOrder(order){
        const user = await api.currentUser();
        if(!user) throw new Error("يجب تسجيل الدخول قبل إتمام الطلب");
        const orderRef = doc(collection(db,"orders"));
        const now = serverTimestamp();
        const payload = {...order,customerId:user.uid,createdAt:now,updatedAt:now};
        await setDoc(orderRef,{...payload,id:orderRef.id});
        try {
          await setDoc(doc(db,"transactions",orderRef.id),{
            type:"sale",orderId:orderRef.id,amount:Number(order.total||0),currency:"EGP",
            status:"pending",createdAt:now,createdBy:user.uid
          });
        } catch (e) { console.warn("Transaction record skipped",e); }
        return orderRef.id;
      },
      async listOrders(max=200){
        const snap = await getDocs(query(collection(db,"orders"),orderBy("createdAt","desc"),limit(max)));
        return snap.docs.map(d=>({id:d.id,...d.data()}));
      },
      async listExpenses(max=500){
        const snap=await getDocs(query(collection(db,"expenses"),orderBy("date","desc"),limit(max)));
        return snap.docs.map(d=>({id:d.id,...d.data()}));
      },
      async addExpense(expense){
        const refDoc=await addDoc(collection(db,"expenses"),{...expense,amount:Number(expense.amount||0),currency:"EGP",createdAt:serverTimestamp()});
        return refDoc.id;
      },
      async addTransaction(tx){
        const refDoc=await addDoc(collection(db,"transactions"),{...tx,amount:Number(tx.amount||0),currency:"EGP",createdAt:serverTimestamp()});
        return refDoc.id;
      },
      async listTransactions(max=500){
        const snap=await getDocs(query(collection(db,"transactions"),orderBy("createdAt","desc"),limit(max)));
        return snap.docs.map(d=>({id:d.id,...d.data()}));
      },
      async listProducts(max=500){
        const snap=await getDocs(query(collection(db,"products"),limit(max)));
        return snap.docs.map(d=>({id:d.id,...d.data()}));
      },
      async saveProduct(product){
        const id=product.id || doc(collection(db,"products")).id;
        await setDoc(doc(db,"products",id),{...product,id,updatedAt:serverTimestamp()},{merge:true});
        return id;
      },
      async listOffers(max=100){
        const snap=await getDocs(query(collection(db,"offers"),orderBy("createdAt","desc"),limit(max)));
        return snap.docs.map(d=>({id:d.id,...d.data()}));
      },
      async saveOffer(offer){
        const id=offer.id || doc(collection(db,"offers")).id;
        await setDoc(doc(db,"offers",id),{...offer,id,updatedAt:serverTimestamp(),createdAt:offer.createdAt||serverTimestamp()},{merge:true});
        return id;
      },
      async deleteOffer(id){
        await deleteDoc(doc(db,"offers",id));
      },
      async uploadProductImage(file,productId){
        const user = await api.currentUser();
        if(!user) throw new Error("يجب تسجيل الدخول");
        if(!storage){
          const mod = await import("https://www.gstatic.com/firebasejs/12.19.0/firebase-storage.js");
          storage = mod.getStorage(app);
        }
        const {ref,uploadBytes,getDownloadURL}=await import("https://www.gstatic.com/firebasejs/12.19.0/firebase-storage.js");
        const r=ref(storage,`products/${productId}/${Date.now()}-${file.name}`);
        await uploadBytes(r,file,{contentType:file.type});
        return getDownloadURL(r);
      }
    };
    window.NivoraFirebase = api;
    window.NivoraFirebaseReady = Promise.resolve(api);
    window.NivoraAuthReady = authReady;
  } catch (error) {
    console.error("NIVORA Firebase initialization failed", error);
    const api = { enabled:false, error };
    window.NivoraFirebase = api;
    window.NivoraFirebaseReady = Promise.resolve(api);
    window.NivoraAuthReady = Promise.resolve(null);
  }
}
