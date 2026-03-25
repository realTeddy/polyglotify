---
title: "Package Manager"
language: "powershell"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

PowerShell modules are distributed via the **PowerShell Gallery** (powershellgallery.com) and managed with `Install-Module`, `Update-Module`, and `Find-Module` from the **PowerShellGet** module. **PSDepend** handles dependency files similar to `requirements.txt`. **Scoop** and **Chocolatey** manage standalone tool installations on Windows. **NuGet** packages (.NET assemblies) can be loaded directly with `Install-Package` or by referencing `.dll` files.

## Example

```powershell
# Search and install from PowerShell Gallery
Find-Module Pester | Select-Object Name, Version, Description
Install-Module Pester -Scope CurrentUser -Force
Install-Module PSScriptAnalyzer -Scope CurrentUser
Install-Module Az -Scope CurrentUser   # Azure module

# Update all modules
Update-Module

# List installed modules
Get-Module -ListAvailable | Select-Object Name, Version | Sort-Object Name

# Import a module
Import-Module Pester
Get-Command -Module Pester | Select-Object Name

# NuGet package
Install-Package Newtonsoft.Json -Scope CurrentUser -Source nuget.org
# Or load a DLL directly
# Add-Type -Path "path/to/Newtonsoft.Json.dll"

# requirements.psd1 (PSDepend)
# @{
#     Pester          = '5.5.0'
#     PSScriptAnalyzer = '1.21.0'
# }
# Install-Dependency -Path requirements.psd1
```

## Gotchas

- `Install-Module` defaults to `AllUsers` scope on elevated prompts; always specify `-Scope CurrentUser` in automation scripts to avoid permission issues.
- Module versions are side-by-side by default; if two scripts require different versions of a module, both can coexist under `~\Documents\PowerShell\Modules`.
- PowerShell Gallery packages are not signed by default; use `-AllowPrerelease` carefully and always check publisher trust before installing.
