---
title: "Structs & Classes"
language: "sql"
feature: "structs-classes"
category: "data-structures"
applicable: false
---

SQL has no struct or class types in the object-oriented sense. The relational equivalent of a struct is a **table row** or a **composite type** (PostgreSQL). PostgreSQL's composite types (`CREATE TYPE name AS (field type, ...)`) are the closest to structs — they can be used as column types, function parameters, and return types. Standard relational design models entities as tables rather than as struct-like types.

## Example

```sql
-- PostgreSQL composite type as a struct
CREATE TYPE money_amount AS (
    amount   NUMERIC(18, 4),
    currency CHAR(3)
);

CREATE TABLE invoices (
    id       SERIAL PRIMARY KEY,
    vendor   TEXT,
    subtotal money_amount,
    tax      money_amount,
    total    money_amount
);

-- Construct with ROW
INSERT INTO invoices (vendor, subtotal, tax, total)
VALUES (
    'ACME Corp',
    ROW(1000.00, 'USD'),
    ROW(80.00,   'USD'),
    ROW(1080.00, 'USD')
);

SELECT vendor, (total).amount, (total).currency FROM invoices;

-- Table as a struct (typical relational approach)
CREATE TABLE addresses (
    id         SERIAL PRIMARY KEY,
    person_id  INT REFERENCES persons(id),
    street     TEXT,
    city       TEXT,
    country    CHAR(2),
    zip        VARCHAR(10)
);

-- Domain types — constrained scalars (like a typed typedef)
CREATE DOMAIN email_address AS TEXT
    CHECK (VALUE ~* '^[^@]+@[^@]+\.[^@]{2,}$');

CREATE TABLE contacts (
    id    SERIAL PRIMARY KEY,
    email email_address NOT NULL
);
```

## Gotchas

- PostgreSQL composite types do not support constraints (NOT NULL, CHECK) on individual fields; use a table or domain types for constrained fields.
- Composite type columns cannot be indexed directly; you must index the individual sub-fields extracted with `(column).field` syntax.
- Changing a composite type after it is used as a column type requires dropping and recreating dependent objects; plan composite type schemas carefully before production use.
