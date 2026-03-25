---
title: "Inheritance"
language: "swift"
feature: "inheritance"
category: "oop"
applicable: true
---

Swift supports single inheritance for classes. Subclasses inherit all methods and properties of their superclass. Overriding requires the `override` keyword, which prevents accidental shadowing. Property observers (`willSet`/`didSet`) can be added in subclasses. Structs and enums do not support inheritance; they use protocol conformance instead.

## Example

```swift
class Shape {
    var color: String = "white"

    func area() -> Double { 0 }

    func description() -> String {
        "A \(color) shape with area \(area())"
    }
}

class Circle: Shape {
    var radius: Double

    init(radius: Double, color: String) {
        self.radius = radius
        super.init()
        self.color = color
    }

    override func area() -> Double {
        Double.pi * radius * radius
    }
}

let c = Circle(radius: 5, color: "red")
print(c.description())
print(c is Shape)   // true
```

## Gotchas

- Swift does not support multiple inheritance for classes; use protocol composition to combine multiple contracts.
- `super.init()` must be called before accessing any inherited properties or calling inherited methods in a designated initializer.
- Marking a method, property, or subscript as `final` in a superclass prevents overriding in subclasses.
