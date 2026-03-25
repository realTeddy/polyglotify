---
title: "Channels & Message Passing"
language: "nim"
feature: "channels"
category: "concurrency"
applicable: true
---

Nim provides typed channels for inter-thread communication via `Channel[T]` (from `std/channels` or legacy `Channel` global). Channels are thread-safe queues. `send` sends a value, `recv` blocks until a value is available, `tryRecv` is non-blocking. Compile with `--threads:on`.

## Example

```nim
import std/[threads, channels]

# Create a typed channel
var ch = newChannel[string](maxItems = 10)

proc producer() {.thread.} =
  for i in 1..5:
    ch.send("message " & $i)
  ch.send("DONE")

proc consumer() {.thread.} =
  while true:
    let msg = ch.recv()
    if msg == "DONE":
      break
    echo "Received: ", msg

var prodThread, consThread: Thread[void]
createThread(prodThread, producer)
createThread(consThread, consumer)
joinThread(prodThread)
joinThread(consThread)

# tryRecv — non-blocking
var numCh = newChannel[int](maxItems = 5)
numCh.send(42)

let (ok, val) = numCh.tryRecv()
if ok:
  echo "Got: ", val
else:
  echo "No data"
```

## Gotchas

- Compile with `--threads:on`; channels are only safe when threads are enabled.
- The old `Channel[T]` global API requires `open(ch, maxItems)` / `close(ch)`; `std/channels` is the modern API.
- Blocking `recv()` on a closed empty channel will deadlock; use a sentinel value ("DONE") or `tryRecv` with a timeout loop.
