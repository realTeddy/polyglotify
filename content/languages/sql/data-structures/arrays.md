---
title: "Arrays & Lists"
language: "sql"
feature: "arrays"
category: "data-structures"
applicable: true
---

Standard SQL does not define an array type, but several databases extend it. PostgreSQL has first-class array types for any base type (`INTEGER[]`, `TEXT[]`, etc.) with literal syntax `ARRAY[1,2,3]` or `'{1,2,3}'::INT[]`. SQL Server uses `STRING_SPLIT` and JSON arrays as workarounds. MySQL lacks native arrays but can use JSON arrays. In normalised relational design, arrays are often replaced by child tables.

## Example

```sql
-- PostgreSQL arrays
CREATE TABLE tags_example (
    id   SERIAL PRIMARY KEY,
    name TEXT,
    tags TEXT[]
);

INSERT INTO tags_example (name, tags)
VALUES ('Article', ARRAY['sql', 'database', 'postgres']),
       ('Post',    '{css,html,javascript}');

-- Array access (1-indexed in PostgreSQL)
SELECT name, tags[1] AS first_tag FROM tags_example;

-- Array operators
SELECT name FROM tags_example
WHERE 'sql' = ANY(tags);          -- element membership

SELECT name FROM tags_example
WHERE tags @> ARRAY['sql','database'];  -- contains all

-- Array functions
SELECT
    ARRAY_LENGTH(tags, 1) AS tag_count,
    ARRAY_TO_STRING(tags, ', ') AS tag_list,
    ARRAY_APPEND(tags, 'newTag') AS extended
FROM tags_example;

-- Unnest array into rows
SELECT name, UNNEST(tags) AS tag
FROM tags_example;

-- Aggregation into array
SELECT ARRAY_AGG(name ORDER BY name) AS all_names
FROM tags_example;
```

## Gotchas

- PostgreSQL arrays are 1-indexed, not 0-indexed; `tags[0]` returns `NULL` silently, not an error.
- Storing arrays in a column violates first normal form (1NF); use a separate child table with a foreign key for normalised schemas that need querying, filtering, or joining on individual elements.
- `ANY(array)` and `@>` (contains) require a GIN index for performance on large datasets; without an index, these operators perform full table scans.
