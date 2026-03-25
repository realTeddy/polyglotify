---
title: "Structs & Classes"
language: "javascript"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

JavaScript does not have a distinct struct keyword, but plain objects serve the same role for grouping related data. Where behavior is also needed, `class` syntax (introduced in ES2015) provides a cleaner way to bundle data and methods. Both patterns are idiomatic and often used together.

## Example

```javascript
// Plain object as a struct — best for pure data
const point = { x: 10, y: 20 };

// Factory function for repeated plain-object creation
function makePoint(x, y) {
  return { x, y };
}

// Class — for data + behavior + inheritance
class Rectangle {
  #width;   // private field (ES2022)
  #height;

  constructor(width, height) {
    this.#width = width;
    this.#height = height;
  }

  get area() {
    return this.#width * this.#height;
  }

  toString() {
    return `Rectangle(${this.#width}x${this.#height})`;
  }

  static fromSquare(side) {
    return new Rectangle(side, side);
  }
}

const rect = new Rectangle(4, 5);
rect.area;              // 20
rect.toString();        // "Rectangle(4x5)"
Rectangle.fromSquare(3).area; // 9
```

## Gotchas

- Plain objects are often preferable to classes for simple data bags — they are lighter and JSON-serializable
- Class fields and private fields (`#name`) require relatively modern engines; transpile for older targets
- `this` inside a class method is the instance at call time, but can become `undefined` if the method is passed as a callback without binding — use arrow function class fields or `.bind(this)` to avoid this
- JavaScript classes are syntactic sugar over prototype-based inheritance; `typeof Rectangle` is `"function"`
