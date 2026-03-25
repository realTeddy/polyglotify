---
title: "Testing"
language: "javascript"
feature: "testing"
category: "ecosystem"
applicable: true
---

JavaScript has a rich testing ecosystem. Vitest and Jest are the dominant unit/integration test frameworks; both provide a similar API with `describe`, `it`/`test`, `expect`, mocking, and coverage. Playwright and Cypress handle end-to-end browser testing. Node.js 18+ ships a built-in `node:test` module for zero-dependency testing.

## Example

```javascript
// utils/math.js
export function add(a, b) { return a + b; }
export async function fetchUser(id) {
  const res = await fetch(`/api/users/${id}`);
  return res.json();
}

// utils/math.test.js  (Vitest or Jest — API is identical)
import { describe, it, expect, vi, beforeEach } from "vitest";
import { add, fetchUser } from "./math.js";

describe("add", () => {
  it("sums two numbers", () => {
    expect(add(2, 3)).toBe(5);
  });

  it("handles negative numbers", () => {
    expect(add(-1, 1)).toBe(0);
  });
});

describe("fetchUser", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ id: 1, name: "Alice" }),
    }));
  });

  it("returns a user object", async () => {
    const user = await fetchUser(1);
    expect(user).toEqual({ id: 1, name: "Alice" });
    expect(fetch).toHaveBeenCalledWith("/api/users/1");
  });
});
```

```bash
# Run tests
npx vitest          # Vitest (watch mode by default)
npx jest            # Jest
node --test         # built-in Node.js test runner
```

## Gotchas

- Jest uses a CommonJS module system by default; configuring it for ES Modules requires extra setup (`"transform": {}` or `--experimental-vm-modules`)
- Vitest uses Vite's transform pipeline, so it natively supports ES Modules, TypeScript, and JSX without extra configuration
- Mocking modules (`vi.mock` / `jest.mock`) is hoisted to the top of the file by a Babel/Vite transform — the call order in source does not match execution order
- Coverage tools count line/branch execution but cannot guarantee correctness; a test can pass with 100% coverage yet miss logic errors
