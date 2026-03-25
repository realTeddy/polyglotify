---
title: "Operators"
language: "assembly"
feature: "operators"
category: "basics"
applicable: true
---

Assembly has no operator syntax. Instead, each operation is an explicit instruction mnemonic. Arithmetic (`add`, `sub`, `mul`, `imul`, `div`, `idiv`), bitwise (`and`, `or`, `xor`, `not`, `shl`, `shr`), and comparison (`cmp`, `test`) instructions are the building blocks. The result of a comparison sets flags in the EFLAGS register, which are then read by conditional jump instructions.

## Example

```nasm
section .text
    global _start

_start:
    ; Arithmetic
    mov  eax, 10
    add  eax, 5        ; eax = 15
    sub  eax, 3        ; eax = 12
    imul eax, 2        ; eax = 24  (signed multiply)

    ; Division: dividend in EDX:EAX, divisor in operand
    mov  eax, 100
    cdq                ; sign-extend EAX into EDX:EAX
    mov  ecx, 7
    idiv ecx           ; eax = quotient (14), edx = remainder (2)

    ; Bitwise
    mov  ebx, 0b1010
    and  ebx, 0b1100   ; ebx = 0b1000
    or   ebx, 0b0011   ; ebx = 0b1011
    xor  ebx, ebx      ; ebx = 0  (fastest way to zero a register)
    shl  eax, 1        ; eax = eax * 2 (left shift)
    shr  eax, 1        ; eax = eax / 2 (logical right shift)

    ; Comparison (sets flags, no result written)
    cmp  eax, 10       ; subtract and discard, set ZF/CF/SF
    je   equal_label   ; jump if equal (ZF=1)
    test eax, eax      ; eax AND eax, sets ZF if eax==0

equal_label:
    nop
```

## Gotchas

- `mul`/`div` operate on unsigned values; use `imul`/`idiv` for signed.
- `div` with a zero divisor raises an interrupt (#DE — divide error), crashing the program.
- `xor reg, reg` to zero a register is faster and shorter than `mov reg, 0` and is idiomatic in optimized code.
