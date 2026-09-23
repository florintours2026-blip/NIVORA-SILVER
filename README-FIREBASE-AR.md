# إعداد Firebase لموقع NIVORA SILVER

تم تجهيز المشروع ليستخدم Firebase بدل التخزين المحلي في الحسابات والطلبات والمحاسبة.

## 1) إنشاء مشروع Firebase
1. افتح Firebase Console.
2. أنشئ Project جديداً.
3. أضف Web App للمشروع.
4. انسخ `firebaseConfig` إلى `assets/js/firebase-config.js`.
5. فعّل Authentication > Sign-in method > Email/Password.
6. أنشئ Cloud Firestore.
7. فعّل Cloud Storage.

## 2) إعداد العملة
العملة الأساسية للمشروع أصبحت:
- `EGP`
- `ar-EG`
- العرض بالجنيه المصري `ج.م` حسب تنسيق المتجر.

## 3) أول حساب إدارة
أنشئ حساباً عادياً من الموقع بالبريد الذي تريد جعله حساب الإدارة.

ثم في مجلد `functions` أنشئ ملف `.env` من `.env.example`:

```env
BOOTSTRAP_ADMIN_EMAIL=your-admin-email@example.com
```

بعد النشر، استخدم endpoint `bootstrapAdmin` مرة واحدة لهذا الحساب. بعد تعيين الـcustom claim، سجّل الخروج ثم الدخول مرة أخرى.

## 4) Firebase CLI
ثبّت Firebase CLI ثم نفّذ:

```bash
firebase login
firebase use --add
cd functions
npm install
cd ..
firebase deploy --only firestore:rules,storage,functions,hosting
```

إذا كنت تستخدم مشروعاً واحداً فقط، عدّل `.firebaserc` ليحتوي على Project ID الحقيقي.

## 5) إعداد Functions URL
بعد النشر، ضع رابط Cloud Function في `assets/js/config.js`:

```js
window.NIVORA_CONFIG = {
  apiBaseUrl: "",
  currency: "EGP",
  locale: "ar-EG",
  enableDemoMode: false,
  functionsBaseUrl: "https://YOUR_REGION-YOUR_PROJECT_ID.cloudfunctions.net"
};
```

## 6) بنية البيانات
يستخدم النظام المجموعات التالية:

- `users` — العملاء والأدوار.
- `products` — المنتجات والأسعار والمخزون.
- `orders` — الطلبات.
- `transactions` — المبيعات والرسوم والمرتجعات والقيود.
- `expenses` — المصروفات التشغيلية.
- `refunds` — المرتجعات.
- `settings` — إعدادات المتجر.

## 7) المحاسبة
صفحة `admin-accounting.html` أصبحت مخصصة للمحاسبة وتقرأ البيانات من Firestore، وتعرض:

- إجمالي المبيعات.
- صافي المبيعات بعد المرتجعات.
- المصروفات.
- الرسوم والعمولات.
- صافي الربح التشغيلي.
- إضافة مصروفات وتصنيفاتها.
- إضافة رسوم/عمولات يدوية.
- سجل المصروفات.

> ملاحظة: هذا نظام محاسبة تشغيلي للمتجر، وليس بديلاً تلقائياً عن نظام محاسبة قانوني/ضريبي مصري. يمكن توسيعه لاحقاً إلى دليل حسابات، قيود مزدوجة، VAT، تكلفة المخزون، الأرباح والخسائر، التدفق النقدي، والتقارير الشهرية.

## الأمان
صلاحيات الإدارة لا تعتمد على localStorage وحده. يتم استخدام Firebase Authentication + Custom Claims + Firestore/Storage Security Rules. لذلك يجب عدم وضع Firebase Admin SDK credentials أو service account keys داخل ملفات الموقع.
