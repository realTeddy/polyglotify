---
title: "Variables & Declaration"
language: "powershell"
feature: "variables"
category: "basics"
applicable: true
---

PowerShell variables are prefixed with `$` and are dynamically typed by default. They can be declared with an explicit type by placing `[TypeName]` before the `$variable`. Variable names are case-insensitive. Special automatic variables like `$_` (current pipeline object), `$?` (last command success), and `$PSScriptRoot` (script directory) are always available. `Set-Variable` and `New-Variable` offer additional options like read-only and private scope.

## Example

```powershell
# Basic assignment
$name = "Alice"
$count = 42
$pi = 3.14159
$isActive = $true

# Explicit type constraint
[int]$age = 30
[string]$greeting = "Hello"
[datetime]$now = Get-Date

# String interpolation
Write-Host "Hello, $name! You are $age years old."
Write-Host "Today is $($now.ToShortDateString())"  # expression in string

# Default value pattern
$env = $env:APP_ENV ?? "development"   # PowerShell 7+ null-coalescing

# Multiple assignment
$x, $y, $z = 1, 2, 3
Write-Host "$x $y $z"

# Read-only variable
New-Variable -Name MaxRetries -Value 3 -Option ReadOnly

# Environment variables
$homeDir = $env:HOME ?? $env:USERPROFILE
Write-Host "Home: $homeDir"
```

## Gotchas

- Variable names are case-insensitive; `$Name` and `$name` refer to the same variable.
- Type-constrained variables silently coerce assigned values to the declared type; assigning an incompatible value throws a `RuntimeException`.
- `$null` is PowerShell's null value; testing `if ($var)` is falsy for `$null`, `0`, empty string, and empty collection — the same Bash-style truthy/falsy applies.
