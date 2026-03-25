---
title: "Arrays & Lists"
language: "assembly"
feature: "arrays"
category: "data-structures"
applicable: true
---

Arrays in assembly are contiguous blocks of memory declared with repeated data directives or `resb`/`resd`/`resq` in `.bss`. Indexing is done manually with base+offset addressing: `[base + index*size]`. There are no bounds checks, no length tracking, and no dynamic resizing — those must all be implemented by the programmer.

## Example

```nasm
section .data
    nums  dd  10, 20, 30, 40, 50   ; array of 5 x 32-bit ints
    len   equ 5

section .bss
    result  resd 1

section .text
    global _start

_start:
    ; Access element: nums[2] = 30
    lea  rsi, [rel nums]
    mov  eax, [rsi + 2*4]    ; 2 * sizeof(dword) = 8 bytes offset

    ; Iterate and sum
    xor  eax, eax             ; sum = 0
    xor  ecx, ecx             ; index = 0
sum_loop:
    cmp  ecx, len
    jge  sum_done
    add  eax, [rsi + rcx*4]  ; sum += nums[ecx]
    inc  ecx
    jmp  sum_loop
sum_done:
    mov  [rel result], eax    ; store result

    ; exit
    mov  rax, 60
    xor  rdi, rdi
    syscall
```

## Gotchas

- There is no bounds checking — writing past the end of an array silently corrupts adjacent memory.
- Element size must be hardcoded into the addressing (`*1`, `*2`, `*4`, `*8` are the only scale factors the hardware supports directly).
- Dynamic arrays require `mmap`/`brk` (Linux) or `VirtualAlloc` (Windows) and manual reallocation logic.
