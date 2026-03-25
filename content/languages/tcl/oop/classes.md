---
title: "Classes"
language: "tcl"
feature: "classes"
category: "oop"
applicable: true
---

TclOO (built into Tcl 8.6) is the standard OOP system. Classes are created with `oo::class create`. Instance methods are defined with `method`; the constructor with `constructor`. Instance variables are declared with `variable`. Class-level methods use `self method`. `my` refers to the current object inside a method.

## Example

```tcl
oo::class create Animal {
    variable name sound

    constructor {n s} {
        set name $n
        set sound $s
    }

    method speak {} {
        puts "$name says $sound!"
    }

    method name {} { return $name }

    # Class-level method
    self method kingdom {} { return "Animalia" }

    # Destructor
    destructor {
        puts "Goodbye, $name"
    }
}

# Instantiation
set dog [Animal new "Rex" "Woof"]
set cat [Animal new "Whiskers" "Meow"]

$dog speak                            ;# Rex says Woof!
$cat speak                            ;# Whiskers says Meow!
puts [$dog name]                      ;# Rex

# Class method
puts [Animal kingdom]                 ;# Animalia

# Introspection
puts [info object class $dog]         ;# ::Animal
puts [info object methods $dog]       ;# destroy name speak

# Object is a command — can be stored and passed
proc makeSpeak {obj} { $obj speak }
makeSpeak $cat

$dog destroy
$cat destroy
```

## Gotchas

- TclOO object names are commands; if you `rename` or `unset` the variable holding the object name, the object still exists as a command (until `destroy` is called).
- `variable` in TclOO declares which variables are instance variables; accessing an undeclared variable inside a method creates a local variable, not an instance variable.
- `my method args` calls another method on the same object (like `self.method()` in other languages).
- There is no access control (`private`/`public`) in TclOO — all methods are callable from outside the object.
