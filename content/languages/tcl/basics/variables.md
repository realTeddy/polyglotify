---
title: "Variables & Declaration"
language: "tcl"
feature: "variables"
category: "basics"
applicable: true
---

In Tcl, everything is a string. Variables are created on first assignment with `set`. There is no type declaration — variables hold string values that are interpreted contextually as numbers, lists, or other types. `set` assigns and reads variables; `unset` removes them. `variable` declares a namespace variable inside a procedure. `global` imports a global variable into a procedure's scope.

## Example

```tcl
# Assigning variables
set name "Alice"
set age  30
set pi   3.14159

# Reading a variable
puts $name         ;# Alice

# String interpolation in double quotes
puts "Hello, $name! You are $age years old."

# No interpolation in braces
puts {Hello, $name}   ;# literal: Hello, $name

# Multiple assignment via lassign
lassign {10 20 30} x y z
puts "$x $y $z"    ;# 10 20 30

# Checking existence
if {[info exists name]} {
    puts "name is set"
}

# Unsetting
unset name
puts [info exists name]   ;# 0

# global and variable
set globalCounter 0
proc increment {} {
    global globalCounter
    incr globalCounter
}
increment
puts $globalCounter   ;# 1
```

## Gotchas

- `$varName` substitutes the value; using a bare `varName` (without `$`) refers to the string "varName", not the variable.
- Variable names are case-sensitive: `$Name` and `$name` are different variables.
- `set varName` (with one argument) reads the variable — it does not set it to anything.
- Arrays use a different syntax: `set arr(key) value` and `$arr(key)` — they are not Tcl lists.
