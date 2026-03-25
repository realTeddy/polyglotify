---
title: "Types & Type Systems"
language: "tcl"
feature: "types"
category: "basics"
applicable: true
---

Tcl has a single universal data type: the **string**. However, the interpreter maintains an internal dual representation (string + typed value) for efficiency. Values are interpreted as integers, doubles, booleans, lists, or dictionaries depending on the command context. Tcl 8.5+ has a proper `dict` type. Type errors appear at the point of use, not at assignment.

## Example

```tcl
# All values are strings internally
set x 42
set y 3.14
set flag true
set name "hello"

# Integer arithmetic
puts [expr {$x + 8}]          ;# 50
puts [expr {$x * 2}]          ;# 84

# Double arithmetic
puts [expr {$y * 2}]          ;# 6.28
puts [expr {sqrt($y)}]        ;# 1.772...

# Boolean context
if {$flag} { puts "true" }
if {$x > 0} { puts "positive" }

# String operations
puts [string length $name]    ;# 5
puts [string toupper $name]   ;# HELLO
puts [string index $name 0]   ;# h

# List type
set lst {apple banana cherry}
puts [llength $lst]           ;# 3
puts [lindex $lst 1]          ;# banana

# Type checking at use time
set notANumber "abc"
if {[string is integer $notANumber]} {
    puts "integer"
} else {
    puts "not an integer"     ;# printed
}

# Explicit conversion
set n [expr {int(3.9)}]       ;# 3
set s [format "%.2f" 3.14159] ;# 3.14
```

## Gotchas

- Tcl has no compile-time type checking — type errors only appear when a command tries to interpret a value in a specific way (e.g., `expr {$x + 1}` fails if `$x` is `"abc"`).
- `true`, `yes`, `1`, `on` are all boolean true; `false`, `no`, `0`, `off` are boolean false — they are contextually equivalent.
- Integer overflow is silently promoted to bignum (arbitrary precision) in Tcl 8.5+.
- Always brace `expr` expressions (`expr {$a + $b}`) to prevent double substitution bugs.
