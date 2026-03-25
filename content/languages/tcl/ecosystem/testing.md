---
title: "Testing"
language: "tcl"
feature: "testing"
category: "ecosystem"
applicable: true
---

Tcl's standard testing framework is **tcltest** (part of the core library since Tcl 8.3). Tests are written with `test`, `constraint`, `setUp`, and `tearDown` commands. `tcltest::runAllTests` runs all `.test` files in a directory. Assertions use `-result`, `-returnCodes`, and `-match` options.

## Example

```tcl
# tests/test_math.tcl
package require tcltest 2.0
namespace import ::tcltest::*

# Procedure under test
proc factorial {n} {
    if {$n <= 1} { return 1 }
    expr {$n * [factorial [expr {$n - 1}]]}
}

proc safeDivide {a b} {
    if {$b == 0} { error "division by zero" }
    expr {$a / $b}
}

# Basic equality test
test factorial-1.0 "factorial of 0" \
    -body { factorial 0 } \
    -result 1

test factorial-1.1 "factorial of 5" \
    -body { factorial 5 } \
    -result 120

# Test with setup
test divide-2.0 "safe integer division" \
    -body { safeDivide 10 2 } \
    -result 5

# Test for expected error
test divide-2.1 "divide by zero" \
    -body { safeDivide 10 0 } \
    -returnCodes error \
    -result "division by zero"

# Glob match
test greeting-3.0 "greet returns hello" \
    -body { format "Hello, %s!" "World" } \
    -match glob \
    -result "Hello*"

# Constraints
testConstraint slowMachine 0
test factorial-1.2 "large factorial" \
    -constraints {!slowMachine} \
    -body { factorial 20 } \
    -result 2432902008176640000

cleanupTests
```

```bash
# Run a single test file
tclsh tests/test_math.tcl

# Run all tests (all.tcl)
tclsh tests/all.tcl

# all.tcl content:
# package require tcltest
# tcltest::configure -testdir [file dirname [info script]]
# tcltest::runAllTests
```

## Gotchas

- `tcltest` test names are conventionally `featureName-majorVersion.minorCase` (e.g., `factorial-1.0`).
- `-returnCodes error` tests that the body raises an error; `-returnCodes ok` (default) tests that it succeeds.
- `cleanupTests` at the end of each file reports pass/fail counts and should always be present.
- Tcl test files use `.test` extension by convention; `runAllTests` discovers them automatically when placed in the test directory.
