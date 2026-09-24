NIVORA — مركز استيراد المنتجات والشراء بالطلب

هذا الإصدار يحتوي فقط على الملفات الخاصة بهذه الميزة.

الفكرة:
1) العميل يرسل رابط المنتج/طلب شراء.
2) يظهر الطلب في لوحة الإدارة تحت «طلبات العملاء للشراء بالطلب».
3) المدير يلصق رابط المنتج من Amazon أو Noon أو Alibaba أو AliExpress.
4) الخادم يحاول استخراج الاسم والوصف والسعر والصور والـSKU والبيانات المتاحة.
5) تظهر معاينة قبل النشر.
6) المدير يحدد سعر البيع والتكلفة/الهامش والمخزون ثم يحفظ المنتج في Firestore.
7) يمكن تحديث حالة طلب العميل: جاهز للشراء → تم الطلب → في الشحن → تم التسليم.

ملفات الواجهة:
admin/admin-import.html
admin/assets/css/admin-import.css
admin/assets/js/admin-import.js

ملفات الخادم:
backend/src/config/firebaseAdmin.js
backend/src/middleware/firebaseAdmin.js
backend/src/services/importService.js
backend/src/routes/imports.js

متطلبات الخادم:
- Node.js حديث يدعم fetch.
- firebase-admin داخل package.json.
- FIREBASE_SERVICE_ACCOUNT_JSON في متغيرات البيئة.
- تشغيل backend وربط NIVORA_CONFIG.apiBaseUrl بعنوان الـAPI.

ملاحظة مهمة:
الاستيراد المباشر من صفحات المتاجر ليس مضمونًا لكل منتج؛ بعض الصفحات تحجب الطلبات الآلية أو لا تعرض بياناتها كاملة. الكود يستخدم البيانات العامة التي تسمح بها الصفحة ولا يحاول تجاوز CAPTCHA أو أنظمة الحماية. للمزامنة التجارية الكاملة يفضّل ربط API/Feed رسمي أو مصرح به للمصدر. Amazon يوفّر Product Advertising API للمؤهلين، وNoon يوفّر برنامج Affiliate ومكتبة وسائط/كتالوج للمسوقين.

صور المنتجات في هذا الإصدار تُحفظ كرابط مصدر داخل المنتج. إذا أردت نسخ الصور إلى Firebase Storage، يجب تنفيذ ذلك في خطوة مستقلة مع مراعاة حقوق استخدام الصور وشروط المصدر.
