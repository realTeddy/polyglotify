---
title: "Closures & Lambdas"
language: "assembly"
feature: "closures"
category: "functions"
applicable: false
---

Assembly has no closures or lambdas. There is no concept of capturing an enclosing scope — every function is simply a labeled entry point in the code segment. The closest approximation is manually threading a "context" pointer (a struct containing the captured values) through every call, which is exactly what compilers do when they lower closures to machine code.

## Example

```nasm
; Manual "closure" simulation: pass a context pointer
; Equivalent to: auto adder = [base](int x) { return base + x; };

section .data
    ctx_base  dd 10    ; the "captured" variable

section .text
    global _start

; "Closure body": adder(ctx*, int x) -> int
; rdi = pointer to context (captured base)
; rsi = x
adder:
    mov  eax, [rdi]    ; load base from context
    add  eax, esi      ; add x
    ret

_start:
    lea  rdi, [rel ctx_base]  ; pass context pointer
    mov  rsi, 5
    call adder         ; returns 15

    mov  rax, 60
    xor  rdi, rdi
    syscall
```

## Gotchas

- Languages that support closures (C++, Rust, Go) compile them to exactly this pattern internally: a function pointer plus a context/environment pointer.
- Dynamic code generation (writing `call` instructions into executable memory at runtime) can simulate closures but requires `mmap`/`VirtualAlloc` with execute permissions and is a significant security risk.
- There is no garbage collection for closure environments — lifetime management is entirely manual.
