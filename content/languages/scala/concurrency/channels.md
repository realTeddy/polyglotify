---
title: "Channels & Message Passing"
language: "scala"
feature: "channels"
category: "concurrency"
applicable: true
---

Scala does not have built-in channels. Message passing is available via Akka Actors (actor model), ZIO `Queue`/`Hub`, or Cats Effect `Queue`. Java's `BlockingQueue` can also be used directly. Akka is the most established actor framework for JVM Scala.

## Example

```scala
// Java BlockingQueue as a channel
import java.util.concurrent.LinkedBlockingQueue
import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

val channel = LinkedBlockingQueue[String](100)

val producer = Future {
  for i <- 1 to 5 do
    channel.put(s"message $i")
  channel.put("done")
}

val consumer = Future {
  var msg = channel.take()
  while msg != "done" do
    println(s"Received: $msg")
    msg = channel.take()
}

// ZIO Queue (functional, modern approach)
import zio.*
val program: ZIO[Any, Nothing, Unit] = for
  queue  <- Queue.bounded[String](10)
  _      <- queue.offer("hello").fork
  msg    <- queue.take
  _      <- Console.printLine(msg)
yield ()
```

## Gotchas

- `BlockingQueue.take()` blocks the calling thread indefinitely — ensure producers eventually terminate the channel
- Akka actor mailboxes are the canonical Scala message-passing mechanism for large systems
- ZIO `Queue` and Cats Effect `Queue` are non-blocking and composable — preferred for functional Scala
