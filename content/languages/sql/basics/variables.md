---
title: "Variables & Declaration"
language: "sql"
feature: "variables"
category: "basics"
applicable: true
---

Standard SQL does not have user-defined variables, but most database systems extend it with variable support. In PostgreSQL, variables are declared in `DO` blocks or `PL/pgSQL` functions using `DECLARE`. T-SQL (SQL Server) uses `DECLARE @variable` with `SET` or `SELECT`. MySQL uses `SET @variable` for session variables and `DECLARE` inside stored procedures. SQLite has no variables outside of programming-language bindings.

## Example

```sql
-- PostgreSQL PL/pgSQL (inside a DO block or function)
DO $$
DECLARE
    v_name     TEXT    := 'Alice';
    v_age      INTEGER := 30;
    v_balance  NUMERIC(10,2) DEFAULT 0.00;
    v_now      TIMESTAMPTZ;
BEGIN
    v_now := NOW();
    RAISE NOTICE 'User: %, Age: %, Balance: %, Time: %',
        v_name, v_age, v_balance, v_now;
END;
$$;

-- T-SQL (SQL Server)
DECLARE @name    NVARCHAR(100) = N'Alice';
DECLARE @count   INT           = 0;
DECLARE @total   DECIMAL(10,2);

SET @total = 1234.56;
SELECT @count = COUNT(*) FROM users;
PRINT CONCAT('Name: ', @name, ', Count: ', @count);

-- MySQL session variable
SET @session_var = 'hello';
SELECT @session_var;
```

## Gotchas

- In T-SQL, `SELECT @var = column FROM table` assigns the last matching row's value — not an aggregate. Use `SET @var = (SELECT ...)` for single-value assignment with error checking.
- PL/pgSQL variables shadow column names; if a variable and a column share a name, the variable takes precedence inside a function. Use table-qualified names (`table.column`) to disambiguate.
- Session variables in MySQL (`@var`) persist for the duration of the connection and are visible across all statements; local procedure variables (declared with `DECLARE`) are scoped to the block.
