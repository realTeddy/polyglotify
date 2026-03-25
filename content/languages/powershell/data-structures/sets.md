---
title: "Sets"
language: "powershell"
feature: "sets"
category: "data-structures"
applicable: true
---

PowerShell has no built-in set literal, but `[System.Collections.Generic.HashSet[T]]` provides a proper set implementation. Common set operations (union, intersection, difference) use `UnionWith`, `IntersectWith`, and `ExceptWith` methods. For simple deduplication, the `Select-Object -Unique` cmdlet or `-join`/`-split` with `Sort-Object -Unique` are convenient one-liners.

## Example

```powershell
# HashSet for unique values
$set = [System.Collections.Generic.HashSet[string]]::new()
$set.Add("apple")  | Out-Null
$set.Add("banana") | Out-Null
$set.Add("apple")  | Out-Null   # duplicate — returns $false
Write-Host $set.Count   # 2

# Initialise from array
$tags = [System.Collections.Generic.HashSet[string]]::new(
    [string[]]@("swift","ios","swift","objc")
)
Write-Host $tags.Count   # 3

# Membership
$tags.Contains("ios")      # True
"swift" -in $tags          # True

# Set operations (mutate in place — use copies)
$a = [System.Collections.Generic.HashSet[int]]::new([int[]]@(1,2,3,4))
$b = [System.Collections.Generic.HashSet[int]]::new([int[]]@(3,4,5,6))

$union = [System.Collections.Generic.HashSet[int]]::new($a)
$union.UnionWith($b)
Write-Host ($union | Sort-Object)   # 1 2 3 4 5 6

$inter = [System.Collections.Generic.HashSet[int]]::new($a)
$inter.IntersectWith($b)
Write-Host ($inter | Sort-Object)   # 3 4

# Quick deduplication with pipeline
@("a","b","a","c","b") | Sort-Object -Unique
```

## Gotchas

- `HashSet.Add()` returns a `[bool]` indicating whether the item was new; suppress it with `| Out-Null` or `[void]` to prevent polluting function output.
- Set operation methods like `UnionWith` mutate the receiver in place; always clone before operating if you need the original.
- `Select-Object -Unique` performs case-sensitive comparison by default for strings; sort first with `Sort-Object` for consistent ordering.
