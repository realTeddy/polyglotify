---
title: "Structs & Classes"
language: "swift"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

Swift has both `struct` (value type) and `class` (reference type). Structs copy on assignment; classes share a reference. Structs are preferred for most data models — they provide thread safety by default and prevent unintended side effects. Methods on structs that change `self` must be marked `mutating`.

## Example

```swift
struct Point {
    var x: Double
    var y: Double

    mutating func translate(dx: Double, dy: Double) {
        x += dx
        y += dy
    }
}

class Node {
    var value: Int
    var next: Node?

    init(value: Int) {
        self.value = value
    }
}

var p1 = Point(x: 0, y: 0)
let p2 = p1         // copy
p1.translate(dx: 5, dy: 3)
print(p1)           // (5, 3)
print(p2)           // (0, 0) — unaffected

let n1 = Node(value: 1)
let n2 = n1         // same reference
n2.value = 99
print(n1.value)     // 99 — shared reference
```

## Gotchas

- Structs do not support inheritance (except for protocol conformance); use classes when you need an inheritance hierarchy.
- A `let` constant of a `struct` type prevents any mutations (even `mutating` methods); a `let` constant of a `class` type still allows mutating the object.
- Structs automatically get a memberwise initializer; classes do not — you must write `init` explicitly.
