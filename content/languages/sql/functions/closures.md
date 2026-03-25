---
title: "Closures & Lambdas"
language: "sql"
feature: "closures"
category: "functions"
applicable: false
---

SQL has no closures or lambda expressions. Functions are named, stored database objects — they cannot be anonymous, inline, or passed as arguments. The closest SQL constructs to lambdas are inline expressions used with `CASE`, derived tables (subqueries), and in PostgreSQL, anonymous `DO` blocks for one-off procedural logic. Window functions and aggregate functions can be thought of as built-in "higher-order" operations.

## Example

```sql
-- Inline expressions as closest SQL equivalent
-- (not closures, but anonymous inline logic)

-- Subquery as an inline "function"
SELECT
    u.name,
    (SELECT COUNT(*)
     FROM orders o
     WHERE o.user_id = u.id
       AND o.created_at > NOW() - INTERVAL '30 days') AS recent_orders
FROM users u;

-- CASE as inline conditional (the closest to a lambda)
SELECT
    name,
    CASE WHEN age < 18 THEN 'minor' ELSE 'adult' END AS category
FROM users;

-- PostgreSQL DO block — anonymous procedural code
DO $$
BEGIN
    -- One-off migration logic, no function needed
    UPDATE users SET role = 'viewer' WHERE role IS NULL;
    RAISE NOTICE 'Migration complete: % rows updated', ROW_COUNT();
END;
$$;

-- Lateral join: closest to applying a "function" per row
SELECT u.name, recent.order_count
FROM users u,
LATERAL (
    SELECT COUNT(*) AS order_count
    FROM orders o
    WHERE o.user_id = u.id
) recent;
```

## Gotchas

- Subqueries in `SELECT` (scalar subqueries) are evaluated once per row and can severely degrade performance on large tables; prefer JOINs or lateral joins.
- `DO` blocks (PostgreSQL) run immediately and cannot be parameterised; they are useful for one-off scripts but not for reusable logic.
- SQL's set-based nature means iterating row-by-row with loops is almost always the wrong approach; express logic as set operations for best performance.
