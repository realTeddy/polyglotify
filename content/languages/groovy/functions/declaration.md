---
title: "Function Declaration"
language: "groovy"
feature: "declaration"
category: "functions"
applicable: true
---

Functions in Groovy are declared with the `def` keyword (or an explicit return type) inside a class or directly in a script. In scripts, top-level methods are automatically available throughout the script. Groovy also supports method visibility modifiers (`public`, `private`, `protected`) and optional `@groovy.transform` annotations for compile-time optimisation.

## Example

```groovy
// Script-level function with def
def greet(String name) {
    "Hello, $name!"   // last expression is implicit return
}

// Explicit return type
String shout(String msg) {
    return msg.toUpperCase()
}

// Default parameter values
def connect(String host, int port = 8080) {
    println "Connecting to $host:$port"
}

println greet("World")    // Hello, World!
println shout("groovy")   // GROOVY
connect("localhost")       // Connecting to localhost:8080
connect("example.com", 443)
```

## Gotchas

- The last evaluated expression in a Groovy method is its implicit return value; an explicit `return` is optional but recommended for clarity in longer methods.
- Methods in Groovy classes are `public` by default (unlike Java where package-private is the default).
- Calling a method with more arguments than parameters defined is a runtime `MissingMethodException`, not a compile error in dynamic mode.
