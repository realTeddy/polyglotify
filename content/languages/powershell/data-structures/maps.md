---
title: "Maps & Dictionaries"
language: "powershell"
feature: "maps"
category: "data-structures"
applicable: true
---

PowerShell's built-in dictionary type is `[hashtable]`, created with `@{ key = value }` syntax. `[ordered]` creates an `OrderedDictionary` that preserves insertion order. For type-safe dictionaries, use `[System.Collections.Generic.Dictionary[K,V]]`. Hashtables are the basis for `New-Object`, `PSCustomObject` creation, and splatting parameters.

## Example

```powershell
# Hashtable literal
$config = @{
    Host    = "localhost"
    Port    = 5432
    Database = "myapp"
}

# Access
Write-Host $config["Host"]    # localhost
Write-Host $config.Port       # 5432 (dot notation)

# Ordered dictionary (preserves insertion order)
$ordered = [ordered]@{ a = 1; b = 2; c = 3 }
$ordered.Keys   # a, b, c (in order)

# Add, update, remove
$config["Username"] = "admin"
$config.Password = "secret"
$config.Remove("Password")

# Check key existence
$config.ContainsKey("Host")       # True
"Database" -in $config.Keys       # True

# Iterate
foreach ($pair in $config.GetEnumerator()) {
    Write-Host "$($pair.Key) = $($pair.Value)"
}

# Convert to PSCustomObject (for property access and pipeline)
$obj = [PSCustomObject]$config
Write-Host $obj.Host   # localhost

# Merge hashtables
$extra = @{ Timeout = 30; MaxPool = 10 }
$merged = $config + $extra
Write-Host $merged.Count
```

## Gotchas

- Hashtable keys are case-insensitive by default; `$h["Key"]` and `$h["key"]` access the same entry. Use `[System.Collections.Hashtable]::new([StringComparer]::Ordinal)` for case-sensitive keys.
- `@{}` creates a case-insensitive `[hashtable]`; `[ordered]@{}` creates a case-insensitive `OrderedDictionary`. Neither is the same as a `[Dictionary[string,object]]`.
- Splatting with `@variable` only works for `[hashtable]` (named splatting) or `[array]` (positional splatting); other types cause an error.
