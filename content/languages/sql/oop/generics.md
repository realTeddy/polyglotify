---
title: "Generics"
language: "sql"
feature: "generics"
category: "oop"
applicable: false
---

SQL has no generics or type parameters. SQL functions are typed: their parameter and return types are fixed at creation time. PostgreSQL has `ANYELEMENT` and `ANYARRAY` pseudo-types for polymorphic functions that work on multiple types, which is the closest SQL concept to generics. These are used internally for built-in functions like `array_agg`, `min`, and `max`.

## Example

```sql
-- PostgreSQL polymorphic functions with ANYELEMENT
-- (the closest concept to generics in SQL)

-- Returns the same type as its input
CREATE OR REPLACE FUNCTION coalesce_default(
    p_value   ANYELEMENT,
    p_default ANYELEMENT
)
RETURNS ANYELEMENT LANGUAGE SQL IMMUTABLE AS $$
    SELECT COALESCE(p_value, p_default);
$$;

SELECT coalesce_default(NULL::INT,  0);        -- 0
SELECT coalesce_default(NULL::TEXT, 'N/A');    -- N/A
SELECT coalesce_default(42::INT,    0);        -- 42

-- ANYARRAY polymorphic function
CREATE OR REPLACE FUNCTION first_element(p_arr ANYARRAY)
RETURNS ANYELEMENT LANGUAGE SQL IMMUTABLE AS $$
    SELECT p_arr[1];
$$;

SELECT first_element(ARRAY[10, 20, 30]);       -- 10
SELECT first_element(ARRAY['a', 'b', 'c']);    -- a

-- Template tables (not generics, but useful pattern)
-- In practice, database-level generics are handled at the ORM layer
-- (e.g., a generic Repository<T> in application code)
```

## Gotchas

- `ANYELEMENT` pseudo-types can only be used in function signatures, not as column types or in table definitions.
- All `ANYELEMENT` parameters in a single function signature must resolve to the same type at call time; you cannot have `(ANYELEMENT, TEXT)` where the first can be anything and the second is always text.
- For truly generic data containers in SQL, the common pattern is a `JSONB` column (schema-less) or a polymorphic association pattern using a type discriminator column.
