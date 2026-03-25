---
title: "Channels"
language: "typescript"
feature: "channels"
category: "concurrency"
applicable: true
---

TypeScript has no built-in channel primitive, but the pattern is commonly implemented using async generators, `EventEmitter`, or reactive libraries like RxJS. A simple channel can be built with a promise queue: producers push values and consumers pull them with `await`. The `IxJS` and `ts-channel` libraries provide typed Go-style channels.

## Example

```typescript
// Simple async channel implementation
class Channel<T> {
  private queue: T[] = [];
  private resolvers: Array<(value: T) => void> = [];
  private closed = false;

  send(value: T): void {
    if (this.closed) throw new Error("Channel is closed");
    if (this.resolvers.length > 0) {
      // A receiver is already waiting
      this.resolvers.shift()!(value);
    } else {
      this.queue.push(value);
    }
  }

  receive(): Promise<T> {
    if (this.queue.length > 0) {
      return Promise.resolve(this.queue.shift()!);
    }
    return new Promise<T>((resolve) => this.resolvers.push(resolve));
  }

  close(): void {
    this.closed = true;
  }
}

// Usage
async function demo() {
  const ch = new Channel<number>();

  // Producer
  (async () => {
    for (let i = 1; i <= 5; i++) {
      ch.send(i);
      await new Promise((r) => setTimeout(r, 10));
    }
  })();

  // Consumer
  for (let i = 0; i < 5; i++) {
    const val = await ch.receive();
    console.log("Received:", val);
  }
}

demo();
```

## Gotchas

- This naive implementation does not handle backpressure — a fast producer can fill unbounded memory. For production use, add a capacity limit and block the sender when the buffer is full.
- TypeScript/JavaScript's single-threaded model means channels here coordinate asynchronous tasks, not true parallel threads; for inter-thread communication use `Worker` message passing.
