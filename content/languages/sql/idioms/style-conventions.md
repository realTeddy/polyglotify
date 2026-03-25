---
title: "Style Conventions"
language: "sql"
feature: "style-conventions"
category: "idioms"
applicable: true
---

SQL style varies by team but the widely used **SQL Style Guide** (sqlstyle.guide) and Mazur's guide advocate: uppercase reserved words (`SELECT`, `FROM`, `WHERE`), lowercase identifiers, `snake_case` for table and column names, trailing commas in column lists, CTE names as descriptive `snake_case` nouns, and explicit column lists instead of `SELECT *`. Consistent formatting aids readability in code review and audit logs.

## Example

```sql
-- Preferred style (sqlstyle.guide conventions)

-- Column list with trailing commas (easy to add/remove lines)
SELECT
    u.id
  , u.email
  , u.name
  , u.created_at
  , COUNT(o.id)  AS order_count
  , SUM(o.total) AS lifetime_value
FROM       users   AS u
LEFT JOIN  orders  AS o ON o.user_id = u.id
WHERE      u.active    = true
  AND      u.created_at > NOW() - INTERVAL '1 year'
GROUP BY
    u.id
  , u.email
  , u.name
  , u.created_at
ORDER BY lifetime_value DESC
LIMIT 25;

-- CTE naming: descriptive snake_case nouns
WITH
recent_active_users AS (
    SELECT id, name FROM users
    WHERE active = true
      AND last_login > NOW() - INTERVAL '30 days'
),
top_spenders AS (
    SELECT user_id, SUM(amount) AS total
    FROM orders
    GROUP BY user_id
    HAVING SUM(amount) > 1000
)
SELECT r.name, t.total
FROM recent_active_users r
JOIN top_spenders        t ON t.user_id = r.id;

-- Table names: plural snake_case
-- Column names: singular snake_case, no type suffixes
-- Primary key: always 'id'
-- Foreign keys: '<table_singular>_id'
```

## Gotchas

- `SELECT *` in application queries is fragile; adding a column to the table changes the result set shape, which can break deserialization in statically typed languages.
- Implicit joins (`FROM a, b WHERE a.id = b.a_id`) are legacy syntax; always use explicit `JOIN ... ON ...` for clarity and correctness.
- Quoted identifiers (`"MyTable"`) are case-sensitive and preserve case; unquoted identifiers are case-folded to lowercase in PostgreSQL. Avoid quoted identifiers to prevent mandatory quoting everywhere.
