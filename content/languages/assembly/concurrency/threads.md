---
title: "Threads"
language: "assembly"
feature: "threads"
category: "concurrency"
applicable: true
---

Threads in assembly are created via OS syscalls: `clone` on Linux (with appropriate flags), `CreateThread` on Windows, or `pthread_create` via libc. There is no thread keyword — threads are OS-managed execution contexts that share the process address space. Synchronization primitives (mutexes, semaphores) are either implemented using atomic instructions (`lock cmpxchg`, `lock xadd`) or by calling OS APIs.

## Example

```nasm
; Linux x86-64: create a thread via pthread_create (calling libc)
; Equivalent to: pthread_create(&tid, NULL, thread_fn, arg);

extern pthread_create
extern pthread_join

section .data
    tid  dq 0

section .text
    global _start

thread_fn:
    ; Thread body — rdi = argument pointer
    ; Do work here
    xor  eax, eax          ; return NULL
    ret

_start:
    ; pthread_create(&tid, NULL, thread_fn, NULL)
    lea  rdi, [rel tid]    ; &tid
    xor  rsi, rsi          ; attr = NULL
    lea  rdx, [rel thread_fn]
    xor  rcx, rcx          ; arg = NULL
    call pthread_create

    ; pthread_join(tid, NULL)
    mov  rdi, [rel tid]
    xor  rsi, rsi
    call pthread_join

    mov  rax, 60
    xor  rdi, rdi
    syscall
```

## Gotchas

- Using the raw `clone` syscall requires manually setting up the child stack (allocating memory and passing the top of it as the stack pointer argument).
- Shared mutable data between threads requires atomic operations or OS mutexes — there is nothing preventing a data race at the assembly level.
- Thread-local storage (TLS) is accessed via the FS segment register on Linux x86-64 (`mov rax, fs:[offset]`).
