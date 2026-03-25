---
title: "Closures & Lambdas"
language: "powershell"
feature: "closures"
category: "functions"
applicable: true
---

PowerShell closures are called **script blocks** (`{ }`) and are first-class objects of type `[scriptblock]`. Script blocks capture the enclosing scope by reference (unlike Bash). They are invoked with the `&` call operator or `.Invoke()`. The `GetNewClosure()` method creates a true closure that captures a snapshot of the current scope. Script blocks are used extensively in pipeline cmdlets (`Where-Object`, `ForEach-Object`) and for callbacks.

## Example

```powershell
# Basic script block
$double = { param($n) $n * 2 }
& $double 5   # 10

# Short-form with $_ (pipeline variable)
$triple = { $_ * 3 }
5 | ForEach-Object $triple   # 15

# Capturing scope
$multiplier = 4
$times4 = { param($n) $n * $multiplier }
& $times4 6   # 24 — captures $multiplier by reference

# GetNewClosure — snapshot of scope at creation time
function Make-Adder {
    param([int]$n)
    { param($x) $x + $n }.GetNewClosure()   # captures $n as a snapshot
}
$add10 = Make-Adder 10
$add20 = Make-Adder 20
& $add10 5    # 15
& $add20 5    # 25

# Script block as callback
function Invoke-WithLogging {
    param([scriptblock]$Action, [string]$Label)
    Write-Verbose "Before $Label"
    $result = & $Action
    Write-Verbose "After $Label"
    $result
}
Invoke-WithLogging -Action { 42 } -Label "test" -Verbose

# Passing to pipeline operators
$nums = 1..10
$nums | Where-Object { $_ % 2 -eq 0 } | ForEach-Object { $_ * $_ }
```

## Gotchas

- Without `GetNewClosure()`, script blocks capture variables by reference to the scope at call time; if the enclosing variable changes, the script block sees the new value.
- `& $scriptBlock args` calls the block in the current scope; `.Invoke()` calls it in a child scope — behaviour differs for variable modifications.
- Script blocks do not have their own `$args` by default; explicitly declare `param(...)` inside the block for named parameters.
