---
title: "Testing"
language: "assembly"
feature: "testing"
category: "ecosystem"
applicable: false
---

Assembly has no testing framework. Unit testing in assembly is done by writing test routines that call a function, compare the result to an expected value using `cmp`, and print pass/fail messages. In practice, assembly routines are almost always tested from a higher-level host language (C, Python via ctypes, Rust via FFI) that has proper testing infrastructure.

## Example

```nasm
; Minimal "test framework" in assembly
; Calls a function, checks result, prints PASS or FAIL

extern printf
extern exit

section .data
    pass_msg  db "PASS: %s", 10, 0
    fail_msg  db "FAIL: %s (got %d, expected %d)", 10, 0
    test1_name db "add_two(3,4)==7", 0

section .text
    global run_tests

; The function under test (from another file)
extern add_two

run_tests:
    push rbp
    mov  rbp, rsp

    ; Test: add_two(3, 4) should equal 7
    mov  rdi, 3
    mov  rsi, 4
    call add_two        ; rax = result

    cmp  rax, 7
    jne  .fail1

    ; PASS
    lea  rdi, [rel pass_msg]
    lea  rsi, [rel test1_name]
    xor  eax, eax
    call printf
    jmp  .done1

.fail1:
    lea  rdi, [rel fail_msg]
    lea  rsi, [rel test1_name]
    mov  rdx, rax       ; actual
    mov  rcx, 7         ; expected
    xor  eax, eax
    call printf

.done1:
    pop  rbp
    ret
```

## Gotchas

- Without a framework, test discovery, output formatting, and failure counting are all manual.
- The most practical approach is to export assembly functions with a C ABI and test them from C using a framework like Unity or from Rust with `#[test]`.
- Debuggers (GDB, LLDB, x64dbg) are the primary diagnostic tools; step-through debugging at the instruction level is how assembly code is verified in practice.
