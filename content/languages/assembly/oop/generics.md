---
title: "Generics"
language: "assembly"
feature: "generics"
category: "oop"
applicable: false
---

Assembly has no generics. Generics are erased at compile time (monomorphization in Rust/C++, type erasure in Java/Go). At the assembly level, a generic function compiled for `i32` and the same function compiled for `f64` produce two completely separate instruction sequences. There is no assembly concept that corresponds to a "type parameter" — all types are resolved to concrete sizes and operations before any assembly is generated.

## Example

```nasm
; A generic swap<T>(a: *T, b: *T) specialized for 4-byte types
; (The compiler would generate a separate version for each concrete T)

section .text
    global swap_dword

; swap_dword(int* a, int* b)  — the i32 monomorphization
; rdi = a, rsi = b
swap_dword:
    mov  eax, [rdi]    ; tmp = *a
    mov  ecx, [rsi]    ; ecx = *b
    mov  [rdi], ecx    ; *a = *b
    mov  [rsi], eax    ; *b = tmp
    ret

; For a different size, a different routine is needed:
; swap_qword — the i64 monomorphization
swap_qword:
    mov  rax, [rdi]
    mov  rcx, [rsi]
    mov  [rdi], rcx
    mov  [rsi], rax
    ret
```

## Gotchas

- Monomorphized code is what assembly already is — every instruction targets an exact operand size.
- Type-erased generics (Java/Go style) use a uniform representation (pointer-sized values) and cast at the boundaries; this appears in assembly as loads/stores of pointer-width values plus function pointer calls.
- Macros in NASM/MASM can simulate generic code at the source level: the macro expands into type-specific instructions, similar to C macro-based templates.
