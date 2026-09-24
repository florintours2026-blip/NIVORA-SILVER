NIVORA - Admin login fix (Firestore admins collection)

Replace ONLY these files:
- assets/js/firebase-init.js
- assets/js/site.js
- firestore.rules
- admin-login.html
- admin.html

The admin account is read from:
admins/{Firebase Auth UID}
with role: admin or manager.

For the account UID supplied by the owner:
admins/3AIDO0nqgDMT99yTXsRWMOFHHYD3
role: admin

After replacing the files, publish/deploy the site and publish the Firestore rules.
No Cloud Functions, custom claims, or paid Firebase plan are required.
