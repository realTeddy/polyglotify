---
title: "Return Values"
language: "cobol"
feature: "return-values"
category: "functions"
applicable: true
---

COBOL subprograms do not return values in the way most languages do. The idiomatic approach is to pass an output parameter by reference and let the callee write into it. COBOL 2002 introduced `FUNCTION` (intrinsic and user-defined) which can appear in expressions. The `RETURN-CODE` special register holds a numeric return status after a `CALL`, similar to a process exit code.

## Example

```cobol
       *> Approach 1: output parameter (most common)
       IDENTIFICATION DIVISION.
       PROGRAM-ID. SQUARE-IT.

       DATA DIVISION.
       LINKAGE SECTION.
       01 LS-INPUT   PIC S9(9).
       01 LS-OUTPUT  PIC S9(18).

       PROCEDURE DIVISION USING LS-INPUT LS-OUTPUT.
           COMPUTE LS-OUTPUT = LS-INPUT ** 2
           MOVE 0 TO RETURN-CODE      *> 0 = success
           STOP RUN.

       *> Approach 2: user-defined FUNCTION (COBOL 2002+)
       *> (Syntax varies by compiler; GnuCOBOL supports this)
       IDENTIFICATION DIVISION.
       FUNCTION-ID. F-SQUARE.

       DATA DIVISION.
       LINKAGE SECTION.
       01 LF-INPUT   PIC S9(9).
       01 LF-RESULT  PIC S9(18).     *> FUNCTION RETURNING item

       PROCEDURE DIVISION USING LF-INPUT RETURNING LF-RESULT.
           COMPUTE LF-RESULT = LF-INPUT ** 2
           .

       *> Caller using output parameter:
       *>   CALL 'SQUARE-IT' USING WS-NUM WS-SQUARED
       *>   IF RETURN-CODE NOT = 0
       *>       DISPLAY "Error"
       *>   END-IF
```

## Gotchas

- `RETURN-CODE` is a global special register; it is overwritten by every `CALL` and every program termination, so check it immediately after `CALL`.
- User-defined functions (COBOL 2002) are not universally supported — mainframe COBOL compilers (IBM Enterprise COBOL) have limited support; GnuCOBOL supports most of the standard.
- Paragraphs invoked with `PERFORM` have no return value mechanism at all — they must communicate results through shared `WORKING-STORAGE` variables.
