---
title: "Closures & Lambdas"
language: "cobol"
feature: "closures"
category: "functions"
applicable: false
---

COBOL has no closures or lambdas. Functions cannot be passed as values, stored in variables, or created dynamically. COBOL is a procedural language designed for batch data processing; its abstraction model is the named paragraph and subprogram, not first-class functions. There is no equivalent to a closure capturing an enclosing scope — all state sharing between paragraphs uses `WORKING-STORAGE` variables.

## Example

```cobol
       *> The closest COBOL idiom to a callback is a CALL to a
       *> subprogram whose name is stored in a data item.
       *> This simulates a function pointer, not a closure.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WS-SUBPROGRAM-NAME  PIC X(30) VALUE 'DEFAULT-HANDLER'.
       01 WS-VALUE            PIC 9(6)  VALUE 100.

       PROCEDURE DIVISION.
           *> "Dynamic dispatch" via a data-name call
           MOVE 'DISCOUNT-HANDLER' TO WS-SUBPROGRAM-NAME
           CALL WS-SUBPROGRAM-NAME USING WS-VALUE

           DISPLAY "Result: " WS-VALUE
           STOP RUN.

       *> A named subprogram acts as a "strategy" (no captured state)
       IDENTIFICATION DIVISION.
       PROGRAM-ID. DISCOUNT-HANDLER.
       DATA DIVISION.
       LINKAGE SECTION.
       01 LS-VALUE PIC 9(6).
       PROCEDURE DIVISION USING LS-VALUE.
           COMPUTE LS-VALUE = LS-VALUE * 0.9
           STOP RUN.
```

## Gotchas

- Calling a program by a data-item name (`CALL WS-NAME`) works but removes any compile-time verification that the program exists or has the right interface.
- COBOL has no anonymous functions — every callable unit must have a name declared in a `PROGRAM-ID`.
- Modern COBOL extensions (GnuCOBOL's `FUNCTION-POINTER`) add function-pointer types but still do not provide captured environments.
