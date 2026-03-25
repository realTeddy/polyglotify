---
title: "Result Types"
language: "tcl"
feature: "result-types"
category: "error-handling"
applicable: false
---

Tcl has no Result or Option type. Error handling is done through `catch` (returning 0/1 plus a result variable) or through `try`/`trap` (Tcl 8.6+). The idiomatic Tcl pattern for fallible operations is to return a list `{ok value}` or a dict with a status field when exception-based error handling is too heavy. There is no type system to enforce result checking.

## Example

```tcl
# Idiomatic Tcl: catch-based "result"
proc tryParseInt {s} {
    if {[catch {expr {int($s)}} n]} {
        return [list 0 "" "not a number: $s"]
    }
    return [list 1 $n ""]
}

lassign [tryParseInt "42"]  ok val err
if {$ok} { puts "Parsed: $val" } else { puts "Error: $err" }

lassign [tryParseInt "abc"] ok val err
if {!$ok} { puts "Error: $err" }

# Dict-based result (more explicit)
proc safeDivide {a b} {
    if {$b == 0} {
        return [dict create ok 0 error "division by zero"]
    }
    return [dict create ok 1 value [expr {$a / $b}]]
}

set r [safeDivide 10 2]
if {[dict get $r ok]} {
    puts "Result: [dict get $r value]"    ;# Result: 5
}

set r [safeDivide 10 0]
if {![dict get $r ok]} {
    puts "Error: [dict get $r error]"     ;# Error: division by zero
}

# try/trap as the structured alternative (Tcl 8.6+)
proc safeOpen {path} {
    try {
        set f [open $path r]
        set data [read $f]
        close $f
        return $data
    } trap {POSIX ENOENT} {} {
        return ""
    }
}
puts [string length [safeOpen "nonexistent.txt"]]  ;# 0
```

## Gotchas

- Tcl's `catch` idiom is pervasive but easy to ignore — a caller can simply not check the return code, silently discarding errors.
- The `{ok val err}` list pattern is a convention, not enforced by the language; different libraries use different conventions.
- `try`/`trap` is much more readable than nested `catch`; prefer it in Tcl 8.6+ code.
- Unlike Rust's `Result`, Tcl offers no compile-time guarantee that errors are handled — robust code must wrap every fallible call in `catch` or `try`.
