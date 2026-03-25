---
title: "Parameters & Arguments"
language: "groovy"
feature: "parameters"
category: "functions"
applicable: true
---

Groovy supports default parameter values, named arguments (via maps), and variadic parameters with `Object[]` or by type-spreading. When a method's last parameter is a `Map`, callers can use named argument syntax without constructing the map explicitly. Trailing closure arguments can also be passed outside the parentheses.

## Example

```groovy
// Default parameters
def createUser(String name, String role = "viewer", boolean active = true) {
    [name: name, role: role, active: active]
}
println createUser("Alice")
println createUser("Bob", "admin")

// Named args via Map (map must be first param)
def configure(Map opts, String target) {
    println "Target: $target, timeout: ${opts.timeout ?: 30}"
}
configure(timeout: 60, "server")

// Varargs
def sum(int... nums) {
    nums.sum()
}
println sum(1, 2, 3, 4)   // 10

// Trailing closure argument
def repeat(int n, Closure action) {
    n.times { action(it) }
}
repeat(3) { i -> println "Step $i" }
```

## Gotchas

- Named-argument syntax (key: value in the call) only works automatically when the first parameter is a `Map`; otherwise Groovy treats key-value pairs as a map literal for the first positional argument.
- Mixing default parameters and named-map parameters in the same method can produce surprising overload-resolution behaviour.
- Closure parameters passed outside parentheses must always be the last argument; placing them earlier is a syntax error.
