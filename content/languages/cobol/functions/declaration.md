---
title: "Function Declaration"
language: "cobol"
feature: "declaration"
category: "functions"
applicable: true
---

COBOL organizes code into `SECTION`s and `PARAGRAPH`s within the `PROCEDURE DIVISION`. These are called with `PERFORM`. Starting with COBOL 2002, proper subprograms with parameters are supported via `PROCEDURE DIVISION USING` and nested programs. The older style is separate compilation units called with `CALL`. Within a program, paragraphs act as subroutines and are the classic COBOL way to structure logic.

## Example

```cobol
       IDENTIFICATION DIVISION.
       PROGRAM-ID. MAIN-PROGRAM.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WS-RESULT   PIC 9(6) VALUE 0.
       01 WS-INPUT-A  PIC 9(3) VALUE 15.
       01 WS-INPUT-B  PIC 9(3) VALUE 7.

       PROCEDURE DIVISION.
       MAIN-LOGIC.
           PERFORM CALCULATE-SUM
           DISPLAY "Sum: " WS-RESULT
           STOP RUN.

       CALCULATE-SUM.
           ADD WS-INPUT-A TO WS-INPUT-B GIVING WS-RESULT.

       *> ---- Separate subprogram (different compilation unit) ----
       IDENTIFICATION DIVISION.
       PROGRAM-ID. ADD-NUMBERS.

       DATA DIVISION.
       LINKAGE SECTION.              *> parameters live here
       01 LS-A    PIC 9(5).
       01 LS-B    PIC 9(5).
       01 LS-SUM  PIC 9(6).

       PROCEDURE DIVISION USING LS-A LS-B LS-SUM.
           ADD LS-A TO LS-B GIVING LS-SUM
           STOP RUN.

       *> Calling the subprogram from MAIN-PROGRAM:
       *>   CALL 'ADD-NUMBERS' USING WS-INPUT-A WS-INPUT-B WS-RESULT
```

## Gotchas

- Paragraphs executed with `PERFORM` return to the statement after `PERFORM` — they are not true stack frames unless the program is compiled with a reentrant option.
- `PERFORM paragraph THRU end-paragraph` runs all paragraphs from the first to the last in sequence, which is powerful but fragile if paragraphs are reordered.
- Subprogram `CALL` passes arguments by reference by default; use `CALL ... BY CONTENT` to pass by value (pass a copy).
