---
title: "Generics"
language: "tcl"
feature: "generics"
category: "oop"
applicable: false
---

Tcl has no generics or parameterised types. Because Tcl is dynamically typed and everything is a string, containers and procedures work with any type without type parameters. A `list`, `dict`, or TclOO class naturally holds values of any type. The equivalent of generics is simply writing procedures that operate on values without type annotations — Tcl's duck typing handles the rest.

## Example

```tcl
# A "generic" stack — works with any value type
oo::class create Stack {
    variable data

    constructor {} { set data {} }

    method push {item}  { lappend data $item }
    method pop  {}      {
        if {[llength $data] == 0} { error "Stack underflow" }
        set top [lindex $data end]
        set data [lrange $data 0 end-1]
        return $top
    }
    method peek {}      { lindex $data end }
    method size {}      { llength $data }
    method empty {}     { expr {[llength $data] == 0} }
}

# Works with integers
set si [Stack new]
$si push 1
$si push 2
$si push 3
puts [$si pop]    ;# 3
puts [$si size]   ;# 2

# Works with strings (same class!)
set ss [Stack new]
$ss push "hello"
$ss push "world"
puts [$ss pop]    ;# world

# Works with dicts
set sd [Stack new]
$sd push [dict create x 1 y 2]
set top [$sd pop]
puts [dict get $top x]   ;# 1

$si destroy; $ss destroy; $sd destroy

# Generic sort (works for any comparable type)
proc typedSort {lst type} {
    lsort -$type $lst
}
puts [typedSort {5 3 1 4 2} integer]    ;# 1 2 3 4 5
puts [typedSort {c a b} ascii]          ;# a b c
```

## Gotchas

- Tcl's "generics" are implicit — there is no type checking on what goes into a container, so mixing incompatible types in a sorted list will cause runtime errors.
- Without type parameters, IDEs and documentation tools cannot infer what type a container holds — documentation and naming conventions are important.
- For type-safe containers, validate values in the `push`/`add` method using `string is` or similar checks.
- Some Tcl extensions (like Critcl) allow writing typed, compiled extensions in C for performance-sensitive typed containers.
