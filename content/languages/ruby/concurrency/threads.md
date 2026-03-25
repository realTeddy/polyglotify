---
title: "Threads"
language: "ruby"
feature: "threads"
category: "concurrency"
applicable: true
---

Ruby's `Thread` class provides OS-level threads. In MRI (the standard Ruby implementation), the Global Interpreter Lock (GIL) prevents true parallel execution of Ruby code, so threads are most useful for I/O-bound concurrency. JRuby and TruffleRuby lack a GIL and support true parallelism.

## Example

```ruby
require 'thread'

# Create and start a thread
t = Thread.new do
  puts "Thread running"
  sleep(1)
  "thread result"
end

# Do other work...
puts "Main continues"

# Wait for thread and get return value
result = t.value   # => "thread result"

# Mutex for thread-safe shared state
mutex = Mutex.new
counter = 0

threads = 10.times.map do
  Thread.new do
    mutex.synchronize { counter += 1 }
  end
end
threads.each(&:join)
puts counter  # => 10

# Thread-local variables
Thread.current[:request_id] = "abc123"
```

## Gotchas

- The GIL in MRI means CPU-bound tasks do not benefit from threading; use `Process.fork` or Ractors for CPU parallelism
- Always use `Mutex#synchronize` or `Queue` to protect shared mutable state
- An unhandled exception in a thread does not crash the main program unless `Thread.abort_on_exception = true`
