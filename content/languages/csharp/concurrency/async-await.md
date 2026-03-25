---
title: "Async / Await"
language: "csharp"
feature: "async-await"
category: "concurrency"
applicable: true
---

C# has first-class `async/await` support built into the language, not as a library. An `async` method returns `Task`, `Task<T>`, or `ValueTask<T>`. `await` suspends execution until the awaited task completes without blocking the thread. `Task.WhenAll` and `Task.WhenAny` compose parallel operations. `IAsyncEnumerable<T>` enables async streaming with `await foreach`.

## Example

```csharp
using System.Net.Http;

// Async method returning Task<T>
static async Task<string> FetchAsync(string url) {
    using var client = new HttpClient();
    return await client.GetStringAsync(url);
}

// Sequential async
static async Task<int> SequentialAsync() {
    string data1 = await FetchAsync("https://example.com/1");
    string data2 = await FetchAsync("https://example.com/2");
    return data1.Length + data2.Length;
}

// Parallel async
static async Task<(string, string)> ParallelAsync() {
    var t1 = FetchAsync("https://example.com/1");
    var t2 = FetchAsync("https://example.com/2");
    await Task.WhenAll(t1, t2);
    return (t1.Result, t2.Result);
}

// Async stream (IAsyncEnumerable)
static async IAsyncEnumerable<int> GenerateAsync() {
    for (int i = 0; i < 5; i++) {
        await Task.Delay(10);
        yield return i;
    }
}

// Consuming async stream
static async Task ConsumeStream() {
    await foreach (var item in GenerateAsync()) {
        Console.WriteLine(item);
    }
}

// ConfigureAwait — avoids capturing SynchronizationContext in library code
static async Task LibraryMethod() {
    await Task.Delay(100).ConfigureAwait(false);
    // Resumes on thread pool, not original context
}
```

## Gotchas

- `async void` methods cannot be awaited and swallow exceptions — only use them for event handlers. Return `Task` everywhere else.
- `Task.Result` and `Task.Wait()` block synchronously and can deadlock in synchronization contexts (e.g., ASP.NET or WPF). Always `await` tasks instead.
