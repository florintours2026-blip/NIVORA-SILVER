const { getFirebaseAdmin } = require("../config/firebaseAdmin");
const { getFirestore } = require("firebase-admin/firestore");

async function requireFirebaseAdmin(req,res,next){
  const header=req.headers.authorization||"";
  const token=header.startsWith("Bearer ")?header.slice(7):null;
  if(!token)return res.status(401).json({error:"Authentication required"});
  try{
    const app=getFirebaseAdmin();
    const decoded=await app.auth().verifyIdToken(token);
    const snap=await getFirestore(app).collection("admins").doc(decoded.uid).get();
    const role=snap.exists?snap.data()?.role:null;
    if(!["admin","manager"].includes(String(role).toLowerCase()))return res.status(403).json({error:"Admin access required"});
    req.firebaseUser=decoded;req.adminRole=String(role).toLowerCase();next();
  }catch(e){
    console.error("Firebase admin auth:",e.message);
    return res.status(401).json({error:"Invalid Firebase administrator session"});
  }
}
module.exports={requireFirebaseAdmin};
