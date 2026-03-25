---
title: "Tuples"
language: "cobol"
feature: "tuples"
category: "data-structures"
applicable: false
---

COBOL has no tuple type. The equivalent is a group item — a level-01 (or sub-level) data item composed of elementary items at higher level numbers. Group items serve the same structural role as tuples or records, but they must be named, are always passed by reference, and cannot be constructed inline as expressions.

## Example

```cobol
       DATA DIVISION.
       WORKING-STORAGE SECTION.

       *> Group item = fixed-layout record (closest to a tuple)
       01 WS-EMPLOYEE-RECORD.
           05 WS-EMP-ID      PIC 9(6).
           05 WS-EMP-NAME    PIC X(30).
           05 WS-EMP-SALARY  PIC 9(9)V99.

       *> Multiple return values via a group item parameter
       01 WS-MINMAX.
           05 WS-MIN-VAL  PIC S9(9).
           05 WS-MAX-VAL  PIC S9(9).

       PROCEDURE DIVISION.
           MOVE 100001      TO WS-EMP-ID
           MOVE 'Jane Smith' TO WS-EMP-NAME
           MOVE 75000.00    TO WS-EMP-SALARY

           *> Access individual fields
           DISPLAY WS-EMP-ID
           DISPLAY WS-EMP-NAME

           *> Pass entire group as a unit (like a tuple)
           CALL 'PROCESS-EMP' USING WS-EMPLOYEE-RECORD

           STOP RUN.
```

## Gotchas

- Group items are accessed as a whole (the name refers to the concatenated bytes of all sub-items) or field-by-field (using the sub-item names).
- Moving a value into a group item (`MOVE SPACES TO WS-EMPLOYEE-RECORD`) fills the entire block with spaces, which overwrites numeric fields with `' '` bytes — this can corrupt numeric comparisons.
- There is no destructuring assignment — fields must be accessed one at a time by name.
