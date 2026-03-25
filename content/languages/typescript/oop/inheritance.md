---
title: "Inheritance"
language: "typescript"
feature: "inheritance"
category: "oop"
applicable: true
---

TypeScript supports single-class inheritance via the `extends` keyword. A subclass can call the parent constructor with `super()` and override parent methods. TypeScript also checks that overridden methods are compatible with the parent signature when using the `override` keyword (added in TypeScript 4.3), preventing accidental drift.

## Example

```typescript
abstract class Animal {
  constructor(public readonly name: string) {}

  abstract sound(): string;

  describe(): string {
    return `${this.name} says "${this.sound()}"`;
  }
}

class Dog extends Animal {
  constructor(name: string, public breed: string) {
    super(name);
  }

  override sound(): string {
    return "Woof";
  }

  fetch(item: string): string {
    return `${this.name} fetches the ${item}!`;
  }
}

class Cat extends Animal {
  override sound(): string {
    return "Meow";
  }
}

const dog = new Dog("Rex", "Labrador");
const cat = new Cat("Whiskers");

console.log(dog.describe());  // Rex says "Woof"
console.log(cat.describe());  // Whiskers says "Meow"
console.log(dog.fetch("ball")); // Rex fetches the ball!

// Polymorphism
const animals: Animal[] = [dog, cat];
animals.forEach((a) => console.log(a.describe()));
```

## Gotchas

- TypeScript only supports single inheritance for classes. Compose multiple behaviours using interfaces and mixins instead of deep inheritance chains.
- Using `override` keyword is strongly recommended — without it, TypeScript won't warn if a parent method is renamed, silently breaking the override.
