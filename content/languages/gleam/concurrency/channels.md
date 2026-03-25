---
title: "Channels & Message Passing"
language: "gleam"
feature: "channels"
category: "concurrency"
applicable: true
---

Gleam on the BEAM uses Erlang-style message passing between processes rather than Go-style channels. The `gleam_otp` library's `actor` module provides a structured subject/message interface. A `Subject(msg)` is a typed handle to send messages to a process; the process receives them in its loop.

## Example

```gleam
import gleam/io
import gleam/otp/actor
import gleam/erlang/process

pub type Message {
  Increment
  Decrement
  GetCount(reply_to: process.Subject(Int))
  Shutdown
}

pub fn handle_message(msg: Message, state: Int) -> actor.Next(Message, Int) {
  case msg {
    Increment -> actor.continue(state + 1)
    Decrement -> actor.continue(state - 1)
    GetCount(reply) -> {
      process.send(reply, state)
      actor.continue(state)
    }
    Shutdown -> actor.stop(process.Normal)
  }
}

pub fn main() {
  let assert Ok(subject) = actor.start(0, handle_message)

  process.send(subject, Increment)
  process.send(subject, Increment)
  process.send(subject, Increment)
  process.send(subject, Decrement)

  let reply = process.new_subject()
  process.send(subject, GetCount(reply))
  let count = process.receive(reply, 1000)
  io.debug(count)  // Ok(2)

  process.send(subject, Shutdown)
}
```

## Gotchas

- Message passing is asynchronous — `process.send` returns immediately without waiting for processing.
- `process.receive` blocks the calling process until a message arrives or the timeout expires.
- `Subject(msg)` is typed, preventing mismatched message types at compile time.
- Unlike Go channels, there is no buffering concept — the process mailbox is effectively an unbounded queue.
