---
title: "Threads"
language: "java"
feature: "threads"
category: "concurrency"
applicable: true
---

Java has native thread support via `java.lang.Thread` and the higher-level `java.util.concurrent` package. The `ExecutorService` abstraction manages thread pools, making it easy to submit tasks and retrieve results via `Future<T>`. Java 21 introduces virtual threads (Project Loom) — lightweight threads that block cheaply, enabling millions of concurrent threads without the overhead of OS threads.

## Example

```java
import java.util.concurrent.*;
import java.util.List;
import java.util.ArrayList;

public class ThreadDemo {

    public static void main(String[] args) throws InterruptedException, ExecutionException {

        // Thread pool with ExecutorService
        try (ExecutorService pool = Executors.newFixedThreadPool(4)) {

            // Submit tasks
            List<Future<Integer>> futures = new ArrayList<>();
            for (int i = 1; i <= 8; i++) {
                final int num = i;
                futures.add(pool.submit(() -> {
                    // Simulated work
                    return num * num;
                }));
            }

            // Collect results
            int total = 0;
            for (Future<Integer> f : futures) {
                total += f.get();
            }
            System.out.println("Sum of squares 1-8: " + total); // 204
        } // pool.close() called automatically (Java 19+)

        // Virtual threads (Java 21) — one per task, scales to millions
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            var task = executor.submit(() -> {
                Thread.sleep(1); // blocking is cheap on virtual threads
                return Thread.currentThread().isVirtual(); // true
            });
            System.out.println("Is virtual: " + task.get());
        }

        // Structured concurrency (Java 21 preview)
        // try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
        //     var user  = scope.fork(() -> fetchUser(1));
        //     var order = scope.fork(() -> fetchOrder(1));
        //     scope.join().throwIfFailed();
        //     process(user.get(), order.get());
        // }
    }
}
```

## Gotchas

- Shared mutable state across threads requires synchronization (`synchronized`, `ReentrantLock`, or atomic classes). Forgetting synchronization causes data races that are hard to reproduce.
- Prefer `ExecutorService` over raw `Thread` — managing thread lifecycle manually is error-prone. Use virtual threads (Java 21+) for I/O-bound workloads instead of large thread pools.
