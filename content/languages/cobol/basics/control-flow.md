---
title: "Control Flow"
language: "cobol"
feature: "control-flow"
category: "basics"
applicable: true
---

COBOL control flow uses `IF/ELSE/END-IF`, `EVALUATE` (a powerful switch/pattern-match), `PERFORM` (a loop or paragraph-call), and `GO TO` (now strongly discouraged). `PERFORM UNTIL` is the standard loop. `PERFORM VARYING` provides a counted loop with an index. `EVALUATE` can test multiple subjects simultaneously, making it more powerful than a C `switch`.

## Example

```cobol
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WS-IDX    PIC 9(3) VALUE 0.
       01 WS-TOTAL  PIC 9(6) VALUE 0.
       01 WS-GRADE  PIC 9(3) VALUE 85.
       01 WS-LETTER PIC X    VALUE SPACE.

       PROCEDURE DIVISION.
           *> IF / ELSE IF / ELSE
           IF WS-GRADE >= 90
               MOVE 'A' TO WS-LETTER
           ELSE IF WS-GRADE >= 80
               MOVE 'B' TO WS-LETTER
           ELSE
               MOVE 'C' TO WS-LETTER
           END-IF

           *> EVALUATE (switch/pattern-match)
           EVALUATE WS-LETTER
               WHEN 'A'
                   DISPLAY "Excellent"
               WHEN 'B'
                   DISPLAY "Good"
               WHEN OTHER
                   DISPLAY "Needs improvement"
           END-EVALUATE

           *> PERFORM UNTIL (while loop)
           MOVE 1 TO WS-IDX
           PERFORM UNTIL WS-IDX > 10
               ADD WS-IDX TO WS-TOTAL
               ADD 1 TO WS-IDX
           END-PERFORM

           *> PERFORM VARYING (for loop)
           PERFORM VARYING WS-IDX FROM 1 BY 1 UNTIL WS-IDX > 5
               DISPLAY WS-IDX
           END-PERFORM

           *> PERFORM a paragraph (like a function call)
           PERFORM PROCESS-RECORD

           STOP RUN.

       PROCESS-RECORD.
           DISPLAY "Processing...".
```

## Gotchas

- `PERFORM UNTIL` tests the condition *before* the first iteration (like `while`), not after. Use `PERFORM ... WITH TEST AFTER` for a `do-while` loop.
- `EVALUATE TRUE` with `WHEN condition` expressions is a readable alternative to nested `IF` chains.
- `GO TO` is legal but creates unstructured "spaghetti" code; modern COBOL style uses structured `PERFORM` exclusively.
