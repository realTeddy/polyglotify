---
title: "Build Tools"
language: "sql"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

SQL "builds" are database migrations — applying versioned schema changes to a database. The primary tools are **Flyway** (Java-based, convention-over-configuration), **Liquibase** (XML/YAML/SQL changesets), and **Alembic** (Python/SQLAlchemy). For PostgreSQL-specific projects, **Sqitch** is popular for dependency-aware migrations. Application frameworks often bundle their own migration tools (Rails `db:migrate`, Django `manage.py migrate`, Prisma migrate).

## Example

```bash
# Flyway
flyway migrate                  # apply pending migrations
flyway info                     # show migration status
flyway validate                 # verify checksums
flyway repair                   # fix checksum failures
flyway baseline -baselineVersion=5  # mark existing DB as version 5

# Liquibase
liquibase update                # apply pending changesets
liquibase status                # show pending changesets
liquibase rollback --tag=v1.0   # rollback to tag
liquibase generateChangeLog     # reverse-engineer schema to XML

# Alembic (Python)
alembic upgrade head            # apply all migrations
alembic downgrade -1            # rollback one migration
alembic revision --autogenerate -m "add users table"
alembic history                 # show migration history

# Sqitch (PostgreSQL)
sqitch deploy                   # deploy changes
sqitch revert --to @v1.0        # revert to tag
sqitch status                   # show deployment status
sqitch verify                   # run verify scripts
```

```yaml
# flyway.yaml
flyway:
  url: jdbc:postgresql://localhost:5432/myapp
  user: ${DB_USER}
  password: ${DB_PASS}
  locations:
    - filesystem:db/migrations
  validateOnMigrate: true
  outOfOrder: false
```

## Gotchas

- Never modify a migration file after it has been applied to any shared environment (staging, production); tools detect checksum changes and refuse to proceed.
- `CREATE INDEX CONCURRENTLY` and `ADD COLUMN ... DEFAULT` (with non-constant defaults in older PostgreSQL) can lock tables; plan zero-downtime migrations carefully for production.
- Always test the rollback path of your migrations, not just the forward path; a failed rollback in production can leave the database in an inconsistent state.
