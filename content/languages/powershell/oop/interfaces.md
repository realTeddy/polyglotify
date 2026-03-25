---
title: "Interfaces & Traits"
language: "powershell"
feature: "interfaces"
category: "oop"
applicable: false
---

PowerShell classes cannot directly implement .NET interfaces using the `class` keyword syntax. Interface implementation requires C# code loaded via `Add-Type`. PowerShell's duck-typing and dynamic dispatch make interfaces less necessary in practice — any object with the expected methods will work in pipeline and script block contexts. `PSCustomObject` with `Add-Member` can simulate interface-style contracts informally.

## Example

```powershell
# Interface implementation via Add-Type (C# in PowerShell)
Add-Type @'
    public interface IGreeter {
        string Greet(string name);
    }

    public class FormalGreeter : IGreeter {
        public string Greet(string name) => $"Good day, {name}.";
    }
'@

$greeter = [FormalGreeter]::new()
Write-Host $greeter.Greet("Alice")   # Good day, Alice.
Write-Host ($greeter -is [IGreeter]) # True

# Duck-typing approach — no interface needed
function Invoke-Greeter {
    param($Greeter, [string]$Name)
    # Any object with a Greet() method works
    $Greeter.Greet($Name)
}

# PSCustomObject with method — satisfies the duck type
$informalGreeter = [PSCustomObject]@{}
$informalGreeter | Add-Member -MemberType ScriptMethod -Name Greet -Value {
    param($n) "Hey, $n!"
}
Invoke-Greeter $informalGreeter "Bob"    # Hey, Bob!
Invoke-Greeter $greeter         "Carol"  # Good day, Carol.
```

## Gotchas

- `Add-Type` compiles C# at runtime; once a type is loaded in a session it cannot be unloaded — restarting PowerShell is required to change the definition.
- PowerShell's duck-typing means you only discover a missing method at runtime, not compile time; write Pester tests to validate that objects conform to expected contracts.
- `Add-Type` without `-Language CSharp` defaults to CSharp; specify the language explicitly for clarity and to avoid surprises in future PowerShell versions.
