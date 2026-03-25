---
title: "Tuples"
language: "powershell"
feature: "tuples"
category: "data-structures"
applicable: true
---

PowerShell has access to .NET's `System.Tuple` and `System.ValueTuple` types, making tuples fully usable. `[System.ValueTuple]::Create()` creates value tuples, and PowerShell 7+ supports the `[ValueTuple[T1,T2,...]]` accelerator. In practice, `[PSCustomObject]` with named properties is more idiomatic because it is self-documenting and works naturally with the pipeline.

## Example

```powershell
# .NET ValueTuple (PowerShell 7+)
$point = [System.ValueTuple]::Create(3, 4)
Write-Host $point.Item1   # 3
Write-Host $point.Item2   # 4

# Two-element tuple
$pair = [System.Tuple]::Create("Alice", 30)
Write-Host "$($pair.Item1) is $($pair.Item2)"

# Preferred idiomatic alternative: PSCustomObject
$person = [PSCustomObject]@{ Name = "Alice"; Age = 30 }
Write-Host "$($person.Name) is $($person.Age)"

# Multiple return via array (simple tuple-like)
function Get-MinMax {
    param([int[]]$nums)
    $min = ($nums | Measure-Object -Minimum).Minimum
    $max = ($nums | Measure-Object -Maximum).Maximum
    $min, $max   # returns array of 2
}
$lo, $hi = Get-MinMax 3, 1, 4, 1, 5, 9
Write-Host "min=$lo max=$hi"

# Array destructuring
$a, $b, $rest = 1, 2, 3, 4, 5
Write-Host "a=$a b=$b rest=$rest"
# $rest captures [3,4,5] — all remaining elements
```

## Gotchas

- .NET `Tuple` has 8-element max per generic parameter (use `TRest` for more); `ValueTuple` has no such limit in .NET but PowerShell type syntax gets cumbersome.
- Array destructuring `$a, $b = array` assigns the remaining elements (not just one) to the last variable if there are more items than variables.
- `[PSCustomObject]` is almost always preferable to tuples in PowerShell because property names make the data self-documenting and it integrates with `Format-Table`, `Select-Object`, and `Export-Csv`.
