---
title: "Async / Await"
language: "typescript"
feature: "async-await"
category: "concurrency"
applicable: true
---

TypeScript's `async/await` is a first-class feature built on top of JavaScript Promises. Marking a function `async` makes it return a `Promise<T>` automatically. `await` suspends the function until the promise resolves, enabling sequential-looking asynchronous code. TypeScript infers the resolved type of awaited expressions, giving full type safety through async call chains.

## Example

```typescript
// Simulated async data fetch
async function fetchUser(id: number): Promise<{ id: number; name: string }> {
  // In real code: await fetch(...)
  await new Promise((resolve) => setTimeout(resolve, 10));
  if (id <= 0) throw new Error("Invalid ID");
  return { id, name: "Alice" };
}

async function fetchScore(userId: number): Promise<number> {
  await new Promise((resolve) => setTimeout(resolve, 5));
  return userId * 10;
}

// Sequential
async function sequential() {
  const user = await fetchUser(1);
  const score = await fetchScore(user.id);
  console.log(`${user.name}: ${score}`);
}

// Parallel with Promise.all
async function parallel() {
  const [user, score] = await Promise.all([fetchUser(1), fetchScore(1)]);
  console.log(`${user.name}: ${score}`);
}

// Error handling
async function safe() {
  try {
    const user = await fetchUser(-1);
    return user;
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
    return null;
  }
}

// Promise combinators
async function raceExample() {
  const result = await Promise.race([fetchUser(1), fetchUser(2)]);
  console.log(result);
}
```

## Gotchas

- Forgetting `await` silently returns a `Promise` instead of the resolved value; TypeScript will often catch this through type mismatches but not always.
- `await` inside a `forEach` callback does not serialize the iterations — use `for...of` or `Promise.all` with `.map` instead.
