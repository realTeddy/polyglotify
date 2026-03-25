---
title: "Parameters & Arguments"
language: "cobol"
feature: "parameters"
category: "functions"
applicable: true
---

Subprogram parameters in COBOL are declared in the `LINKAGE SECTION` and listed on the `PROCEDURE DIVISION USING` clause. Arguments are passed by reference by default — the called program operates on the same memory as the caller. Passing by value (a copy) uses `BY CONTENT`. Passing a read-only reference uses `BY REFERENCE` (explicit) or `BY VALUE`. The number and order of arguments is verified only at runtime (or by the linker in some implementations).

## Example

```cobol
       *> Called subprogram
       IDENTIFICATION DIVISION.
       PROGRAM-ID. CALC-TAX.

       DATA DIVISION.
       LINKAGE SECTION.
       01 LS-AMOUNT      PIC 9(9)V99.
       01 LS-RATE        PIC 9(3)V99.
       01 LS-TAX-AMOUNT  PIC 9(9)V99.

       PROCEDURE DIVISION USING
               BY REFERENCE LS-AMOUNT
               BY VALUE     LS-RATE
               BY REFERENCE LS-TAX-AMOUNT.
           COMPUTE LS-TAX-AMOUNT = LS-AMOUNT * (LS-RATE / 100)
           STOP RUN.

       *> Caller
       IDENTIFICATION DIVISION.
       PROGRAM-ID. MAIN.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WS-PRICE   PIC 9(9)V99  VALUE 1000.00.
       01 WS-RATE    PIC 9(3)V99  VALUE 8.50.
       01 WS-TAX     PIC 9(9)V99  VALUE 0.

       PROCEDURE DIVISION.
           CALL 'CALC-TAX' USING
               BY REFERENCE WS-PRICE
               BY VALUE     WS-RATE
               BY REFERENCE WS-TAX
           DISPLAY "Tax: " WS-TAX
           STOP RUN.
```

## Gotchas

- `BY REFERENCE` (the default) means the callee can modify the caller's data — a common source of bugs in large systems.
- `BY CONTENT` passes a copy but the copy is still addressed by reference inside the callee; `BY VALUE` (COBOL 2002+) truly passes a value for elementary items.
- There is no type checking of arguments at compile time in many COBOL implementations — passing the wrong PIC clause causes silent data corruption.
