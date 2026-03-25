---
title: "Arrays & Lists"
language: "powershell"
feature: "arrays"
category: "data-structures"
applicable: true
---

PowerShell arrays are created with `@()` or comma-separated values. They are fixed-size `System.Object[]` by default; growing an array with `+=` creates a new array each time (O(n)). For frequently growing collections, use `[System.Collections.Generic.List[T]]`. Arrays are zero-indexed, support negative indexing (`-1` for last), and range slices with `[0..2]`.

## Example

```powershell
# Array literal
$fruits = @("apple", "banana", "cherry")
$nums = 1, 2, 3, 4, 5   # commas alone also create an array

# Access
Write-Host $fruits[0]    # apple
Write-Host $fruits[-1]   # cherry
Write-Host $fruits[0..1] # apple banana (range slice)

# Array methods (via .NET)
$fruits.Count            # 3
$fruits.Contains("apple")  # True
$fruits.IndexOf("banana")  # 1

# Pipeline operations
$fruits | Where-Object { $_ -like "*a*" }   # apple, banana
$fruits | ForEach-Object { $_.ToUpper() }

# Efficient mutable list
$list = [System.Collections.Generic.List[string]]::new()
$list.Add("one")
$list.Add("two")
$list.Add("three")
$list.Remove("two")
Write-Host $list.Count   # 2

# Array of custom objects
$people = @(
    [PSCustomObject]@{ Name = "Alice"; Age = 30 },
    [PSCustomObject]@{ Name = "Bob";   Age = 25 }
)
$people | Sort-Object Age | Select-Object Name
```

## Gotchas

- `$array += $item` creates a new array and copies all elements; in a loop this is O(n²). Use `[List[T]]` or `[ArrayList]` for frequent appends.
- A single-element array is created with `@(value)` or `,$value`; without the comma or `@()`, a single value is just a scalar, not an array.
- When a function returns one item, PowerShell unwraps the array to a scalar; use `@(Get-Items)` at the call site to force the result to always be an array.
