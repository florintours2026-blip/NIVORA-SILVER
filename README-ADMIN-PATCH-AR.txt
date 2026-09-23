NIVORA — إصلاح صلاحيات الإدارة وفق قاعدة البيانات الحالية

الملفات المعدلة فقط:
1) assets/js/firebase-init.js
2) assets/js/site.js
3) firestore.rules

قاعدة الإدارة الحالية:
admins/{Firebase Auth UID}
    role: admin

حسابك الذي أرسلته:
3AIDO0nqgDMT99yTXsRWMOFHHYD3

يجب أن يكون:
admins/3AIDO0nqgDMT99yTXsRWMOFHHYD3
    role = admin

يمكن أيضاً استخدام role = manager.

لا يستخدم هذا الإصلاح Custom Claims أو Cloud Functions أو أي خدمة مدفوعة.

بعد رفع firestore.rules من Firebase Console/CLI، استبدل الملفين JS فقط في مشروعك.
لا تستبدل بقية ملفات الموقع.
