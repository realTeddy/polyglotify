---
title: "Tuples"
language: "tcl"
feature: "tuples"
category: "data-structures"
applicable: false
---

Tcl has no tuple type. Fixed-size heterogeneous sequences are represented as **lists** and unpacked with `lindex` or `lassign`. Named multi-value groups use **dicts**. Since everything is a string in Tcl, a list of two or three elements serves the same role as a tuple in other languages.

## Example

```tcl
# Two-element "tuple" as a list
proc divmod {a b} {
    list [expr {$a / $b}] [expr {$a % $b}]
}

set result [divmod 17 5]
lassign $result quotient remainder
puts "q=$quotient r=$remainder"   ;# q=3 r=2

# Alternatively, unpack with lindex
set q [lindex $result 0]
set r [lindex $result 1]
puts "$q $r"   ;# 3 2

# Three-element "tuple"
proc rgb {r g b} { list $r $g $b }
set color [rgb 255 128 0]
puts [lindex $color 0]   ;# 255

# Named "tuple" via dict
proc makePoint {x y} {
    dict create x $x y $y
}
set p [makePoint 3.0 4.0]
puts [dict get $p x]     ;# 3.0
puts [dict get $p y]     ;# 4.0

# Destructuring a list of pairs
set pairs {{a 1} {b 2} {c 3}}
foreach pair $pairs {
    lassign $pair key val
    puts "$key -> $val"
}
```

## Gotchas

- Lists in Tcl are mutable (you can `lappend` to them), so they do not enforce the fixed-size immutability of tuples in other languages.
- `lassign` is the idiomatic unpacking tool (Tcl 8.5+); in older code, multiple `lindex` calls were used instead.
- When a procedure returns a list as a "tuple", the caller must know how many elements to expect — there is no structural enforcement.
- Dicts add readability over plain lists for named tuples, at the cost of slightly more verbose syntax.
