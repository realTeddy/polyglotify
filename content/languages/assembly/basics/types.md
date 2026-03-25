---
title: "Types & Type Systems"
language: "assembly"
feature: "types"
category: "basics"
applicable: false
---

Assembly has no type system. The CPU operates on raw bits; it is the programmer's responsibility to track what a sequence of bytes represents. The assembler provides size directives (`db`, `dw`, `dd`, `dq`) to indicate how many bytes to allocate, but these impose no runtime type checking — the same memory can be read as an integer or as a float depending on which instruction you use.

## Example

```nasm
section .data
    ; These are just size declarations, not types
    a  db  0xFF        ; 1 byte  — could be a char, int8, or part of a string
    b  dw  1000        ; 2 bytes — could be int16 or two chars
    c  dd  3.14        ; 4 bytes — assembler encodes float, but mov reads it as int
    d  dq  12345678    ; 8 bytes — 64-bit value

section .text
    global _start

_start:
    ; Same memory, two interpretations — assembler won't stop you
    mov  eax, [c]      ; reads 4 bytes as an integer (bit pattern of 3.14)
    movss xmm0, [c]    ; reads same 4 bytes as a 32-bit float — correct use

    ; Signed vs unsigned is purely an instruction choice
    mov  al, 0xFF
    movsx eax, al      ; sign-extend: eax = -1 (signed interpretation)
    movzx eax, al      ; zero-extend: eax = 255 (unsigned interpretation)
```

## Gotchas

- There is nothing preventing you from adding an integer to a pointer — the CPU will happily do it.
- Floating-point values live in a separate register file (x87 FPU or SSE/AVX XMM registers) and require dedicated instructions.
- Type confusion bugs in assembly produce silent data corruption, not compile errors or exceptions.
