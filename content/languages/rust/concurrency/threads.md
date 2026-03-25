---
title: "Threads"
language: "rust"
feature: "threads"
category: "concurrency"
applicable: true
---

Rust's ownership system enforces thread safety at compile time. `std::thread::spawn` launches an OS thread, and the closure must be `Send` (safe to transfer across threads) and `'static` (data must outlive the thread). `Arc<T>` enables shared ownership across threads, and `Mutex<T>` / `RwLock<T>` provide synchronized interior mutability.

## Example

```rust
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();
            *num += 1;
        });
        handles.push(handle);
    }

    for h in handles {
        h.join().unwrap();
    }

    println!("Result: {}", *counter.lock().unwrap());
}
```

## Gotchas

- Calling `lock()` on a `Mutex` that has been poisoned (locked by a thread that panicked) returns an `Err`; `unwrap()` re-panics — use `lock().unwrap_or_else(|e| e.into_inner())` to recover.
- `Rc<T>` is not `Send`; you must use `Arc<T>` for reference-counted sharing across threads.
- Deadlocks are not detected at compile time — the borrow checker only prevents data races, not logical ordering bugs.
