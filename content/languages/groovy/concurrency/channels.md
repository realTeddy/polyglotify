---
title: "Channels & Message Passing"
language: "groovy"
feature: "channels"
category: "concurrency"
applicable: false
---

Groovy does not have built-in channels or message-passing primitives. The closest equivalents are Java's `BlockingQueue` implementations (e.g., `LinkedBlockingQueue`) for producer/consumer patterns, or the GPars library's actor model which provides Erlang-style message passing. For reactive streams, Project Reactor's `Flux`/`Mono` can be used from Groovy code.

## Example

```groovy
import java.util.concurrent.LinkedBlockingQueue
import java.util.concurrent.TimeUnit

// BlockingQueue as a channel
def channel = new LinkedBlockingQueue<String>(10)

// Producer thread
def producer = Thread.start {
    ["hello", "world", "groovy"].each { msg ->
        channel.put(msg)
        println "Sent: $msg"
        Thread.sleep(50)
    }
    channel.put("STOP")
}

// Consumer thread
def consumer = Thread.start {
    while (true) {
        def msg = channel.poll(1, TimeUnit.SECONDS)
        if (msg == null || msg == "STOP") break
        println "Received: $msg"
    }
}

producer.join()
consumer.join()
println "Done"

// GPars actors (if on classpath)
// import groovyx.gpars.actor.Actors
// def actor = Actors.actor {
//     loop { react { msg -> println "Actor got: $msg" } }
// }
// actor << "ping"
```

## Gotchas

- `BlockingQueue.put()` blocks when the queue is full; size the queue appropriately or use `offer()` with a timeout to avoid indefinite blocking.
- There is no built-in backpressure mechanism with `BlockingQueue`; fast producers can saturate memory even with a bounded queue if consumers are slow.
- GPars actors are a more robust solution for complex message-passing scenarios but require an additional dependency and are less actively maintained than Java's concurrency utilities.
