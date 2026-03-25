---
title: "Package Manager"
language: "assembly"
feature: "package-manager"
category: "ecosystem"
applicable: false
---

Assembly has no package manager. There are no third-party assembly libraries distributed through a central registry. Code reuse in assembly is done by linking against C libraries (libc, libpthread, etc.) using the C ABI, or by including assembler macro files. NASM has an `%include` directive for source-level inclusion, but there is no equivalent of npm, cargo, or pip for the assembly ecosystem.

## Example

```nasm
; "Including" external code in NASM — source-level only
%include "macros/io.asm"     ; include macro definitions
%include "lib/string.asm"    ; include hand-written utility routines

; Linking against a C library at the linker level:
; nasm -f elf64 main.asm -o main.o
; ld main.o -lc -dynamic-linker /lib/ld-linux-x86-64.so.2 -o main
; (or: gcc main.o -o main  — gcc handles the linker flags)

extern printf                ; declare C function as external symbol
extern malloc
extern free

section .data
    fmt  db "Value: %d", 10, 0

section .text
    global main

main:
    push rbp
    mov  rbp, rsp

    lea  rdi, [rel fmt]
    mov  rsi, 42
    xor  eax, eax
    call printf

    pop  rbp
    ret
```

## Gotchas

- Linking with libc requires matching the calling convention precisely — a mismatch in register usage or stack alignment causes subtle bugs.
- NASM's `%include` is purely textual (like C's `#include`) and has no namespace isolation.
- For serious assembly projects, the common approach is to write assembly files that integrate with a C/C++ build system (Make, CMake) and link against existing libraries.
