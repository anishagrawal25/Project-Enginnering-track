## Security Decisions

### 1. Tenant Isolation

All tables now include tenant_id
→ prevents cross-organisation access

### 2. Sensitive Fields

- salary
- card_last4
- billing_address

Only visible to admin users

### 3. Role-Based Access Control

- admin → full access
- manager → limited access
- user → self-only access

### 4. Query Protection

All queries must include:
WHERE tenant_id = ?

### 5. Cross-Tenant Risk

JOIN operations can leak data
Mitigation:

- enforce tenant_id match in queries

### 6. Indexing

Indexes added on tenant_id
→ improves performance and prevents full scans
