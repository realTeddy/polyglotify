---
title: "Exceptions & Try/Catch"
language: "powershell"
feature: "exceptions"
category: "error-handling"
applicable: true
---

PowerShell has `try`/`catch`/`finally` blocks that work similarly to .NET exceptions. PowerShell distinguishes between **terminating errors** (caught by `try/catch`) and **non-terminating errors** (written to the error stream, visible via `$Error`). Use `-ErrorAction Stop` to promote non-terminating errors to terminating ones. The `throw` keyword raises a terminating error.

## Example

```powershell
# Basic try/catch/finally
try {
    $result = 1 / 0
} catch [System.DivideByZeroException] {
    Write-Warning "Division by zero!"
} catch {
    Write-Error "Unexpected error: $_"
} finally {
    Write-Host "Cleanup always runs"
}

# Promoting non-terminating to terminating
try {
    Get-Item "/nonexistent/path" -ErrorAction Stop
} catch [System.Management.Automation.ItemNotFoundException] {
    Write-Host "File not found: $($_.Exception.Message)"
}

# Custom exception (PowerShell class)
class AppException : System.Exception {
    [string]$Code
    AppException([string]$code, [string]$msg) : base($msg) {
        $this.Code = $code
    }
}

function Validate-Input {
    param([string]$Value)
    if ([string]::IsNullOrEmpty($Value)) {
        throw [AppException]::new("ERR_EMPTY", "Value cannot be empty")
    }
    $Value
}

try {
    Validate-Input ""
} catch [AppException] {
    Write-Host "[$($_.Exception.Code)] $($_.Exception.Message)"
}
```

## Gotchas

- `catch` only catches terminating errors; cmdlets like `Get-Item` or `Invoke-WebRequest` produce non-terminating errors by default. Always use `-ErrorAction Stop` or `$ErrorActionPreference = 'Stop'` at the script level.
- `$_` inside a `catch` block is the `ErrorRecord`, not the exception; access the actual exception with `$_.Exception`.
- `Write-Error` does not throw; it writes to the error stream. To stop execution, use `throw "message"` or a terminating cmdlet error.
