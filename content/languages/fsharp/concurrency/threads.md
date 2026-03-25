---
title: "Threads"
language: "fsharp"
feature: "threads"
category: "concurrency"
applicable: true
---

F# uses .NET's threading model: `System.Threading.Thread` for raw threads, `ThreadPool` for pooled work, and `Task` (from C# ecosystem) for async work. Immutable F# data is inherently thread-safe; `MailboxProcessor` provides safe actor-based concurrency.

## Example

```fsharp
open System.Threading

// Raw thread
let t = Thread(fun () ->
    printfn "Running on thread %d" Thread.CurrentThread.ManagedThreadId)
t.Start()
t.Join()

// ThreadPool
ThreadPool.QueueUserWorkItem(fun _ ->
    printfn "Running in pool") |> ignore

// Task (interop with C# async ecosystem)
open System.Threading.Tasks

let task = Task.Run(fun () ->
    Thread.Sleep(100)
    42)

printfn "Result: %d" (task.Result)   // blocks

// Parallel.For (data parallelism)
let results = Array.zeroCreate 10
Parallel.For(0, 10, fun i ->
    results.[i] <- i * i) |> ignore
printfn "%A" results   // [|0;1;4;9;16;25;36;49;64;81|]

// MailboxProcessor (actor model)
let agent = MailboxProcessor.Start(fun inbox ->
    let rec loop count = async {
        let! msg = inbox.Receive()
        match msg with
        | "inc"  -> return! loop (count + 1)
        | "get"  ->
            printfn "Count: %d" count
            return! loop count
        | "stop" -> ()
        | _      -> return! loop count
    }
    loop 0)

agent.Post "inc"
agent.Post "inc"
agent.Post "get"    // prints: Count: 2
agent.Post "stop"

// Immutable data is inherently thread-safe
let sharedList = [1..1000]    // safe to read from any thread
```

## Gotchas

- `task.Result` blocks the calling thread and may deadlock in some contexts (e.g., ASP.NET); use `await` or `Async.AwaitTask` instead
- `MailboxProcessor` processes messages sequentially in a single async loop; its internal state is automatically thread-safe
- Mutable state (`let mutable`, arrays) requires synchronisation; use `Interlocked`, `lock`, or immutable data instead
