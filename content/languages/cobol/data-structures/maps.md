---
title: "Maps & Dictionaries"
language: "cobol"
feature: "maps"
category: "data-structures"
applicable: false
---

COBOL has no built-in map or hash table. The traditional approach for key-value lookup in COBOL is a sorted table with `SEARCH ALL` (binary search) or an indexed/relative file on disk (effectively a disk-based map). Modern COBOL running under databases uses `EXEC SQL` or `EXEC CICS` to access keyed data. In-memory hash maps are not a native data structure.

## Example

```cobol
       *> Sorted lookup table (simulates a read-only map)
       DATA DIVISION.
       WORKING-STORAGE SECTION.

       01 WS-COUNTRY-TABLE.
           05 WS-ENTRY OCCURS 5 TIMES
                       ASCENDING KEY IS WS-CODE
                       INDEXED BY WS-IDX.
               10 WS-CODE    PIC X(2).
               10 WS-NAME    PIC X(20).

       01 WS-FOUND-NAME  PIC X(20) VALUE SPACES.

       PROCEDURE DIVISION.
           MOVE 'US' TO WS-CODE(1)
           MOVE 'United States       ' TO WS-NAME(1)
           MOVE 'CA' TO WS-CODE(2)
           MOVE 'Canada              ' TO WS-NAME(2)
           MOVE 'DE' TO WS-CODE(3)
           MOVE 'Germany             ' TO WS-NAME(3)
           MOVE 'FR' TO WS-CODE(4)
           MOVE 'France              ' TO WS-NAME(4)
           MOVE 'JP' TO WS-CODE(5)
           MOVE 'Japan               ' TO WS-NAME(5)

           *> Binary search (map lookup)
           SEARCH ALL WS-ENTRY
               AT END
                   DISPLAY "Country not found"
               WHEN WS-CODE(WS-IDX) = 'DE'
                   MOVE WS-NAME(WS-IDX) TO WS-FOUND-NAME
                   DISPLAY "Found: " WS-FOUND-NAME
           END-SEARCH

           STOP RUN.
```

## Gotchas

- `SEARCH ALL` requires the table to be pre-sorted by the key and declared with `ASCENDING KEY` — if the data is not sorted, results are undefined.
- For mainframe COBOL, VSAM KSDS (Key-Sequenced Data Set) files are the production-grade keyed lookup mechanism.
- GnuCOBOL provides access to external C libraries, making it possible to call a C hash-map implementation from COBOL code.
