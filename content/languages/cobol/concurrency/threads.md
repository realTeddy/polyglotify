---
title: "Threads"
language: "cobol"
feature: "threads"
category: "concurrency"
applicable: false
---

Standard COBOL has no threading model. COBOL programs are single-threaded by design. On mainframes, concurrency is achieved by running multiple COBOL programs as separate address spaces or tasks under JES (Job Entry Subsystem) or CICS regions. Some compiler extensions (Micro Focus COBOL) support threading via `START THREAD`, but this is non-standard and rarely used.

## Example

```cobol
       *> Micro Focus COBOL extension (NON-STANDARD)
       *> Not available in IBM Enterprise COBOL or GnuCOBOL

       *> DATA DIVISION.
       *> WORKING-STORAGE SECTION.
       *> 01 WS-THREAD-HANDLE  USAGE HANDLE OF THREAD.

       *> PROCEDURE DIVISION.
       *>     START THREAD
       *>         CALL 'WORKER-PROGRAM' USING WS-DATA
       *>     END-START

       *> Standard alternative: JCL parallel steps (mainframe)
       *> Each EXEC step in a JCL job runs a separate COBOL program:
       *>
       *> //STEP1 EXEC PGM=REPORT1   (runs concurrently with STEP2 in some JES)
       *> //STEP2 EXEC PGM=REPORT2

       *> Standard alternative: CICS parallel tasks
       *> EXEC CICS START TRANSID('WRKT') FROM(WS-DATA) LENGTH(100) END-EXEC

       IDENTIFICATION DIVISION.
       PROGRAM-ID. SEQUENTIAL-ONLY.

       PROCEDURE DIVISION.
           DISPLAY "COBOL programs are single-threaded by design."
           DISPLAY "Parallelism is achieved at the JCL or CICS level."
           STOP RUN.
```

## Gotchas

- Running the same COBOL load module concurrently under CICS requires the program to be compiled as reentrant (no self-modifying code, no static local state).
- `LOCAL-STORAGE SECTION` provides per-invocation storage (safe for concurrent reentrant calls); `WORKING-STORAGE SECTION` is shared across concurrent calls to the same load module if not reentrant.
- GnuCOBOL supports calling pthreads via `CALL 'pthread_create'`, but managing thread safety of COBOL runtime internals is the programmer's responsibility.
