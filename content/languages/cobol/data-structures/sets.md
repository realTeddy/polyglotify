---
title: "Sets"
language: "cobol"
feature: "sets"
category: "data-structures"
applicable: false
---

COBOL has no set data type. Membership testing is approximated with a sorted table and `SEARCH ALL`, or with a series of `WHEN` conditions in an `EVALUATE`. COBOL 2002 condition-names (`88` levels) provide a readable way to define a set of acceptable values for a single variable.

## Example

```cobol
       DATA DIVISION.
       WORKING-STORAGE SECTION.

       *> 88-level condition-names as a "set of valid values"
       01 WS-STATUS       PIC X(2).
           88 VALID-STATUS  VALUE 'AC' 'PD' 'CL' 'SU'.
           88 ACTIVE        VALUE 'AC'.
           88 PENDING       VALUE 'PD'.
           88 CLOSED        VALUE 'CL'.
           88 SUSPENDED     VALUE 'SU'.

       *> Simulating a set with a boolean flag table
       01 WS-SEEN-TABLE.
           05 WS-SEEN     PIC X(1) VALUE 'N'
                          OCCURS 100 TIMES.
       01 WS-KEY          PIC 9(3) VALUE 0.

       PROCEDURE DIVISION.
           MOVE 'AC' TO WS-STATUS

           *> Membership test using 88-levels (most idiomatic)
           IF VALID-STATUS
               DISPLAY "Status is valid"
           END-IF

           *> Marking an element as "seen" (set membership via bitmap)
           MOVE 42 TO WS-KEY
           MOVE 'Y' TO WS-SEEN(WS-KEY)      *> add 42 to set

           *> Test membership
           IF WS-SEEN(WS-KEY) = 'Y'
               DISPLAY "42 is in the set"
           END-IF

           STOP RUN.
```

## Gotchas

- `88` condition-names are read-only membership tests — you can test `IF VALID-STATUS` but you cannot iterate over the values in a condition-name at runtime.
- The bitmap approach only works for integer keys within the size of the `OCCURS` table.
- There is no set union, intersection, or difference operation available natively.
