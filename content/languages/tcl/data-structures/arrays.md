---
title: "Arrays & Lists"
language: "tcl"
feature: "arrays"
category: "data-structures"
applicable: true
---

Tcl represents ordered sequences as **lists** — whitespace-separated strings with a specific internal structure. List commands include `lappend`, `lindex`, `lrange`, `linsert`, `lreplace`, `lsort`, `llength`, `lsearch`, and `lmap` (Tcl 8.6+). Tcl also has **array** variables (`array set`, `array get`) which are unordered associative arrays, distinct from lists.

## Example

```tcl
# List creation
set fruits {apple banana cherry}
set nums [list 1 2 3 4 5]

# Length and access
puts [llength $fruits]         ;# 3
puts [lindex $fruits 0]        ;# apple
puts [lindex $fruits end]      ;# cherry
puts [lindex $fruits end-1]    ;# banana

# Append
lappend fruits "date"
puts $fruits                   ;# apple banana cherry date

# Range slice
puts [lrange $fruits 1 2]      ;# banana cherry

# Insert and replace
set fruits [linsert $fruits 1 "avocado"]
puts $fruits   ;# apple avocado banana cherry date

# Search
puts [lsearch $fruits "banana"]    ;# 2 (index)

# Sort
set sorted [lsort $fruits]
puts $sorted   ;# apple avocado banana cherry date

# Numeric sort
set ns [lsort -integer {5 3 1 4 2}]
puts $ns   ;# 1 2 3 4 5

# lmap (transform, Tcl 8.6+)
set squares [lmap n $nums {expr {$n * $n}}]
puts $squares   ;# 1 4 9 16 25

# Nested lists (2D)
set matrix {{1 2 3} {4 5 6} {7 8 9}}
puts [lindex $matrix 1 2]   ;# 6

# join and split
puts [join $fruits ", "]              ;# apple, avocado, banana, cherry, date
set words [split "hello world" " "]
puts [llength $words]                 ;# 2
```

## Gotchas

- Lists are strings with a particular quoting convention; a string with spaces is a list with multiple elements, which can cause unexpected behaviour if a single "element" contains spaces (use `lappend` rather than string concatenation to build lists safely).
- `lindex` returns `""` for out-of-range indices, not an error.
- `lsort` sorts lexicographically by default; use `-integer`, `-real`, or `-command` for other orderings.
- Tcl arrays (`array set`) and Tcl lists are completely different; do not confuse them.
