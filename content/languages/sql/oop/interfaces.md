---
title: "Interfaces & Traits"
language: "sql"
feature: "interfaces"
category: "oop"
applicable: false
---

SQL has no interfaces or traits. SQL does not follow object-oriented paradigms. The closest relational equivalent is a convention where certain tables share a common set of columns (e.g., all tables have `created_at`, `updated_at`, `id`), enforced by database migrations and documentation rather than the language. PostgreSQL's operator classes and extension protocols define "interfaces" for custom types at the database engine level, but this is not user-level OOP.

## Example

```sql
-- Enforcing a "column interface" via convention
-- All auditable tables must have these columns

-- Pattern: common columns via shared naming convention
CREATE TABLE users (
    id         BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by INT,
    -- entity-specific columns
    name       TEXT NOT NULL,
    email      TEXT UNIQUE
);

CREATE TABLE products (
    id         BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by INT,
    -- entity-specific columns
    sku        TEXT UNIQUE,
    price      NUMERIC(10,2)
);

-- Enforce "interface" via a trigger on all "auditable" tables
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$;

CREATE TRIGGER trg_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Query across "interface-conforming" tables using UNION
SELECT 'user' AS type, id, created_at FROM users
UNION ALL
SELECT 'product', id, created_at FROM products
ORDER BY created_at DESC;
```

## Gotchas

- Column conventions are not enforced by SQL itself; a migration that adds a table without the required columns will silently succeed unless checked by tooling.
- Triggers that enforce "interface" behaviour (like `set_updated_at`) must be created for each conforming table individually; there is no way to apply one trigger to "all tables with this column pattern".
- Polymorphic queries across multiple tables (UNION approach) require that all selected columns have compatible types; schema drift between tables will break the query.
