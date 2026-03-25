---
title: "Control Flow"
language: "sql"
feature: "control-flow"
category: "basics"
applicable: true
---

Standard SQL control flow is limited to the `CASE` expression (inline conditional), which works anywhere an expression is valid. Procedural control flow (`IF/ELSE`, `LOOP`, `WHILE`, `FOR`) is available only inside stored procedures and functions via vendor-specific procedural extensions: PL/pgSQL (PostgreSQL), T-SQL (SQL Server), PL/SQL (Oracle), and stored procedures in MySQL.

## Example

```sql
-- CASE expression (standard SQL — works in SELECT, WHERE, ORDER BY)
SELECT
    name,
    score,
    CASE
        WHEN score >= 90 THEN 'A'
        WHEN score >= 80 THEN 'B'
        WHEN score >= 70 THEN 'C'
        ELSE 'F'
    END AS grade
FROM student_scores;

-- Simple CASE (switch-style)
SELECT
    status,
    CASE status
        WHEN 'active'   THEN 'Active User'
        WHEN 'inactive' THEN 'Disabled'
        WHEN 'pending'  THEN 'Awaiting Approval'
        ELSE 'Unknown'
    END AS status_label
FROM users;

-- PL/pgSQL IF/ELSIF/ELSE (inside a function)
CREATE OR REPLACE FUNCTION classify_score(p_score INT)
RETURNS TEXT LANGUAGE plpgsql AS $$
BEGIN
    IF p_score >= 90 THEN
        RETURN 'A';
    ELSIF p_score >= 80 THEN
        RETURN 'B';
    ELSIF p_score >= 70 THEN
        RETURN 'C';
    ELSE
        RETURN 'F';
    END IF;
END;
$$;

-- WHILE loop in PL/pgSQL
DO $$
DECLARE v_n INT := 1;
BEGIN
    WHILE v_n <= 5 LOOP
        RAISE NOTICE 'n = %', v_n;
        v_n := v_n + 1;
    END LOOP;
END;
$$;
```

## Gotchas

- `CASE` is an *expression*, not a statement; it returns a single value and cannot contain DML operations (`INSERT`, `UPDATE`).
- `CASE WHEN` stops evaluating conditions at the first match (short-circuits); ordering conditions from most specific to most general is important.
- Procedural loops in SQL are usually a sign that the problem should be solved with set-based operations (JOINs, CTEs, window functions) instead, which are far more efficient.
