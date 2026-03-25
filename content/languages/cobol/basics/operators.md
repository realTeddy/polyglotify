---
title: "Operators"
language: "cobol"
feature: "operators"
category: "basics"
applicable: true
---

COBOL uses English words rather than symbols for most operations. Arithmetic uses `ADD`, `SUBTRACT`, `MULTIPLY`, `DIVIDE`, and `COMPUTE` (which accepts a symbolic expression). Comparison uses `EQUAL TO`, `GREATER THAN`, `LESS THAN`, and their abbreviations (`=`, `>`, `<`). Logical operators are `AND`, `OR`, `NOT`. String concatenation uses `STRING`. There are no operator precedence surprises in `COMPUTE` — standard mathematical precedence applies.

## Example

```cobol
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WS-A    PIC 9(4) VALUE 10.
       01 WS-B    PIC 9(4) VALUE 3.
       01 WS-RES  PIC 9(8)V9(2) VALUE 0.
       01 WS-REM  PIC 9(4) VALUE 0.

       PROCEDURE DIVISION.
           *> Arithmetic verbs
           ADD WS-A TO WS-B GIVING WS-RES
           SUBTRACT WS-B FROM WS-A GIVING WS-RES
           MULTIPLY WS-A BY WS-B GIVING WS-RES
           DIVIDE WS-A BY WS-B GIVING WS-RES REMAINDER WS-REM

           *> COMPUTE with an expression (standard precedence)
           COMPUTE WS-RES = (WS-A ** 2) + (WS-B * 4) - 1

           *> Comparison in IF
           IF WS-A > WS-B AND WS-RES NOT EQUAL TO 0
               DISPLAY "A is larger and result is non-zero"
           END-IF

           *> Abbreviated comparison
           IF WS-A = 10 OR = 20
               DISPLAY "A is 10 or 20"
           END-IF

           *> String concatenation
           STRING "Hello" DELIMITED SIZE
                  ", "    DELIMITED SIZE
                  "World" DELIMITED SIZE
               INTO WS-RES   *> note: WS-RES must be PIC X here in practice
           END-STRING

           STOP RUN.
```

## Gotchas

- `ADD X TO Y` modifies Y in place; `ADD X TO Y GIVING Z` leaves X and Y unchanged and stores the result in Z.
- Integer division with `DIVIDE` truncates; use the `REMAINDER` clause to capture the remainder.
- `COMPUTE` uses `**` for exponentiation, which is unusual compared to most languages.
