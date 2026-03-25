---
title: "Channels & Message Passing"
language: "powershell"
feature: "channels"
category: "concurrency"
applicable: false
---

PowerShell has no built-in channel type. Message passing between runspaces or jobs is done via .NET's `System.Collections.Concurrent.BlockingCollection[T]` or `ConcurrentQueue[T]`, or through PowerShell's pipeline itself. PowerShell 7's `ForEach-Object -Parallel` communicates results implicitly through the output pipeline. For pub/sub patterns, the `System.Threading.Channels` namespace (.NET 5+) is accessible.

## Example

```powershell
# BlockingCollection as a channel (producer/consumer)
$channel = [System.Collections.Concurrent.BlockingCollection[string]]::new(10)

# Producer thread
$producer = Start-ThreadJob {
    $ch = $using:channel
    foreach ($msg in @("hello","world","powershell")) {
        $ch.Add($msg)
        Start-Sleep -Milliseconds 100
    }
    $ch.CompleteAdding()
}

# Consumer (current thread)
foreach ($item in $channel.GetConsumingEnumerable()) {
    Write-Host "Received: $item"
}
$producer | Wait-Job | Remove-Job

# System.Threading.Channels (.NET 5+, PowerShell 7+)
$ch2 = [System.Threading.Channels.Channel]::CreateBounded[string](5)
$writer = $ch2.Writer
$reader = $ch2.Reader

$writeJob = Start-ThreadJob {
    $w = $using:writer
    1..5 | ForEach-Object {
        $w.WriteAsync("item_$_").GetAwaiter().GetResult()
    }
    $w.Complete()
}

while ($reader.WaitToReadAsync().AsTask().GetAwaiter().GetResult()) {
    $item = $null
    if ($reader.TryRead([ref]$item)) { Write-Host "Got: $item" }
}
$writeJob | Wait-Job | Remove-Job
```

## Gotchas

- `BlockingCollection.GetConsumingEnumerable()` blocks the current thread; always run producers and consumers in separate jobs or threads.
- `System.Threading.Channels` requires .NET 5+, which means PowerShell 7+ on a .NET 5+ runtime; it is not available in Windows PowerShell 5.1.
- Channels shared between `Start-ThreadJob` runspaces must be captured with `$using:variable`; they are .NET objects and are passed by reference, so shared state works correctly.
