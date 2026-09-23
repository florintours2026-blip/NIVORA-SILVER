# إصلاح تسجيل الدخول والصلاحيات في NIVORA

هذه النسخة مبنية مباشرة من المشروع الأصلي المرفوع.

- صلاحيات الإدارة تقرأ من `admins/{Firebase UID}` مع الحقل `role`.
- UID الحالي الذي ذكره صاحب المشروع: `3AIDO0nqgDMT99yTXsRWMOFHHYD3`.
- لا تعتمد القواعد على Custom Claims أو Cloud Functions.
- `index.html` يعرض شاشة NIVORA ثم بوابة دخول: العملاء / الموظفون / الإدارة.
- التسجيل ينشئ `users/{UID}` بدور `customer`.
- تم إيقاف تحميل المنتجات من Firestore قبل عرض الصفحة لتقليل البطء.

بعد رفع الملفات، انشر `firestore.rules` من Firebase Console.
لا تغيّر مستند `admins/{UID}` الحالي.
