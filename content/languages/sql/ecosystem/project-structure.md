---
title: "Project Structure"
language: "sql"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

SQL projects are structured around migration files (versioned SQL scripts applied in order) and, optionally, a seed directory for reference data. Migration tools like Flyway, Liquibase, and Alembic impose their own conventions. A common layout separates migrations (schema changes), seeds (initial data), functions/procedures, and views into separate directories.

## Example

```
db/
├── migrations/             # ordered schema migrations
│   ├── V001__initial_schema.sql
│   ├── V002__add_users_table.sql
│   ├── V003__add_orders.sql
│   └── V004__add_indexes.sql
├── seeds/                  # reference / test data
│   ├── 001_roles.sql
│   └── 002_test_users.sql
├── functions/              # stored functions and procedures
│   ├── slugify.sql
│   └── calculate_tax.sql
├── views/                  # reusable views
│   ├── v_active_users.sql
│   └── v_monthly_revenue.sql
├── triggers/
│   └── audit_log.sql
└── schema.sql              # current baseline (generated or maintained)
```

```sql
-- V002__add_users_table.sql (Flyway migration)
CREATE TABLE users (
    id         BIGSERIAL    PRIMARY KEY,
    email      TEXT         UNIQUE NOT NULL,
    name       TEXT         NOT NULL,
    role       TEXT         NOT NULL DEFAULT 'viewer'
                            CHECK (role IN ('admin','editor','viewer')),
    active     BOOLEAN      NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email  ON users(email);
CREATE INDEX idx_users_role   ON users(role) WHERE active = true;
```

## Gotchas

- Migration files must be immutable after they are applied to a shared environment; modifying an already-applied migration causes Flyway/Liquibase checksum failures.
- Large projects benefit from keeping stored functions and views in source-controlled `.sql` files run idempotently (`CREATE OR REPLACE`), separate from the versioned migration files.
- Always test migrations on a production-sized dataset; index creation and column additions can lock large tables for minutes, requiring `CREATE INDEX CONCURRENTLY` or zero-downtime migration strategies.
