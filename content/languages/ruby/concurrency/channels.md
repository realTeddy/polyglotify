---
title: "Channels & Message Passing"
language: "ruby"
feature: "channels"
category: "concurrency"
applicable: false
---

Ruby does not have built-in channels. Thread-safe message passing is achieved via `Queue` (from the standard library) or `SizedQueue`. Ruby 3.0 introduced `Ractor`, which provides actor-style isolated concurrency with message passing as the primary communication mechanism.

## Example

```ruby
require 'thread'

# Queue as a channel between threads
queue = Queue.new

producer = Thread.new do
  5.times do |i|
    queue << "message #{i}"
    sleep(0.1)
  end
  queue << :done
end

consumer = Thread.new do
  loop do
    msg = queue.pop
    break if msg == :done
    puts "Received: #{msg}"
  end
end

[producer, consumer].each(&:join)

# Ractor (Ruby 3.0+) — true isolation, no shared state
r = Ractor.new do
  msg = Ractor.receive
  "Processed: #{msg}"
end

r.send("hello")
puts r.take   # => "Processed: hello"
```

## Gotchas

- `Queue` is thread-safe but objects put into it are shared references — mutation inside threads can still cause races
- `Ractor` objects cannot share most Ruby objects; only frozen or Ractor-shareable objects can be passed
- `Queue#pop` blocks the calling thread until an item is available
