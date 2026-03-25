---
title: "Return Values"
language: "sql"
feature: "return-values"
category: "functions"
applicable: true
---

SQL functions return values with `RETURN` (scalar) or `RETURNS TABLE` / `SETOF` (row sets). The `RETURN QUERY` syntax in PL/pgSQL streams a query's results as the function's output. Stored procedures (as opposed to functions) use `OUT` parameters or result sets (T-SQL) rather than `RETURN`. `RETURN NEXT` builds a result set row by row inside a loop.

## Example

```sql
-- Scalar return
CREATE OR REPLACE FUNCTION full_name(p_first TEXT, p_last TEXT)
RETURNS TEXT LANGUAGE SQL IMMUTABLE AS $$
    SELECT p_first || ' ' || p_last;
$$;

SELECT full_name('Ada', 'Lovelace');   -- Ada Lovelace

-- RETURNS TABLE with RETURN QUERY
CREATE OR REPLACE FUNCTION search_users(p_query TEXT)
RETURNS TABLE(id INT, name TEXT, email TEXT)
LANGUAGE plpgsql STABLE AS $$
BEGIN
    RETURN QUERY
        SELECT u.id, u.name, u.email
        FROM users u
        WHERE u.name ILIKE '%' || p_query || '%'
           OR u.email ILIKE '%' || p_query || '%';
END;
$$;

SELECT * FROM search_users('alice');

-- RETURN NEXT — build result set row by row
CREATE OR REPLACE FUNCTION generate_series_squared(p_n INT)
RETURNS SETOF INT LANGUAGE plpgsql AS $$
DECLARE v INT;
BEGIN
    FOR v IN 1..p_n LOOP
        RETURN NEXT v * v;
    END LOOP;
END;
$$;

SELECT * FROM generate_series_squared(5);  -- 1, 4, 9, 16, 25
```

## Gotchas

- A function declared `RETURNS TABLE` or `SETOF` must be used in a `FROM` clause like a table, not in `SELECT` like a scalar function.
- `RETURN QUERY` in PL/pgSQL buffers the entire query result before returning; for very large result sets, a streaming approach with `RETURN NEXT` inside a cursor loop may be more memory-efficient.
- In T-SQL, scalar UDFs must have a `RETURN` statement on every code path; missing return paths cause a compile error.
