---
title: "Parameters & Arguments"
language: "powershell"
feature: "parameters"
category: "functions"
applicable: true
---

PowerShell parameters are declared in a `param()` block with optional type constraints, default values, and validation attributes. Common validation attributes include `[Parameter(Mandatory)]`, `[ValidateNotNullOrEmpty()]`, `[ValidateRange()]`, `[ValidateSet()]`, and `[ValidatePattern()]`. Parameters can accept pipeline input with `[Parameter(ValueFromPipeline)]`. Splatting (`@params`) passes a hashtable of parameters to a command.

## Example

```powershell
function New-User {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory, Position = 0)]
        [ValidateNotNullOrEmpty()]
        [string]$Name,

        [Parameter(Position = 1)]
        [ValidateRange(18, 120)]
        [int]$Age = 25,

        [ValidateSet("admin","editor","viewer")]
        [string]$Role = "viewer",

        [switch]$Active   # boolean switch parameter
    )

    [PSCustomObject]@{
        Name   = $Name
        Age    = $Age
        Role   = $Role
        Active = $Active.IsPresent
    }
}

# Positional, named, and switch usage
New-User "Alice" 30 -Role admin -Active
New-User -Name "Bob" -Age 22

# Splatting
$params = @{ Name = "Carol"; Age = 35; Role = "editor" }
New-User @params

# Pipeline input
function Measure-StringLength {
    param(
        [Parameter(ValueFromPipeline)]
        [string]$Text
    )
    process { [PSCustomObject]@{ Text = $Text; Length = $Text.Length } }
}
"hello","world","PowerShell" | Measure-StringLength
```

## Gotchas

- `[switch]` parameters are always present as `[switch]` objects; test `.IsPresent` to get a `[bool]`. Assigning `$Active = $true` inside the function does not work correctly.
- `[Parameter(ValueFromPipeline)]` requires a `process {}` block; without it, only the last pipeline object is processed.
- Validation attributes run before the function body; a `[ValidateSet]` violation throws a `ParameterBindingValidationException` with a helpful error message listing valid values.
