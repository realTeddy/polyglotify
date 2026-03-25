---
title: "Channels & Message Passing"
language: "crystal"
feature: "channels"
category: "concurrency"
applicable: true
---

Crystal's `Channel(T)` is the primary communication primitive between fibers. Channels can be unbuffered (synchronous rendezvous) or buffered (up to a capacity). `send` blocks on a full channel; `receive` blocks on an empty channel. `Channel.select` allows waiting on multiple channels simultaneously.

## Example

```crystal
# Unbuffered channel — sender blocks until receiver is ready
ch = Channel(Int32).new

spawn { ch.send 42 }
puts ch.receive  # => 42

# Buffered channel
buf = Channel(String).new(5)
buf.send "hello"   # doesn't block (buffer not full)
buf.send "world"
puts buf.receive   # => "hello"

# Producer / consumer
jobs    = Channel(Int32).new(10)
results = Channel(String).new(10)

# Consumer fiber
spawn do
  while (n = jobs.receive?) != nil
    results.send "processed #{n}"
  end
  results.close
end

# Producer
[1, 2, 3].each { |n| jobs.send n }
jobs.close

while (r = results.receive?)
  puts r
end

# Select — first ready channel wins
ch1 = Channel(String).new
ch2 = Channel(String).new
spawn { sleep 0.01.seconds; ch1.send "one" }
spawn { ch2.send "two" }

Channel.select(ch1.receive_select_action, ch2.receive_select_action) do |i, val|
  puts "received from channel #{i}: #{val}"
end
```

## Gotchas

- `receive?` returns `nil` when the channel is closed and empty; use it to detect completion in consumer loops.
- Sending to a closed channel raises `Channel::ClosedError`.
- Unbuffered channels enforce synchronous message passing; the sender and receiver must both be ready simultaneously.
