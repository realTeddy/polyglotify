---
title: "Generics"
language: "typescript"
feature: "generics"
category: "oop"
applicable: true
---

Generics allow functions, classes, and interfaces to operate over a variety of types while retaining full type safety. Type parameters are declared with angle brackets (`<T>`) and can be constrained with `extends`. TypeScript infers type arguments in most cases, so explicit type parameters are only needed when inference is insufficient.

## Example

```typescript
// Generic function
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

const n = first([1, 2, 3]);       // number | undefined
const s = first(["a", "b"]);      // string | undefined

// Generic constraint
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: "Alice" };
const name = getProperty(user, "name"); // string

// Generic class
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  get size(): number {
    return this.items.length;
  }
}

const numStack = new Stack<number>();
numStack.push(1);
numStack.push(2);
console.log(numStack.pop()); // 2

// Generic interface with default type parameter
interface Repository<T, ID = number> {
  findById(id: ID): Promise<T | null>;
  save(entity: T): Promise<T>;
}
```

## Gotchas

- TypeScript generics are erased at runtime — there is no way to use `T` in runtime type checks like `instanceof T`. Use factory functions or class tokens as workarounds.
- Overly-constrained generics can reduce reusability; prefer the minimum necessary constraint.
