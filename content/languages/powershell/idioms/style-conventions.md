---
title: "Style Conventions"
language: "powershell"
feature: "style-conventions"
category: "idioms"
applicable: true
---

The official PowerShell Practice and Style Guide (PSSA) and the community-maintained PowerShell Best Practices guide define conventions. Key rules: use `Verb-Noun` function names with approved verbs, `PascalCase` for functions and parameters, `$camelCase` or `$PascalCase` for variables, use `$PSCmdlet.ShouldProcess` for destructive operations, and always include comment-based help for public functions. **PSScriptAnalyzer** enforces these automatically.

## Example

```powershell
<#
.SYNOPSIS
    Creates a new user account in the system.
.DESCRIPTION
    Provisions a new user with the specified name, role, and optional
    email address. Requires admin privileges.
.PARAMETER Name
    The full name of the new user.
.PARAMETER Role
    The role to assign. Valid values: admin, editor, viewer.
.EXAMPLE
    New-AppUser -Name "Alice Smith" -Role admin
#>
function New-AppUser {
    [CmdletBinding(SupportsShouldProcess)]
    [OutputType([PSCustomObject])]
    param(
        [Parameter(Mandatory, Position = 0)]
        [ValidateNotNullOrEmpty()]
        [string]$Name,

        [ValidateSet("admin", "editor", "viewer")]
        [string]$Role = "viewer",

        [string]$Email
    )

    if ($PSCmdlet.ShouldProcess($Name, "Create user")) {
        [PSCustomObject]@{
            Id        = [guid]::NewGuid().ToString()
            Name      = $Name
            Role      = $Role
            Email     = $Email
            CreatedAt = (Get-Date).ToString("o")
        }
    }
}

# Verb-Noun naming convention
# Get-Item, Set-Item, New-Item, Remove-Item, Invoke-Item, Test-Path
# Use Get-Verb to list all approved verbs
Get-Verb | Where-Object { $_.Group -eq "Lifecycle" } | Select-Object Verb
```

## Gotchas

- Using an unapproved verb (e.g., `Fetch-Data` instead of `Get-Data`) triggers a warning when the module is imported, even if the function works correctly.
- `[CmdletBinding(SupportsShouldProcess)]` adds `-WhatIf` and `-Confirm` parameters automatically; always guard destructive operations with `$PSCmdlet.ShouldProcess`.
- PSScriptAnalyzer rules can be configured per-project with a `.psd1` settings file; use `Invoke-ScriptAnalyzer -Settings PSGallery` for the strictest community standard.
