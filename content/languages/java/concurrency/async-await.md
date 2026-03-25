---
title: "Async / Await"
language: "java"
feature: "async-await"
category: "concurrency"
applicable: true
---

Java does not have `async/await` syntax, but `CompletableFuture<T>` (Java 8+) provides equivalent composable asynchronous programming. `thenApply`, `thenCompose`, `thenCombine`, and `exceptionally` chain async operations functionally. Java 21 Virtual Threads (Project Loom) offer a simpler alternative: write blocking code on lightweight threads that scale like async without callback chains.

## Example

```java
import java.util.concurrent.*;
import java.util.concurrent.CompletableFuture;

public class AsyncDemo {

    // Simulate async operation
    static CompletableFuture<String> fetchUser(int id) {
        return CompletableFuture.supplyAsync(() -> {
            // Simulated delay
            try { Thread.sleep(10); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
            return "User#" + id;
        });
    }

    static CompletableFuture<Integer> fetchScore(String user) {
        return CompletableFuture.supplyAsync(() -> user.length() * 10);
    }

    public static void main(String[] args) throws ExecutionException, InterruptedException {
        // Sequential chaining (flatMap equivalent)
        CompletableFuture<String> result = fetchUser(1)
            .thenCompose(user -> fetchScore(user)
                .thenApply(score -> user + " scored " + score));

        System.out.println(result.get()); // User#1 scored 70

        // Parallel and combine
        CompletableFuture<String> u1 = fetchUser(1);
        CompletableFuture<String> u2 = fetchUser(2);
        CompletableFuture<String> combined = u1.thenCombine(u2,
            (a, b) -> a + " and " + b);
        System.out.println(combined.get());

        // Error handling
        CompletableFuture<String> safe = fetchUser(-1)
            .exceptionally(ex -> "Unknown user");

        // Java 21: virtual thread (blocking style, scales like async)
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            Future<String> f = executor.submit(() -> {
                Thread.sleep(10); // blocking is OK on virtual threads
                return "virtual result";
            });
            System.out.println(f.get());
        }
    }
}
```

## Gotchas

- `CompletableFuture.get()` blocks the calling thread and throws checked exceptions; in non-blocking code, chain with `thenApply`/`thenAccept` instead.
- `supplyAsync` uses the common `ForkJoinPool` by default; for I/O-heavy work provide a dedicated executor to avoid starving the pool.
