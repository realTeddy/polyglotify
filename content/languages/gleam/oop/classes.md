---
title: "Classes"
language: "gleam"
feature: "classes"
category: "oop"
applicable: false
---

Gleam has no classes. It is a functional language where data is represented by custom types (algebraic data types) and behaviour is provided by functions in modules. The equivalent pattern is a module that defines a custom type and functions that operate on it.

## Example

```gleam
// Idiomatic Gleam: module as a "class", custom type as data
pub type Counter {
  Counter(value: Int)
}

pub fn new() -> Counter {
  Counter(value: 0)
}

pub fn increment(c: Counter) -> Counter {
  Counter(value: c.value + 1)
}

pub fn decrement(c: Counter) -> Counter {
  Counter(value: c.value - 1)
}

pub fn get(c: Counter) -> Int {
  c.value
}

// Usage:
// let c = counter.new()
// let c = counter.increment(c)
// counter.get(c)  // => 1
```

## Gotchas

- All "methods" take the data as an explicit argument — there is no `self` or `this`.
- State is passed through function return values, not mutated in place.
- The pipe operator `|>` makes chained operations look method-like: `counter.new() |> counter.increment() |> counter.get()`.
- Gleam deliberately omits classes to keep the language simple and the semantics clear.
