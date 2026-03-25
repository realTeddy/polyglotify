---
title: "Threads"
language: "crystal"
feature: "threads"
category: "concurrency"
applicable: true
---

Crystal has experimental multi-threading support enabled with the `-Dpreview_mt` compiler flag. By default, Crystal uses a single OS thread with cooperative fibers. With multi-threading enabled, fibers can be scheduled across multiple OS threads. `Mutex` and `Channel` are the primary synchronization primitives.

## Example

```crystal
# Without -Dpreview_mt: single-threaded fiber scheduling
# With -Dpreview_mt: fibers distributed across OS threads

require "mutex"

counter = 0
mutex = Mutex.new
done = Channel(Nil).new

10.times do
  spawn do
    100.times do
      mutex.synchronize { counter += 1 }
    end
    done.send(nil)
  end
end

10.times { done.receive }
puts counter  # => 1000

# Fiber-based worker pool
jobs = Channel(Int32).new(20)
results = Channel(Int32).new(20)

4.times do
  spawn do
    loop do
      job = jobs.receive? || break
      results.send(job * job)
    end
  end
end

(1..10).each { |i| jobs.send(i) }
jobs.close

10.times { print "#{results.receive} " }
```

## Gotchas

- Multi-threading (`-Dpreview_mt`) is still experimental as of Crystal 1.x; race conditions become possible when shared state is accessed without synchronization.
- `spawn` always creates a fiber, not an OS thread; the scheduler decides which thread runs it.
- `Mutex#synchronize` is safe in both single-threaded and multi-threaded modes.
