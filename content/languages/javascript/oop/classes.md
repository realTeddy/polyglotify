---
title: "Classes"
language: "javascript"
feature: "classes"
category: "oop"
applicable: true
---

ES2015 introduced `class` syntax as clean, readable sugar over JavaScript's prototype chain. Classes support constructors, instance and static methods, public and private fields, getters/setters, and inheritance. They are the standard way to model objects that carry both state and behavior.

## Example

```javascript
class Animal {
  // Public and private fields
  name;
  #sound;  // private

  constructor(name, sound) {
    this.name = name;
    this.#sound = sound;
  }

  // Instance method
  speak() {
    return `${this.name} says ${this.#sound}`;
  }

  // Getter
  get label() {
    return `[Animal: ${this.name}]`;
  }

  // Static method
  static create(name, sound) {
    return new Animal(name, sound);
  }
}

const dog = Animal.create("Rex", "woof");
dog.speak();    // "Rex says woof"
dog.label;      // "[Animal: Rex]"
dog.#sound;     // SyntaxError — truly private
```

## Gotchas

- Classes are not hoisted the same way function declarations are — referencing a class before its definition throws a ReferenceError
- `this` inside a method depends on how the method is called; passing a method as a callback loses the binding — use arrow-function class fields (`speak = () => { ... }`) to fix this
- Private fields (`#`) are enforced by the engine, not just convention; accessing them from outside the class throws a SyntaxError at parse time
- `typeof MyClass` is `"function"` — classes are functions under the hood
