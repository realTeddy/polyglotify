---
title: "Return Values"
language: "powershell"
feature: "return-values"
category: "functions"
applicable: true
---

PowerShell functions output objects to the pipeline implicitly — any expression not captured is sent downstream. `return` terminates execution and optionally outputs a value, but it is not required. Functions can output multiple objects (one per pipeline write), which callers receive as an array. Use `[OutputType()]` to declare the expected output type for documentation and IDE tooling.

## Example

```powershell
# Implicit output — last expression is returned
function Get-Square {
    param([int]$n)
    $n * $n   # output to pipeline
}
$result = Get-Square 7
Write-Host $result   # 49

# Explicit return
function Get-Max {
    param([int]$a, [int]$b)
    if ($a -gt $b) { return $a }
    $b
}
Write-Host (Get-Max 10 7)   # 10

# Multiple return values (yields an array)
function Get-Stats {
    param([int[]]$Numbers)
    ($Numbers | Measure-Object -Minimum -Maximum -Average -Sum).Minimum
    ($Numbers | Measure-Object -Minimum -Maximum -Average -Sum).Maximum
    ($Numbers | Measure-Object -Minimum -Maximum -Average -Sum).Average
}
$min, $max, $avg = Get-Stats 3, 1, 4, 1, 5, 9
Write-Host "min=$min max=$max avg=$avg"

# OutputType declaration for IDE support
function Get-User {
    [OutputType([PSCustomObject])]
    param([string]$Name)
    [PSCustomObject]@{ Name = $Name; CreatedAt = (Get-Date) }
}
$user = Get-User "Alice"
Write-Host $user.Name
```

## Gotchas

- Any uncaptured output inside a function (including from nested function calls) is added to the function's output stream; this silently inflates return values.
- `return $value` sends `$value` to the output stream, then exits; it does not "return" in the traditional sense if there was already output before the `return` statement.
- `Write-Host` writes directly to the console host, bypassing the output pipeline; it cannot be captured with `$result = function_call`. Use `Write-Output` to send to the pipeline.
