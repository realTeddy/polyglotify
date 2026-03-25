---
title: "Structs & Classes"
language: "tcl"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

Classic Tcl has no struct or class syntax. Struct-like records are typically represented as **dicts** (named fields) or **arrays** (associative variables). For full OOP, **TclOO** (built into Tcl 8.6) provides classes with constructors, methods, inheritance, and mixins. Older code uses the `Itcl` (Incremental Tcl) or `Snit` extensions.

## Example

```tcl
# Struct-like via dict
proc point::new {x y} { dict create x $x y $y }
proc point::distance {p q} {
    set dx [expr {[dict get $p x] - [dict get $q x]}]
    set dy [expr {[dict get $p y] - [dict get $q y]}]
    expr {sqrt($dx*$dx + $dy*$dy)}
}

set a [point::new 0 0]
set b [point::new 3 4]
puts [point::distance $a $b]   ;# 5.0

# TclOO class (Tcl 8.6+)
oo::class create BankAccount {
    variable owner balance

    constructor {name {initial 0}} {
        set owner   $name
        set balance $initial
    }

    method deposit {amount} {
        if {$amount <= 0} { error "Amount must be positive" }
        set balance [expr {$balance + $amount}]
    }

    method withdraw {amount} {
        if {$amount > $balance} { return 0 }
        set balance [expr {$balance - $amount}]
        return 1
    }

    method balance {} { return $balance }

    method toString {} {
        format "%s: $%.2f" $owner $balance
    }
}

set acc [BankAccount new "Alice" 500]
$acc deposit 250
$acc withdraw 100
puts [$acc balance]      ;# 650
puts [$acc toString]     ;# Alice: $650.00
$acc destroy
```

## Gotchas

- TclOO instances are commands — the object reference `$acc` is actually the name of a command that dispatches methods.
- `variable` inside a TclOO class declares instance variables; they are scoped to the object, not the method call.
- Objects must be explicitly destroyed with `$obj destroy` (or they survive until the interpreter exits); there is no garbage collection of TclOO objects.
- Namespaced procedures (`namespace eval`) provide module-like encapsulation for struct operations but no data encapsulation.
