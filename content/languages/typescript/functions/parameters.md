---
title: "Parameters"
language: "typescript"
feature: "parameters"
category: "functions"
applicable: true
---

TypeScript parameters support optional markers (`?`), default values, rest parameters (`...args`), and destructured objects with inline type annotations. Optional parameters must appear after required ones, and a parameter with a default value is implicitly optional. Type-safe variadic functions use rest parameters with array types or tuple rest elements.

## Example

```typescript
// Optional and default parameters
function createUser(name: string, role: string = "user", age?: number): string {
  const ageStr = age !== undefined ? `, age ${age}` : "";
  return `${name} (${role}${ageStr})`;
}

createUser("Alice");              // "Alice (user)"
createUser("Bob", "admin", 30);   // "Bob (admin, age 30)"

// Rest parameters
function sum(...nums: number[]): number {
  return nums.reduce((acc, n) => acc + n, 0);
}

// Destructured object parameter with type
function display({ title, count = 0 }: { title: string; count?: number }): void {
  console.log(`${title}: ${count}`);
}

// Tuple rest for typed variadic signatures
function tagged<T extends unknown[]>(label: string, ...args: T): [string, ...T] {
  return [label, ...args];
}

const result = tagged("pair", 1, "two"); // [string, number, string]
```

## Gotchas

- Optional parameters (`?`) and parameters with defaults are both optional at the call site, but `undefined` passed explicitly still triggers a default value, while `null` does not.
- Rest parameters must be the last parameter and cannot have a subsequent required parameter.
