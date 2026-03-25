---
title: "Threads"
language: "sql"
feature: "threads"
category: "concurrency"
applicable: false
---

SQL has no threads. Concurrency in SQL databases is managed by the database server through transactions, locking, and MVCC (Multi-Version Concurrency Control). Each database connection is an isolated session. The SQL language controls concurrency through transaction isolation levels (`READ COMMITTED`, `REPEATABLE READ`, `SERIALIZABLE`) and explicit locking (`SELECT FOR UPDATE`, `LOCK TABLE`).

## Example

```sql
-- Transaction isolation controls concurrency behaviour
-- READ COMMITTED (default in PostgreSQL)
BEGIN;
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
SELECT balance FROM accounts WHERE id = 1;
-- Another session can modify the row here; our next read would see changes
COMMIT;

-- SERIALIZABLE — strongest isolation, prevents all anomalies
BEGIN ISOLATION LEVEL SERIALIZABLE;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;   -- may fail with serialisation failure if concurrent conflict

-- SELECT FOR UPDATE — explicit row-level lock
BEGIN;
SELECT balance FROM accounts WHERE id = 1 FOR UPDATE;
-- Row is now locked; other sessions block on SELECT FOR UPDATE for this row
UPDATE accounts SET balance = balance - 50 WHERE id = 1;
COMMIT;

-- Advisory locks (PostgreSQL) — application-level locks
SELECT pg_try_advisory_lock(12345);   -- returns true if acquired
-- ... critical section ...
SELECT pg_advisory_unlock(12345);

-- Table-level lock (use sparingly)
BEGIN;
LOCK TABLE orders IN SHARE ROW EXCLUSIVE MODE;
-- Prevents concurrent inserts while doing a bulk operation
COMMIT;
```

## Gotchas

- `SELECT FOR UPDATE` locks the selected rows; holding the lock too long (e.g., while the application processes the result) leads to contention and timeouts.
- `SERIALIZABLE` isolation may cause transactions to fail with `ERROR: could not serialize access due to concurrent update`; the application must be prepared to retry.
- Advisory locks are not automatically released on transaction commit (only on session disconnect); always call `pg_advisory_unlock` explicitly when done.
