---
title: "Async/Await"
language: "assembly"
feature: "async-await"
category: "concurrency"
applicable: false
---

Assembly has no async/await. Async/await is a language-level abstraction for cooperative concurrency that compilers lower to state machines. In assembly, the equivalent is either cooperative multitasking implemented by manually saving and restoring register state (a coroutine trampoline), or using OS-level non-blocking I/O (`epoll`, `io_uring`, `kqueue`) with a hand-written event loop. Both approaches are complex and error-prone in assembly.

## Example

```nasm
; Minimal coroutine context switch (saves/restores callee-saved registers)
; This is what an async runtime does under the hood

struc Coro
    .rsp:  resq 1    ; saved stack pointer
    .r15:  resq 1
    .r14:  resq 1
    .r13:  resq 1
    .r12:  resq 1
    .rbx:  resq 1
    .rbp:  resq 1
endstruc

section .text
    global coro_switch

; coro_switch(Coro* from, Coro* to)
; rdi = from context, rsi = to context
coro_switch:
    ; Save current context
    mov  [rdi + Coro.r15], r15
    mov  [rdi + Coro.r14], r14
    mov  [rdi + Coro.rbx], rbx
    mov  [rdi + Coro.rbp], rbp
    mov  [rdi + Coro.rsp], rsp

    ; Restore target context
    mov  r15, [rsi + Coro.r15]
    mov  r14, [rsi + Coro.r14]
    mov  rbx, [rsi + Coro.rbx]
    mov  rbp, [rsi + Coro.rbp]
    mov  rsp, [rsi + Coro.rsp]

    ret   ; "returns" into the to-context's saved instruction pointer
```

## Gotchas

- This is essentially what every async runtime (Tokio, Go's goroutine scheduler, libuv) does in its context-switch hot path — often written in assembly for exactly this reason.
- Signal safety is a major concern: a signal arriving mid-switch corrupts the register file.
- Stack overflow in a manually managed coroutine stack is silent and catastrophic — no guard pages by default.
