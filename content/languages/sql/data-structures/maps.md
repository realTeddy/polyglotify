---
title: "Maps & Dictionaries"
language: "sql"
feature: "maps"
category: "data-structures"
applicable: true
---

SQL does not have a native map/dictionary type, but several databases provide key-value-like structures. PostgreSQL offers `hstore` (a flat key-value column type) and `JSONB` (a structured binary JSON type that supports nested maps). Standard SQL `EAV` (Entity-Attribute-Value) patterns use a child table as a map. JSON support is also available in MySQL 5.7+ and SQL Server 2016+.

## Example

```sql
-- PostgreSQL JSONB as a map/dictionary
CREATE TABLE config (
    service TEXT PRIMARY KEY,
    settings JSONB NOT NULL DEFAULT '{}'
);

INSERT INTO config VALUES
('api', '{"host": "localhost", "port": 8080, "timeout": 30, "debug": false}'),
('db',  '{"host": "pg01", "port": 5432, "pool_size": 10}');

-- Key access (returns JSONB)
SELECT settings -> 'host'  FROM config WHERE service = 'api';

-- Key access as text
SELECT settings ->> 'host' FROM config WHERE service = 'api';

-- Nested access
SELECT settings #>> '{pool_size}' FROM config WHERE service = 'db';

-- Check key existence
SELECT service FROM config WHERE settings ? 'debug';

-- Update a key
UPDATE config
SET settings = settings || '{"timeout": 60}'::JSONB
WHERE service = 'api';

-- Iterate keys
SELECT service, key, value
FROM config,
LATERAL JSONB_EACH_TEXT(settings) AS kv(key, value);

-- PostgreSQL hstore (flat key-value)
-- CREATE EXTENSION IF NOT EXISTS hstore;
-- SELECT 'name => Alice, age => 30'::hstore -> 'name';
```

## Gotchas

- `->` returns a `JSONB` value; `->>` returns `TEXT`. Use `->>` when you need the raw string value for comparisons; use `->` when you need to chain further JSON operations.
- JSONB operations bypass the relational type system; storing a port as `"port": "8080"` (string) instead of `"port": 8080` (integer) will cause silent errors when doing arithmetic.
- For frequently queried JSON keys, create a partial index or a generated column to avoid full JSONB scans: `CREATE INDEX ON config ((settings ->> 'host'))`.
