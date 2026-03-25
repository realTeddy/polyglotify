---
title: "Types & Type Systems"
language: "powershell"
feature: "types"
category: "basics"
applicable: true
---

PowerShell is built on .NET and has access to all .NET types. Variables are dynamically typed by default but can be statically constrained with type annotations. PowerShell includes its own type accelerators (`[string]`, `[int]`, `[datetime]`, `[regex]`, `[xml]`, `[hashtable]`, etc.) as shortcuts for full .NET type names. The `GetType()` method and `-is` operator enable runtime type checking.

## Example

```powershell
# .NET type system accessible directly
$list = [System.Collections.Generic.List[string]]::new()
$list.Add("Alice")
$list.Add("Bob")
Write-Host $list.Count   # 2

# Type accelerators
[string]$s = "hello"
[int]$n = 42
[double]$d = 3.14
[bool]$b = $true
[datetime]$dt = "2024-01-01"   # string auto-converts
[regex]$pattern = '^\d+'

# Type checking
$value = 42
Write-Host ($value -is [int])      # True
Write-Host ($value -is [string])   # False
Write-Host $value.GetType().FullName   # System.Int32

# Type casting
$str = "123"
$num = [int]$str
Write-Host ($num + 7)   # 130

# PowerShell-specific types
[hashtable]$config = @{ host = "localhost"; port = 8080 }
[array]$items = @(1, 2, 3)
[PSCustomObject]$obj = [PSCustomObject]@{ Name = "Alice"; Age = 30 }
```

## Gotchas

- PowerShell's automatic type coercion can produce surprising results; `"3" + 2` returns `"32"` (string concat), but `2 + "3"` returns `5` (int add) because the left operand's type wins.
- `[xml]` is a type accelerator for `System.Xml.XmlDocument`; assigning an XML string to it parses the document automatically.
- `$null -eq $value` is safer than `$value -eq $null` because on the right side, `$null` participates in collection equality if `$value` is an array.
