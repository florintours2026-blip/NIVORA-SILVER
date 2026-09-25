# رفع NIVORA من الهاتف

## GitHub Pages / static storefront

- فك ضغط الملف على الهاتف.
- افتح GitHub في المتصفح.
- افتح مستودع NIVORA.
- Upload files.
- حدّد محتويات مجلد المشروع بعد فك الضغط، وليس ملف ZIP نفسه.
- Commit changes.

## Backend importer

GitHub Pages لا يشغّل Node.js. يجب نشر مجلد `src` + `package.json` على Render أو خدمة Node.js.

بعد النشر، انسخ عنوان الـ Backend وضعه في:

`assets/js/config.js`

مثال:

`apiBaseUrl: "https://YOUR-API.onrender.com/api"`

ثم ضع في Render:

- `FIREBASE_WEB_API_KEY`
- `IMPORT_ADMIN_EMAILS`
- `CORS_ORIGIN`

## Firebase

انشر:

- `firestore.rules`
- `storage.rules`

ثم أنشئ حساب المدير في Firebase Authentication وأنشئ مستند:

`admins/UID`

بقيمة:

```json
{
  "role": "admin"
}
```

لا تضع Service Account داخل المشروع أو الهاتف أو GitHub.
