---
title: "Interfaces"
language: "typescript"
feature: "interfaces"
category: "oop"
applicable: true
---

TypeScript interfaces define contracts — the shape that an object, class, or function must satisfy. They support optional properties, readonly properties, index signatures, and method signatures. Unlike Java interfaces, TypeScript interfaces are purely compile-time constructs that exist only in the type system. A class satisfies an interface structurally, not by explicit declaration, though `implements` makes the relationship explicit and helps the compiler report clear errors.

## Example

```typescript
interface Printable {
  print(): void;
}

interface Serializable {
  serialize(): string;
  deserialize(data: string): void;
}

// Class implementing multiple interfaces
class Document implements Printable, Serializable {
  constructor(private content: string) {}

  print(): void {
    console.log(this.content);
  }

  serialize(): string {
    return JSON.stringify({ content: this.content });
  }

  deserialize(data: string): void {
    this.content = JSON.parse(data).content;
  }
}

// Interface with optional and readonly members
interface Config {
  readonly host: string;
  port?: number;
  timeout: number;
}

// Interface extending another
interface SecureConfig extends Config {
  tls: boolean;
  certPath: string;
}

// Function interface
interface Transformer<T, U> {
  (input: T): U;
}

const toNumber: Transformer<string, number> = (s) => parseFloat(s);
```

## Gotchas

- Interfaces can be merged (declaration merging): declaring the same interface name twice in the same scope merges the two declarations. This is powerful for augmenting third-party types but can be surprising.
- `interface` vs `type`: interfaces are extensible via declaration merging; type aliases cannot be merged but support computed/conditional types.
