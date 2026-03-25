---
title: "Generics"
language: "vlang"
feature: "generics"
category: "oop"
applicable: true
---

V supports generics with type parameters in square brackets: `fn name[T](x T) T`. Generic structs use the same syntax. Type parameters can be constrained to interfaces. V monomorphizes generics at compile time for zero-overhead abstraction. Generic functions infer type parameters from their arguments.

## Example

```v
// Generic function
fn first[T](arr []T) ?T {
    if arr.len == 0 {
        return none
    }
    return arr[0]
}

println(first([1, 2, 3]) or { 0 })   // 1
println(first([]string{}) or { '' }) // ''

// Generic struct
struct Stack[T] {
mut:
    items []T
}

fn (mut s Stack[T]) push(item T) {
    s.items << item
}

fn (mut s Stack[T]) pop() ?T {
    if s.items.len == 0 {
        return none
    }
    val := s.items.last()
    s.items.delete(s.items.len - 1)
    return val
}

fn (s Stack[T]) peek() ?T {
    if s.items.len == 0 { return none }
    return s.items.last()
}

fn main() {
    mut s := Stack[int]{}
    s.push(1)
    s.push(2)
    s.push(3)
    println(s.pop() or { 0 })  // 3
    println(s.peek() or { 0 }) // 2

    // Constrained generics (interface constraint)
    // fn max[T](a T, b T) T where T is Comparable { ... }
}
```

## Gotchas

- V generics are relatively new (stabilized in 0.3+); some complex use cases may hit compiler limitations.
- Type parameters are inferred when possible; explicit annotation `fn_name[int](...)` is needed when inference fails.
- Generic constraints via interfaces are supported with `where` syntax in newer V versions.
