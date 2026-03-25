---
title: "Sets"
language: "assembly"
feature: "sets"
category: "data-structures"
applicable: false
---

Assembly has no set data type. Sets are typically approximated with bit arrays (bitmaps) for small integer domains, or with sorted arrays and binary search for larger domains. A bitmap is the most idiomatic assembly approach: each bit represents membership of a value, and bitwise instructions (`bts`, `btr`, `bt`) test, set, and clear membership in a single instruction.

## Example

```nasm
; Bitmap set for integers 0-63 using a 64-bit register
section .text
    global _start

_start:
    xor  rax, rax         ; empty set (all bits 0)

    ; Add element 5
    bts  rax, 5           ; set bit 5  → rax |= (1 << 5)

    ; Add element 42
    bts  rax, 42

    ; Test membership of 5
    bt   rax, 5           ; CF=1 if bit 5 is set
    jc   is_member

    ; Remove element 5
    btr  rax, 5           ; clear bit 5

    ; Union: rax | rbx
    or   rax, rbx

    ; Intersection: rax & rbx
    and  rax, rbx

    ; Complement (NOT)
    not  rax

is_member:
    ; exit
    mov  rax, 60
    xor  rdi, rdi
    syscall
```

## Gotchas

- The bitmap approach only works for integer domains where the maximum value fits in available registers or a known-size memory block.
- For arbitrary types or large integer ranges, a hash-based set must be built from scratch or borrowed from a C library.
- `bt`/`bts`/`btr` with a memory operand and a large index walk into adjacent memory — use the register form when possible.
