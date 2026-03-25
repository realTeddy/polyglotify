---
title: "Common Patterns"
language: "assembly"
feature: "common-patterns"
category: "idioms"
applicable: true
---

Assembly idioms are patterns that generate smaller or faster code than the obvious approach. Common ones include: zeroing a register with `xor reg, reg` (smaller encoding than `mov reg, 0`), testing for zero with `test reg, reg` (cheaper than `cmp reg, 0`), multiplying by powers of two with `shl`, using `lea` for multi-operand arithmetic without touching flags, and the `cdq`/`cqo` sign-extension before division.

## Example

```nasm
section .text
    global _start

_start:
    ; --- Zeroing registers ---
    xor  eax, eax          ; eax = 0, also zeroes upper 32 bits of rax
    ; vs: mov eax, 0       ; same effect, larger encoding

    ; --- Test for zero without cmp ---
    test rax, rax          ; sets ZF if rax==0
    jz   is_zero

    ; --- Multiply by constant using LEA (no flags modified) ---
    lea  rax, [rdi + rdi*2]  ; rax = rdi * 3
    lea  rax, [rdi*4]        ; rax = rdi * 4
    lea  rax, [rdi + rdi*4]  ; rax = rdi * 5

    ; --- Conditional move (branch-free) ---
    mov  eax, 1
    mov  ecx, 2
    cmp  rdi, 10
    cmovg eax, ecx           ; if rdi > 10: eax = 2, else stays 1

    ; --- Absolute value (branch-free) ---
    mov  rax, rdi
    cdq                      ; sign-extend rax into rdx (rdx = 0 or -1)
    xor  rax, rdx
    sub  rax, rdx            ; rax = |rdi|

    ; --- Stack alignment check ---
    ; Before a call, RSP must be 16-byte aligned:
    and  rsp, -16            ; align down to 16-byte boundary

is_zero:
    mov  rax, 60
    xor  rdi, rdi
    syscall
```

## Gotchas

- `xor eax, eax` zeroes the full 64-bit RAX on x86-64 because any 32-bit operation zero-extends into the upper 32 bits.
- `cmov` is not always faster than a branch — on well-predicted branches, the branch predictor wins; `cmov` is better for unpredictable branches.
- `lea` with a scale factor only supports *1, *2, *4, *8; other multipliers require combinations or `imul`.
