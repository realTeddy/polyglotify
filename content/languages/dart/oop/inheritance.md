---
title: "Inheritance"
language: "dart"
feature: "inheritance"
category: "oop"
applicable: true
---

Dart supports single inheritance with `extends`. `super` calls the parent constructor or method. `@override` is used to annotate overridden methods. Mixins (`mixin`/`with`) and interfaces (`implements`) complement inheritance for code reuse.

## Example

```dart
class Animal {
  final String name;
  Animal(this.name);

  String get sound => '...';

  void describe() {
    print('$name says ${sound}');
  }
}

class Dog extends Animal {
  Dog(String name) : super(name);

  @override
  String get sound => 'Woof';

  void fetch(String item) => print('$name fetches $item');
}

class GuideDog extends Dog {
  final String owner;

  GuideDog(String name, this.owner) : super(name);

  @override
  void describe() {
    super.describe();   // call parent
    print('Guide dog for $owner');
  }
}

void main() {
  final g = GuideDog('Rex', 'Bob');
  g.describe();
  print(g is Animal);   // => true
  print(g is Dog);      // => true
}
```

## Gotchas

- Dart only supports single inheritance; use `mixin` for horizontal code sharing
- The `@override` annotation is optional but strongly recommended for clarity and IDE support
- Constructors are not inherited; each subclass must define its own (or use `: super()`)
