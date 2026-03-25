---
title: "Operators"
language: "sql"
feature: "operators"
category: "basics"
applicable: true
---

SQL operators cover arithmetic (`+`, `-`, `*`, `/`, `%`), comparison (`=`, `<>`, `<`, `>`, `<=`, `>=`), logical (`AND`, `OR`, `NOT`), and set membership (`IN`, `NOT IN`, `BETWEEN`, `LIKE`, `ILIKE`). The `IS NULL` / `IS NOT NULL` operators handle NULL comparisons (since `NULL = NULL` is NULL, not TRUE). String concatenation uses `||` in standard SQL and `+` in T-SQL.

## Example

```sql
-- Arithmetic
SELECT
    10 + 3,       -- 13
    10 - 3,       -- 7
    10 * 3,       -- 30
    10 / 3,       -- 3  (integer division in most dialects)
    10.0 / 3,     -- 3.333...
    10 % 3;       -- 1

-- Comparison and logical
SELECT name, age
FROM users
WHERE age >= 18
  AND age <= 65
  AND (role = 'admin' OR role = 'editor')
  AND name IS NOT NULL;

-- IN, BETWEEN, LIKE
SELECT * FROM products
WHERE category IN ('electronics', 'books')
  AND price BETWEEN 10.00 AND 50.00
  AND sku LIKE 'ELEC%';   -- starts with ELEC

-- ILIKE (case-insensitive LIKE — PostgreSQL)
SELECT * FROM users WHERE email ILIKE '%@example.com';

-- NULL arithmetic — NULL propagates
SELECT NULL + 1,      -- NULL
       NULL = NULL,   -- NULL (not TRUE!)
       NULL IS NULL;  -- TRUE

-- String concatenation
SELECT first_name || ' ' || last_name AS full_name FROM users;   -- standard
-- SELECT first_name + ' ' + last_name FROM users;               -- T-SQL
```

## Gotchas

- `NULL = NULL` evaluates to NULL (unknown), not TRUE. Always use `IS NULL` or `IS NOT NULL` for null checks.
- Integer division silently truncates in most SQL dialects; cast at least one operand to `NUMERIC` or `FLOAT` to get decimal results.
- `LIKE` is case-sensitive in PostgreSQL (use `ILIKE` for case-insensitive), but case-insensitive in MySQL and SQL Server by default depending on the collation.
