---
title: "Function Declaration"
language: "assembly"
feature: "declaration"
category: "functions"
applicable: true
---

Assembly functions are just labels in the code segment. The calling convention (cdecl, System V AMD64 ABI, Win64, etc.) defines how arguments are passed and which registers must be preserved. A function begins at a label, sets up a stack frame with `push rbp` / `mov rbp, rsp`, and returns with `ret`. There is no function keyword — the structure is entirely convention-based.

## Example

```nasm
; NASM x86-64 Linux (System V AMD64 ABI)
section .text
    global _start
    global add_two

; int add_two(int a, int b)
; Arguments: rdi=a, rsi=b
; Return value: rax
add_two:
    push rbp
    mov  rbp, rsp       ; establish stack frame

    mov  rax, rdi       ; rax = a
    add  rax, rsi       ; rax = a + b

    pop  rbp
    ret                 ; return value already in rax

_start:
    mov  rdi, 10        ; first argument
    mov  rsi, 32        ; second argument
    call add_two        ; rax = 42

    ; exit syscall
    mov  rax, 60
    xor  rdi, rdi
    syscall
```

## Gotchas

- Caller-saved registers (rax, rcx, rdx, rsi, rdi, r8–r11) may be overwritten by a called function; save them before `call` if needed.
- Callee-saved registers (rbx, r12–r15, rbp) must be restored before `ret`.
- Stack must be 16-byte aligned before a `call` on most 64-bit ABIs; misalignment causes segfaults in SSE/AVX code.
