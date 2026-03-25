---
title: "Async/Await"
language: "julia"
feature: "async-await"
category: "concurrency"
applicable: false
---

Julia has no `async/await` syntax. Asynchronous programming in Julia is handled through **Tasks** (green threads / coroutines), `Channel`s for communication, and the `@async` and `@sync` macros. Tasks can be awaited with `fetch`. For I/O-bound concurrency, `Distributed.jl` and external packages like `Async.jl` or `ConcurrentCollections.jl` extend the model.

## Example

```julia
# @async creates a Task (coroutine)
t1 = @async begin
    sleep(0.1)
    println("Task 1 done")
    42
end

t2 = @async begin
    sleep(0.05)
    println("Task 2 done")
    "result"
end

# fetch waits for the task and returns its value
val1 = fetch(t1)
val2 = fetch(t2)
println("Got: ", val1, " and ", val2)

# @sync waits for all @async tasks inside it
@sync begin
    @async println("A")
    @async println("B")
    @async println("C")
end
println("All done")

# Channel-based producer/consumer
ch = Channel{Int}(10)
producer = @async begin
    for i in 1:5
        put!(ch, i^2)
    end
    close(ch)
end

for val in ch
    println(val)
end
```

## Gotchas

- Julia Tasks are cooperative, not preemptive; a Task must yield (e.g., at I/O or `yield()`) for others to run.
- `fetch(task)` re-throws any exception the task threw; wrap in `try/catch` if you expect failures.
- For CPU-bound parallelism, use `Threads.@threads` or `Distributed.jl`, not `@async`.
