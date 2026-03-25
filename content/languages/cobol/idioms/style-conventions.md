---
title: "Style Conventions"
language: "cobol"
feature: "style-conventions"
category: "idioms"
applicable: true
---

COBOL style is shaped by its column-layout heritage and long maintenance lifetimes. Data names use `HYPHENATED-UPPER-CASE` with meaningful prefixes (`WS-` for working-storage, `LS-` for linkage, `FD-` for file descriptions). Paragraphs are numbered hierarchically. Comments use `*>` (modern) or `*` in column 7 (legacy fixed format). Blank lines separate logical sections. Code should be readable aloud — COBOL's verbosity is intentional.

## Example

```cobol
      *---------------------------------------------------------------*
      * Program:  CALC-INVOICE                                        *
      * Author:   J. Smith                                            *
      * Date:     2024-01-15                                          *
      * Purpose:  Calculate invoice totals including tax and discount  *
      *---------------------------------------------------------------*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. CALC-INVOICE.

       DATA DIVISION.
       WORKING-STORAGE SECTION.

       *> --- Input fields ---
       01 WS-UNIT-PRICE      PIC 9(7)V99   VALUE ZERO.
       01 WS-QUANTITY        PIC 9(5)       VALUE ZERO.

       *> --- Calculated fields ---
       01 WS-SUBTOTAL        PIC 9(9)V99   VALUE ZERO.
       01 WS-DISCOUNT-AMOUNT PIC 9(9)V99   VALUE ZERO.
       01 WS-TAX-AMOUNT      PIC 9(9)V99   VALUE ZERO.
       01 WS-INVOICE-TOTAL   PIC 9(9)V99   VALUE ZERO.

       *> --- Control flags ---
       01 WS-DISCOUNT-RATE   PIC 9V99       VALUE 0.10.
       01 WS-TAX-RATE        PIC 9V99       VALUE 0.085.

       PROCEDURE DIVISION.
       0000-MAIN.
           PERFORM 1000-CALCULATE-SUBTOTAL
           PERFORM 2000-APPLY-DISCOUNT
           PERFORM 3000-CALCULATE-TAX
           PERFORM 4000-COMPUTE-TOTAL
           STOP RUN.

       1000-CALCULATE-SUBTOTAL.
           COMPUTE WS-SUBTOTAL = WS-UNIT-PRICE * WS-QUANTITY.

       2000-APPLY-DISCOUNT.
           COMPUTE WS-DISCOUNT-AMOUNT =
               WS-SUBTOTAL * WS-DISCOUNT-RATE.

       3000-CALCULATE-TAX.
           COMPUTE WS-TAX-AMOUNT =
               (WS-SUBTOTAL - WS-DISCOUNT-AMOUNT) * WS-TAX-RATE.

       4000-COMPUTE-TOTAL.
           COMPUTE WS-INVOICE-TOTAL =
               WS-SUBTOTAL - WS-DISCOUNT-AMOUNT + WS-TAX-AMOUNT.
```

## Gotchas

- In fixed-format COBOL: columns 1–6 are the sequence area (optional line numbers), column 7 is the indicator (`*` for comment, `-` for continuation), columns 8–11 are Area A (divisions, sections, paragraph names), columns 12–72 are Area B (code).
- Always initialize `WORKING-STORAGE` items with `VALUE` clauses — uninitialized COBOL fields contain unpredictable data, not zeros.
- Use `END-IF`, `END-PERFORM`, `END-READ` explicit scope terminators rather than periods to end statements; a misplaced period in COBOL ends the current sentence and can silently short-circuit logic.
