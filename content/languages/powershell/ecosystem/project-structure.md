---
title: "Project Structure"
language: "powershell"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

PowerShell modules are the standard unit of code organisation. A module is a directory containing a `.psm1` (script module) and a `.psd1` (manifest) file with the same base name. Functions intended for export are listed in `FunctionsToExport` in the manifest. Tests live in a `tests/` directory using Pester. Scripts and utilities go in a `scripts/` or `tools/` folder.

## Example

```
MyModule/
├── MyModule.psd1          # module manifest
├── MyModule.psm1          # root module (exports public functions)
├── Public/                # exported functions
│   ├── Get-User.ps1
│   ├── Set-User.ps1
│   └── Remove-User.ps1
├── Private/               # internal helper functions
│   ├── Invoke-ApiRequest.ps1
│   └── ConvertTo-UserObject.ps1
├── classes/               # PS class definitions
│   └── UserModel.ps1
├── tests/
│   ├── Get-User.Tests.ps1
│   └── Set-User.Tests.ps1
└── docs/
    └── Get-User.md        # comment-based help or Platyps docs
```

```powershell
# MyModule.psm1 — dot-source all files
$Public  = @(Get-ChildItem -Path "$PSScriptRoot/Public/*.ps1")
$Private = @(Get-ChildItem -Path "$PSScriptRoot/Private/*.ps1")

foreach ($import in ($Public + $Private)) {
    . $import.FullName
}
Export-ModuleMember -Function $Public.BaseName

# MyModule.psd1 (partial)
# @{
#     RootModule       = 'MyModule.psm1'
#     ModuleVersion    = '1.0.0'
#     FunctionsToExport = @('Get-User','Set-User','Remove-User')
#     RequiredModules  = @('Pester')
# }
```

## Gotchas

- Only functions listed in `FunctionsToExport` are exported; functions not listed are available inside the module but invisible to callers after `Import-Module`.
- Dot-sourcing files (`. $file`) runs them in the current scope; this is how module functions become available, but it also means errors in any file block the entire module load.
- The module directory name must match the `.psd1`/`.psm1` filename for `Import-Module ModuleName` auto-discovery to work.
