---
title: "Exceptions & Try/Catch"
language: "javascript"
feature: "exceptions"
category: "error-handling"
applicable: true
---

JavaScript uses `try/catch/finally` for synchronous error handling and `try/catch` inside `async` functions for asynchronous errors. Any value can be thrown, but throwing an `Error` (or a subclass) is strongly preferred because it captures a stack trace automatically.

## Example

```javascript
// Basic try/catch/finally
function divide(a, b) {
  if (b === 0) throw new RangeError("Division by zero");
  return a / b;
}

try {
  const result = divide(10, 0);
  console.log(result);
} catch (err) {
  console.error(`${err.name}: ${err.message}`);
} finally {
  console.log("Always runs");
}

// Custom error subclass
class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

function validateAge(age) {
  if (typeof age !== "number" || age < 0) {
    throw new ValidationError("age", "Must be a non-negative number");
  }
}

// Async error handling
async function loadData(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Fetch failed:", err.message);
    throw err;  // re-throw if the caller needs to handle it
  }
}
```

## Gotchas

- `catch` has no type filtering — it always catches everything; use `instanceof` to branch on error type
- Throwing a non-Error value (string, number, plain object) loses the stack trace; always use `new Error()` or a subclass
- An unhandled promise rejection (missing `.catch()` or `try/catch` in async functions) emits an `unhandledRejection` event and may crash Node.js
- `finally` runs even if the `try` or `catch` block contains a `return`; a `return` inside `finally` overrides the earlier return value
