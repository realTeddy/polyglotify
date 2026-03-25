---
title: "Control Flow"
language: "tcl"
feature: "control-flow"
category: "basics"
applicable: true
---

Tcl control-flow commands are `if`/`elseif`/`else`, `switch`, `while`, `for`, `foreach`, `break`, `continue`, and `return`. All conditions are evaluated with `expr` semantics (1 = true, 0 = false). Bodies are Tcl scripts enclosed in braces. `switch` supports exact, glob, and regex matching.

## Example

```tcl
set x 42

# if / elseif / else
if {$x > 0} {
    puts "positive"
} elseif {$x < 0} {
    puts "negative"
} else {
    puts "zero"
}

# while
set i 0
while {$i < 5} {
    puts -nonewline "$i "
    incr i
}
puts ""

# for
for {set i 0} {$i < 5} {incr i} {
    puts -nonewline "$i "
}
puts ""

# foreach over list
foreach item {apple banana cherry} {
    puts $item
}

# foreach with multiple variables
foreach {k v} {a 1 b 2 c 3} {
    puts "$k = $v"
}

# break and continue
for {set i 0} {$i < 10} {incr i} {
    if {$i == 3} continue
    if {$i == 6} break
    puts -nonewline "$i "
}
puts ""    ;# 0 1 2 4 5

# switch
set day "Tuesday"
switch $day {
    "Monday"  { puts "Start of week" }
    "Tuesday" -
    "Wednesday" { puts "Midweek" }
    default   { puts "Other day" }
}

# switch with glob matching
switch -glob $day {
    T* { puts "Starts with T" }
    default { puts "Other" }
}
```

## Gotchas

- Conditions in `if`, `while`, `for` are evaluated via `expr` — always brace them to avoid substitution bugs.
- `foreach` with two variables (`foreach {k v} $list`) iterates in pairs — if the list has an odd number of elements, the last `v` will be empty.
- `switch` falls through from a `-` arm to the next body (similar to C), but does NOT fall through between bodies.
- `incr` is the idiomatic way to increment a variable; `set i [expr {$i + 1}]` works but is verbose.
