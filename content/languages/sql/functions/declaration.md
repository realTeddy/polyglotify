---
title: "Function Declaration"
language: "sql"
feature: "declaration"
category: "functions"
applicable: true
---

SQL supports user-defined functions (UDFs) via `CREATE FUNCTION`. Standard SQL scalar functions return a single value. PostgreSQL additionally supports set-returning functions, table functions, and functions in multiple languages (PL/pgSQL, PL/Python, PL/JavaScript). SQL Server supports scalar UDFs, inline table-valued functions, and multi-statement table-valued functions. Functions are deterministic or non-deterministic, which affects query planning and caching.

## Example

```sql
-- PostgreSQL scalar function
CREATE OR REPLACE FUNCTION slugify(p_text TEXT)
RETURNS TEXT
LANGUAGE SQL
IMMUTABLE STRICT AS $$
    SELECT LOWER(REGEXP_REPLACE(TRIM(p_text), '[^a-zA-Z0-9]+', '-', 'g'))
$$;

SELECT slugify('Hello World!');   -- hello-world-

-- PL/pgSQL function with logic
CREATE OR REPLACE FUNCTION age_group(p_age INT)
RETURNS TEXT
LANGUAGE plpgsql
IMMUTABLE AS $$
BEGIN
    RETURN CASE
        WHEN p_age < 18  THEN 'minor'
        WHEN p_age < 65  THEN 'adult'
        ELSE 'senior'
    END;
END;
$$;

-- Table-returning function (PostgreSQL)
CREATE OR REPLACE FUNCTION active_users_by_role(p_role TEXT)
RETURNS TABLE(id INT, name TEXT, email TEXT)
LANGUAGE SQL STABLE AS $$
    SELECT id, name, email
    FROM users
    WHERE role = p_role AND active = true;
$$;

SELECT * FROM active_users_by_role('admin');
```

## Gotchas

- `IMMUTABLE` functions are assumed to return the same result for the same inputs and can be inlined or cached by the query planner; using it incorrectly (e.g., on a function that reads a table) causes stale results.
- SQL scalar UDFs in SQL Server are notoriously slow because they are called once per row and prevent parallelism; prefer inline table-valued functions for performance-critical queries.
- `CREATE OR REPLACE FUNCTION` in PostgreSQL replaces the body but not the signature; to change parameter types or the return type, you must `DROP FUNCTION` first.
