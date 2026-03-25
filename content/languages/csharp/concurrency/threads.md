---
title: "Threads"
language: "csharp"
feature: "threads"
category: "concurrency"
applicable: true
---

C# provides `Thread`, `ThreadPool`, `Task`, and `Parallel` for concurrent execution. The `Task` Parallel Library (TPL) is the preferred modern API — `Task.Run` offloads CPU-bound work to the thread pool. `Parallel.For` and `Parallel.ForEach` simplify data parallelism. `CancellationToken` provides cooperative cancellation. `Interlocked` and `Monitor`/`lock` handle synchronization.

## Example

```csharp
using System.Collections.Concurrent;
using System.Threading;
using System.Threading.Tasks;

// Task.Run — CPU-bound work on thread pool
static async Task<long> SumRangeAsync(long n) {
    return await Task.Run(() => {
        long sum = 0;
        for (long i = 1; i <= n; i++) sum += i;
        return sum;
    });
}

// Parallel.ForEach
static void ParallelProcess(IEnumerable<int> items) {
    var results = new ConcurrentBag<int>();
    Parallel.ForEach(items, item => results.Add(item * item));
    Console.WriteLine($"Processed {results.Count} items");
}

// Cancellation
static async Task CancellableWorkAsync(CancellationToken ct) {
    for (int i = 0; i < 100; i++) {
        ct.ThrowIfCancellationRequested();
        await Task.Delay(10, ct);
        Console.Write(i + " ");
    }
}

// lock — mutual exclusion
class SafeCounter {
    private int _count;
    private readonly Lock _lock = new();

    public void Increment() {
        lock (_lock) { _count++; }
    }

    public int Value => Interlocked.CompareExchange(ref _count, 0, 0);
}

// Demonstrate cancellation
static async Task Main() {
    using var cts = new CancellationTokenSource(TimeSpan.FromMilliseconds(50));
    try { await CancellableWorkAsync(cts.Token); }
    catch (OperationCanceledException) { Console.WriteLine("\nCancelled!"); }
}
```

## Gotchas

- `Task.Run` is for CPU-bound work; use `async/await` with I/O operations directly (no `Task.Run` needed) to avoid wasting thread pool threads on blocking waits.
- `lock` on `this` or on public objects is an anti-pattern — any code can lock on the same object, creating deadlock opportunities. Always lock on a private `object` or the new `Lock` type.
