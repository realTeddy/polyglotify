---
title: "Interfaces & Traits"
language: "cobol"
feature: "interfaces"
category: "oop"
applicable: false
---

COBOL has no interfaces or traits. The COBOL 2002 OO standard does not define an interface construct comparable to Java or C#. Polymorphism in OO COBOL is achieved through inheritance and object references typed as a superclass. In procedural COBOL, the equivalent of an interface contract is informal: a copybook defines the `LINKAGE SECTION` layout that callers and callees must agree on.

## Example

```cobol
       *> No interface keyword exists in COBOL.
       *> The closest idiom is calling a subprogram by a data-name
       *> (simulating a function pointer / strategy pattern).

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WS-HANDLER-NAME   PIC X(30) VALUE SPACES.
       01 WS-AMOUNT         PIC 9(9)V99 VALUE 1000.00.

       *> "Interface" contract: any handler subprogram must accept
       *>  a single PIC 9(9)V99 BY REFERENCE parameter.

       PROCEDURE DIVISION.
           MOVE 'APPLY-DISCOUNT' TO WS-HANDLER-NAME
           CALL WS-HANDLER-NAME USING WS-AMOUNT

           MOVE 'APPLY-TAX' TO WS-HANDLER-NAME
           CALL WS-HANDLER-NAME USING WS-AMOUNT

           DISPLAY "Final: " WS-AMOUNT
           STOP RUN.

       *> Both subprograms honor the informal "interface":
       IDENTIFICATION DIVISION.
       PROGRAM-ID. APPLY-DISCOUNT.
       DATA DIVISION.
       LINKAGE SECTION.
       01 LS-AMOUNT PIC 9(9)V99.
       PROCEDURE DIVISION USING LS-AMOUNT.
           COMPUTE LS-AMOUNT = LS-AMOUNT * 0.90
           STOP RUN.
```

## Gotchas

- Calling a subprogram by a data-name bypasses all compile-time checks; the compiler cannot verify the called program's parameter signature.
- OO COBOL object references typed as a superclass provide a limited form of interface-like polymorphism but without the concept of a pure abstract interface.
- This pattern is effectively dependency injection achieved through naming conventions rather than type system enforcement.
