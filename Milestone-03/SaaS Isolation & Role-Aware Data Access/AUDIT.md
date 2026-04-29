# Pre-Refactor Audit

## 1. Missing Tenant Isolation

- users table has no tenant_id
- consequence: query returns users from all companies

## 2. No Tenant Boundary in Relationships

- projects.owner_id references users.id only
- consequence: project can link to user from another tenant

## 3. Sensitive Data Exposure

- salary field visible in users table
- consequence: any API response leaks salary

## 4. No Role Restrictions

- role exists but not enforced anywhere

## 5. No Indexing

- queries will scan full table

## 6. Raw DB Responses

- API returns full user object including salary
