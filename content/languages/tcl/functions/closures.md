---
title: "Closures & Lambdas"
language: "tcl"
feature: "closures"
category: "functions"
applicable: true
---

Tcl supports anonymous procedures via `apply` (Tcl 8.5+). `apply` takes a lambda (a two-element list `{arglist body}` or three-element list `{arglist body namespace}`) and argument values. True closures (capturing variables from the enclosing scope) are approximated using `upvar`, `namespace upvar`, or by constructing scripts with substituted values. The `coroutine` command (Tcl 8.6+) enables generator-style patterns.

## Example

```tcl
# apply — anonymous function (lambda)
set square [list {x} {expr {$x * $x}}]
puts [apply $square 5]   ;# 25

# Inline lambda
puts [apply {{a b} {expr {$a + $b}}} 3 4]   ;# 7

# Higher-order procedures
proc map {func lst} {
    set result {}
    foreach item $lst {
        lappend result [apply $func $item]
    }
    return $result
}

set doubled [map {{x} {expr {$x * 2}}} {1 2 3 4 5}]
puts $doubled   ;# 2 4 6 8 10

# Closure over a captured value (baked in via string construction)
proc makeAdder {base} {
    # bake $base into the lambda body
    list [list x] "expr {\$x + $base}"
}
set add10 [makeAdder 10]
puts [apply $add10 7]    ;# 17
puts [apply $add10 3]    ;# 13

# filter higher-order proc
proc filter {pred lst} {
    set result {}
    foreach item $lst {
        if {[apply $pred $item]} { lappend result $item }
    }
    return $result
}
set evens [filter {{n} {expr {$n % 2 == 0}}} {1 2 3 4 5 6}]
puts $evens   ;# 2 4 6

# Coroutine as a generator (Tcl 8.6+)
proc counter {start} {
    set i $start
    while 1 {
        yield $i
        incr i
    }
}
coroutine gen counter 0
puts [gen]   ;# 0
puts [gen]   ;# 1
puts [gen]   ;# 2
```

## Gotchas

- `apply` is available from Tcl 8.5; older scripts must simulate it with `eval`.
- True lexical closure (capturing a variable by reference) is not directly supported — the idiom is to bake the current value into the lambda body string, creating a snapshot, not a live reference.
- Lambda lists must be properly quoted; a lambda body containing `$` or `[` needs careful bracing to prevent early substitution.
- `coroutine` and `yield` require Tcl 8.6; each coroutine has its own stack and can be resumed any number of times.
