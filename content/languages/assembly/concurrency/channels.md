---
title: "Channels & Message Passing"
language: "assembly"
feature: "channels"
category: "concurrency"
applicable: false
---

Assembly has no channels. Message-passing concurrency is a high-level abstraction. In assembly, thread communication is done through shared memory with atomic synchronization instructions. A channel can be manually implemented as a lock-free ring buffer using `lock cmpxchg` (compare-and-swap) for the head and tail pointers — which is exactly how high-performance channel implementations in Go, Rust, and Java work internally.

## Example

```nasm
; Lock-free single-producer single-consumer ring buffer (SPSC channel)
; Uses memory barriers to avoid needing locks

section .data
    ; SPSC queue: head (writer), tail (reader), buffer
    head    dq 0
    tail    dq 0
    buf:    times 16 dq 0    ; 16-slot buffer

section .text
    global enqueue, dequeue

; enqueue(value) -> 1 on success, 0 if full
; rdi = value
enqueue:
    mov  rax, [rel head]
    mov  rcx, rax
    inc  rcx
    and  rcx, 15              ; rcx = (head+1) % 16
    cmp  rcx, [rel tail]
    je   .full
    mov  [rel buf + rax*8], rdi
    mfence                    ; store barrier
    mov  [rel head], rcx
    mov  eax, 1
    ret
.full:
    xor  eax, eax
    ret

; dequeue() -> value, or -1 if empty
dequeue:
    mov  rax, [rel tail]
    cmp  rax, [rel head]
    je   .empty
    mov  rcx, [rel buf + rax*8]
    inc  rax
    and  rax, 15
    mfence
    mov  [rel tail], rax
    mov  rax, rcx
    ret
.empty:
    mov  rax, -1
    ret
```

## Gotchas

- Memory ordering on x86 is relatively strong (Total Store Order), but `mfence` is still needed between the data write and the index update to prevent CPU reordering.
- On ARM or RISC-V, explicit acquire/release barriers are required; `mfence` is x86-specific.
- This SPSC queue is not safe with multiple producers or consumers — a mutex or `lock cmpxchg` loop is needed for MPMC.
