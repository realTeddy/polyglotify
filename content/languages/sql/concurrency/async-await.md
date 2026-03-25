---
title: "Async/Await"
language: "sql"
feature: "async-await"
category: "concurrency"
applicable: false
---

SQL has no async/await syntax. SQL queries are synchronous from the perspective of the connection that issues them. Asynchronous database access is a feature of the database driver in the calling application language (e.g., `asyncpg` for Python, `node-postgres` with Promises, JDBC async). Within the database, parallelism is handled automatically by the query planner using parallel query workers, not by the SQL language itself.

## Example

```sql
-- SQL itself is synchronous — async is handled by the driver layer
-- Example: parallel query execution (PostgreSQL controls this, not the SQL author)

-- Enable parallel query (PostgreSQL config / session)
SET max_parallel_workers_per_gather = 4;

-- This query may use parallel workers automatically
EXPLAIN ANALYZE
SELECT AVG(price), category
FROM products
GROUP BY category;

-- Asynchronous-style pattern: batch operations with NOTIFY/LISTEN
-- Publisher (one connection)
NOTIFY job_complete, '{"job_id": 42, "status": "done"}';

-- Subscriber (another connection) — non-blocking listen
LISTEN job_complete;
-- Application polls pg_notify or uses driver's async notify support

-- Long-running query visibility (pg_stat_activity)
SELECT pid, state, query, query_start
FROM pg_stat_activity
WHERE state != 'idle'
ORDER BY query_start;

-- Cancel a long-running query from another connection
-- SELECT pg_cancel_backend(pid);
```

## Gotchas

- PostgreSQL's `LISTEN`/`NOTIFY` is an asynchronous pub/sub mechanism at the database level, but using it still requires async support in the application driver.
- Parallel query workers in PostgreSQL are not under SQL author control; they are governed by server settings (`max_parallel_workers`, `parallel_setup_cost`) and query planner heuristics.
- Long queries block the connection they run on; use connection pooling (PgBouncer, pgpool) and query timeouts (`statement_timeout`) to manage this.
