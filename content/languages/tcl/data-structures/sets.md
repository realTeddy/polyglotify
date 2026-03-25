---
title: "Sets"
language: "tcl"
feature: "sets"
category: "data-structures"
applicable: false
---

Tcl has no built-in set data type. Sets are typically emulated with a **dict** where each key maps to `1` (membership as a key presence check) or with a **sorted list** plus `lsearch`. Tcllib provides a `struct::set` module for proper set operations (union, intersection, difference). For small sets, the dict-based idiom is idiomatic Tcl.

## Example

```tcl
# ---- dict-based set ----
proc set::create {args} {
    set s {}
    foreach item $args {
        dict set s $item 1
    }
    return $s
}

proc set::contains {s item} { dict exists $s $item }
proc set::add      {s item} { dict set s $item 1; return $s }
proc set::remove   {s item} { dict unset s $item; return $s }
proc set::members  {s}      { dict keys $s }

proc set::union {a b} {
    dict for {k _} $b { dict set a $k 1 }
    return $a
}

proc set::intersect {a b} {
    set result {}
    dict for {k _} $a {
        if {[dict exists $b $k]} { dict set result $k 1 }
    }
    return $result
}

set A [set::create apple banana cherry]
set B [set::create banana date cherry]

puts [set::contains $A apple]          ;# 1
puts [set::contains $A grape]          ;# 0
puts [set::members [set::union $A $B]] ;# apple banana cherry date
puts [set::members [set::intersect $A $B]] ;# banana cherry

# ---- Tcllib struct::set (if installed) ----
# package require struct::set
# set A [struct::set create apple banana cherry]
# struct::set include A date
# struct::set union A B
```

## Gotchas

- The dict-based set is efficient for membership testing (O(1)) but has no guaranteed order for `dict keys`.
- `Tcllib`'s `struct::set` provides proper union, intersection, and difference but requires Tcllib to be installed.
- Using a list as a set with `lsearch` for membership is O(n) — avoid for large sets.
- No deduplication happens automatically with lists; `lsort -unique` produces a sorted deduplicated list from a list, which is the simplest "set" for read-only use.
