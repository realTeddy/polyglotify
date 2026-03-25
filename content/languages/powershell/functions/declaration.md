---
title: "Function Declaration"
language: "powershell"
feature: "declaration"
category: "functions"
applicable: true
---

PowerShell functions are declared with the `function` keyword. Advanced functions add the `[CmdletBinding()]` attribute to gain cmdlet-like behaviour: common parameters (`-Verbose`, `-Debug`, `-ErrorAction`), parameter validation attributes, and `$PSCmdlet` context. Functions output objects by returning them (any expression not captured is output); `return` is optional and only terminates execution.

## Example

```powershell
# Simple function
function Get-Greeting {
    param([string]$Name = "World")
    "Hello, $Name!"   # output (no explicit return needed)
}

Get-Greeting          # Hello, World!
Get-Greeting "Alice"  # Hello, Alice!

# Advanced function (cmdlet-style)
function Invoke-Retry {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [scriptblock]$ScriptBlock,

        [ValidateRange(1, 10)]
        [int]$MaxAttempts = 3,

        [int]$DelaySeconds = 2
    )

    for ($i = 1; $i -le $MaxAttempts; $i++) {
        try {
            & $ScriptBlock
            return
        } catch {
            Write-Warning "Attempt $i failed: $_"
            if ($i -lt $MaxAttempts) { Start-Sleep -Seconds $DelaySeconds }
        }
    }
    throw "All $MaxAttempts attempts failed"
}

Invoke-Retry -ScriptBlock { Write-Host "Trying..." } -MaxAttempts 2
```

## Gotchas

- Any expression in a function body that is not assigned to a variable or piped is automatically output to the pipeline — this includes `[void]`, array creation, and even .NET method calls that return values.
- Use `[void]` or `$null = ...` to suppress unwanted output from expressions inside functions.
- PowerShell functions follow `Verb-Noun` naming (e.g., `Get-Item`, `Set-Content`); use `Get-Verb` to see the list of approved verbs. Unapproved verbs trigger a warning when modules are imported.
