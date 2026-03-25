---
title: "Classes"
language: "cobol"
feature: "classes"
category: "oop"
applicable: true
---

COBOL gained an object-oriented extension in the COBOL 2002 standard. OO COBOL uses `CLASS-ID` to define a class, `METHOD-ID` to define methods, `FACTORY` for class-level (static) methods, and `OBJECT` for instance data and instance methods. Support varies widely: GnuCOBOL and Micro Focus COBOL support OO COBOL; IBM Enterprise COBOL on z/OS has partial support. Traditional COBOL shops rarely use the OO extension.

## Example

```cobol
       CLASS-ID. BankAccount INHERITS EXCEPTION-OBJECT.

       DATA DIVISION.
       WORKING-STORAGE SECTION.

       OBJECT.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 Balance    PIC S9(11)V99 PACKED-DECIMAL VALUE 0.
       01 Owner      PIC X(40)     VALUE SPACES.

       PROCEDURE DIVISION.

       METHOD-ID. Initialize.
       DATA DIVISION.
       LINKAGE SECTION.
       01 LK-Owner   PIC X(40).
       PROCEDURE DIVISION USING LK-Owner.
           MOVE LK-Owner TO Owner
           STOP METHOD.
       END METHOD Initialize.

       METHOD-ID. Deposit.
       DATA DIVISION.
       LINKAGE SECTION.
       01 LK-Amount  PIC S9(9)V99 PACKED-DECIMAL.
       PROCEDURE DIVISION USING LK-Amount.
           ADD LK-Amount TO Balance
           STOP METHOD.
       END METHOD Deposit.

       METHOD-ID. GetBalance.
       DATA DIVISION.
       LINKAGE SECTION.
       01 LK-Bal     PIC S9(11)V99 PACKED-DECIMAL.
       PROCEDURE DIVISION RETURNING LK-Bal.
           MOVE Balance TO LK-Bal
           STOP METHOD.
       END METHOD GetBalance.

       END OBJECT.
       END CLASS BankAccount.
```

## Gotchas

- OO COBOL is not widely used in industry; most COBOL code written and maintained today is procedural.
- The syntax varies between compilers — the above uses a style compatible with GnuCOBOL; Micro Focus COBOL uses different directives.
- OO COBOL objects are heap-allocated and garbage-collected in some implementations, which is unusual for COBOL and can surprise developers accustomed to procedural COBOL's deterministic memory layout.
