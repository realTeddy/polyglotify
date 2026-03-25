---
title: "Inheritance"
language: "powershell"
feature: "inheritance"
category: "oop"
applicable: true
---

PowerShell classes support single inheritance using `:` syntax. Child classes call the parent constructor with `([Base]$this).Constructor(args)` or via the `base` keyword in method overrides. Method overriding works by redefining the method in the subclass. PowerShell also allows inheriting from .NET base classes, enabling custom exceptions and other framework integrations.

## Example

```powershell
class Animal {
    [string]$Name
    [string]$Sound

    Animal([string]$name, [string]$sound) {
        $this.Name  = $name
        $this.Sound = $sound
    }

    [string] Speak() {
        return "$($this.Name) says $($this.Sound)"
    }

    [string] ToString() { return "Animal($($this.Name))" }
}

class Dog : Animal {
    [string]$Breed

    Dog([string]$name, [string]$breed) : base($name, "Woof") {
        $this.Breed = $breed
    }

    # Override
    [string] Speak() {
        return "$($this.Name) the $($this.Breed) barks: $($this.Sound)!"
    }
}

# Inheriting from .NET — custom exception
class ValidationException : System.Exception {
    [string]$Field

    ValidationException([string]$field, [string]$message) : base($message) {
        $this.Field = $field
    }
}

$dog = [Dog]::new("Rex", "German Shepherd")
Write-Host $dog.Speak()
Write-Host ($dog -is [Animal])   # True

try {
    throw [ValidationException]::new("email", "Invalid email address")
} catch [ValidationException] {
    Write-Host "Field: $($_.Exception.Field) — $($_.Exception.Message)"
}
```

## Gotchas

- The `: base(args)` constructor chaining syntax is only supported in PowerShell 5+; there is no `super.Method()` call syntax for overriding method calls.
- All methods in PowerShell classes are effectively virtual (overridable); there is no `final`/`sealed` modifier to prevent overriding.
- When inheriting from .NET classes, the PowerShell class must call the base constructor explicitly; not all .NET base class constructors are accessible from PowerShell's limited inheritance model.
