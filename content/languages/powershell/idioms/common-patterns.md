---
title: "Common Patterns"
language: "powershell"
feature: "common-patterns"
category: "idioms"
applicable: true
---

Key PowerShell idioms include the object pipeline (chain cmdlets rather than string parsing), `$ErrorActionPreference = 'Stop'` for safe scripts, `[PSCustomObject]` for structured data, splatting for long parameter lists, `Invoke-RestMethod` for REST APIs, and `Select-Object` / `Where-Object` for filtering. The `#Requires` statement declares minimum version and module requirements at the top of scripts.

## Example

```powershell
#Requires -Version 7.0
#Requires -Modules Pester
$ErrorActionPreference = 'Stop'

# Object pipeline — filter and transform
Get-Process |
    Where-Object { $_.CPU -gt 1 } |
    Sort-Object CPU -Descending |
    Select-Object Name, CPU, WorkingSet64 -First 10 |
    Format-Table -AutoSize

# Splatting for long parameter lists
$invokeParams = @{
    Uri     = "https://api.github.com/repos/PowerShell/PowerShell"
    Method  = "GET"
    Headers = @{ Accept = "application/vnd.github.v3+json" }
}
$repo = Invoke-RestMethod @invokeParams
Write-Host "Stars: $($repo.stargazers_count)"

# Filter and shape data
$users = @(
    [PSCustomObject]@{ Name = "Alice"; Age = 30; Active = $true },
    [PSCustomObject]@{ Name = "Bob";   Age = 17; Active = $false },
    [PSCustomObject]@{ Name = "Carol"; Age = 25; Active = $true }
)
$users |
    Where-Object { $_.Active -and $_.Age -ge 18 } |
    Select-Object Name, @{ Name = "AgeGroup"; Expression = {
        if ($_.Age -lt 30) { "Young Adult" } else { "Adult" }
    }} |
    Sort-Object Name
```

## Gotchas

- Parsing text output from external commands is fragile; prefer cmdlets and .NET APIs that return structured objects wherever possible.
- `Where-Object { $_.Property -eq "value" }` short-circuits on `$null` objects; always ensure the collection is not `$null` before piping, or use `@($collection) |`.
- Calculated properties in `Select-Object` use `@{ Name = "..."; Expression = { ... } }` syntax; the `Expression` key can be abbreviated to `e` but `Name` cannot be abbreviated.
