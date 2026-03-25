---
title: "Async/Await"
language: "rust"
feature: "async-await"
category: "concurrency"
applicable: true
---

Rust has native `async`/`await` syntax for writing non-blocking concurrent code. An `async fn` returns a `Future` that must be driven to completion by an executor. Rust's standard library provides the `Future` trait but no built-in executor; the `tokio` and `async-std` runtimes are the most widely used. `async` enables high-performance I/O without OS threads.

## Example

```rust
use tokio::time::{sleep, Duration};

async fn fetch_data(id: u32) -> String {
    sleep(Duration::from_millis(10)).await;
    format!("data from {id}")
}

#[tokio::main]
async fn main() {
    // Run concurrently with join!
    let (a, b) = tokio::join!(
        fetch_data(1),
        fetch_data(2),
    );
    println!("{a}");
    println!("{b}");

    // Spawn a task
    let handle = tokio::spawn(async {
        fetch_data(3).await
    });
    println!("{}", handle.await.unwrap());
}
```

## Gotchas

- `async` functions are lazy — calling an `async fn` does nothing until the returned `Future` is `.await`ed or spawned onto an executor.
- You cannot use `async fn` in traits on stable Rust without the `async-trait` crate (though this is improving with native async fn in traits).
- Blocking calls (file I/O, `thread::sleep`, CPU-intensive work) inside an async context block the executor thread; use `tokio::task::spawn_blocking` to offload them.
