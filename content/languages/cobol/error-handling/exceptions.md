---
title: "Exceptions & Try/Catch"
language: "cobol"
feature: "exceptions"
category: "error-handling"
applicable: true
---

Traditional COBOL has no exceptions or try/catch. Error handling uses condition codes checked after operations (`FILE STATUS`, `RETURN-CODE`, `ON SIZE ERROR`, `ON OVERFLOW`, `INVALID KEY`). COBOL 2002 OO introduced `RAISE` and `RESUME` for exceptions in OO code, but these are rarely used. File I/O errors are the primary failure mode, handled via the `FILE STATUS` special register and `INVALID KEY` / `NOT INVALID KEY` clauses.

## Example

```cobol
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WS-FILE-STATUS  PIC XX VALUE '00'.
       01 WS-A            PIC 9(3) VALUE 999.
       01 WS-B            PIC 9(3) VALUE 0.
       01 WS-RESULT       PIC 9(6) VALUE 0.

       FILE-CONTROL.
           SELECT CUSTOMER-FILE
               ASSIGN TO 'customers.dat'
               FILE STATUS IS WS-FILE-STATUS.

       PROCEDURE DIVISION.
           *> Arithmetic overflow handling
           ADD 999 TO WS-A
               ON SIZE ERROR
                   DISPLAY "Overflow! Value too large for field"
                   MOVE 0 TO WS-A
               NOT ON SIZE ERROR
                   DISPLAY "OK: " WS-A
           END-ADD

           *> File I/O error handling
           OPEN INPUT CUSTOMER-FILE
           IF WS-FILE-STATUS NOT = '00'
               DISPLAY "File open error: " WS-FILE-STATUS
               STOP RUN
           END-IF

           READ CUSTOMER-FILE
               AT END
                   DISPLAY "End of file"
               INVALID KEY
                   DISPLAY "Key error: " WS-FILE-STATUS
               NOT INVALID KEY
                   DISPLAY "Record read successfully"
           END-READ

           CLOSE CUSTOMER-FILE
           STOP RUN.
```

## Gotchas

- `FILE STATUS` must be declared and checked manually — COBOL does not automatically stop on file errors unless you compile with an option like `ERROR PROCEDURE`.
- `'00'` means success; `'10'` means end-of-file; `'23'` means record not found. The full status code table varies slightly between compilers.
- OO COBOL `RAISE`/`RESUME` exception handling is not available in procedural COBOL programs and is rarely supported in production environments.
