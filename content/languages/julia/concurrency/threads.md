---
title: "Threads"
language: "julia"
feature: "threads"
category: "concurrency"
applicable: true
---

Julia supports native OS threads via `Threads.@threads` for parallel loops and `Threads.@spawn` for spawning individual tasks on any available thread. Start Julia with `-t N` (or `JULIA_NUM_THREADS=N`) to enable N threads. Shared mutable state must be protected with `ReentrantLock` or atomic operations from `Base.Threads`.

## Example

```julia
# Check available threads
println("Threads: ", Threads.nthreads())

# Parallel loop
results = zeros(Int, 10)
Threads.@threads for i in 1:10
    results[i] = i^2
    println("Thread $(Threads.threadid()) computed $i^2")
end
println(results)

# Spawn a task on any thread
t = Threads.@spawn begin
    sleep(0.01)
    sum(1:100)
end
println("Sum: ", fetch(t))

# Thread-safe with a lock
counter = Ref(0)
lk = ReentrantLock()
Threads.@threads for i in 1:100
    lock(lk) do
        counter[] += 1
    end
end
println("Counter: ", counter[])

# Atomic operations
atom = Threads.Atomic{Int}(0)
Threads.@threads for i in 1:100
    Threads.atomic_add!(atom, 1)
end
println("Atomic: ", atom[])
```

## Gotchas

- Start Julia with `julia -t 4` or set `JULIA_NUM_THREADS=4` before launching; threads cannot be added after startup.
- Race conditions on shared mutable state are possible; always protect shared writes with locks or atomics.
- The GC is not fully thread-safe for all operations; prefer thread-local data when possible.
