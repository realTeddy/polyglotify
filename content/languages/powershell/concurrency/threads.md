---
title: "Threads"
language: "powershell"
feature: "threads"
category: "concurrency"
applicable: true
---

PowerShell supports .NET threading directly via `[System.Threading.Thread]` and `[System.Threading.Tasks.Task]`. The higher-level `Start-ThreadJob` cmdlet (from the `ThreadJob` module) provides lightweight threads that share the current process's memory. `ForEach-Object -Parallel` (PowerShell 7+) uses runspaces backed by a thread pool. Runspace pools (`[RunspacePool]`) enable fine-grained parallelism control.

## Example

```powershell
# ForEach-Object -Parallel (PowerShell 7+) — recommended
$numbers = 1..8
$squared = $numbers | ForEach-Object -Parallel {
    $_ * $_
} -ThrottleLimit 4
Write-Host ($squared | Sort-Object)   # 1 4 9 16 25 36 49 64

# Start-ThreadJob (requires ThreadJob module)
# Install-Module ThreadJob -Scope CurrentUser
$jobs = 1..4 | ForEach-Object {
    $n = $_
    Start-ThreadJob { Start-Sleep 1; "Job $using:n done" }
}
$results = $jobs | Wait-Job | Receive-Job
$jobs | Remove-Job
$results

# Runspace pool for high-performance parallelism
$pool = [RunspaceFactory]::CreateRunspacePool(1, 4)
$pool.Open()

$tasks = 1..8 | ForEach-Object {
    $ps = [PowerShell]::Create()
    $ps.RunspacePool = $pool
    [void]$ps.AddScript({ param($n) $n * $n }).AddArgument($_)
    [PSCustomObject]@{ PS = $ps; Handle = $ps.BeginInvoke() }
}

$tasks | ForEach-Object {
    $_.PS.EndInvoke($_.Handle) | Write-Host
    $_.PS.Dispose()
}
$pool.Close()
```

## Gotchas

- `$using:variable` is required to pass outer scope variables into `ForEach-Object -Parallel` scriptblocks; regular variable references resolve to empty values.
- Runspace-based parallelism does not share PowerShell module state; each runspace starts fresh and must import required modules independently.
- `Start-Job` runs in a separate process (expensive); `Start-ThreadJob` runs in a thread within the current process (cheap). Always prefer `Start-ThreadJob` for in-process work.
