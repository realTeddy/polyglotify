---
title: "Exceptions & Try/Catch"
language: "sql"
feature: "exceptions"
category: "error-handling"
applicable: true
---

Standard SQL handles errors through the transaction model: a failing statement rolls back the current transaction. Procedural SQL extensions add exception handling: PL/pgSQL uses `BEGIN...EXCEPTION WHEN...END`, T-SQL uses `TRY...CATCH`, and MySQL stored procedures use `DECLARE...HANDLER`. `RAISE` (PostgreSQL) and `RAISERROR`/`THROW` (T-SQL) signal custom errors.

## Example

```sql
-- PostgreSQL PL/pgSQL exception handling
CREATE OR REPLACE FUNCTION safe_divide(p_a NUMERIC, p_b NUMERIC)
RETURNS NUMERIC LANGUAGE plpgsql AS $$
BEGIN
    RETURN p_a / p_b;
EXCEPTION
    WHEN division_by_zero THEN
        RAISE WARNING 'Division by zero attempted';
        RETURN NULL;
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Unexpected error: %', SQLERRM;
END;
$$;

SELECT safe_divide(10, 2);   -- 5
SELECT safe_divide(10, 0);   -- NULL + warning

-- Custom RAISE levels: DEBUG, LOG, INFO, NOTICE, WARNING, EXCEPTION
CREATE OR REPLACE FUNCTION validate_age(p_age INT)
RETURNS VOID LANGUAGE plpgsql AS $$
BEGIN
    IF p_age < 0 THEN
        RAISE EXCEPTION 'Invalid age: %', p_age
            USING ERRCODE = 'check_violation';
    END IF;
    IF p_age > 150 THEN
        RAISE WARNING 'Suspicious age value: %', p_age;
    END IF;
END;
$$;

-- T-SQL TRY/CATCH
/*
BEGIN TRY
    INSERT INTO orders (user_id, amount) VALUES (999, -50);
END TRY
BEGIN CATCH
    SELECT
        ERROR_NUMBER()    AS ErrorNumber,
        ERROR_MESSAGE()   AS ErrorMessage,
        ERROR_SEVERITY()  AS Severity;
END CATCH;
*/
```

## Gotchas

- In PL/pgSQL, an exception in the `EXCEPTION` block itself will propagate up unhandled; only catch specific errors you know how to handle.
- `SQLERRM` and `SQLSTATE` are only available inside the `EXCEPTION` block in PL/pgSQL; they are empty outside of it.
- T-SQL's `TRY/CATCH` does not catch all errors; errors with severity 20+ (fatal connection errors) bypass `CATCH` blocks entirely.
