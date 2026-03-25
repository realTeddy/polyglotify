---
title: "Package Manager"
language: "cobol"
feature: "package-manager"
category: "ecosystem"
applicable: false
---

COBOL has no package manager. There is no central registry of COBOL libraries analogous to npm or PyPI. Code reuse is achieved through `COPY` books (shared source snippets), shared load libraries (pre-compiled object modules in a library), and vendor-supplied COBOL runtime modules. On mainframes, shared code lives in partitioned datasets (PDS libraries) managed by operations teams, not a package manager.

## Example

```cobol
       *> COPY books are COBOL's reuse mechanism
       *> They are textually included at compile time

       IDENTIFICATION DIVISION.
       PROGRAM-ID. MY-PROGRAM.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
           COPY CUSTOMER-RECORD.   *> include shared record layout
           COPY ERROR-CODES.       *> include shared error constants
           COPY DB2-SQLCA.         *> include DB2 SQL communication area

       PROCEDURE DIVISION.
           COPY OPEN-FILES.        *> include shared file-open boilerplate
           PERFORM PROCESS-DATA
           COPY CLOSE-FILES.       *> include shared file-close boilerplate
           STOP RUN.

       *> On mainframe, COPY books are found in DD SYSLIB datasets
       *> defined in the compile JCL:
       *>
       *> //SYSLIB   DD DSN=PROD.COPYLIB,DISP=SHR
       *>            DD DSN=PROD.MFCOPYLIB,DISP=SHR
```

## Gotchas

- COPY book search paths are defined in the compile JCL (`SYSLIB DD` statements on mainframes) or compiler flags (`-I` in GnuCOBOL) — there is no `package.json` equivalent to declare dependencies.
- Version management of COPY books is done through source control (ISPF libraries, Git) and naming conventions, not a package manager.
- Sharing compiled load modules between programs requires the modules to be compiled as reentrant and placed in a shared load library — a manual operations task.
