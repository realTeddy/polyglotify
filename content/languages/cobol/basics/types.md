---
title: "Types & Type Systems"
language: "cobol"
feature: "types"
category: "basics"
applicable: true
---

COBOL's type system is defined entirely by the `PICTURE` (or `PIC`) clause. Types are not keywords but patterns: `9` for a digit, `X` for any character, `A` for an alphabetic character, `S` for a sign, `V` for an implied decimal point, `P` for scaling. There are no generic integer or float types — you specify exact field widths. COBOL also supports `USAGE` clauses to control internal storage format (DISPLAY, BINARY, COMP, PACKED-DECIMAL, etc.).

## Example

```cobol
       DATA DIVISION.
       WORKING-STORAGE SECTION.

       *> Numeric types
       01 WS-INTEGER        PIC  9(5)         VALUE 0.
       01 WS-SIGNED-INT     PIC S9(5)         VALUE 0.
       01 WS-DECIMAL        PIC S9(7)V9(2)    VALUE 0.

       *> Storage format modifiers (USAGE clause)
       01 WS-BINARY         PIC S9(9)         USAGE BINARY.
       01 WS-PACKED         PIC S9(9)         USAGE PACKED-DECIMAL.
       01 WS-FLOAT          USAGE COMP-1.          *> single-precision float
       01 WS-DOUBLE         USAGE COMP-2.          *> double-precision float

       *> Character / string types
       01 WS-CHAR           PIC X(1).
       01 WS-STRING         PIC X(50)         VALUE SPACES.
       01 WS-ALPHA-ONLY     PIC A(10).

       *> Boolean-like (no native boolean — use indicators)
       01 WS-FOUND-FLAG     PIC X(1).
           88 FOUND                            VALUE 'Y'.
           88 NOT-FOUND                        VALUE 'N'.

       PROCEDURE DIVISION.
           SET FOUND TO TRUE          *> sets WS-FOUND-FLAG to 'Y'
           IF FOUND
               DISPLAY "Record found"
           END-IF
           STOP RUN.
```

## Gotchas

- COBOL has no boolean type; the `88` level condition-names are the idiomatic substitute.
- `COMP` (or `COMP-4`/`BINARY`) stores integers in binary format for efficiency; the `PIC` clause still constrains the logical range but does not change the byte width precisely (the compiler rounds up to 2/4/8 bytes).
- `COMP-3` (PACKED-DECIMAL) stores two decimal digits per byte and is still widely used in mainframe COBOL for financial precision.
