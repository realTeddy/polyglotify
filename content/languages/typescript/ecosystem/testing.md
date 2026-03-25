---
title: "Testing"
language: "typescript"
feature: "testing"
category: "ecosystem"
applicable: true
---

The dominant TypeScript testing frameworks are **Vitest** (fast, Vite-native, Jest-compatible API) and **Jest** (mature, widely used). Both support TypeScript via `ts-node` or native transform plugins. Vitest is preferred for new projects due to near-instant startup and first-class ESM support. For end-to-end testing, **Playwright** and **Cypress** are the standards.

## Example

```typescript
// src/math.ts
export function add(a: number, b: number): number {
  return a + b;
}

export async function fetchDouble(n: number): Promise<number> {
  await new Promise((r) => setTimeout(r, 0));
  return n * 2;
}
```

```typescript
// tests/math.test.ts  (Vitest)
import { describe, it, expect, vi } from "vitest";
import { add, fetchDouble } from "../src/math";

describe("add", () => {
  it("returns the sum of two numbers", () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
  });

  it("handles zero", () => {
    expect(add(0, 0)).toBe(0);
  });
});

describe("fetchDouble", () => {
  it("doubles the number asynchronously", async () => {
    await expect(fetchDouble(5)).resolves.toBe(10);
  });
});

// Mocking
it("mocks a module", () => {
  const spy = vi.fn((x: number) => x * 3);
  expect(spy(4)).toBe(12);
  expect(spy).toHaveBeenCalledWith(4);
});
```

```json
// vitest.config (in package.json scripts)
// "test": "vitest run"
```

## Gotchas

- Jest requires `ts-jest` or Babel to transpile TypeScript; misconfigured transforms are a common source of "unexpected token" errors. Vitest handles TypeScript out of the box with no extra config.
- Avoid `any` in test assertions — TypeScript's type system should protect tests too. Use `as const` or explicit type parameters with matchers when needed.
