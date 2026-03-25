---
title: "Parameters & Arguments"
language: "tcl"
feature: "parameters"
category: "functions"
applicable: true
---

Tcl procedure parameters are listed in an argument list. Default values are specified as `{argName defaultValue}`. A final argument named `args` collects all remaining arguments into a list (variadic). Pass-by-reference is achieved by passing the variable name and using `upvar` inside the procedure to create an alias. Named arguments are handled by convention using `args` with `dict` parsing.

## Example

```tcl
# Default parameters
proc connect {host {port 8080} {timeout 30}} {
    puts "Connecting to $host:$port (timeout: ${timeout}s)"
}
connect "localhost"
connect "example.com" 443
connect "example.com" 443 10

# Variadic args
proc sumAll {args} {
    set total 0
    foreach n $args {
        incr total $n
    }
    return $total
}
puts [sumAll 1 2 3 4 5]   ;# 15

# Pass by reference with upvar
proc doubleInPlace {varName} {
    upvar 1 $varName v
    set v [expr {$v * 2}]
}
set x 21
doubleInPlace x
puts $x   ;# 42

# Named/keyword arguments (by convention)
proc createUser {args} {
    set name  [dict get $args -name]
    set age   [dict getdefault $args -age 0]
    set admin [dict getdefault $args -admin false]
    puts "User: $name, age=$age, admin=$admin"
}
createUser -name Alice -age 30 -admin true
createUser -name Bob

# upvar with level
proc swap {a b} {
    upvar 1 $a x $b y
    set tmp $x
    set x $y
    set y $tmp
}
set p 10; set q 20
swap p q
puts "$p $q"   ;# 20 10
```

## Gotchas

- `args` must be the last parameter; having any parameter after `args` is a syntax error.
- `upvar 1` links to the caller's variable; `upvar 0` links to the current scope (aliasing); `upvar #0` links to the global scope.
- `dict getdefault` requires Tcl 8.7+; use `if {[dict exists $args -key]} { ... } else { set default }` for compatibility.
- Default values are evaluated at definition time if they are constants, but dynamic expressions (like `[clock seconds]`) must be handled manually in the body.
