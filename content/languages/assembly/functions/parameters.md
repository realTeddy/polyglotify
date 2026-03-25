---
title: "Parameters & Arguments"
language: "assembly"
feature: "parameters"
category: "functions"
applicable: true
---

Parameter passing is governed entirely by the calling convention of the target platform. On x86-64 Linux (System V ABI), the first six integer/pointer arguments go in RDI, RSI, RDX, RCX, R8, R9; additional arguments are pushed on the stack. On Windows x64, the first four go in RCX, RDX, R8, R9. Floating-point arguments use XMM registers. There is no named parameter concept — registers are accessed by their hardware names.

## Example

```nasm
; System V AMD64 ABI (Linux/macOS)
; int compute(int a, int b, int c, int d, int e, int f, int g)
; rdi=a rsi=b rdx=c rcx=d r8=e r9=f  [rsp+8]=g (stack)
section .text
    global compute

compute:
    push rbp
    mov  rbp, rsp

    ; Access register parameters
    mov  rax, rdi       ; a
    add  rax, rsi       ; + b
    add  rax, rdx       ; + c
    add  rax, rcx       ; + d
    add  rax, r8        ; + e
    add  rax, r9        ; + f

    ; Access 7th argument from stack: [rbp+16]
    ; (rbp+0 = saved rbp, rbp+8 = return address, rbp+16 = 7th arg)
    add  rax, [rbp+16]  ; + g

    pop  rbp
    ret

; Caller:
_start:
    mov  rdi, 1
    mov  rsi, 2
    mov  rdx, 3
    mov  rcx, 4
    mov  r8,  5
    mov  r9,  6
    push 7              ; 7th argument goes on stack
    call compute
    add  rsp, 8         ; clean up stack argument (cdecl: caller cleans)
```

## Gotchas

- Stack arguments are pushed right-to-left in cdecl so the first stack arg lands at the lowest address.
- The callee must not modify register parameters it hasn't saved — this corrupts the caller's state.
- Variadic functions (like printf) require AL to hold the number of XMM registers used for floating-point args on System V.
