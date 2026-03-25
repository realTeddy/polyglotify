---
title: "Variables & Declaration"
language: "assembly"
feature: "variables"
category: "basics"
applicable: true
---

Assembly has no variables in the high-level sense. Named storage is declared in the data segment using assembler directives. The "variable" is really a label that the assembler resolves to a memory address. Registers (EAX, EBX, ECX, EDX, etc.) serve as fast temporary storage and are the primary working locations for most operations.

## Example

```nasm
section .data
    counter  dd 0          ; 32-bit double-word, initialized to 0
    message  db "hello", 0 ; byte array (null-terminated string)
    pi_val   dq 3.14       ; 64-bit quad-word (float)

section .bss
    buffer   resb 64       ; reserve 64 uninitialized bytes

section .text
    global _start

_start:
    ; Load counter into a register, modify it, store back
    mov  eax, [counter]   ; load from memory into EAX
    inc  eax              ; increment register
    mov  [counter], eax   ; store back to memory

    ; Use a register as a temporary variable
    mov  ecx, 42
    mov  edx, ecx         ; "copy" ecx to edx
```

## Gotchas

- Registers are shared and have no names — overwriting a register destroys its previous value with no warning.
- Memory addresses are fixed at assemble/link time for `.data`/`.bss`; stack-local "variables" require manual `esp`/`rbp` arithmetic.
- Assembler syntax differs between NASM, MASM, GAS (AT&T), and others — `mov eax, [counter]` (Intel) vs `movl counter, %eax` (AT&T).
