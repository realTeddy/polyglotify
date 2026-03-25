---
title: "Function Declaration"
language: "tcl"
feature: "declaration"
category: "functions"
applicable: true
---

Tcl functions are called **procedures**, declared with the `proc` command: `proc name {arglist} {body}`. The procedure returns the value of the last expression, or the value passed to `return`. Procedures defined at the top level are globally visible; those defined inside namespaces are accessed via `namespace::procname`. Tcl 8.5+ also has `apply` for anonymous lambdas.

## Example

```tcl
# Basic procedure
proc greet {name} {
    return "Hello, $name!"
}
puts [greet "World"]   ;# Hello, World!

# Procedure with no return (returns empty string)
proc sayHi {name} {
    puts "Hi, $name"
}
sayHi "Alice"

# Returning the last value (implicit return)
proc add {a b} {
    expr {$a + $b}   ;# last value is returned
}
puts [add 3 4]   ;# 7

# Recursive procedure
proc factorial {n} {
    if {$n <= 1} { return 1 }
    return [expr {$n * [factorial [expr {$n - 1}]]}]
}
puts [factorial 6]   ;# 720

# Namespace procedure
namespace eval math {
    proc square {x} { expr {$x * $x} }
    proc cube   {x} { expr {$x * $x * $x} }
}
puts [math::square 5]   ;# 25
puts [math::cube 3]     ;# 27

# Procedures can be redefined at any time
proc greet {name} { return "Greetings, $name!" }
puts [greet "Bob"]   ;# Greetings, Bob!
```

## Gotchas

- `proc` replaces any existing procedure of the same name without warning — there is no immutability for procedures.
- The `return` command is optional; a procedure returns the value of the last command executed (including `""` if nothing ran).
- Procedures do not have access to global variables unless declared with `global varName` inside the body.
- `info procs` lists all defined procedures; `info args procName` lists its arguments.
