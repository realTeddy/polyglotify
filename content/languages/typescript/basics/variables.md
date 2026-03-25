---
title: "Variables"
language: "typescript"
feature: "variables"
category: "basics"
applicable: true
---

TypeScript uses `let` for block-scoped mutable variables, `const` for block-scoped immutable bindings, and (legacy) `var` for function-scoped variables. Type annotations are optional when TypeScript can infer the type from the initializer. Prefer `const` by default and use `let` only when reassignment is necessary.

## Example

```typescript
const name: string = "Alice";         // explicit type annotation
let age = 30;                          // inferred as number
let isActive: boolean = true;

const PI = 3.14159;                    // inferred as number literal 3.14159

let score: number | null = null;       // union with null
score = 42;

// Destructuring
const { x, y } = { x: 10, y: 20 };
let [first, ...rest] = [1, 2, 3, 4];
```

## Gotchas

- `const` prevents reassignment of the binding but does not make objects or arrays deeply immutable — their properties can still be mutated.
- Avoid `var`; its function-scoping and hoisting behavior leads to subtle bugs that `let`/`const` eliminate.
