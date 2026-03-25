---
title: "Result Types"
language: "powershell"
feature: "result-types"
category: "error-handling"
applicable: false
---

PowerShell does not have a built-in `Result` type. Error handling follows a mixed model: exceptions for terminating errors, and the error stream (`$Error`, `Write-Error`) for non-terminating errors. A `Result`-style pattern can be simulated with `[PSCustomObject]` carrying `Success`, `Value`, and `Error` properties. For PowerShell 7+, `Invoke-Command` and script blocks can be wrapped in patterns inspired by functional error handling.

## Example

```powershell
# Result-style PSCustomObject
function New-Result {
    param($Value, [string]$Error)
    if ($Error) {
        [PSCustomObject]@{ Ok = $false; Value = $null;  Error = $Error }
    } else {
        [PSCustomObject]@{ Ok = $true;  Value = $Value; Error = $null  }
    }
}

function Try-ParseInt {
    param([string]$Input)
    $n = 0
    if ([int]::TryParse($Input, [ref]$n)) {
        New-Result -Value $n
    } else {
        New-Result -Error "Cannot parse '$Input' as integer"
    }
}

$r1 = Try-ParseInt "42"
$r2 = Try-ParseInt "abc"

if ($r1.Ok) { Write-Host "Parsed: $($r1.Value)" }
if (!$r2.Ok) { Write-Host "Error: $($r2.Error)" }

# Using [ref] for TryParse pattern (native .NET Result style)
$date = [datetime]::MinValue
if ([datetime]::TryParse("2024-01-15", [ref]$date)) {
    Write-Host "Parsed date: $date"
}
```

## Gotchas

- The `[ref]` parameter pattern (`.TryParse`) is the closest native "Result" idiom in .NET/PowerShell; it returns `$true`/`$false` and writes the value to the ref variable.
- Custom result objects are not enforced by the type system; callers can ignore the `Ok` flag and access `Value` directly, potentially getting `$null`.
- `$ErrorActionPreference = 'Stop'` and `try/catch` is simpler for most PowerShell use cases than building a full Result monad.
