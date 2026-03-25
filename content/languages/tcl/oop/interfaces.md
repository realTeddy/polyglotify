---
title: "Interfaces & Traits"
language: "tcl"
feature: "interfaces"
category: "oop"
applicable: false
---

TclOO has no `interface` keyword or formal contract system. The closest equivalents are: **abstract base classes** (a class with methods that error if not overridden), **mixins** (shared behaviour without a class hierarchy), and **duck typing** (if an object has the required methods, it works). Tcl's dynamic nature means interface contracts are conventional rather than enforced.

## Example

```tcl
# Abstract base class pattern — methods raise an error if not overridden
oo::class create IDrawable {
    method draw {} {
        error "[info object class [self]] must implement 'draw'"
    }
    method area {} {
        error "[info object class [self]] must implement 'area'"
    }
}

oo::class create Circle {
    superclass IDrawable
    variable radius

    constructor {r} { set radius $r }

    method draw {} {
        puts "Drawing circle with radius $radius"
    }
    method area {} {
        expr {3.14159 * $radius * $radius}
    }
}

# Mixin as a "trait"
oo::class create Serializable {
    method serialize {} {
        set vars [info object vars [self]]
        set d {}
        foreach v $vars {
            dict set d $v [set $v]
        }
        return $d
    }
}

oo::define Circle mixin Serializable

set c [Circle new 5]
$c draw                         ;# Drawing circle with radius 5
puts [$c area]                  ;# 78.53975
puts [$c serialize]             ;# radius 5

# Duck typing — no interface needed
proc renderAll {shapes} {
    foreach s $shapes {
        if {[catch {$s draw} err]} {
            puts "Error: $err"
        }
    }
}

renderAll [list $c]
$c destroy
```

## Gotchas

- There is no compile-time or runtime enforcement of "implements interface" — missing methods are only caught when called.
- Mixins are the closest thing to traits; they can be added dynamically to any class with `oo::define ClassName mixin MixinName`.
- `catch` is used to handle calls to methods that may not exist; `info object methods $obj` can be used to check at runtime.
- For stronger contracts, use `proc`-based facades that validate before delegating, or external validation with `info object methods`.
