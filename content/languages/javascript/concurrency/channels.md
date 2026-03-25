---
title: "Channels & Message Passing"
language: "javascript"
feature: "channels"
category: "concurrency"
applicable: false
---

JavaScript has no built-in channel abstraction like Go's channels or Rust's `mpsc`. Message passing between concurrent contexts (Workers, iframes, service workers) is done via `postMessage` and the `MessageChannel` / `MessagePort` APIs. These are event-driven rather than blocking, but can be wrapped to emulate a channel-like interface with async iterators.

## Example

```javascript
// MessageChannel — a two-way pipe between two endpoints
const { port1, port2 } = new MessageChannel();

// Give port2 to a worker (or iframe)
const worker = new Worker("worker.js", { type: "module" });
worker.postMessage({ channel: port2 }, [port2]); // transfer ownership

port1.onmessage = (event) => {
  console.log("Received:", event.data);
};
port1.postMessage("ping");

// BroadcastChannel — one-to-many across same-origin contexts
const bc = new BroadcastChannel("app-events");
bc.postMessage({ type: "USER_LOGGED_IN", userId: 42 });
bc.onmessage = (event) => console.log(event.data);

// Async-iterator wrapper to emulate a channel (userland)
function makeChannel(port) {
  const queue = [];
  let resolve;
  port.onmessage = ({ data }) => {
    if (resolve) { resolve({ value: data, done: false }); resolve = null; }
    else queue.push(data);
  };
  return {
    [Symbol.asyncIterator]() { return this; },
    next() {
      if (queue.length) return Promise.resolve({ value: queue.shift(), done: false });
      return new Promise((r) => { resolve = r; });
    },
  };
}
```

## Gotchas

- `postMessage` transfers a copy (structured clone) of the data by default; `Transferable` objects (like `ArrayBuffer`) can be transferred to avoid copying, but become unusable in the sender
- Unlike Go channels, `postMessage` is non-blocking and never back-pressures the sender
- `BroadcastChannel` only works across same-origin contexts in the same browser profile — it is not a network transport
- There is no standard library channel with buffering, `select`, or timeout semantics; those patterns must be built by hand
