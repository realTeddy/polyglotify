---
title: "Threads"
language: "javascript"
feature: "threads"
category: "concurrency"
applicable: false
---

JavaScript is single-threaded by design. There is no `Thread` class or native threading API in the language. True parallel execution is achieved through Web Workers in browsers or `worker_threads` in Node.js. Workers run in completely isolated contexts and communicate with the main thread by message passing — they do not share memory by default, though `SharedArrayBuffer` enables shared memory with explicit synchronization via `Atomics`.

## Example

```javascript
// --- main.js ---
// Creating a Web Worker (browser) or worker thread (Node.js)
const worker = new Worker("worker.js");

worker.postMessage({ type: "START", payload: [1, 2, 3, 4, 5] });

worker.onmessage = (event) => {
  console.log("Result from worker:", event.data);
};

worker.onerror = (err) => {
  console.error("Worker error:", err.message);
};

// --- worker.js ---
self.onmessage = (event) => {
  const { type, payload } = event.data;
  if (type === "START") {
    const result = payload.reduce((sum, n) => sum + n, 0);
    self.postMessage(result);
  }
};

// Node.js worker_threads equivalent
const { Worker, isMainThread, parentPort } = require("worker_threads");
if (isMainThread) {
  const w = new Worker(__filename);
  w.postMessage([1, 2, 3]);
  w.on("message", console.log);
} else {
  parentPort.on("message", (arr) => parentPort.postMessage(arr.length));
}
```

## Gotchas

- Workers do not share the same global scope, DOM, or most objects — data is copied (structured clone) when posted unless using `SharedArrayBuffer`
- `SharedArrayBuffer` requires specific cross-origin isolation headers in browsers (`Cross-Origin-Embedder-Policy`, `Cross-Origin-Opener-Policy`)
- `Atomics` must be used to safely coordinate access to a `SharedArrayBuffer` — unsynchronized concurrent reads/writes produce race conditions
- The event loop inside each worker is also single-threaded; creating many workers does not equal true fine-grained parallelism
