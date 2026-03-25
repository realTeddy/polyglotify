---
title: "Common Patterns"
language: "typescript"
feature: "common-patterns"
category: "idioms"
applicable: true
---

Idiomatic TypeScript leans into the type system rather than fighting it. Key patterns include discriminated unions for modelling variants, `satisfies` for type-checked object literals, the builder pattern for complex configuration, optional chaining with nullish coalescing for safe property access, and `as const` for creating literal type inference.

## Example

```typescript
// 1. Discriminated union (prefer over class hierarchy for data)
type ApiResponse<T> =
  | { status: "success"; data: T }
  | { status: "error"; message: string; code: number };

function handleResponse<T>(res: ApiResponse<T>): T {
  if (res.status === "error") throw new Error(`[${res.code}] ${res.message}`);
  return res.data;
}

// 2. as const — preserves literal types
const ROUTES = {
  home: "/",
  about: "/about",
  users: "/users",
} as const;

type Route = (typeof ROUTES)[keyof typeof ROUTES]; // "/" | "/about" | "/users"

// 3. satisfies operator (TS 4.9+) — validate shape without widening
const palette = {
  red: [255, 0, 0],
  green: "#00ff00",
} satisfies Record<string, string | number[]>;
// palette.red is still number[], not string | number[]

// 4. Builder pattern
class QueryBuilder {
  private conditions: string[] = [];

  where(condition: string): this {
    this.conditions.push(condition);
    return this;
  }

  build(): string {
    return `SELECT * FROM table WHERE ${this.conditions.join(" AND ")}`;
  }
}

const query = new QueryBuilder().where("age > 18").where("active = true").build();

// 5. Type guard
function isString(value: unknown): value is string {
  return typeof value === "string";
}
```

## Gotchas

- Overusing `as` type assertions bypasses the type checker and hides real bugs; prefer type guards or conditional checks that let TypeScript narrow automatically.
