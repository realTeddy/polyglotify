---
title: "Package Manager"
language: "sql"
feature: "package-manager"
category: "ecosystem"
applicable: false
---

SQL has no package manager. SQL is a language specification, not a runtime with distributable packages. Database systems manage their own extension ecosystems: PostgreSQL uses `CREATE EXTENSION` for compiled extensions distributed via OS packages or PGXN (PostgreSQL Extension Network); SQL Server uses NuGet/SSMS for tooling; migrations are managed by tools like Flyway, Liquibase, or Alembic that version-control SQL schema changes.

## Example

```sql
-- PostgreSQL extensions (closest to "packages")
-- Install via OS: apt install postgresql-16-postgis
CREATE EXTENSION IF NOT EXISTS postgis;           -- GIS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";       -- UUID generation
CREATE EXTENSION IF NOT EXISTS pg_trgm;           -- fuzzy text search
CREATE EXTENSION IF NOT EXISTS hstore;            -- key-value columns
CREATE EXTENSION IF NOT EXISTS pg_stat_statements; -- query statistics

-- List installed extensions
SELECT name, default_version, installed_version, comment
FROM pg_available_extensions
WHERE installed_version IS NOT NULL
ORDER BY name;

-- Drop an extension
-- DROP EXTENSION pg_trgm;
```

```ini
# Flyway configuration (flyway.conf)
flyway.url=jdbc:postgresql://localhost:5432/myapp
flyway.user=myapp
flyway.password=secret
flyway.locations=filesystem:./migrations
```

```sql
-- migrations/V1__create_users.sql (Flyway convention)
CREATE TABLE users (
    id         BIGSERIAL PRIMARY KEY,
    email      TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Gotchas

- `CREATE EXTENSION` requires the extension's shared library to be installed at the OS level; it is not downloaded automatically like a package manager would.
- Extensions are database-scoped, not schema-scoped; a single `CREATE EXTENSION` makes the functions available in the entire database (but the objects land in the `public` schema by default).
- Migration tools like Flyway use sequential version numbers; inserting a migration between two existing versions in a locked baseline is difficult — always append new migrations rather than inserting them.
