---
title: "Result Types"
language: "cobol"
feature: "result-types"
category: "error-handling"
applicable: false
---

COBOL has no result type abstraction. Error information is communicated through dedicated status fields passed as output parameters or checked via special registers like `FILE STATUS` and `RETURN-CODE`. This is functionally similar to a Result type but without any compiler-enforced unwrapping — the programmer must remember to check status fields after every fallible operation.

## Example

```cobol
       *> COBOL convention: caller-allocated status output parameter
       *> Analogous to: Result<Value, Error>

       IDENTIFICATION DIVISION.
       PROGRAM-ID. SAFE-DIVIDE.

       DATA DIVISION.
       LINKAGE SECTION.
       01 LS-DIVIDEND   PIC S9(9)V99.
       01 LS-DIVISOR    PIC S9(9)V99.
       01 LS-RESULT     PIC S9(9)V99.
       01 LS-STATUS     PIC X(2).
           88 DIVIDE-OK         VALUE '00'.
           88 DIVIDE-BY-ZERO    VALUE 'DZ'.
           88 OVERFLOW-ERROR    VALUE 'OV'.

       PROCEDURE DIVISION USING LS-DIVIDEND LS-DIVISOR
                                LS-RESULT   LS-STATUS.
           IF LS-DIVISOR = ZERO
               MOVE 'DZ' TO LS-STATUS
               MOVE ZERO TO LS-RESULT
               STOP RUN
           END-IF

           DIVIDE LS-DIVIDEND BY LS-DIVISOR GIVING LS-RESULT
               ON SIZE ERROR
                   MOVE 'OV' TO LS-STATUS
                   STOP RUN
           END-DIVIDE

           MOVE '00' TO LS-STATUS
           STOP RUN.

       *> Caller:
       *>   CALL 'SAFE-DIVIDE' USING WS-A WS-B WS-RES WS-STATUS
       *>   IF NOT DIVIDE-OK
       *>       DISPLAY "Error: " WS-STATUS
       *>   END-IF
```

## Gotchas

- Nothing prevents a programmer from ignoring the status parameter — COBOL has no equivalent of Rust's `#[must_use]`.
- The convention of using `PIC XX` and `88` levels for status codes is a community convention, not a language feature.
- `RETURN-CODE` is set automatically by `STOP RUN` and is available to the calling program, but only provides a numeric code with no structured error information.
