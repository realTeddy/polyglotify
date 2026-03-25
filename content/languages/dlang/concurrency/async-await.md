---
title: "Async/Await"
language: "dlang"
feature: "async-await"
category: "concurrency"
applicable: false
---

D has no `async`/`await` keywords built into the language. Asynchronous programming in D is typically achieved through one of three approaches: the `vibe.d` framework (which provides fiber-based async I/O with an `await`-like API using fibers), `std.concurrency` message-passing with threads, or manual use of `core.thread.Fiber` (stackful coroutines). The `eventcore` and `vibe-core` libraries provide event-loop driven async similar to Node.js or Python asyncio.

## Example

```d
// Using vibe.d for async-like I/O (fiber-based)
// dub.json: { "dependencies": { "vibe-d": "~>0.9" } }

/+ vibe.d example (not runnable without vibe-d installed)
import vibe.d;

void handleRequest(HTTPServerRequest req, HTTPServerResponse res)
{
    // Fiber suspends here while waiting for the HTTP response
    auto resp = requestHTTP("http://example.com/api");
    res.writeBody(resp.bodyReader.readAllUTF8());
}

shared static this()
{
    auto settings = new HTTPServerSettings;
    settings.port = 8080;
    listenHTTP(settings, &handleRequest);
}
+/

// Without vibe.d: manual fiber coroutine
import core.thread : Fiber;
import std.stdio;

void coroutine()
{
    writeln("step 1");
    Fiber.yield();
    writeln("step 2");
    Fiber.yield();
    writeln("step 3");
}

void main()
{
    auto f = new Fiber(&coroutine);
    f.call();   // step 1
    f.call();   // step 2
    f.call();   // step 3
}
```

## Gotchas

- `core.thread.Fiber` is a stackful coroutine, not an async task — you must manually drive the event loop or scheduler.
- `vibe.d` provides the most ergonomic async I/O for D but is a large dependency with its own event loop.
- D does not have a standard async runtime in the way Rust has `tokio` or Python has `asyncio`; the ecosystem is fragmented.
