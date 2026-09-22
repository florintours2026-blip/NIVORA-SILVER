# NIVORA SILVER — Backend

Backend foundation for the NIVORA SILVER e-commerce project.

## Included
- Express REST API
- PostgreSQL schema
- JWT authentication
- Products, categories, orders, customers, inventory, offers
- Admin dashboard endpoints
- Accounting/reporting foundations
- Product URL import abstraction
- Email notification service
- Validation and security middleware

## Run
1. Copy `.env.example` to `.env`
2. Create PostgreSQL database
3. `npm install`
4. `npm run db:migrate`
5. `npm run db:seed`
6. `npm run dev`

The import layer is intentionally adapter-based. It does not bypass CAPTCHA, authentication, robots controls, rate limits, or other access restrictions. Production imports should use permitted/official access methods and comply with each marketplace's terms.
