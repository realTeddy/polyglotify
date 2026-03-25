---
title: "Style Conventions"
language: "assembly"
feature: "style-conventions"
category: "idioms"
applicable: true
---

Assembly has no official style guide, but widely followed conventions exist. Labels use `snake_case`; local labels within a function start with a dot (`.loop`, `.done`) in NASM. Section directives and mnemonics are lowercase. Comments after instructions use `;`. Registers are lowercase (`rax`, not `RAX`). Each instruction is one per line. Column alignment of mnemonics, operands, and comments improves readability significantly.

## Example

```nasm
; ============================================================
; string_length - compute length of a null-terminated string
; Arguments:  rdi = pointer to string
; Returns:    rax = length (not including null terminator)
; Clobbers:   rax, rcx
; ============================================================
section .text
    global string_length

string_length:
    push    rbp
    mov     rbp, rsp

    xor     eax, eax            ; length counter = 0
    mov     rcx, rdi            ; save start pointer

.scan_loop:
    cmp     byte [rdi], 0       ; check for null terminator
    je      .done
    inc     rdi                 ; advance pointer
    jmp     .scan_loop

.done:
    sub     rdi, rcx            ; length = end - start
    mov     rax, rdi

    pop     rbp
    ret
```

## Gotchas

- Document every function's ABI contract: arguments (by register name), return value, and clobbered registers. Without this, callers cannot safely use the function.
- Use local labels (`.loop`, `.done`) inside functions to avoid global namespace pollution — global labels are exported by the linker.
- Align `section .text` code to 16-byte boundaries for instruction cache efficiency: use `align 16` before hot functions.
- Listing files (`nasm -l output.lst`) show the hex encoding alongside source lines and are invaluable for verifying instruction sizes and offsets.
