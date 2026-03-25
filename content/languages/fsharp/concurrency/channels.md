---
title: "Channels & Message Passing"
language: "fsharp"
feature: "channels"
category: "concurrency"
applicable: true
---

F# provides `MailboxProcessor<'Msg>` as its built-in actor/message-passing mechanism. For .NET `Channel<T>` (bounded/unbounded queues), use `System.Threading.Channels`. Both decouple producers from consumers safely.

## Example

```fsharp
open System.Threading.Channels

// System.Threading.Channels: bounded channel
let channel = Channel.CreateBounded<int>(capacity = 10)
let writer  = channel.Writer
let reader  = channel.Reader

// Producer (async)
let produce = async {
    for i in 1..5 do
        do! writer.WriteAsync(i).AsTask() |> Async.AwaitTask
    writer.Complete()
}

// Consumer (async)
let consume = async {
    let! hasMore = reader.WaitToReadAsync().AsTask() |> Async.AwaitTask
    while hasMore do
        let mutable item = 0
        if reader.TryRead(&item) then
            printfn "Got: %d" item
}

// Run both
Async.RunSynchronously (async {
    do! Async.StartChild produce |> Async.Ignore
    do! consume
})

// MailboxProcessor: F#-native actor with typed messages
type Message =
    | Put  of string * value: int
    | Get  of string * reply: AsyncReplyChannel<int option>
    | Stop

let store = MailboxProcessor.Start(fun inbox ->
    let rec loop (map: Map<string, int>) = async {
        let! msg = inbox.Receive()
        match msg with
        | Put(key, value) -> return! loop (Map.add key value map)
        | Get(key, reply) -> reply.Reply(Map.tryFind key map); return! loop map
        | Stop -> ()
    }
    loop Map.empty)

store.Post(Put("x", 42))
let result = store.PostAndReply(fun ch -> Get("x", ch))
printfn "%A" result   // Some 42
store.Post Stop
```

## Gotchas

- `MailboxProcessor` is single-threaded internally; the message handler runs sequentially so no locking is needed for the actor's state
- `PostAndReply` blocks until the reply is sent; use `PostAndAsyncReply` for non-blocking usage
- `Channel.CreateBounded` with a full channel will block the producer by default; use `BoundedChannelFullMode.DropOldest` if you need lossy behaviour
