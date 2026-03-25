---
title: "Sets"
language: "sql"
feature: "sets"
category: "data-structures"
applicable: true
---

SQL is fundamentally set-based — tables are treated as sets of rows. The set operators `UNION`, `INTERSECT`, and `EXCEPT` (`MINUS` in Oracle) operate on query result sets. `UNION` removes duplicates by default; `UNION ALL` keeps them. `DISTINCT` eliminates duplicate rows from a query result. These set operations are native to SQL and highly optimised.

## Example

```sql
-- Set operators on queries
-- UNION — rows in either result (deduplicates)
SELECT email FROM newsletter_subscribers
UNION
SELECT email FROM premium_users;

-- UNION ALL — all rows including duplicates (faster)
SELECT product_id FROM orders_2023
UNION ALL
SELECT product_id FROM orders_2024;

-- INTERSECT — rows in both results
SELECT user_id FROM newsletter_subscribers
INTERSECT
SELECT user_id FROM premium_users;   -- subscribed AND premium

-- EXCEPT — rows in first but not second
SELECT user_id FROM all_users
EXCEPT
SELECT user_id FROM banned_users;    -- active (non-banned) users

-- DISTINCT to deduplicate within a single query
SELECT DISTINCT category FROM products ORDER BY category;

-- IN as a set membership test
SELECT name FROM users
WHERE id IN (SELECT user_id FROM admins);

-- NOT IN / NOT EXISTS
SELECT name FROM users
WHERE id NOT IN (SELECT user_id FROM suspended_users);
```

## Gotchas

- `UNION` sorts and deduplicates (expensive); use `UNION ALL` when you know results are already distinct or duplicates are acceptable — it is significantly faster.
- `NOT IN` with a subquery that can return `NULL` values always produces an empty result (due to NULL comparison semantics); use `NOT EXISTS` instead for safety.
- `EXCEPT` and `INTERSECT` have lower precedence than `UNION` in standard SQL; use parentheses to make evaluation order explicit in compound set operations.
