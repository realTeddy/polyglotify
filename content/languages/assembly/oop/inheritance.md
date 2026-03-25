---
title: "Inheritance"
language: "assembly"
feature: "inheritance"
category: "oop"
applicable: false
---

Assembly has no inheritance. The concept is a compiler abstraction. When C++ compiles a derived class, it lays the base class fields at the beginning of the derived class's memory layout so that a pointer to the derived object is also a valid pointer to the base. The vtable of the derived class contains overridden function pointers. All of this is invisible at the assembly level — it is just memory layout and function pointer tables.

## Example

```nasm
; Illustrating how a C++ compiler flattens inheritance
; class Animal { int age; virtual void speak(); };
; class Dog : Animal { int breed; void speak() override; };

; Dog object memory layout (compiler-generated):
;   [0]  vtable_ptr (8 bytes) — points to Dog's vtable
;   [8]  age        (4 bytes) — inherited from Animal
;   [12] breed      (4 bytes) — Dog-specific field

; Dog vtable:
;   [0]  dog_speak  — overrides Animal::speak

section .data
    dog_vtable  dq dog_speak

section .text
dog_speak:
    ; rdi = this (Dog*)
    ; Can read age at [rdi+8], breed at [rdi+12]
    ret

; "Upcasting" (Dog* → Animal*) is a no-op:
; the vtable pointer is always at offset 0, so an Animal* and Dog*
; to the same object hold the same address value.
```

## Gotchas

- Multiple inheritance produces more complex vtable layouts (multiple vtable pointers) and sometimes requires pointer adjustments (`thunk` functions) to correct `this`.
- None of these invariants are enforced by the assembler — a bug in the vtable setup causes silent wrong-function calls.
- If you are writing assembly to analyze inheritance, use a C++ compiler with `-fdump-rtl-*` or inspect output with `objdump -C` rather than constructing vtables manually.
