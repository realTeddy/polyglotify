---
title: "Async/Await"
language: "powershell"
feature: "async-await"
category: "concurrency"
applicable: false
---

PowerShell does not have native `async`/`await` syntax. Asynchronous operations are handled through .NET's `Task`-based model (calling `.GetAwaiter().GetResult()` or `.Result` to block and retrieve values), `Start-Job` and `Receive-Job` for background jobs, or `ForEach-Object -Parallel` (PowerShell 7+) for parallel pipeline processing.

## Example

```powershell
# Using .NET async methods synchronously
Add-Type -AssemblyName System.Net.Http
$client = [System.Net.Http.HttpClient]::new()
try {
    $response = $client.GetAsync("https://httpbin.org/get").GetAwaiter().GetResult()
    $body = $response.Content.ReadAsStringAsync().GetAwaiter().GetResult()
    Write-Host "Status: $($response.StatusCode)"
} finally {
    $client.Dispose()
}

# ForEach-Object -Parallel (PowerShell 7+)
$urls = @(
    "https://httpbin.org/get",
    "https://httpbin.org/ip",
    "https://httpbin.org/uuid"
)
$results = $urls | ForEach-Object -Parallel {
    $wc = [System.Net.WebClient]::new()
    $wc.DownloadString($_)
} -ThrottleLimit 3

# Background job (older approach)
$job = Start-Job { Start-Sleep 2; "Result from job" }
Wait-Job $job | Out-Null
Receive-Job $job   # Result from job
Remove-Job $job
```

## Gotchas

- `.GetAwaiter().GetResult()` blocks the calling thread; calling it from within an async context can deadlock if the synchronisation context is the same thread pool.
- `ForEach-Object -Parallel` runs each scriptblock in a separate runspace; variables from the outer scope are not automatically available — use `$using:varName` to pass them in.
- Background jobs (`Start-Job`) have significant serialisation overhead; prefer `ForEach-Object -Parallel` or `Start-ThreadJob` (from the `ThreadJob` module) for lightweight parallelism.
