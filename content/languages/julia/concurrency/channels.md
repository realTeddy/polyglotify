---
title: "Channels & Message Passing"
language: "julia"
feature: "channels"
category: "concurrency"
applicable: true
---

Julia's `Channel{T}` is a typed FIFO queue used to communicate between Tasks (coroutines). `put!` sends a value, `take!` receives one, `fetch` peeks without removing. Channels can be bounded (fixed buffer size) or unbounded. The `Channel(f)` constructor automatically closes the channel when the producer function exits.

## Example

```julia
# Bounded channel (buffer of 5)
ch = Channel{Int}(5)

# Producer task
producer = @async begin
    for i in 1:10
        put!(ch, i)
        println("Produced: ", i)
    end
    close(ch)
end

# Consumer — iterate until closed
for val in ch
    println("Consumed: ", val)
    sleep(0.01)
end

# Channel constructor — auto-closes
squares = Channel{Int}(10) do ch
    for i in 1:5
        put!(ch, i^2)
    end
end
println(collect(squares))

# Multiple producers / consumers
ch2 = Channel{String}(100)
@sync begin
    for i in 1:3
        @async begin
            put!(ch2, "worker $i result")
        end
    end
end
close(ch2)
for msg in ch2
    println(msg)
end
```

## Gotchas

- Sending to a full bounded channel blocks the sender until space is available.
- Iterating a channel with `for x in ch` stops when the channel is closed; always close after sending is done.
- `take!` on a closed empty channel throws an `InvalidStateException`; use `isready(ch)` or iterate safely.
