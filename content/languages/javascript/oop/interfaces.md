---
title: "Interfaces & Traits"
language: "javascript"
feature: "interfaces"
category: "oop"
applicable: false
---

JavaScript has no `interface` or `trait` keyword. Contracts between objects are enforced through duck typing — if an object has the required properties and methods, it is compatible, regardless of its type or heritage. For explicit interface definitions and compile-time checking, TypeScript is the standard solution.

## Example

```javascript
// Duck typing — no interface declaration needed
function makeItFly(flyable) {
  // We just call the method; no type assertion needed
  if (typeof flyable.fly !== "function") {
    throw new TypeError("Expected an object with a fly() method");
  }
  flyable.fly();
}

const bird = { fly: () => console.log("Flap flap!") };
const plane = { fly: () => console.log("Roar!") };
makeItFly(bird);   // Flap flap!
makeItFly(plane);  // Roar!

// JSDoc for lightweight documentation (no runtime enforcement)
/**
 * @typedef {Object} Flyable
 * @property {function(): void} fly
 */

// TypeScript equivalent (not valid plain JS):
// interface Flyable { fly(): void; }
// class Bird implements Flyable { fly() { ... } }

// Symbol.iterator is an example of a built-in informal "interface"
class Range {
  constructor(start, end) { this.start = start; this.end = end; }
  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    return { next: () => current <= end
      ? { value: current++, done: false }
      : { value: undefined, done: true } };
  }
}
[...new Range(1, 3)]; // [1, 2, 3]
```

## Gotchas

- There is no compile-time guarantee that an object satisfies a "contract" — errors surface at runtime
- Well-known symbols (`Symbol.iterator`, `Symbol.toPrimitive`, etc.) serve as informal interface protocols in the language itself
- JSDoc `@typedef` and `@interface` provide editor tooling hints but are not enforced at runtime
- TypeScript `interface` declarations are erased at compile time and produce no runtime artifact
