---
title: "Generics"
language: "cobol"
feature: "generics"
category: "oop"
applicable: false
---

COBOL has no generics. All data items have fixed, explicitly declared types. The COBOL equivalent of generic reuse is the `COPY` statement, which textually includes copybook files — similar to C macros. A copybook can define a record layout that is reused across programs, but there is no parameterization by type. COBOL's strong reliance on fixed-width, explicitly typed data items makes generic programming fundamentally incompatible with its design.

## Example

```cobol
       *> COPY books are COBOL's reuse mechanism (not generics)

       *> File: SORT-ITEM.CPY
       *>    05 SI-KEY      PIC X(20).
       *>    05 SI-VALUE    PIC X(100).

       *> Reusing the copybook in two different programs:
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WS-CUSTOMER-RECORD.
           COPY SORT-ITEM.    *> included verbatim

       01 WS-PRODUCT-RECORD.
           COPY SORT-ITEM.    *> same layout, different variable name

       *> REPLACING allows light parameterization
       01 WS-ORDER-RECORD.
           COPY SORT-ITEM REPLACING
               ==SI-KEY==   BY ==OR-KEY==
               ==SI-VALUE== BY ==OR-VALUE==.

       PROCEDURE DIVISION.
           MOVE 'ORDER-001' TO OR-KEY
           MOVE 'Widget'    TO OR-VALUE
           DISPLAY OR-KEY " " OR-VALUE
           STOP RUN.
```

## Gotchas

- `COPY ... REPLACING` is purely textual substitution (like C `#define`) and has no concept of type safety.
- The same copybook included twice in the same program (without `REPLACING`) causes duplicate data-name errors.
- There is no way to write a single sorting routine in COBOL that works on different record types — a separate routine must be written for each type.
