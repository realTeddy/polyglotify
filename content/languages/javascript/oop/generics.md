---
title: "Generics"
language: "javascript"
feature: "generics"
category: "oop"
applicable: false
---

JavaScript has no generics. Because the language is dynamically typed, functions and data structures already work with any type without any type-parameter syntax. TypeScript, the statically typed superset of JavaScript, adds full generic support that is erased at compile time to plain JavaScript.

## Example

```javascript
// Plain JS — functions are inherently "generic" at runtime
function identity(value) {
  return value;
}
identity(42);        // 42
identity("hello");   // "hello"
identity([1, 2, 3]); // [1, 2, 3]

// A generic-style container without type annotations
class Stack {
  #items = [];
  push(item) { this.#items.push(item); }
  pop()      { return this.#items.pop(); }
  peek()     { return this.#items.at(-1); }
  get size() { return this.#items.length; }
}

// TypeScript equivalent (not valid plain JS):
// function identity<T>(value: T): T { return value; }
// class Stack<T> {
//   #items: T[] = [];
//   push(item: T) { this.#items.push(item); }
//   pop(): T | undefined { return this.#items.pop(); }
// }
```

## Gotchas

- Without generics, there is no compile-time prevention of pushing a number into a "string stack" — errors surface only at runtime
- TypeScript generic syntax (`<T>`) is stripped by the TypeScript compiler and does not exist in the emitted JavaScript
- JSDoc supports generic annotations (`@template T`) for editor tooling in plain JavaScript files without a build step
- JavaScript's built-in `Array`, `Map`, and `Set` behave as if generic (they hold any value), which is both flexible and potentially unsafe without TypeScript
