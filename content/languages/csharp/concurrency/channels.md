---
title: "Channels"
language: "csharp"
feature: "channels"
category: "concurrency"
applicable: true
---

C# `System.Threading.Channels` (introduced in .NET Core 3.0) provides a purpose-built, high-performance channel implementation. `Channel<T>` decouples producers from consumers and supports bounded (backpressure) and unbounded variants. `ChannelWriter<T>` and `ChannelReader<T>` are the producer and consumer ends. The reader exposes `ReadAllAsync()` returning `IAsyncEnumerable<T>` for clean async consumption.

## Example

```csharp
using System.Threading.Channels;
using System.Threading.Tasks;

// Bounded channel — blocks producer when full (backpressure)
static async Task ChannelDemo() {
    var channel = Channel.CreateBounded<int>(capacity: 10);

    // Producer
    var producer = Task.Run(async () => {
        for (int i = 1; i <= 5; i++) {
            await channel.Writer.WriteAsync(i);
            Console.WriteLine($"Sent: {i}");
            await Task.Delay(5);
        }
        channel.Writer.Complete(); // signal no more items
    });

    // Consumer — async stream
    var consumer = Task.Run(async () => {
        await foreach (int value in channel.Reader.ReadAllAsync()) {
            Console.WriteLine($"Received: {value}");
        }
    });

    await Task.WhenAll(producer, consumer);
}

// Pipeline: producer → transform → consumer
static async Task PipelineDemo() {
    var input  = Channel.CreateUnbounded<int>();
    var output = Channel.CreateUnbounded<string>();

    // Stage 1: produce numbers
    _ = Task.Run(async () => {
        for (int i = 1; i <= 3; i++) { await input.Writer.WriteAsync(i); }
        input.Writer.Complete();
    });

    // Stage 2: transform
    _ = Task.Run(async () => {
        await foreach (int n in input.Reader.ReadAllAsync())
            await output.Writer.WriteAsync($"item-{n * n}");
        output.Writer.Complete();
    });

    // Stage 3: consume
    await foreach (string s in output.Reader.ReadAllAsync())
        Console.WriteLine(s); // item-1, item-4, item-9
}
```

## Gotchas

- Always call `channel.Writer.Complete()` when production is finished; without it, `ReadAllAsync()` will wait forever.
- `Channel.CreateBounded` with `BoundedChannelFullMode.DropOldest` or `DropWrite` silently discards items — use these only when data loss is acceptable (e.g., telemetry).
