---
title: "Async/Await"
language: "cobol"
feature: "async-await"
category: "concurrency"
applicable: false
---

COBOL has no async/await. COBOL was designed for sequential batch processing — one record read, processed, and written at a time. Asynchronous I/O does not exist as a language feature. In mainframe COBOL, concurrent operations are handled at the infrastructure level: CICS (Customer Information Control System) manages transaction concurrency externally, and the COBOL program itself remains strictly single-threaded and sequential.

## Example

```cobol
       *> COBOL's model: strictly sequential I/O
       *> Concurrency is handled by the runtime (CICS, IMS, etc.)

       IDENTIFICATION DIVISION.
       PROGRAM-ID. BATCH-PROCESS.

       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT INPUT-FILE  ASSIGN TO 'input.dat'
               FILE STATUS IS WS-INPUT-STATUS.
           SELECT OUTPUT-FILE ASSIGN TO 'output.dat'
               FILE STATUS IS WS-OUTPUT-STATUS.

       DATA DIVISION.
       FILE SECTION.
       FD INPUT-FILE.
       01 INPUT-RECORD     PIC X(80).
       FD OUTPUT-FILE.
       01 OUTPUT-RECORD    PIC X(80).

       WORKING-STORAGE SECTION.
       01 WS-INPUT-STATUS  PIC XX VALUE '00'.
       01 WS-OUTPUT-STATUS PIC XX VALUE '00'.
       01 WS-EOF           PIC X(1) VALUE 'N'.
           88 END-OF-FILE VALUE 'Y'.

       PROCEDURE DIVISION.
           OPEN INPUT  INPUT-FILE
           OPEN OUTPUT OUTPUT-FILE
           READ INPUT-FILE
               AT END SET END-OF-FILE TO TRUE
           END-READ
           PERFORM UNTIL END-OF-FILE
               MOVE INPUT-RECORD TO OUTPUT-RECORD
               WRITE OUTPUT-RECORD
               READ INPUT-FILE
                   AT END SET END-OF-FILE TO TRUE
               END-READ
           END-PERFORM
           CLOSE INPUT-FILE OUTPUT-FILE
           STOP RUN.
```

## Gotchas

- CICS COBOL programs can issue `EXEC CICS LINK` or `EXEC CICS XCTL` to call other programs, but these are synchronous from the COBOL perspective.
- True asynchronous message processing in mainframe environments uses MQ Series (IBM MQ) with the COBOL program as a message consumer — the concurrency is external.
- GnuCOBOL on Linux can call POSIX threading APIs via `CALL`, but this is not standard COBOL practice.
