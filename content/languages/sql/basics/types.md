---
title: "Types & Type Systems"
language: "sql"
feature: "types"
category: "basics"
applicable: true
---

SQL has a rich static type system applied to columns and expressions. Core types include numeric (`INTEGER`, `BIGINT`, `NUMERIC`, `REAL`, `DOUBLE PRECISION`), character (`CHAR`, `VARCHAR`, `TEXT`), date/time (`DATE`, `TIME`, `TIMESTAMP`, `INTERVAL`), and boolean (`BOOLEAN`). Each database system adds extensions: PostgreSQL adds arrays, JSON/JSONB, UUID, and user-defined composite types; SQL Server adds `NVARCHAR`, `UNIQUEIDENTIFIER`, and `XML`; MySQL adds `ENUM` and `SET`.

## Example

```sql
-- Standard SQL types
CREATE TABLE products (
    id          SERIAL PRIMARY KEY,          -- auto-increment integer
    sku         CHAR(10)       NOT NULL,     -- fixed-length string
    name        VARCHAR(255)   NOT NULL,     -- variable-length string
    description TEXT,                        -- unbounded text
    price       NUMERIC(10, 2) NOT NULL,     -- exact decimal
    weight_kg   DOUBLE PRECISION,            -- approximate float
    in_stock    BOOLEAN        DEFAULT true,
    created_at  TIMESTAMPTZ    DEFAULT NOW(),
    metadata    JSONB                         -- PostgreSQL JSON type
);

-- Type casting
SELECT
    '42'::INTEGER,               -- PostgreSQL cast
    CAST('3.14' AS NUMERIC),     -- Standard SQL cast
    '2024-01-15'::DATE,
    NOW()::DATE;                 -- truncate timestamp to date

-- Checking types (PostgreSQL)
SELECT pg_typeof(42),         -- integer
       pg_typeof(3.14),       -- numeric
       pg_typeof('hi'),       -- unknown (resolves to text in context)
       pg_typeof(NOW());      -- timestamp with time zone
```

## Gotchas

- `NUMERIC(p,s)` stores exact decimals (important for money); `FLOAT`/`REAL` are inexact binary floating-point and should not be used for financial calculations.
- `CHAR(n)` pads values with trailing spaces to length `n`; comparisons may behave unexpectedly. Prefer `VARCHAR(n)` or `TEXT`.
- `TIMESTAMP` stores no timezone information; `TIMESTAMPTZ` (or `TIMESTAMP WITH TIME ZONE`) stores UTC and converts for display. Always use `TIMESTAMPTZ` for application data.
