---
title: "Inheritance"
language: "sql"
feature: "inheritance"
category: "oop"
applicable: false
---

SQL has no inheritance mechanism in the object-oriented sense. PostgreSQL has a non-standard table inheritance feature (`INHERITS`) that lets a child table inherit columns from a parent, but it comes with significant limitations (foreign keys do not span parent/child, constraints are not inherited). The standard SQL approach to modelling inheritance hierarchies uses one of three patterns: single-table inheritance, concrete-table inheritance, or class-table inheritance.

## Example

```sql
-- Pattern 1: Single-Table Inheritance (STI)
-- All subtypes in one table with a discriminator column
CREATE TABLE vehicles (
    id           SERIAL PRIMARY KEY,
    vehicle_type TEXT NOT NULL CHECK (vehicle_type IN ('car','truck','motorcycle')),
    make         TEXT,
    model        TEXT,
    -- car-specific
    num_doors    SMALLINT,
    -- truck-specific
    payload_kg   NUMERIC,
    -- motorcycle-specific
    has_sidecar  BOOLEAN
);

-- Pattern 2: Class-Table Inheritance (recommended)
CREATE TABLE vehicles_base (
    id    SERIAL PRIMARY KEY,
    type  TEXT NOT NULL,
    make  TEXT,
    model TEXT
);
CREATE TABLE cars (
    vehicle_id INT PRIMARY KEY REFERENCES vehicles_base(id),
    num_doors  SMALLINT
);
CREATE TABLE trucks (
    vehicle_id  INT PRIMARY KEY REFERENCES vehicles_base(id),
    payload_kg  NUMERIC
);

-- Query a specific subtype
SELECT vb.make, vb.model, c.num_doors
FROM vehicles_base vb
JOIN cars c ON c.vehicle_id = vb.id;
```

## Gotchas

- Single-Table Inheritance adds many nullable columns (columns only relevant to a subtype); as the hierarchy grows, the table becomes sparse and harder to validate with constraints.
- Class-Table Inheritance requires a JOIN for every subtype query; for deep hierarchies or frequent polymorphic queries, this can be expensive.
- PostgreSQL's `INHERITS` does not propagate `NOT NULL` constraints, `CHECK` constraints beyond simple column checks, or `FOREIGN KEY` constraints to child tables — this makes it unreliable for data integrity.
