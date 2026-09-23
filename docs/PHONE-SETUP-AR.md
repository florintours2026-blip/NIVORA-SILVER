# تشغيل NIVORA SILVER من الهاتف فقط

هذا التحديث مخصص للعمل من الهاتف، ولا يحتاج إلى VS Code في مرحلة إعداد Firebase الأساسية.

## 1) استبدال الملفات
انسخ الملفات الموجودة داخل هذا التحديث إلى مشروع NIVORA واستبدل الملفات التي تحمل نفس المسار والاسم. لا تحذف أي ملف آخر من المشروع.

الملفات في هذا التحديث فقط:
- `assets/js/firebase-config.js` — إعداد Firebase الخاص بمشروع NIVORA.
- `assets/js/firebase-init.js` — ربط Authentication وFirestore.
- `assets/js/site.js` — دخول لوحة الإدارة والمحاسبة.
- `firestore.rules` — صلاحيات Firestore.

## 2) Firebase Console من الهاتف
تأكد من أن Authentication > Sign-in method يحتوي على Email/Password، وأن Firestore Database موجود.

## 3) نشر Firestore Rules
من Firebase Console افتح Firestore Database > Rules، استبدل القواعد بمحتوى `firestore.rules` الموجود في هذا التحديث، ثم اضغط Publish.

## 4) حساب الإدارة
استخدم حساب الإدارة الذي أنشأته في Firebase Authentication. في هذا الإصدار، البريد المحدد داخل صلاحيات المشروع هو حساب الإدارة، لذلك لا تحتاج إلى Cloud Functions أو جهاز كمبيوتر لتفعيل Custom Claims.

## 5) ملاحظة أمنية
هذا الحل مناسب لتشغيل المشروع من الهاتف، لكنه يعتمد على حساب إدارة واحد محدد بالبريد الإلكتروني بدل Custom Claims. لاحقًا، عند توفر بيئة تطوير، يمكن نقل الصلاحية إلى Custom Claims بدون تغيير بيانات المنتجات والطلبات.

## 6) الصور
Firebase Storage غير مطلوب لتشغيل المتجر والطلبات والمحاسبة الأساسية. رفع صور المنتجات إلى Firebase Storage يبقى مرحلة مستقلة.
