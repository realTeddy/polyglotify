---
title: "Arrays & Lists"
language: "cobol"
feature: "arrays"
category: "data-structures"
applicable: true
---

COBOL arrays are called **tables** and are declared with the `OCCURS` clause. Tables can be one or two-dimensional and support an `INDEXED BY` clause for efficient index variables, or plain numeric items as subscripts. Variable-length tables use `OCCURS ... DEPENDING ON`. Tables are fixed-size; there is no dynamic growth. The `SEARCH` and `SEARCH ALL` verbs provide linear and binary search respectively.

## Example

```cobol
       DATA DIVISION.
       WORKING-STORAGE SECTION.

       *> Fixed-size table of 10 integers
       01 WS-SCORES-TABLE.
           05 WS-SCORE       PIC 9(3) OCCURS 10 TIMES
                             INDEXED BY WS-IDX.

       *> 2D table
       01 WS-MATRIX.
           05 WS-ROW         OCCURS 3 TIMES INDEXED BY WS-ROW-IDX.
               10 WS-COL     PIC 9(4) OCCURS 3 TIMES
                             INDEXED BY WS-COL-IDX.

       *> Variable-length table
       01 WS-ACTUAL-COUNT    PIC 9(3) VALUE 0.
       01 WS-DYNAMIC-TABLE.
           05 WS-ITEM        PIC X(20)
                             OCCURS 1 TO 100 TIMES
                             DEPENDING ON WS-ACTUAL-COUNT.

       PROCEDURE DIVISION.
           *> Set using index
           SET WS-IDX TO 1
           MOVE 95 TO WS-SCORE(WS-IDX)

           *> Set using numeric subscript (1-based)
           MOVE 87 TO WS-SCORE(3)

           *> Loop over table
           PERFORM VARYING WS-IDX FROM 1 BY 1 UNTIL WS-IDX > 10
               DISPLAY WS-SCORE(WS-IDX)
           END-PERFORM

           *> Linear search with SEARCH
           SET WS-IDX TO 1
           SEARCH WS-SCORE
               AT END DISPLAY "Not found"
               WHEN WS-SCORE(WS-IDX) = 95
                   DISPLAY "Found at " WS-IDX
           END-SEARCH

           STOP RUN.
```

## Gotchas

- COBOL tables are **1-based** — `WS-SCORE(0)` is an out-of-bounds access (undefined behavior or runtime error depending on compiler).
- `INDEXED BY` variables are opaque internal counters; use `SET` (not `MOVE`) to assign them, and `SET index UP BY n` / `DOWN BY n` to increment/decrement.
- `SEARCH ALL` (binary search) requires the table to be sorted and requires an `ASCENDING KEY` or `DESCENDING KEY` clause on the `OCCURS`.
