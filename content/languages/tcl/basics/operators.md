---
title: "Operators"
language: "tcl"
feature: "operators"
category: "basics"
applicable: true
---

Tcl has no standalone operator syntax — all operations go through the `expr` command, which supports the standard C-style operator set: `+`, `-`, `*`, `/`, `%`, `**` (power), `==`, `!=`, `<`, `>`, `<=`, `>=`, `&&`, `||`, `!`, `&`, `|`, `^`, `~`, `<<`, `>>`. String comparison uses `eq`, `ne`, `lt`, `gt`, `le`, `ge`. The ternary operator is `condition ? a : b` inside `expr`.

## Example

```tcl
set a 17
set b 5

# Arithmetic (all inside expr)
puts [expr {$a + $b}]    ;# 22
puts [expr {$a - $b}]    ;# 12
puts [expr {$a * $b}]    ;# 85
puts [expr {$a / $b}]    ;# 3  (integer division)
puts [expr {$a % $b}]    ;# 2
puts [expr {$a ** $b}]   ;# 1419857 (17^5)
puts [expr {double($a) / $b}]  ;# 3.4

# Comparison
puts [expr {$a > $b}]    ;# 1 (true)
puts [expr {$a == $b}]   ;# 0 (false)
puts [expr {$a != $b}]   ;# 1

# Logical
puts [expr {$a > 0 && $b > 0}]    ;# 1
puts [expr {$a > 100 || $b > 0}]  ;# 1
puts [expr {!($a > 0)}]            ;# 0

# Bitwise
puts [expr {$a & $b}]    ;# 1
puts [expr {$a | $b}]    ;# 21
puts [expr {$a ^ $b}]    ;# 20
puts [expr {$a << 1}]    ;# 34
puts [expr {$a >> 1}]    ;# 8

# String comparison operators
puts [expr {"apple" eq "apple"}]   ;# 1
puts [expr {"apple" ne "Banana"}]  ;# 1
puts [expr {"apple" lt "banana"}]  ;# 1

# Ternary
set max [expr {$a > $b ? $a : $b}]
puts $max   ;# 17
```

## Gotchas

- `==` inside `expr` compares numerically if both sides look like numbers, otherwise as strings — use `eq`/`ne` for reliable string comparison.
- Integer division truncates toward zero: `expr {-7 / 2}` is `-3`, not `-4`.
- Omitting braces around `expr` arguments causes double substitution: `expr $a + $b` is dangerous if `$a` contains `[maliciousCommand]`.
- `**` is the exponentiation operator (Tcl 8.5+); it was not available in earlier versions.
