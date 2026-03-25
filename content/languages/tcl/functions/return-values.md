---
title: "Return Values"
language: "tcl"
feature: "return-values"
category: "functions"
applicable: true
---

A Tcl procedure returns a single string value via `return` or implicitly as the result of the last command. Multiple values are returned as a list (flat or nested) and unpacked by the caller with `lassign` or `lindex`. Error information is returned via `return -code error` or by raising an error with the `error` command.

## Example

```tcl
# Single return value
proc square {n} { expr {$n * $n} }
puts [square 7]   ;# 49

# Implicit return (last command result)
proc double {n} { expr {$n * 2} }
puts [double 5]   ;# 10

# Multiple values as a list
proc divmod {a b} {
    list [expr {$a / $b}] [expr {$a % $b}]
}
set result [divmod 17 5]
puts $result          ;# 3 2
lassign $result q r
puts "q=$q r=$r"      ;# q=3 r=2

# Returning a dict for named values
proc getUserInfo {name} {
    dict create name $name age 30 active true
}
set info [getUserInfo "Alice"]
puts [dict get $info name]    ;# Alice
puts [dict get $info age]     ;# 30

# Early return
proc safeSqrt {x} {
    if {$x < 0} { return 0 }
    expr {sqrt($x)}
}
puts [safeSqrt -4]    ;# 0
puts [safeSqrt 9]     ;# 3.0

# return -code error (like throwing)
proc positiveOnly {n} {
    if {$n <= 0} {
        return -code error "must be positive, got $n"
    }
    return $n
}
if {[catch {positiveOnly -5} err]} {
    puts "Error: $err"    ;# Error: must be positive, got -5
}
```

## Gotchas

- A procedure with no `return` statement and an empty body returns `""` (empty string).
- `return -code error` sets the error condition but does not throw an exception in the C sense — callers use `catch` to intercept it.
- Lists returned from a procedure may need `lassign` or `lindex` to unpack; a list with one element and a list with that element unbraced can behave differently.
- `return -level 2 value` returns from the caller's caller — useful in control-flow macros but rarely needed in normal code.
