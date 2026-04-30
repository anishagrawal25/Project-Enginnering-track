## Pre-Refactor Audit

1. No tenant isolation

- None of the tables (users, projects, billing_details) have tenant_id
- A query like SELECT \* FROM users returns data across all companies
- Example: pouch.io and velocity.com users are mixed

2. Users from different companies share same table

- Alice (pouch) and Charlie (velocity) exist together
- No boundary separating organisations

3. No relationship between projects and users

- projects table has no owner_id
- No way to restrict project visibility per user or tenant

4. billing_details not tenant-safe

- billing_details references users(id)
- But users are not tenant-scoped → indirect cross-tenant leak possible

5. Sensitive fields exposed

- salary → financial data
- card_last4, billing_address → billing info
- No restrictions on access

6. No role enforcement

- role column exists but:
  - no CHECK constraint
  - no logic enforcing access

7. No indexes

- Queries will scan full table
- Not scalable

8. Email not unique per tenant

- Currently global ambiguity possible

9. Default role = 'employee'

- But assignment expects ('admin', 'manager', 'user')
