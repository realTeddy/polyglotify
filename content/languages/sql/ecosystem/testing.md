---
title: "Testing"
language: "sql"
feature: "testing"
category: "ecosystem"
applicable: true
---

SQL testing uses **pgTAP** (PostgreSQL), **tSQLt** (SQL Server), or **utPLSQL** (Oracle) for in-database unit testing. These frameworks define test functions that use assertion procedures to validate query results, schema structure, and stored procedure behaviour. Integration testing often uses a real test database populated with seed data and reset between test runs with transactions or truncation.

## Example

```sql
-- pgTAP (PostgreSQL)
-- Install: CREATE EXTENSION pgtap;

BEGIN;
SELECT plan(5);   -- declare number of tests

-- Test: table exists
SELECT has_table('public', 'users', 'users table should exist');

-- Test: column exists with correct type
SELECT has_column('public', 'users', 'email', 'email column exists');
SELECT col_type_is('public', 'users', 'email', 'text', 'email is text');

-- Test: function exists and returns correct value
SELECT function_returns('public', 'slugify', ARRAY['text'], 'text');

-- Test: data integrity
INSERT INTO users (email, name) VALUES ('test@example.com', 'Test User');
SELECT is(
    (SELECT name FROM users WHERE email = 'test@example.com'),
    'Test User',
    'inserted user should be retrievable'
);

SELECT * FROM finish();
ROLLBACK;   -- rollback test data
```

```bash
# Run pgTAP tests
pg_prove -d myapp tests/**.sql

# Or with psql
psql -d myapp -f tests/test_users.sql
```

```sql
-- Schema testing: verify constraints work
DO $$
BEGIN
    BEGIN
        INSERT INTO users (email, name, role)
        VALUES ('bad@example.com', 'Bad User', 'superadmin');
        RAISE EXCEPTION 'Expected constraint violation but none raised';
    EXCEPTION WHEN check_violation THEN
        RAISE NOTICE 'PASS: invalid role rejected correctly';
    END;
END;
$$;
```

## Gotchas

- pgTAP tests should always run inside a transaction that is rolled back; this ensures test data does not pollute the database between runs.
- `SELECT plan(n)` must match the exact number of `ok()`, `is()`, `has_*()` calls; a mismatch causes the test runner to report an error even if all individual tests pass.
- Schema tests (testing that tables/columns/constraints exist) are valuable in CI to catch accidental migration rollbacks or missing deployments.
