---
title: "Result Types"
language: "javascript"
feature: "result-types"
category: "error-handling"
applicable: false
---

JavaScript has no built-in Result or Either type (like Rust's `Result<T, E>` or Haskell's `Either`). Errors are communicated through thrown exceptions, rejected Promises, or — in the Node.js callback tradition — the "error-first callback" convention. Libraries such as `neverthrow` or `true-myth` bring Result types to JavaScript if desired.

## Example

```javascript
// Node.js error-first callback convention
const fs = require("fs");
fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Read failed:", err.message);
    return;
  }
  console.log(data);
});

// Promise-based (modern equivalent — errors become rejections)
const data = await fs.promises.readFile("data.txt", "utf8").catch((err) => {
  console.error(err.message);
  return null;
});

// Manual Result-style object (userland pattern)
function safeDivide(a, b) {
  if (b === 0) return { ok: false, error: "Division by zero" };
  return { ok: true, value: a / b };
}
const result = safeDivide(10, 2);
if (result.ok) console.log(result.value);
else console.error(result.error);

// Using the 'neverthrow' library (not built in)
// import { ok, err } from "neverthrow";
// const r = b === 0 ? err("Division by zero") : ok(a / b);
// r.map((v) => console.log(v)).mapErr((e) => console.error(e));
```

## Gotchas

- Error-first callbacks are largely replaced by Promises and `async/await` in modern code, but are still pervasive in the Node.js standard library
- The manual `{ ok, value, error }` pattern works but is not standardized — every team may do it differently
- Without TypeScript, there is no way to force the caller to check the error branch; mistakes are caught only at runtime
- The TC39 "Error Safe Assignment Operator" proposal (`?=`) aims to bring result-like syntax to the language, but is still at an early stage
