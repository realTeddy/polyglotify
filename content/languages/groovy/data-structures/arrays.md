---
title: "Arrays & Lists"
language: "groovy"
feature: "arrays"
category: "data-structures"
applicable: true
---

In Groovy, the `[]` literal creates an `ArrayList` by default, not a Java array. Java-style arrays are still supported via explicit type declaration or the `as` operator. Groovy enriches all lists with additional methods like `collect`, `findAll`, `each`, `inject` (fold/reduce), and negative indexing for accessing elements from the end.

## Example

```groovy
// List literal (ArrayList)
def fruits = ["apple", "banana", "cherry"]
println fruits[0]    // apple
println fruits[-1]   // cherry (negative index)

// Sublist (range slice)
println fruits[0..1]   // [apple, banana]

// Common list operations
def nums = [3, 1, 4, 1, 5, 9, 2, 6]
println nums.sort()                          // [1, 1, 2, 3, 4, 5, 6, 9]
println nums.findAll { it > 4 }              // [5, 9, 6]
println nums.collect { it * 2 }             // doubled list
println nums.inject(0) { acc, v -> acc + v } // sum = 31

// Java array
int[] scores = [95, 87, 76] as int[]
println scores.class   // class [I

// Spreading into method arguments
def args = [1, 2, 3]
println Math.max(*args[0..1])   // 2
```

## Gotchas

- `[]` creates an `ArrayList`, not a Java array; code expecting a Java array type must use `as int[]` or declare an explicit array type.
- Groovy's `sort()` sorts in place and also returns the list; it mutates the original, unlike many functional-style APIs.
- Negative indexing works on Groovy lists but throws `ArrayIndexOutOfBoundsException` on plain Java arrays.
