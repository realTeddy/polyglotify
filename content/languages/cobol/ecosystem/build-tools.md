---
title: "Build Tools"
language: "cobol"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

COBOL compilation uses platform-specific tools. On mainframes, the IBM Enterprise COBOL compiler is invoked via JCL (Job Control Language). On open systems, **GnuCOBOL** (`cobc`) and **Micro Focus COBOL** (`cob`) compile source to native executables or shared objects. The linker resolves `CALL` references between separately compiled modules. On mainframes, the linkage editor (IEWL/IEWBLINK) creates load modules stored in PDS load libraries.

## Example

```bash
# GnuCOBOL (open systems)

# Compile and link a single program to an executable
cobc -x -o myprogram src/MAIN.cbl

# Compile a subprogram to a shared library (for dynamic CALL)
cobc -m -o CALC-TAX.so src/CALC-TAX.cbl

# Compile with copybook search path and debug info
cobc -x -g -I copy/ -o myprogram src/MAIN.cbl src/CALC-TAX.cbl

# Compile all sources separately, then link
cobc -c -I copy/ src/MAIN.cbl       # → MAIN.o
cobc -c -I copy/ src/CALC-TAX.cbl   # → CALC-TAX.o
cobc -x -o myprogram MAIN.o CALC-TAX.o

# Run
./myprogram
```

```jcl
//* Mainframe JCL compile step
//COBOL   EXEC PGM=IGYCRCTL,PARM='LIB,OBJECT,RENT'
//STEPLIB  DD DSN=IGY.V6R1M0.SIGYCOMP,DISP=SHR
//SYSIN    DD DSN=MY.SOURCE(MYPROG),DISP=SHR
//SYSLIB   DD DSN=MY.COPYLIB,DISP=SHR
//SYSLIN   DD DSN=&&LOADSET,DISP=(NEW,PASS)
//SYSPRINT DD SYSOUT=*
```

## Gotchas

- GnuCOBOL's `-x` flag compiles and links to a native executable; `-m` produces a shared library for programs called dynamically at runtime.
- The `COB_LIBRARY_PATH` environment variable tells the GnuCOBOL runtime where to find dynamically loaded subprograms (`.so` files).
- Mainframe compile JCL parameters (`RENT` for reentrant, `DYNAM` for dynamic CALL) significantly affect runtime behavior and must match the application's usage pattern.
