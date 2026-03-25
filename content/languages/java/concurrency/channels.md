---
title: "Channels"
language: "java"
feature: "channels"
category: "concurrency"
applicable: true
---

Java provides `BlockingQueue<E>` as its channel-like abstraction for thread communication. `LinkedBlockingQueue` (unbounded or bounded) and `ArrayBlockingQueue` (bounded) support `put` (blocks when full) and `take` (blocks when empty), enabling safe producer-consumer patterns. Java 21 structured concurrency and virtual threads make these patterns even simpler.

## Example

```java
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicBoolean;

public class ChannelDemo {

    public static void main(String[] args) throws InterruptedException {
        // Bounded channel — buffer of 10 items
        BlockingQueue<Integer> channel = new ArrayBlockingQueue<>(10);
        AtomicBoolean done = new AtomicBoolean(false);

        // Producer thread
        Thread producer = Thread.ofVirtual().start(() -> {
            try {
                for (int i = 1; i <= 5; i++) {
                    channel.put(i);               // blocks if full
                    System.out.println("Sent: " + i);
                    Thread.sleep(5);
                }
                done.set(true);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        // Consumer thread
        Thread consumer = Thread.ofVirtual().start(() -> {
            try {
                while (!done.get() || !channel.isEmpty()) {
                    Integer value = channel.poll(50, TimeUnit.MILLISECONDS);
                    if (value != null) System.out.println("Received: " + value);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        producer.join();
        consumer.join();
    }
}
```

## Gotchas

- `BlockingQueue.take()` blocks indefinitely; always set a timeout with `poll(timeout, unit)` in real applications to allow graceful shutdown.
- `LinkedBlockingQueue` without a capacity argument is effectively unbounded — a fast producer can exhaust memory. Always specify a capacity in production.
