---
title: "Structs & Classes"
language: "powershell"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

PowerShell 5+ supports class definitions with the `class` keyword, providing properties, methods, constructors, and inheritance. For lightweight data objects, `[PSCustomObject]` (created from a hashtable) is the idiomatic choice and integrates seamlessly with the pipeline. .NET struct types are fully accessible but must be constructed via `[StructName]::new()`.

## Example

```powershell
# PSCustomObject — lightweight data struct
$point = [PSCustomObject]@{
    X = 3.0
    Y = 4.0
}
Write-Host "Point: ($($point.X), $($point.Y))"
$point | Add-Member -MemberType ScriptMethod -Name Distance -Value {
    [Math]::Sqrt($this.X * $this.X + $this.Y * $this.Y)
}
Write-Host "Distance: $($point.Distance())"

# PowerShell class (PS 5+)
class Rectangle {
    [double]$Width
    [double]$Height

    Rectangle([double]$w, [double]$h) {
        $this.Width  = $w
        $this.Height = $h
    }

    [double] Area()      { return $this.Width * $this.Height }
    [double] Perimeter() { return 2 * ($this.Width + $this.Height) }

    [string] ToString() {
        return "Rectangle(${($this.Width)} x ${($this.Height)})"
    }
}

$r = [Rectangle]::new(5.0, 3.0)
Write-Host $r.Area()       # 15
Write-Host $r.Perimeter()  # 16
Write-Host $r
```

## Gotchas

- PowerShell classes defined in a script are not available in child scopes or after `Import-Module` without explicit `using module` syntax; they are scope-limited.
- `[PSCustomObject]` properties are writable by default; use `Add-Member` with `-Force` or define a class to get read-only properties.
- .NET structs passed to PowerShell are boxed into `PSObject` wrappers; modifying a property on the wrapper does not modify the original struct value (value-type copy semantics).
