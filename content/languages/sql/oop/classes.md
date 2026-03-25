---
title: "Classes"
language: "sql"
feature: "classes"
category: "oop"
applicable: false
---

SQL has no classes. The relational model represents entities as tables with rows and columns, not as objects with encapsulated state and behaviour. Object-Relational Mapping (ORM) frameworks (Hibernate, SQLAlchemy, ActiveRecord, etc.) bridge the gap between object-oriented code and relational databases. PostgreSQL has limited OO extensions (table inheritance, user-defined types with operators), but these are not standard SQL.

## Example

```sql
-- SQL equivalent: tables as entities + stored procedures as methods

-- "Class" as a table (state) + functions (behaviour)
CREATE TABLE bank_accounts (
    id      SERIAL PRIMARY KEY,
    owner   TEXT    NOT NULL,
    balance NUMERIC(12, 2) NOT NULL DEFAULT 0,
    CHECK (balance >= 0)
);

-- "Methods" as functions operating on rows
CREATE OR REPLACE FUNCTION deposit(p_account_id INT, p_amount NUMERIC)
RETURNS NUMERIC LANGUAGE plpgsql AS $$
DECLARE v_balance NUMERIC;
BEGIN
    UPDATE bank_accounts
    SET balance = balance + p_amount
    WHERE id = p_account_id
    RETURNING balance INTO v_balance;
    RETURN v_balance;
END;
$$;

CREATE OR REPLACE FUNCTION withdraw(p_account_id INT, p_amount NUMERIC)
RETURNS NUMERIC LANGUAGE plpgsql AS $$
DECLARE v_balance NUMERIC;
BEGIN
    UPDATE bank_accounts
    SET balance = balance - p_amount
    WHERE id = p_account_id AND balance >= p_amount
    RETURNING balance INTO v_balance;
    IF v_balance IS NULL THEN
        RAISE EXCEPTION 'Insufficient funds or account not found';
    END IF;
    RETURN v_balance;
END;
$$;

INSERT INTO bank_accounts (owner, balance) VALUES ('Alice', 500);
SELECT deposit(1, 100);    -- 600
SELECT withdraw(1, 50);    -- 550
```

## Gotchas

- The relational model intentionally separates data (tables) from behaviour (application code or stored procedures); mixing them tightly leads to logic scattered across DB and application layers.
- PostgreSQL table inheritance (`CREATE TABLE child() INHERITS (parent)`) is a limited OO feature that causes many surprises with constraints, foreign keys, and `ONLY` clauses; avoid it unless you specifically need partition-like behaviour.
- Stored procedures as "methods" make testing and refactoring harder; keep business logic in application code and use SQL only for set-based data operations where possible.
