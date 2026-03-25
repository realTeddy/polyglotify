---
title: "Result Types"
language: "sql"
feature: "result-types"
category: "error-handling"
applicable: false
---

SQL has no result types in the functional programming sense. Error signalling in SQL uses exceptions (for procedural code), transaction rollbacks (for data integrity), and NULL values (for absent/unknown results). A common pattern for "fallible" queries is to return NULL on failure (signalled to the caller) or to use an `OUT` parameter pair of `(value, error_message)` in stored procedures.

## Example

```sql
-- Pattern: return NULL to signal absence/failure
CREATE OR REPLACE FUNCTION find_user(p_email TEXT)
RETURNS TABLE(id INT, name TEXT) LANGUAGE SQL STABLE AS $$
    SELECT id, name FROM users WHERE email = p_email LIMIT 1;
    -- returns 0 rows if not found (caller must check)
$$;

-- Caller handles "no rows" = not found
DO $$
DECLARE
    v_id   INT;
    v_name TEXT;
BEGIN
    SELECT id, name INTO v_id, v_name FROM find_user('alice@example.com');
    IF NOT FOUND THEN
        RAISE NOTICE 'User not found';
    ELSE
        RAISE NOTICE 'Found user: % (id: %)', v_name, v_id;
    END IF;
END;
$$;

-- Pattern: status + value output parameters
CREATE OR REPLACE PROCEDURE try_reserve_seat(
    IN  p_show_id     INT,
    IN  p_seat_number TEXT,
    OUT o_success     BOOLEAN,
    OUT o_message     TEXT
) LANGUAGE plpgsql AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM reservations
               WHERE show_id = p_show_id AND seat = p_seat_number) THEN
        o_success := false;
        o_message := 'Seat already taken';
    ELSE
        INSERT INTO reservations (show_id, seat) VALUES (p_show_id, p_seat_number);
        o_success := true;
        o_message := 'Reserved successfully';
    END IF;
END;
$$;
```

## Gotchas

- `NOT FOUND` is a PL/pgSQL special variable set to `TRUE` after a `SELECT INTO` that returns no rows; it resets after every statement that might produce rows.
- Returning NULL to signal failure is ambiguous when NULL is a valid result value; document clearly which functions return NULL for "not found" vs. NULL for "unknown".
- The `(success, message)` out-parameter pattern is not idiomatic in application code; prefer exceptions for error conditions and let the application layer handle them via the database driver.
