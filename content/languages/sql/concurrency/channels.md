---
title: "Channels & Message Passing"
language: "sql"
feature: "channels"
category: "concurrency"
applicable: false
---

SQL has no channel type. PostgreSQL's `LISTEN`/`NOTIFY` mechanism is the closest built-in equivalent to message passing — it allows one database session to send a notification with a payload that other listening sessions receive asynchronously. For job queues and reliable message passing, purpose-built extensions like `pg_message_queue` or external tools like Redis Streams and RabbitMQ are used alongside SQL.

## Example

```sql
-- PostgreSQL LISTEN/NOTIFY — database-level pub/sub

-- Sender session (any connection can NOTIFY)
NOTIFY user_events, '{"event": "signup", "user_id": 42}';

-- Receiver session
LISTEN user_events;
-- The application driver polls for notifications
-- Python example: conn.notifies()
-- Node.js: client.on('notification', handler)

-- NOTIFY inside a trigger (fires on data change)
CREATE OR REPLACE FUNCTION notify_order_change()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    PERFORM pg_notify(
        'order_changes',
        json_build_object(
            'id',     NEW.id,
            'status', NEW.status
        )::TEXT
    );
    RETURN NEW;
END;
$$;

CREATE TRIGGER trg_order_change
    AFTER INSERT OR UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION notify_order_change();

-- Simple queue table pattern (when LISTEN/NOTIFY is insufficient)
CREATE TABLE job_queue (
    id          BIGSERIAL PRIMARY KEY,
    payload     JSONB     NOT NULL,
    status      TEXT      NOT NULL DEFAULT 'pending',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    claimed_at  TIMESTAMPTZ,
    worker_id   TEXT
);

-- Claim a job atomically
UPDATE job_queue
SET status = 'processing', claimed_at = NOW(), worker_id = 'worker-01'
WHERE id = (
    SELECT id FROM job_queue
    WHERE status = 'pending'
    ORDER BY id
    FOR UPDATE SKIP LOCKED
    LIMIT 1
)
RETURNING *;
```

## Gotchas

- `NOTIFY` payloads are limited to 8000 bytes in PostgreSQL; for larger messages, store the data in a table and notify with only an ID.
- Notifications sent inside an aborted transaction are discarded; only notifications from committed transactions are delivered to listeners.
- `SELECT ... FOR UPDATE SKIP LOCKED` is the safe pattern for job queues; using `FOR UPDATE` without `SKIP LOCKED` causes workers to block each other when competing for jobs.
