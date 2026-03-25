---
title: "Types"
language: "typescript"
feature: "types"
category: "basics"
applicable: true
---

TypeScript's type system is structural and optional — every JavaScript value is valid TypeScript, but annotations let the compiler catch errors early. Primitive types include `string`, `number`, `boolean`, `bigint`, `symbol`, `null`, and `undefined`. The type system supports unions, intersections, generics, mapped types, and template literal types.

## Example

```typescript
// Primitives
let message: string = "hello";
let count: number = 42;
let flag: boolean = false;
let big: bigint = 9007199254740993n;

// Union and literal types
type Direction = "north" | "south" | "east" | "west";
type StringOrNumber = string | number;

// Object shape
type Point = { x: number; y: number };
const p: Point = { x: 3, y: 4 };

// Arrays and tuples
const nums: number[] = [1, 2, 3];
const pair: [string, number] = ["age", 30];

// Type aliases and utility types
type ReadonlyPoint = Readonly<Point>;
type PartialPoint = Partial<Point>;

// Unknown vs any
function process(value: unknown) {
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // narrowed to string
  }
}
```

## Gotchas

- Prefer `unknown` over `any`; `any` disables all type checking, while `unknown` forces you to narrow before use.
- `number` covers both integers and floats (IEEE 754 double); there is no separate integer type.
