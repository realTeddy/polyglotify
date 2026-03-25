---
title: "Common Patterns"
language: "cobol"
feature: "common-patterns"
category: "idioms"
applicable: true
---

Classic COBOL patterns include: the **Read-Process-Write loop** for sequential file processing, **88-level condition-names** for readable boolean flags, **EVALUATE TRUE** for multi-condition dispatching, **COPY books** for record layout reuse, and **paragraph-per-function** decomposition. These patterns emerged from decades of batch data processing and remain idiomatic in production COBOL systems today.

## Example

```cobol
       IDENTIFICATION DIVISION.
       PROGRAM-ID. BATCH-PATTERN.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WS-EOF        PIC X(1) VALUE 'N'.
           88 END-OF-FILE VALUE 'Y'.
       01 WS-REC-COUNT  PIC 9(7) VALUE 0.
       01 WS-ERR-COUNT  PIC 9(7) VALUE 0.

       *> 88-level as named boolean flags
       01 WS-VALID-FLAG PIC X(1).
           88 RECORD-VALID   VALUE 'Y'.
           88 RECORD-INVALID VALUE 'N'.

       PROCEDURE DIVISION.
       0000-MAIN.
           PERFORM 1000-INIT
           PERFORM 2000-PROCESS UNTIL END-OF-FILE
           PERFORM 3000-WRAPUP
           STOP RUN.

       1000-INIT.
           OPEN INPUT  IN-FILE
           OPEN OUTPUT OUT-FILE
           READ IN-FILE AT END SET END-OF-FILE TO TRUE END-READ.

       2000-PROCESS.
           ADD 1 TO WS-REC-COUNT
           PERFORM 2100-VALIDATE
           IF RECORD-VALID
               PERFORM 2200-WRITE-OUTPUT
           ELSE
               ADD 1 TO WS-ERR-COUNT
           END-IF
           READ IN-FILE AT END SET END-OF-FILE TO TRUE END-READ.

       2100-VALIDATE.
           SET RECORD-VALID TO TRUE
           *> ... validation logic ...
           .

       2200-WRITE-OUTPUT.
           *> ... transform and write ...
           .

       3000-WRAPUP.
           CLOSE IN-FILE OUT-FILE
           DISPLAY "Records processed: " WS-REC-COUNT
           DISPLAY "Errors: " WS-ERR-COUNT.
```

## Gotchas

- The paragraph numbering convention (1000-, 2000-, 2100-) makes the call hierarchy visible in the names and allows `PERFORM THRU` grouping.
- Always pre-read before the `PERFORM UNTIL END-OF-FILE` loop (priming read) — COBOL has no `do-while` equivalent for read loops.
- Keep paragraphs short and focused (one page of code); COBOL source is often maintained by multiple teams over decades.
