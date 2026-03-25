---
title: "Maps & Dictionaries"
language: "assembly"
feature: "maps"
category: "data-structures"
applicable: false
---

Assembly has no built-in map or dictionary type. Implementing a hash map in assembly means writing the hash function, collision resolution, load-factor tracking, and dynamic resizing entirely by hand — all in terms of raw memory operations. In practice, assembly programs that need maps either call a C library (via `libc` or a custom `.so`/`.dll`) or use a simple linear-search array for small key sets.

## Example

```nasm
; Minimal linear-search key-value store (integer keys, integer values)
; Structure: array of [key: dd, value: dd] pairs (8 bytes each)

section .data
    store  dd  1, 100   ; key=1, value=100
           dd  2, 200   ; key=2, value=200
           dd  3, 300   ; key=3, value=300
    store_len  equ 3

section .text
    global lookup

; lookup(int key) -> int value, or -1 if not found
; rdi = key
lookup:
    lea  rsi, [rel store]
    mov  ecx, store_len
.loop:
    cmp  ecx, 0
    jz   .not_found
    mov  eax, [rsi]        ; load current key
    cmp  eax, edi
    je   .found
    add  rsi, 8            ; next pair
    dec  ecx
    jmp  .loop
.found:
    mov  eax, [rsi + 4]    ; return value
    ret
.not_found:
    mov  eax, -1
    ret
```

## Gotchas

- Linear search is O(n); for large datasets, a real hash map must be implemented or borrowed from a library.
- The C standard library `hsearch`/`hcreate` functions are callable from assembly and provide basic hash-map functionality.
- Most real assembly programs that require maps are either calling back into a higher-level runtime or are part of a compiler-generated binary that never expresses maps in raw assembly.
