---
title: "Interfaces & Traits"
language: "swift"
feature: "interfaces"
category: "oop"
applicable: true
---

Swift uses `protocol` as its interface mechanism. Protocols define a blueprint of methods, properties, and other requirements. Both value types (`struct`, `enum`) and reference types (`class`) can conform to protocols. Protocol extensions provide default implementations. Swift encourages protocol-oriented programming (POP) over class-based designs.

## Example

```swift
protocol Drawable {
    var color: String { get }
    func draw() -> String
}

protocol Resizable {
    mutating func resize(factor: Double)
}

struct Square: Drawable, Resizable {
    var color: String
    var side: Double

    func draw() -> String { "Square(\(side), \(color))" }

    mutating func resize(factor: Double) { side *= factor }
}

// Protocol extension — default implementation
extension Drawable {
    func describe() -> String { "I am drawable: \(draw())" }
}

func render(item: any Drawable) {
    print(item.describe())
}

var sq = Square(color: "blue", side: 4)
render(item: sq)
sq.resize(factor: 2)
print(sq.side)  // 8.0
```

## Gotchas

- Protocol requirements with `mutating` methods can be satisfied by both `mutating` struct methods and non-mutating class methods; classes ignore the `mutating` keyword.
- `any Protocol` (existential) and `some Protocol` (opaque type) are distinct: `some` requires a single concrete type known at compile time; `any` allows heterogeneous values at the cost of a dynamic lookup.
- Adding a method with a default implementation to a protocol in an extension does not create a protocol requirement — conforming types that define the same method will not dispatch dynamically through the protocol.
