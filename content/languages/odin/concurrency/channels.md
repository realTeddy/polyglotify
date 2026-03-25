---
title: "Channels & Message Passing"
language: "odin"
feature: "channels"
category: "concurrency"
applicable: true
---

Odin provides channels in the `core:sync/chan` package, inspired by Go. Channels enable typed, thread-safe communication between threads. `chan.make` creates a channel, `chan.send` writes to it, `chan.recv` reads from it. Channels can be buffered or unbuffered.

## Example

```odin
package main

import "core:fmt"
import "core:thread"
import "core:sync/chan"

producer :: proc(t: ^thread.Thread) {
    ch := ((^chan.Chan(int))(t.user_args[0]))^

    for i in 0..<5 {
        chan.send(ch, i * i)
    }
    chan.close(ch)
}

main :: proc() {
    // Buffered channel of ints (capacity 10)
    ch := chan.make(chan.Chan(int), 10)
    defer chan.destroy(ch)

    // Send in a separate thread
    t := thread.create(producer)
    t.user_args[0] = &ch
    thread.start(t)

    // Receive until channel closed
    for {
        val, ok := chan.recv(ch)
        if !ok {
            break  // channel closed
        }
        fmt.println(val)
    }

    thread.join(t)
    thread.destroy(t)
}
```

## Gotchas

- `core:sync/chan` is relatively new and considered experimental — the API may change.
- Sending to a full buffered channel blocks the sender thread.
- Receiving from an empty closed channel returns `({}, false)`.
- Unlike Go, there is no `select` statement in Odin's channel package — you must poll or use multiple threads.
- For most Odin programs, a mutex-protected queue or a ring buffer is used instead of channels.
