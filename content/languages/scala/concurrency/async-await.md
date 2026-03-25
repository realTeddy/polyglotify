---
title: "Async/Await"
language: "scala"
feature: "async-await"
category: "concurrency"
applicable: true
---

Scala uses `Future[T]` from `scala.concurrent` for asynchronous computation. `Future` is composed with `map`, `flatMap`, and `for` comprehensions. The `scala-async` library adds `async`/`await` macros. Cats Effect and ZIO provide more powerful effect systems.

## Example

```scala
import scala.concurrent.{Future, Await}
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.duration.*

// Creating a Future
val future: Future[Int] = Future {
  Thread.sleep(100)
  42
}

// Chaining with map/flatMap
val doubled = future.map(_ * 2)

// For comprehension (parallel execution)
val f1 = Future(fetchUser(1))
val f2 = Future(fetchUser(2))
val combined = for
  u1 <- f1   // f1 and f2 start in parallel
  u2 <- f2
yield (u1, u2)

// Error handling
future.recover { case e: Exception => -1 }
future.recoverWith { case e => Future.failed(e) }

// Awaiting (only at application boundary)
val result = Await.result(future, 5.seconds)

// scala-async (macro-based)
import scala.async.Async.{async, await}
val asyncResult: Future[String] = async {
  val n = await(future)
  s"Result: $n"
}
```

## Gotchas

- `Future` starts executing immediately upon creation; it is eagerly evaluated unlike a lazy description
- Blocking with `Await.result` in production code defeats the purpose of async; reserve it for tests and top-level main
- An `ExecutionContext` is required implicitly; avoid the global EC for CPU-bound work — use a dedicated thread pool
