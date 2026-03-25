---
title: "Inheritance"
language: "tcl"
feature: "inheritance"
category: "oop"
applicable: true
---

TclOO supports single and multiple inheritance via `oo::class create Child {superclass Parent}` and `oo::class create Child {superclass {A B}}`. Overriding a method in the subclass shadows the parent method; `next` calls the parent's version (like `super` in other languages). Mixins add behaviour without full inheritance.

## Example

```tcl
# Base class
oo::class create Shape {
    variable color

    constructor {c} { set color $c }

    method color {} { return $color }
    method area  {} { return 0 }
    method describe {} {
        format "%s(%s, area=%.2f)" [info object class [self]] $color [my area]
    }
}

# Single inheritance
oo::class create Circle {
    superclass Shape
    variable radius

    constructor {color r} {
        next $color        ;# call Shape constructor
        set radius $r
    }

    method area {} {
        expr {3.14159265 * $radius * $radius}
    }
}

oo::class create Rectangle {
    superclass Shape
    variable w h

    constructor {color width height} {
        next $color
        set w $width
        set h $height
    }

    method area {} { expr {$w * $h} }
}

# Mixin
oo::class create Printable {
    method print {} {
        puts [my describe]
    }
}

oo::define Circle mixin Printable
oo::define Rectangle mixin Printable

set c [Circle new "red" 5]
set r [Rectangle new "blue" 3 4]

puts [$c area]        ;# 78.539...
puts [$r describe]    ;# ::Rectangle(blue, area=12.00)
$c print              ;# ::Circle(red, area=78.54)

# isa check
puts [info object isa typeof $c Shape]    ;# 1
puts [info object isa typeof $c Circle]   ;# 1

$c destroy
$r destroy
```

## Gotchas

- `next` calls the next method in the Method Resolution Order (MRO), not necessarily the direct parent; in multiple inheritance this can be non-obvious.
- Method lookup traverses superclasses in C3 linearisation order (same as Python).
- Mixins are inserted at the front of the MRO, so mixin methods take priority over class methods.
- Unlike some languages, there is no `abstract` modifier — you can instantiate any class, even one whose methods have no meaningful implementation.
