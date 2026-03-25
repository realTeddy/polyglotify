---
title: "Async/Await"
language: "fsharp"
feature: "async-await"
category: "concurrency"
applicable: true
---

F# has its own `async { ... }` computation expression that predates C#'s async/await. It uses `let!` (await) and `do!` inside `async { }` blocks. F# async is cold (doesn't start until run) and cancellation-aware. `Async.RunSynchronously`, `Async.StartAsTask`, and `Async.Parallel` run async workflows.

## Example

```fsharp
open System.Net.Http

// Define an async workflow
let fetchData (url: string) = async {
    use client = new HttpClient()
    let! response = client.GetStringAsync(url) |> Async.AwaitTask
    return response
}

// Await another async
let process url = async {
    let! data = fetchData url
    return data.Length
}

// Run synchronously (blocks; use only at the top level)
let result = Async.RunSynchronously (process "https://example.com")
printfn "Length: %d" result

// Run in parallel
let urls = ["https://example.com"; "https://fsharp.org"]

let parallelFetch = async {
    let! results =
        urls
        |> List.map fetchData
        |> Async.Parallel
    return results
}

// Start without waiting (fire-and-forget)
Async.Start (async { printfn "Background work" })

// With cancellation
let cts = new System.Threading.CancellationTokenSource()

Async.Start(
    async {
        do! Async.Sleep 5000
        printfn "Done"
    },
    cancellationToken = cts.Token)

cts.Cancel()   // cancel the workflow

// Interop with C# Task
open System.Threading.Tasks
let asTask : Task<int> = Async.StartAsTask (process "https://example.com")
```

## Gotchas

- F# `async` is **cold**: creating an `async { }` block does not start it; call `Async.StartImmediate`, `Async.RunSynchronously`, or `Async.StartAsTask` to execute it
- `let!` inside `async { }` awaits an `Async<'T>`; use `|> Async.AwaitTask` to await a .NET `Task<'T>`
- `Async.RunSynchronously` blocks the calling thread; avoid it in server/UI code — use `Async.StartAsTask` instead
