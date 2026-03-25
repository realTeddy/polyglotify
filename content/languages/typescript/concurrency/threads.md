---
title: "Threads"
language: "typescript"
feature: "threads"
category: "concurrency"
applicable: true
---

JavaScript (and TypeScript) runs on a single-threaded event loop. True parallelism is achieved via `Worker` threads in Node.js (`worker_threads` module) or `Web Workers` in browsers. Workers run in isolated contexts with their own heap and communicate via message passing — there is no shared mutable state by default. `SharedArrayBuffer` and `Atomics` enable low-level shared memory between threads when needed.

## Example

```typescript
// main.ts — Node.js worker_threads example
import { Worker, isMainThread, parentPort, workerData } from "worker_threads";

if (isMainThread) {
  // Spawn a worker, passing data
  const worker = new Worker(__filename, {
    workerData: { numbers: [1, 2, 3, 4, 5] },
  });

  worker.on("message", (result: number) => {
    console.log("Sum from worker:", result); // 15
  });

  worker.on("error", (err) => {
    console.error("Worker error:", err);
  });

  worker.on("exit", (code) => {
    if (code !== 0) console.error(`Worker exited with code ${code}`);
  });
} else {
  // Worker thread code (same file, different branch)
  const { numbers } = workerData as { numbers: number[] };
  const sum = numbers.reduce((a: number, b: number) => a + b, 0);
  parentPort?.postMessage(sum);
}
```

## Gotchas

- Worker threads do not share the JavaScript heap; objects passed via `postMessage` are either structured-cloned (copied) or transferred (moved). Transferring large `ArrayBuffer`s is zero-copy but renders the original unusable.
- CPU-bound work belongs in workers; I/O-bound work is better handled with async/await on the main thread using the event loop.
