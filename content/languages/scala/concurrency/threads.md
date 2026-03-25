---
title: "Threads"
language: "scala"
feature: "threads"
category: "concurrency"
applicable: true
---

Scala runs on the JVM and has full access to Java threads. However, idiomatic Scala uses higher-level abstractions: `Future` for async tasks, Akka actors for concurrency, or Cats Effect / ZIO fibers for functional programming. Raw threads are rarely used directly.

## Example

```scala
// Raw Java thread (rarely used)
val thread = new Thread(() => println("Running in thread"))
thread.start()
thread.join()

// Executors (more idiomatic)
import java.util.concurrent.Executors
import scala.concurrent.{ExecutionContext, Future}

val executor = Executors.newFixedThreadPool(4)
implicit val ec: ExecutionContext = ExecutionContext.fromExecutor(executor)

val futures = (1 to 10).map(i => Future {
  println(s"Task $i on ${Thread.currentThread.getName}")
  i * 2
})

// Combining results
import scala.concurrent.Future
Future.sequence(futures).foreach(results => println(results.sum))

// Synchronization with @volatile and AtomicInteger
import java.util.concurrent.atomic.AtomicInteger
val counter = AtomicInteger(0)
(1 to 100).map(_ => Future(counter.incrementAndGet())).foreach(identity)
```

## Gotchas

- Shared mutable state requires explicit synchronization — prefer immutable data and message-passing
- The `global` ExecutionContext uses a fork-join pool; do not block inside it (use `blocking {}` to signal blocking calls)
- Consider Cats Effect `IO` or ZIO for structured concurrency with proper resource management and cancellation
