---
title: "Maps & Dictionaries"
language: "tcl"
feature: "maps"
category: "data-structures"
applicable: true
---

Tcl provides two map-like structures. **Tcl arrays** (associative arrays) are variables with a key syntax: `set arr(key) value` and `$arr(key)`. **Dicts** (`dict` command, Tcl 8.5+) are proper value-type key-value structures stored as flat lists of alternating key-value pairs, which can be nested and passed around. Dicts are preferred in modern Tcl.

## Example

```tcl
# ---- dict (Tcl 8.5+) ----
set scores [dict create Alice 95 Bob 87 Carol 92]

# Access
puts [dict get $scores Alice]     ;# 95

# Safe access
if {[dict exists $scores Dave]} {
    puts [dict get $scores Dave]
} else {
    puts "Dave not found"
}

# Insert / update
set scores [dict set scores Dave 78]
set scores [dict set scores Alice 99]

# Iteration
dict for {name score} $scores {
    puts "$name: $score"
}

# Keys, values, size
puts [dict keys $scores]          ;# Alice Bob Carol Dave (insertion order)
puts [dict values $scores]        ;# 99 87 92 78
puts [dict size $scores]          ;# 4

# Nested dict
set config [dict create \
    db [dict create host localhost port 5432] \
    app [dict create debug true port 8080]]
puts [dict get $config db host]   ;# localhost

# Remove
set scores [dict remove $scores Bob]
puts [dict size $scores]          ;# 3

# ---- array (classic Tcl) ----
array set prefs {theme dark lang en}
puts $prefs(theme)                ;# dark
set prefs(font) "monospace"
puts [array names prefs]          ;# theme lang font
puts [array size prefs]           ;# 3
```

## Gotchas

- `dict` is a value — every modifying operation returns a new dict; you must reassign: `set d [dict set $d key val]`.
- Tcl arrays are NOT first-class values — you cannot pass an array to a procedure or return one; use `array get`/`array set` to serialize/deserialize as a list.
- `dict get` throws an error for missing keys; always use `dict exists` first or `dict getdefault` (Tcl 8.7+).
- Dict insertion order is preserved in Tcl 8.7+; in Tcl 8.5/8.6, order is implementation-defined.
