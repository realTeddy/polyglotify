---
title: "Tuples"
language: "assembly"
feature: "tuples"
category: "data-structures"
applicable: false
---

Assembly has no tuples. The concept of a fixed-size heterogeneous collection with named or positional fields does not exist at the machine level. The equivalent is a manually laid-out struct in memory: you allocate a block, document the offsets yourself, and access fields with base+offset addressing. Returning multiple values from a function uses register pairs (RAX + RDX on x86-64) for small tuples, or a pointer to a caller-allocated struct for larger ones.

## Example

```nasm
; Simulate a (quotient, remainder) tuple returned in rax:rdx
section .text
    global divmod

; divmod(int a, int b) -> (quotient in rax, remainder in rdx)
divmod:
    mov  rax, rdi
    xor  rdx, rdx
    div  rsi           ; rax = quotient, rdx = remainder
    ret                ; both values returned simultaneously

; Caller reads the "tuple":
_start:
    mov  rdi, 17
    mov  rsi, 5
    call divmod
    ; rax = 3 (quotient)
    ; rdx = 2 (remainder)

    ; Memory-based tuple (struct on stack)
    sub  rsp, 16         ; allocate 2 x 8-byte fields
    mov  [rsp],   rax    ; field 0 = quotient
    mov  [rsp+8], rdx    ; field 1 = remainder
    ; ... use them ...
    add  rsp, 16         ; free
```

## Gotchas

- The caller must know the layout of every field by convention — there is no metadata.
- More than two return values require a pointer to caller-allocated memory passed as the first argument (the hidden "sret" argument).
- Forgetting to clean the stack after using stack-based tuples corrupts the return address and causes a crash.
