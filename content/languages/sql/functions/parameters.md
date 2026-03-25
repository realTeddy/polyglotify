---
title: "Parameters & Arguments"
language: "sql"
feature: "parameters"
category: "functions"
applicable: true
---

SQL function parameters are declared with a name and type in the `CREATE FUNCTION` signature. PostgreSQL supports positional (`$1`, `$2`) and named parameter references, default values, and `VARIADIC` arrays. T-SQL supports default values with `= default_value` and optional parameters by passing `DEFAULT`. Stored procedures additionally support `OUT` and `INOUT` parameters for returning multiple values.

## Example

```sql
-- Parameters with defaults (PostgreSQL)
CREATE OR REPLACE FUNCTION paginate(
    p_limit  INT DEFAULT 20,
    p_offset INT DEFAULT 0
)
RETURNS TABLE(page_size INT, page_offset INT)
LANGUAGE SQL AS $$
    SELECT p_limit, p_offset;
$$;

SELECT * FROM paginate();            -- 20, 0
SELECT * FROM paginate(10);          -- 10, 0
SELECT * FROM paginate(10, 40);      -- 10, 40
SELECT * FROM paginate(p_offset => 60);  -- named arg: 20, 60

-- OUT parameters in a stored procedure (PostgreSQL)
CREATE OR REPLACE PROCEDURE get_user_stats(
    IN  p_role   TEXT,
    OUT o_count  INT,
    OUT o_avg_age NUMERIC
)
LANGUAGE plpgsql AS $$
BEGIN
    SELECT COUNT(*), AVG(age)
    INTO o_count, o_avg_age
    FROM users
    WHERE role = p_role;
END;
$$;

DO $$
DECLARE v_count INT; v_avg NUMERIC;
BEGIN
    CALL get_user_stats('admin', v_count, v_avg);
    RAISE NOTICE 'Admins: %, avg age: %', v_count, v_avg;
END;
$$;
```

## Gotchas

- Named argument syntax (`p_name => value`) in PostgreSQL uses `=>` not `:=`; the older `:=` is still accepted but deprecated in favour of `=>`.
- `OUT` parameters in PostgreSQL functions cannot be combined with `RETURNS TABLE(...)` in the same signature — choose one style.
- SQL Server does not support default parameter values being specified by name at call time; callers must use positional arguments or explicitly pass `DEFAULT` as the argument value.
