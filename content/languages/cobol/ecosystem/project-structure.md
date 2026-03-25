---
title: "Project Structure"
language: "cobol"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

COBOL project structure is platform-dependent. On mainframes, source lives in Partitioned Data Sets (PDS) organized by type. On open systems (Linux/Windows with GnuCOBOL or Micro Focus), a conventional directory layout is used. Every COBOL source file contains a complete program starting with `IDENTIFICATION DIVISION`. Large applications split logic into many separately compiled subprograms linked at runtime.

## Example

```
*> Open systems (GnuCOBOL on Linux) project layout:
my-cobol-app/
├── src/
│   ├── MAIN-PROGRAM.cbl     ; main entry point
│   ├── CALC-TAX.cbl         ; callable subprogram
│   ├── VALIDATE-INPUT.cbl   ; callable subprogram
│   └── REPORT-GEN.cbl       ; callable subprogram
├── copy/
│   ├── CUSTOMER-REC.cpy     ; shared record layout copybook
│   ├── ERROR-CODES.cpy      ; shared condition-name definitions
│   └── WS-COMMON.cpy        ; shared working-storage items
├── data/
│   ├── input/
│   └── output/
└── Makefile

*> Mainframe PDS organization:
*> PROJ.SOURCE      - COBOL source programs
*> PROJ.COPYLIB     - COPY books
*> PROJ.LOADLIB     - compiled load modules
*> PROJ.JCL         - job control language for compile/link/run
*> PROJ.LISTINGS    - compiler listing output
```

```makefile
# GnuCOBOL Makefile
COBC = cobc
FLAGS = -x -I copy/

all: bin/main-program

bin/main-program: src/MAIN-PROGRAM.cbl src/CALC-TAX.cbl src/VALIDATE-INPUT.cbl
	$(COBC) $(FLAGS) -o $@ $^

clean:
	rm -f bin/*
```

## Gotchas

- COBOL source files traditionally use `.cbl`, `.cob`, or `.cobol` extensions; copybooks use `.cpy` or `.cpy`.
- Fixed-format COBOL requires source lines to be within columns 7–72; free-format mode (enabled with `>>SOURCE FORMAT FREE` or a compiler flag) removes this restriction.
- On mainframes, the compile-link-go process is controlled by JCL jobs, not shell scripts or Makefiles — a significant difference from open-systems development.
