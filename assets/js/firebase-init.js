import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { getFirestore, collection, doc, getDoc, getDocs, addDoc, setDoc, updateDoc, deleteDoc, query, orderBy, limit, where, serverTimestamp, runTransaction } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-storage.js";

const config = window.NIVORA_FIREBASE_CONFIG || {};
const configured = config.apiKey && !String(config.apiKey).startsWith("YOUR_");

if (!configured) {
  window.NivoraFirebase = { enabled:false };
  window.NivoraFirebaseReady = Promise.resolve(window.NivoraFirebase);
} else {
  const app = initializeApp(config);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);

  const api = {
    enabled: true, app, auth, db, storage,
    onAuthStateChanged,
    async register(name,email,password){
      const cred = await createUserWithEmailAndPassword(auth,email,password);
      if(name) await updateProfile(cred.user,{displayName:name});
      await setDoc(doc(db,"users",cred.user.uid),{
        uid:cred.user.uid,name:name || email.split("@")[0],email:cred.user.email,
        role:"customer",createdAt:serverTimestamp(),updatedAt:serverTimestamp()
      },{merge:true});
      return cred.user;
    },
    async login(email,password){ return (await signInWithEmailAndPassword(auth,email,password)).user; },
    async logout(){ return signOut(auth); },
    async resetPassword(email){ return sendPasswordResetEmail(auth,email); },
    async getCurrentUserProfile(){
      if(!auth.currentUser) return null;
      const snap = await getDoc(doc(db,"users",auth.currentUser.uid));
      return snap.exists()?{id:snap.id,...snap.data()}:null;
    },
    async getAdminRecord(){
      if(!auth.currentUser) return null;
      const snap = await getDoc(doc(db,"admins",auth.currentUser.uid));
      return snap.exists()?{id:snap.id,...snap.data()}:null;
    },
    async isAdmin(){
      if(!auth.currentUser) return false;
      // NIVORA uses Firestore /admins/{Firebase Auth UID}. No custom claims required.
      const snap = await getDoc(doc(db,"admins",auth.currentUser.uid));
      if(!snap.exists()) return false;
      const role = String(snap.data()?.role || "").toLowerCase().trim();
      return role === "admin" || role === "manager";
    },
    async createOrder(order){
      if(!auth.currentUser) throw new Error("يجب تسجيل الدخول قبل إتمام الطلب");
      const orderRef = doc(collection(db,"orders"));
      const now = serverTimestamp();
      const payload = {...order,customerId:auth.currentUser.uid,createdAt:now,updatedAt:now};
      await setDoc(orderRef,{...payload,id:orderRef.id});
      await setDoc(doc(db,"transactions",orderRef.id),{
        type:"sale",orderId:orderRef.id,amount:Number(order.total||0),currency:"EGP",
        status:"pending",createdAt:now,createdBy:auth.currentUser.uid
      });
      return orderRef.id;
    },
    async listOrders(max=200){
      const q = query(collection(db,"orders"),orderBy("createdAt","desc"),limit(max));
      const snap = await getDocs(q); return snap.docs.map(d=>({id:d.id,...d.data()}));
    },
    async listExpenses(max=500){
      const q=query(collection(db,"expenses"),orderBy("date","desc"),limit(max));
      const snap=await getDocs(q); return snap.docs.map(d=>({id:d.id,...d.data()}));
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
      const q=query(collection(db,"transactions"),orderBy("createdAt","desc"),limit(max));
      const snap=await getDocs(q); return snap.docs.map(d=>({id:d.id,...d.data()}));
    },
    async listProducts(max=500){
      const snap=await getDocs(query(collection(db,"products"),limit(max)));
      return snap.docs.map(d=>({id:d.id,...d.data()}));
    },
    async saveProduct(product){
      const id=product.id || doc(collection(db,"products")).id;
      await setDoc(doc(db,"products",id),{...product,id,updatedAt:serverTimestamp()},{merge:true}); return id;
    },
    async uploadProductImage(file,productId){
      if(!auth.currentUser) throw new Error("يجب تسجيل الدخول");
      const r=ref(storage,`products/${productId}/${Date.now()}-${file.name}`);
      await uploadBytes(r,file,{contentType:file.type}); return getDownloadURL(r);
    },
    async callBootstrapAdmin(){
      const idToken=await auth.currentUser.getIdToken();
      const base=(window.NIVORA_CONFIG?.functionsBaseUrl||"").replace(/\/$/,"");
      if(!base) throw new Error("ضع functionsBaseUrl بعد نشر Cloud Functions");
      const res=await fetch(`${base}/bootstrapAdmin`,{method:"POST",headers:{Authorization:`Bearer ${idToken}`}});
      if(!res.ok) throw new Error(await res.text()); return res.json();
    }
  };
  window.NivoraFirebase = api;
  window.NivoraFirebaseReady = new Promise(resolve=>onAuthStateChanged(auth,()=>resolve(api)));
}
