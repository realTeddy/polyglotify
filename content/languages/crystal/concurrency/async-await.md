---
title: "Async/Await"
language: "crystal"
feature: "async-await"
category: "concurrency"
applicable: false
---

Crystal does not have `async`/`await` syntax. Instead, Crystal uses **fibers** (cooperative green threads) and an **event loop** for non-blocking I/O. The standard library's HTTP server and TCP primitives are built on this fiber+event-loop model automatically. Libraries like `crystal-async` and the built-in `spawn` macro provide the concurrency primitives.

## Example

```crystal
# Crystal's concurrency model uses spawn (fibers) instead of async/await

require "wait_group"

wg = WaitGroup.new

3.times do |i|
  wg.add(1)
  spawn do
    sleep (rand * 0.1).seconds
    puts "fiber #{i} done"
    wg.done
  end
end

wg.wait
puts "all fibers done"

# Channel for communication (similar to async results)
ch = Channel(String).new

spawn do
  sleep 0.05.seconds
  ch.send "result from fiber"
end

puts ch.receive  # blocks until fiber sends
```

## Gotchas

- Crystal's fibers are cooperative — they yield control at I/O operations or explicit `Fiber.yield`.
- Unlike OS threads, fibers do not run in parallel on multiple CPU cores (unless using the experimental multi-threading feature).
- Crystal's standard HTTP server handles many connections concurrently using one fiber per connection on a shared event loop.
