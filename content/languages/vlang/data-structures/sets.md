---
title: "Sets"
language: "vlang"
feature: "sets"
category: "data-structures"
applicable: false
---

V does not have a built-in `Set` type. Sets are typically emulated using `map[T]bool` (or `map[T]struct{}`). The `v` standard library does not include a set collection as of V 0.4. Third-party libraries may provide one.

## Example

```v
fn main() {
    // Emulate a set with map[string]bool
    mut seen := map[string]bool{}
    words := ['apple', 'banana', 'apple', 'cherry', 'banana']

    for w in words {
        seen[w] = true
    }

    // Membership test
    println('apple' in seen)   // true
    println('grape' in seen)   // false

    // Remove
    seen.delete('banana')

    // Set operations via map iteration
    mut s1 := map[int]bool{}
    mut s2 := map[int]bool{}
    for x in [1, 2, 3, 4] { s1[x] = true }
    for x in [3, 4, 5, 6] { s2[x] = true }

    // Intersection
    mut inter := map[int]bool{}
    for k, _ in s1 {
        if k in s2 { inter[k] = true }
    }
    println(inter.keys())  // [3, 4] (order may vary)
}
```

## Gotchas

- Map iteration order in V is not guaranteed, so set operations produce correct but unordered results.
- Using `map[T]bool` works well but consumes one byte per entry for the boolean value; `map[T]struct{}` is not idiomatic in V.
- Check the V standard library and the official package registry for any official set module before writing your own.
