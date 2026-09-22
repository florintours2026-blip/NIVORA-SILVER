# تشغيل NIVORA من الهاتف فقط

## أبسط طريقة
1. أنشئ حساب GitHub من الهاتف.
2. أنشئ مستودعًا جديدًا.
3. ارفع محتويات ZIP.
4. أنشئ مشروع Supabase من الهاتف.
5. شغّل `supabase/schema.sql` في SQL Editor.
6. ضع قيم Supabase في `config/config.js`.
7. فعّل GitHub Pages أو أي Static Host.
8. افتح `/admin.html` من متصفح الهاتف.

## قبل الإطلاق
لا تضع كلمات مرور أو service-role keys داخل GitHub. استخدم فقط publishable/anon key في المتصفح مع RLS صحيح.

## الاستيراد
الصق رابط المنتج داخل لوحة الإدارة. إذا لم يكن المصدر موصولًا بAdapter رسمي/مسموح، ستظهر المسودة ويُكمل المسؤول البيانات يدويًا. هذا مقصود حتى لا تعتمد NIVORA على scraping غير مستقر.
