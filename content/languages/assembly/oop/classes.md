---
title: "Classes"
language: "assembly"
feature: "classes"
category: "oop"
applicable: false
---

Assembly has no classes. Object-oriented programming does not exist at the machine level. Classes, when compiled from C++ or Java, become: a data layout in memory (the instance), a vtable (an array of function pointers for virtual dispatch), and standalone functions that receive the object pointer as their first argument. Writing OOP patterns in raw assembly is possible but entirely manual and is never done in practice outside of educational exercises.

## Example

```nasm
; Hand-rolled "class" with a vtable — for illustration only
section .data
    ; vtable: array of function pointers
    dog_vtable:
        dq dog_speak    ; slot 0: virtual speak()

section .bss
    ; "object": [vtable_ptr(8), name_ptr(8), age(4)] = 20 bytes
    my_dog  resb 20

section .text
    global _start

dog_speak:
    ; rdi = this pointer — could print dog's name
    ret

_start:
    ; "Construct" the dog object
    lea  rax, [rel dog_vtable]
    lea  rbx, [rel my_dog]
    mov  [rbx], rax         ; vtable pointer at offset 0

    ; Virtual dispatch: dog.speak()
    mov  rax, [rbx]         ; load vtable pointer
    mov  rdi, rbx           ; this = &my_dog
    call [rax + 0]          ; call vtable slot 0 (speak)

    mov  rax, 60
    xor  rdi, rdi
    syscall
```

## Gotchas

- This is exactly what C++ compilers generate for virtual dispatch — the assembly is real, but writing it by hand defeats the purpose of using assembly.
- No compiler enforces encapsulation, access modifiers, or constructor/destructor ordering.
- If you need OOP, use a language that compiles to native code (C++, Rust, D) and inspect the disassembly if low-level analysis is the goal.
