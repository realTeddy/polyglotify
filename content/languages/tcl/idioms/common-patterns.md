---
title: "Common Patterns"
language: "tcl"
feature: "common-patterns"
category: "idioms"
applicable: true
---

Tcl idioms centre on string manipulation, the "everything is a command" philosophy, and the event-driven programming model. Key patterns: `catch`-based error handling, list-as-data-structure, `upvar`/`uplevel` for meta-programming, namespace-as-module, the `options` dict pattern for keyword arguments, and `oo::class` for stateful objects.

## Example

```tcl
# Pattern 1: options dict (keyword arguments)
proc configure {args} {
    set defaults [dict create host localhost port 8080 debug false]
    set opts [dict merge $defaults $args]
    puts "host:  [dict get $opts host]"
    puts "port:  [dict get $opts port]"
    puts "debug: [dict get $opts debug]"
}
configure port 443 debug true
configure host example.com

# Pattern 2: namespace as module
namespace eval mylib {
    variable version 1.0
    proc greet {name} { return "Hello from mylib, $name!" }
    namespace export greet
}
puts [mylib::greet "World"]

# Pattern 3: callback / command prefix
proc doWithCleanup {cmd cleanupCmd} {
    set code [catch {uplevel 1 $cmd} result]
    uplevel 1 $cleanupCmd
    if {$code} { error $result }
    return $result
}

proc openAndProcess {path} {
    set f [open $path w]
    doWithCleanup \
        {puts $f "data"} \
        [list close $f]
}

# Pattern 4: memoisation
proc memoize {procName} {
    set body [info body $procName]
    set args [info args $procName]
    proc $procName $args "
        set key \[list $args\]
        if {\[info exists ::memo(${procName},\$key)\]} {
            return \$::memo(${procName},\$key)
        }
        set result \[$body\]
        set ::memo(${procName},\$key) \$result
        return \$result
    "
}

proc fib {n} {
    if {$n <= 1} { return $n }
    expr {[fib [expr {$n-1}]] + [fib [expr {$n-2}]]}
}
memoize fib
puts [fib 30]   ;# fast after memoisation

# Pattern 5: command composition
proc pipe {val args} {
    foreach cmd $args {
        set val [{*}$cmd $val]
    }
    return $val
}
puts [pipe "  hello world  " string::trim string::toupper]
```

## Gotchas

- `uplevel 1` evaluates a script in the caller's scope — powerful but can introduce hard-to-debug coupling.
- The `{*}` expansion operator (Tcl 8.5+) expands a list as separate arguments: `{*}{a b c}` becomes three arguments.
- Memoisation via proc replacement works but is fragile if the proc is later redefined or uses `upvar` into its caller.
- `dict merge` (Tcl 8.5+) combines dicts, with later arguments winning — the idiomatic way to apply defaults.
