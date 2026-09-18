# NIVORA  — Full Stack

Frontend: HTML/CSS/JavaScript.
Backend: Node.js + Express.
الصور: روابط URL خارجية فقط، ولا توجد صور محلية.

التشغيل:
1. Node.js 18+
2. npm install
3. npm start
4. افتح http://localhost:3000

API:
GET /api/health
GET /api/products
GET /api/products/:id
GET /api/categories
POST /api/orders
GET /api/orders

مهم:
- غيّر روابط الصور من assets/js/image-links.js و/أو data/products.json.
- الطلبات التجريبية تحفظ في data/orders.json.
- قبل الإنتاج يجب حماية لوحة الإدارة وإضافة مصادقة حقيقية، وربط الحسابات بـ Firebase/Auth أو قاعدة بيانات.
