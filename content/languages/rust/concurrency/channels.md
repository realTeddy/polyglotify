---
title: "Channels & Message Passing"
language: "rust"
feature: "channels"
category: "concurrency"
applicable: true
---

Rust's standard library provides multi-producer, single-consumer (mpsc) channels via `std::sync::mpsc`. For async code, `tokio::sync::mpsc` and `tokio::sync::broadcast` offer async-aware channel variants. Channels enforce ownership: sending a value moves it into the channel, preventing data races by construction.

## Example

```rust
use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();

    let tx2 = tx.clone(); // multiple producers
    thread::spawn(move || {
        tx.send("hello from thread 1").unwrap();
    });
    thread::spawn(move || {
        tx2.send("hello from thread 2").unwrap();
    });

    // Drop senders; rx will return Err when all senders are gone
    for msg in rx {
        println!("{msg}");
    }
}
```

## Gotchas

- `mpsc` is single-consumer; for multiple consumers use `Arc<Mutex<Receiver>>` or switch to a library like `crossbeam-channel` which provides multi-producer, multi-consumer channels.
- `recv()` blocks until a message is available or all senders are dropped; `try_recv()` is non-blocking and returns `Err(TryRecvError::Empty)` immediately if no message is ready.
- Sending a value transfers ownership; the receiver owns the value after `recv()` returns, which eliminates the need for shared-memory synchronization.
