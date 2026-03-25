---
title: "Interfaces & Traits"
language: "vlang"
feature: "interfaces"
category: "oop"
applicable: true
---

V interfaces provide duck typing: any struct that implements all the methods of an interface implicitly satisfies it — no explicit declaration needed. Interface variables hold any conforming type and dispatch dynamically. `$if T is Interface` allows compile-time type checking.

## Example

```v
interface Drawable {
    draw() string
    area() f64
}

struct Circle {
    radius f64
}

fn (c Circle) draw() string {
    return 'Circle(r=${c.radius})'
}

fn (c Circle) area() f64 {
    return math.pi * c.radius * c.radius
}

struct Rectangle {
    width  f64
    height f64
}

fn (r Rectangle) draw() string {
    return 'Rect(${r.width}x${r.height})'
}

fn (r Rectangle) area() f64 {
    return r.width * r.height
}

fn print_shape(s Drawable) {
    println('${s.draw()} area=${s.area():.2f}')
}

fn main() {
    shapes := [Drawable(Circle{5.0}), Rectangle{3.0, 4.0}]
    for s in shapes {
        print_shape(s)
    }
    // Circle(r=5.0) area=78.54
    // Rect(3.0x4.0) area=12.00
}
```

## Gotchas

- Interface satisfaction is implicit and structural (duck typing) — no `implements` keyword is needed.
- Interface values store a pointer to the underlying value; assigning a value type to an interface variable boxes it.
- Interfaces cannot have fields, only methods.
