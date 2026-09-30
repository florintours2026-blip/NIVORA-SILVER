const jwt = require("jsonwebtoken");
const env = require("../config/env");

async function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Authentication required" });

  try {
    req.user = jwt.verify(token, env.jwtSecret);
    return next();
  } catch {}

  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    try {
      const { getFirebaseAdmin } = require("../config/firebaseAdmin");
      const { getAuth } = require("firebase-admin/auth");
      const { getFirestore } = require("firebase-admin/firestore");
      const app = getFirebaseAdmin();
      const decoded = await getAuth(app).verifyIdToken(token);
      const snap = await getFirestore(app).collection("admins").doc(decoded.uid).get();
      const role = snap.exists ? String(snap.data()?.role || "customer").toLowerCase() : "customer";
      req.user = { sub: decoded.uid, email: decoded.email || "", role };
      return next();
    } catch (error) {
      console.warn("Firebase token verification failed:", error.message);
    }
  }

  return res.status(401).json({ error: "Invalid or expired token" });
}

function requireAdmin(req, res, next) {
  if (!req.user || !["admin", "manager"].includes(String(req.user.role).toLowerCase())) {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
}

module.exports = { requireAuth, requireAdmin };
