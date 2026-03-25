---
title: "Structs & Classes"
language: "assembly"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

Assembly has no struct keyword, but many assemblers (NASM `struc`, MASM `STRUCT`) provide macros that define symbolic offset constants. At runtime, a struct is just a contiguous region of memory — a pointer to the start plus manually computed offsets to each field. Assemblers like NASM let you define `struc` blocks so the assembler computes offsets for you, reducing the chance of off-by-one errors.

## Example

```nasm
; NASM struc macro — defines symbolic offset constants
struc Point
    .x:  resd 1    ; offset 0, 4 bytes
    .y:  resd 1    ; offset 4, 4 bytes
endstruc          ; Point_size = 8

struc Person
    .age:    resb 1   ; offset 0
    .height: resw 1   ; offset 1 (careful: unaligned!)
    .score:  resd 1   ; offset 3 (may need padding)
endstruc

section .bss
    p1  resb Point_size

section .text
    global _start

_start:
    ; Set p1.x = 10, p1.y = 20
    lea  rdi, [rel p1]
    mov  dword [rdi + Point.x], 10
    mov  dword [rdi + Point.y], 20

    ; Read p1.x
    mov  eax, [rdi + Point.x]  ; eax = 10
```

## Gotchas

- Alignment padding is not inserted automatically by `struc` — misaligned fields cause performance penalties or faults on some architectures.
- NASM `struc` offsets are just numeric constants; no type information is retained.
- Passing structs to/from functions requires following the ABI's struct-passing rules (small structs in registers, larger ones via pointer).
