---
title: "Return Values"
language: "assembly"
feature: "return-values"
category: "functions"
applicable: true
---

Return values are passed back to the caller via registers. On x86-64 (System V ABI), integer/pointer results go in RAX; 128-bit results use RDX:RAX. Floating-point results go in XMM0. Structures small enough to fit in two registers are split across RAX and RDX; larger structures require the caller to allocate space and pass a pointer in RDI (the hidden first argument).

## Example

```nasm
section .text
    global _start

; Returns a single 64-bit integer in rax
double_it:
    mov  rax, rdi
    shl  rax, 1        ; rax = rdi * 2
    ret

; Returns a float (single precision) in xmm0
float_add:
    addss xmm0, xmm1   ; xmm0 = xmm0 + xmm1  (result stays in xmm0)
    ret

; Returns two values (packed into rdx:rax)
divmod:
    mov  rax, rdi      ; dividend
    xor  rdx, rdx      ; zero-extend for div
    div  rsi           ; rax = quotient, rdx = remainder
    ret                ; caller reads rax (quotient) and rdx (remainder)

_start:
    mov  rdi, 21
    call double_it     ; rax = 42

    mov  rdi, 100
    mov  rsi, 7
    call divmod        ; rax = 14, rdx = 2

    ; exit
    mov  rax, 60
    xor  rdi, rdi
    syscall
```

## Gotchas

- RAX is caller-saved; after any `call`, assume RAX has been overwritten — save it beforehand if you need the value.
- Returning large structs via the stack requires the caller to pre-allocate memory and pass the address as a hidden first argument — the ABI handles this automatically in C but must be done manually in assembly.
- Boolean returns are conventionally 0 (false) or 1 (true) in AL (low byte of RAX), but the entire RAX is set, so always zero-extend if the caller reads the full register.
