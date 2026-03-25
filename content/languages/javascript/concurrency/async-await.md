---
title: "Async/Await"
language: "javascript"
feature: "async-await"
category: "concurrency"
applicable: true
---

JavaScript is single-threaded and uses an event loop for concurrency. `async/await` (built on Promises) is the modern, idiomatic way to write asynchronous code that reads like synchronous code. An `async` function always returns a Promise; `await` suspends the function until the awaited Promise settles without blocking the thread.

## Example

```javascript
// Fetching data sequentially
async function getUserWithPosts(userId) {
  const userRes = await fetch(`/api/users/${userId}`);
  const user    = await userRes.json();

  const postsRes = await fetch(`/api/posts?userId=${userId}`);
  const posts    = await postsRes.json();

  return { user, posts };
}

// Running independent requests in parallel with Promise.all
async function getDashboard(userId) {
  const [user, posts, settings] = await Promise.all([
    fetch(`/api/users/${userId}`).then((r) => r.json()),
    fetch(`/api/posts?userId=${userId}`).then((r) => r.json()),
    fetch(`/api/settings/${userId}`).then((r) => r.json()),
  ]);
  return { user, posts, settings };
}

// Error handling
async function loadConfig(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Failed to load config:", err.message);
    return {};
  }
}

// Top-level await (ES modules only)
const data = await loadConfig("/config.json");
```

## Gotchas

- `await` can only be used inside an `async` function (or at the top level of an ES module)
- Sequential `await` calls run one after another; wrap independent Promises in `Promise.all` to run them in parallel
- An unhandled rejection from an async function will trigger an `unhandledRejection` event; always `await` or `.catch()` every Promise
- `async/await` does not make JavaScript multi-threaded — truly parallel CPU work still requires Web Workers or worker threads
