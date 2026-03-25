---
title: "Interfaces & Traits"
language: "assembly"
feature: "interfaces"
category: "oop"
applicable: false
---

Assembly has no interfaces or traits. These are type-system abstractions that do not survive compilation. At the machine level, an interface method call is an indirect call through a function pointer (from a vtable or a fat pointer pair). The "contract" enforced by an interface in a high-level language is enforced at compile time only — by the time code reaches assembly, it is just a `call [rax]` with no type information remaining.

## Example

```nasm
; What a Rust trait object (dyn Trait) looks like in assembly:
; A fat pointer = (data_ptr, vtable_ptr)
; The vtable contains: destructor, size, align, then method pointers

; Equivalent of: let s: &dyn Drawable = &circle;  s.draw();
section .data
    circle_vtable:
        dq circle_drop    ; destructor slot
        dq 16             ; size of Circle
        dq 8              ; align of Circle
        dq circle_draw    ; draw() method

section .text
circle_draw:
    ; rdi = pointer to Circle data
    ret

circle_drop:
    ret

_start:
    ; "Fat pointer" is two registers: rdi=data, rsi=vtable
    lea  rdi, [rel my_circle]
    lea  rsi, [rel circle_vtable]

    ; Dynamic dispatch: call draw()
    mov  rax, [rsi + 24]   ; vtable slot 3 = draw
    call rax               ; rdi already points to data
```

## Gotchas

- The vtable layout is ABI-specific and not standardized across languages.
- Forgetting to initialize or update a vtable slot produces a call to a garbage address, causing a segfault.
- Rust's trait objects, C++ virtual functions, and Go interfaces all use variations of this pattern but with different vtable layouts.
