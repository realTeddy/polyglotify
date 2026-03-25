---
title: "Exceptions"
language: "typescript"
feature: "exceptions"
category: "error-handling"
applicable: true
---

TypeScript uses JavaScript's `try/catch/finally` for exception handling. Any value can be thrown, but throwing `Error` instances (or subclasses) is idiomatic because they capture a stack trace. TypeScript 4.0 added the `useUnknownInCatchVariables` compiler option (enabled by default in strict mode), making caught values `unknown` rather than `any`, forcing explicit type narrowing before use.

## Example

```typescript
// Custom error class
class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number = 500
  ) {
    super(message);
    this.name = "AppError";
    // Restore prototype chain in transpiled code
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

// try / catch / finally
function parseJson<T>(raw: string): T {
  try {
    return JSON.parse(raw) as T;
  } catch (err: unknown) {
    if (err instanceof SyntaxError) {
      throw new AppError(`Invalid JSON: ${err.message}`, "PARSE_ERROR", 400);
    }
    throw err; // re-throw unexpected errors
  }
}

function readConfig(path: string): Record<string, unknown> {
  try {
    // simulate file read
    const raw = '{"host":"localhost"}';
    return parseJson(raw);
  } catch (err: unknown) {
    if (err instanceof AppError) {
      console.error(`[${err.code}] ${err.message}`);
    }
    throw err;
  } finally {
    console.log("Config read attempted");
  }
}
```

## Gotchas

- Without `useUnknownInCatchVariables`, the caught value is typed as `any`, masking potential type errors. Always enable strict mode or manually annotate `catch (err: unknown)`.
- `Object.setPrototypeOf(this, ...)` in Error subclass constructors is necessary when compiling to ES5 because TypeScript's `class extends` desugaring breaks the prototype chain for built-in classes.
