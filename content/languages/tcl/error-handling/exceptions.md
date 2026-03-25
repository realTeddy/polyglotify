---
title: "Exceptions & Try/Catch"
language: "tcl"
feature: "exceptions"
category: "error-handling"
applicable: true
---

Tcl uses `error` to raise an exception and `catch` to intercept it. Tcl 8.6 adds `try`/`trap`/`finally` for structured exception handling similar to other languages. The `error` command takes a message, optional info, and optional error code. `catch` returns 0 on success or a non-zero return code on error, and stores the result (or error message) in a variable.

## Example

```tcl
# Basic catch
if {[catch {expr {1 / 0}} err]} {
    puts "Error: $err"    ;# Error: divide by zero
}

# error with error code
proc divide {a b} {
    if {$b == 0} {
        error "division by zero" "" {MATH DIVZERO}
    }
    expr {$a / $b}
}

# catch with options dict (Tcl 8.5+)
set code [catch {divide 10 0} result opts]
puts "code:   $code"                        ;# 1
puts "result: $result"                      ;# division by zero
puts "ecode:  [dict get $opts -errorcode]"  ;# MATH DIVZERO

# try / trap / finally (Tcl 8.6+)
try {
    puts [divide 10 2]
    puts [divide 10 0]
} trap {MATH DIVZERO} {msg} {
    puts "Math error: $msg"
} trap {} {msg opts} {
    puts "Other error: $msg"
} finally {
    puts "Cleanup always runs"
}

# Nested catch
proc safeRead {filename} {
    if {[catch {
        set f [open $filename r]
        set content [read $f]
        close $f
        return $content
    } err]} {
        return -code error "Cannot read $filename: $err"
    }
}

if {[catch {safeRead "nonexistent.txt"} msg]} {
    puts $msg
}
```

## Gotchas

- `catch` returns the Tcl return code (0=ok, 1=error, 2=return, 3=break, 4=continue), not a boolean — check `if {[catch {...} err] != 0}` or simply `if {[catch {...} err]}` (0 is falsy).
- `try`/`trap` requires Tcl 8.6; older code must use nested `catch` with error-code inspection.
- The error message stored by `catch` is a plain string; the structured error code is in the options dict under `-errorcode`.
- `error` does not unwind the call stack the way exceptions do in compiled languages — Tcl is fully interpreted, so the stack trace is available in the options dict under `-errorinfo`.
