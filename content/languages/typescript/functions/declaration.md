---
title: "Function Declaration"
language: "typescript"
feature: "declaration"
category: "functions"
applicable: true
---

TypeScript functions can be declared with the `function` keyword or as arrow function expressions. Type annotations on parameters and return values are optional when types can be inferred, but annotating public-facing functions is idiomatic. Function types themselves are first-class values and can be typed with `(param: Type) => ReturnType` syntax.

## Example

```typescript
// Named function declaration (hoisted)
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function (not hoisted, lexical `this`)
const multiply = (a: number, b: number): number => a * b;

// Function type annotation on a variable
const greet: (name: string) => string = (name) => `Hello, ${name}!`;

// Generic function
function identity<T>(value: T): T {
  return value;
}

const result = identity(42);         // T inferred as number
const strResult = identity("hello"); // T inferred as string

// Overloads
function format(value: string): string;
function format(value: number): string;
function format(value: string | number): string {
  return String(value);
}
```

## Gotchas

- Arrow functions do not have their own `this`, `arguments`, or `super` — this is usually desirable but matters in class methods and event handlers.
- Function declarations are hoisted; arrow function variables are not, so order of definition matters for the latter.
