---
title: "Structs & Classes"
language: "typescript"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

TypeScript uses interfaces and type aliases for struct-like data shapes, and classes for objects that combine data with behaviour. Both are structural — two types are compatible if their shapes match, regardless of name. Classes in TypeScript compile to JavaScript prototypes and add optional access modifiers (`public`, `private`, `protected`, `readonly`) and parameter properties.

## Example

```typescript
// Struct-like: type alias (preferred for pure data)
type Vector2 = { readonly x: number; readonly y: number };
const v: Vector2 = { x: 3, y: 4 };

// Interface (preferred when others may extend it)
interface Shape {
  area(): number;
  perimeter(): number;
}

// Class with parameter properties (shorthand)
class Circle implements Shape {
  constructor(public readonly radius: number) {}

  area(): number {
    return Math.PI * this.radius ** 2;
  }

  perimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

const c = new Circle(5);
console.log(c.area().toFixed(2)); // 78.54

// Data class pattern with private state
class Temperature {
  private constructor(private readonly celsius: number) {}

  static fromCelsius(c: number) { return new Temperature(c); }
  static fromFahrenheit(f: number) { return new Temperature((f - 32) * 5 / 9); }

  toCelsius(): number { return this.celsius; }
  toFahrenheit(): number { return this.celsius * 9 / 5 + 32; }
}
```

## Gotchas

- TypeScript's `private` keyword is a compile-time-only check; the JavaScript output has no runtime enforcement. Use the native `#field` syntax for true runtime privacy.
- Prefer interfaces for public library contracts because they participate in declaration merging; use type aliases for computed/union types.
