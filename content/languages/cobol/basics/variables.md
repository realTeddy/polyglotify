---
title: "Variables & Declaration"
language: "cobol"
feature: "variables"
category: "basics"
applicable: true
---

COBOL variables are declared in the `DATA DIVISION` under the `WORKING-STORAGE SECTION` (for persistent program data) or `LOCAL-STORAGE SECTION` (for recursive-safe, per-invocation data). Every variable has a level number (01–49 for structured data, 77 for standalone scalars), a name, a `PICTURE` clause describing its format, and an optional `VALUE` clause for initialization. COBOL is column-sensitive in fixed-format mode but most modern compilers support free-format.

## Example

```cobol
       IDENTIFICATION DIVISION.
       PROGRAM-ID. VARIABLES-DEMO.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WS-COUNTER        PIC 9(4)       VALUE 0.
       01 WS-NAME           PIC X(20)      VALUE SPACES.
       01 WS-PRICE          PIC 9(7)V99    VALUE 0.
       01 WS-FLAG           PIC X(1)       VALUE 'N'.

       *> Group item (like a struct)
       01 WS-DATE.
           05 WS-YEAR       PIC 9(4).
           05 WS-MONTH      PIC 9(2).
           05 WS-DAY        PIC 9(2).

       77 WS-STANDALONE     PIC 9(3)       VALUE 100.

       PROCEDURE DIVISION.
           MOVE 42          TO WS-COUNTER
           MOVE "Alice"     TO WS-NAME
           MOVE 1234.56     TO WS-PRICE
           MOVE 2024        TO WS-YEAR
           MOVE 6           TO WS-MONTH
           MOVE 15          TO WS-DAY
           STOP RUN.
```

## Gotchas

- `PIC 9` is unsigned numeric; `PIC S9` is signed. Forgetting the `S` prefix when signed values are needed causes silent truncation of negative numbers.
- `V` in a PICTURE clause marks the implied decimal point — it takes no storage space but affects arithmetic alignment.
- In fixed-format COBOL, code must start in column 8 (Area A) or column 12 (Area B); mixing this up causes compilation errors that look like syntax errors.
