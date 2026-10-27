const { cert, initializeApp } = require("firebase-admin/app");

let app;
function getFirebaseAdmin(){
  if(app) return app;
  if(!process.env.FIREBASE_SERVICE_ACCOUNT_JSON) throw new Error("FIREBASE_SERVICE_ACCOUNT_JSON is not configured");
  const serviceAccount=JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
  app=initializeApp({credential:cert(serviceAccount)});
  return app;
}
module.exports={getFirebaseAdmin};
