---
title: "Result Types"
language: "assembly"
feature: "result-types"
category: "error-handling"
applicable: false
---

Assembly has no result types. The closest idiom is the Unix system call convention: RAX holds the return value, and a negative value (specifically in the range -1 to -4095) signals an error whose absolute value is the errno code. Some codebases use a two-register convention: one register for the value, another for an error flag. All error propagation must be done manually — there is no `?` operator or monadic bind.

## Example

```nasm
; System call error-checking pattern (Linux x86-64)
; Analogous to: let fd = open(path)?;

section .data
    path  db "/tmp/test.txt", 0

section .text
    global _start

_start:
    ; open(path, O_RDONLY=0)
    mov  rax, 2            ; syscall: open
    lea  rdi, [rel path]
    xor  rsi, rsi          ; O_RDONLY
    xor  rdx, rdx
    syscall
    ; rax >= 0: file descriptor (success)
    ; rax in [-4095, -1]: -(errno)  (error)

    test rax, rax
    js   open_failed       ; jump if rax < 0

    ; success: rax = fd
    mov  r12, rax          ; save fd
    jmp  do_work

open_failed:
    neg  rax               ; rax = errno (e.g., 2 = ENOENT)
    ; handle error ...
    mov  rax, 60
    mov  rdi, 1
    syscall

do_work:
    ; use r12 as the valid fd
    mov  rax, 60
    xor  rdi, rdi
    syscall
```

## Gotchas

- Forgetting to check the return value of a syscall and using a negative "fd" in a subsequent syscall propagates the error silently, often causing a confusing EBADF later.
- The Linux kernel guarantees the -4095 to -1 range for errors; user-space library wrappers (libc) convert this to setting `errno` and returning -1, which is a different convention.
- There is no compile-time enforcement — unused error values are silently discarded.
