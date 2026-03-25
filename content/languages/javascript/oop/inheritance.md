---
title: "Inheritance"
language: "javascript"
feature: "inheritance"
category: "oop"
applicable: true
---

JavaScript uses prototype-based inheritance, and the `extends` keyword in class syntax provides a clean interface over it. A subclass calls `super()` to invoke the parent constructor and `super.method()` to call an overridden method. JavaScript supports single inheritance only; mixin patterns are used to compose behavior from multiple sources.

## Example

```javascript
class Shape {
  constructor(color = "black") {
    this.color = color;
  }

  describe() {
    return `A ${this.color} shape`;
  }
}

class Circle extends Shape {
  #radius;

  constructor(radius, color) {
    super(color);         // must call super() before using this
    this.#radius = radius;
  }

  get area() {
    return Math.PI * this.#radius ** 2;
  }

  describe() {
    return `${super.describe()} (circle, r=${this.#radius})`;
  }
}

const c = new Circle(5, "red");
c.describe();  // "A red shape (circle, r=5)"
c instanceof Circle; // true
c instanceof Shape;  // true

// Mixin pattern for multiple-source composition
const Serializable = (Base) => class extends Base {
  serialize() { return JSON.stringify(this); }
};
class SerializableCircle extends Serializable(Circle) {}
```

## Gotchas

- Forgetting `super()` in a derived constructor before accessing `this` throws a ReferenceError
- JavaScript only supports single inheritance via `extends`; mixins (higher-order class functions) are the standard workaround
- Overriding a method completely shadows the parent version unless `super.method()` is explicitly called
- Private fields (`#`) are not inherited — a subclass cannot access a parent's private fields
