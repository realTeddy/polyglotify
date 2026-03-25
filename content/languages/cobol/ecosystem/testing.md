---
title: "Testing"
language: "cobol"
feature: "testing"
category: "ecosystem"
applicable: true
---

COBOL testing is done with purpose-built frameworks such as **COBOL-Check**, **zUnit** (IBM), and **Micro Focus MFUnit**. The open-source COBOL-Check framework allows writing unit tests in COBOL syntax that are injected into the program under test. On mainframes, zUnit integrates with IDz (IBM Developer for z/OS). Batch programs are often tested through file comparison: run the program against known input and `COMPARE` the output file to a golden file.

## Example

```cobol
       *> COBOL-Check test (open-source framework)
       *> Tests are written in a COBOL-like DSL alongside the source

       TESTSUITE "Tax Calculation Tests"

       TESTCASE "Should calculate 8.5% tax on 1000.00"
           MOVE 1000.00 TO WS-AMOUNT
           MOVE 8.50    TO WS-RATE
           PERFORM CALCULATE-TAX
           EXPECT WS-TAX-AMOUNT TO EQUAL 85.00

       TESTCASE "Should return zero tax for zero amount"
           MOVE 0.00 TO WS-AMOUNT
           MOVE 8.50 TO WS-RATE
           PERFORM CALCULATE-TAX
           EXPECT WS-TAX-AMOUNT TO EQUAL 0.00

       TESTCASE "Should handle negative amount"
           MOVE -100.00 TO WS-AMOUNT
           MOVE 8.50    TO WS-RATE
           PERFORM CALCULATE-TAX
           EXPECT WS-STATUS TO EQUAL 'ER'

       *> GnuCOBOL self-contained test (no framework)
       IDENTIFICATION DIVISION.
       PROGRAM-ID. TEST-CALC-TAX.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WS-FAILURES PIC 9 VALUE 0.
       01 WS-RESULT   PIC 9(9)V99.
       PROCEDURE DIVISION.
           CALL 'CALC-TAX' USING 1000.00 8.50 WS-RESULT
           IF WS-RESULT NOT = 85.00
               ADD 1 TO WS-FAILURES
               DISPLAY "FAIL: expected 85.00 got " WS-RESULT
           END-IF
           IF WS-FAILURES = 0
               DISPLAY "All tests passed"
           ELSE
               DISPLAY WS-FAILURES " test(s) failed"
           END-IF
           STOP RUN.
```

## Gotchas

- COBOL-Check requires a Java runtime to generate and run tests — it pre-processes COBOL source, injecting test scaffolding before compilation.
- zUnit is mainframe-only and requires IBM Developer for z/OS; it does not run on open systems.
- File-comparison testing (running a job and diffing the output) is still the most common testing method in legacy COBOL shops.
