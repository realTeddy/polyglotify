---
title: "Common Patterns"
language: "sql"
feature: "common-patterns"
category: "idioms"
applicable: true
---

Essential SQL patterns include: CTEs (Common Table Expressions) for readable multi-step queries, window functions for ranking and running totals without grouping, `UPSERT` (`INSERT ... ON CONFLICT`) for idempotent writes, keyset pagination for efficient large-dataset traversal, and `JSONB` for semi-structured data. These patterns replace loops and procedural logic with set-based operations for better performance and clarity.

## Example

```sql
-- CTE for readable multi-step logic
WITH active_users AS (
    SELECT id, name, email FROM users WHERE active = true
),
user_totals AS (
    SELECT user_id, SUM(amount) AS total_spent
    FROM orders
    WHERE created_at > NOW() - INTERVAL '90 days'
    GROUP BY user_id
)
SELECT au.name, COALESCE(ut.total_spent, 0) AS spent_90d
FROM active_users au
LEFT JOIN user_totals ut ON ut.user_id = au.id
ORDER BY spent_90d DESC
LIMIT 10;

-- Window functions — running total + rank
SELECT
    name,
    amount,
    SUM(amount) OVER (ORDER BY created_at) AS running_total,
    RANK() OVER (PARTITION BY category ORDER BY amount DESC) AS rank_in_category
FROM orders;

-- UPSERT (PostgreSQL)
INSERT INTO user_settings (user_id, theme, language)
VALUES (42, 'dark', 'en')
ON CONFLICT (user_id) DO UPDATE
    SET theme    = EXCLUDED.theme,
        language = EXCLUDED.language,
        updated_at = NOW();

-- Keyset pagination (efficient, stable)
SELECT id, name, created_at FROM users
WHERE (created_at, id) < ('2024-01-01', 100)
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

## Gotchas

- CTEs in PostgreSQL prior to version 12 are always materialised (a "fence"); from version 12+, the planner can inline them. Add `WITH ... AS MATERIALIZED` or `NOT MATERIALIZED` to control this explicitly.
- Window functions run *after* `WHERE` and `GROUP BY` but *before* `ORDER BY` and `LIMIT`; they operate on the already-filtered/grouped rows.
- `ON CONFLICT DO UPDATE` references the conflicting row as `EXCLUDED.*` (the row that failed to insert); `target.*` references the existing row in the table.
