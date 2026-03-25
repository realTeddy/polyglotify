---
title: "Control Flow"
language: "assembly"
feature: "control-flow"
category: "basics"
applicable: true
---

Control flow in assembly is implemented entirely with jump instructions. There is no `if`, `while`, or `for` — only conditional and unconditional jumps based on CPU flags set by `cmp` or `test`. Loops are built by jumping backward to a label. The `loop` instruction decrements ECX and jumps if not zero. All high-level constructs compile down to these primitives.

## Example

```nasm
section .text
    global _start

_start:
    ; if (eax > 10) { ... } else { ... }
    mov  eax, 15
    cmp  eax, 10
    jle  else_branch
    ; "then" body
    mov  ebx, 1
    jmp  end_if
else_branch:
    mov  ebx, 0
end_if:

    ; while (ecx > 0) { ecx-- }
    mov  ecx, 5
while_loop:
    test ecx, ecx
    jz   while_done
    dec  ecx
    jmp  while_loop
while_done:

    ; for loop using LOOP instruction (counts down from ECX to 0)
    mov  ecx, 3
    xor  eax, eax
count_loop:
    add  eax, 10
    loop count_loop    ; dec ecx; jnz count_loop → eax = 30

    ; switch-like dispatch table
    mov  eax, 2
    jmp  [table + eax*4]
table:
    dd case0, case1, case2
case0: mov ebx, 100 ; jmp done
case1: mov ebx, 200 ; jmp done
case2: mov ebx, 300
```

## Gotchas

- All flag-based jumps read EFLAGS set by the *previous* comparison; accidentally inserting an instruction that modifies flags between `cmp` and `j*` breaks the logic silently.
- `loop` uses ECX specifically; using ECX for other purposes inside the loop corrupts iteration count.
- There is no fall-through protection — forgetting a `jmp` at the end of a "then" block will execute the "else" block immediately after.
