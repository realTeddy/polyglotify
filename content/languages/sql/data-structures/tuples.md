---
title: "Tuples"
language: "sql"
feature: "tuples"
category: "data-structures"
applicable: true
---

In SQL, a **row** is effectively a tuple — a fixed-size, ordered collection of typed values. SQL supports row constructors (`ROW(val1, val2, ...)` or `(val1, val2, ...)`) for tuple comparison and insertion. PostgreSQL has full composite types (user-defined row types) that can be used as column types or function return types. Standard SQL also uses row value expressions in `IN` and comparison contexts.

## Example

```sql
-- Row constructor for multi-column comparison
SELECT * FROM users
WHERE (first_name, last_name) = ('Ada', 'Lovelace');

-- Row IN list
SELECT * FROM products
WHERE (category, status) IN (
    ('electronics', 'active'),
    ('books', 'active')
);

-- PostgreSQL composite type (explicit tuple type)
CREATE TYPE address_t AS (
    street  TEXT,
    city    TEXT,
    country TEXT,
    zip     CHAR(10)
);

CREATE TABLE persons (
    id      SERIAL PRIMARY KEY,
    name    TEXT,
    address address_t
);

INSERT INTO persons (name, address)
VALUES ('Alice', ROW('123 Main St', 'Springfield', 'US', '12345'));

-- Access fields of composite type
SELECT name, (address).city, (address).country FROM persons;

-- Returning a composite type from a function
CREATE OR REPLACE FUNCTION get_address(p_id INT)
RETURNS address_t LANGUAGE SQL AS $$
    SELECT address FROM persons WHERE id = p_id;
$$;
```

## Gotchas

- When accessing fields of a composite column, wrap the column name in parentheses: `(address).city`; without parentheses, PostgreSQL interprets `address.city` as a table alias reference.
- Row comparison `(a, b) < (c, d)` uses lexicographic ordering; the left tuple is less than the right if `a < c`, or `a = c AND b < d`. This is useful for keyset pagination.
- `ROW(val, NULL)` is not equal to `ROW(val, NULL)` because NULL comparison is NULL, not TRUE; composite types with nullable fields cannot be reliably compared with `=`.
