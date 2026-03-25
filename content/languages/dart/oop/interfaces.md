---
title: "Interfaces & Traits"
language: "dart"
feature: "interfaces"
category: "oop"
applicable: true
---

Every Dart class implicitly defines an interface. A class can `implement` multiple interfaces, promising to provide all their members. `abstract interface class` is the idiomatic way to define a pure interface. `mixin` provides trait-like reusable behavior.

## Example

```dart
// Implicit interface — implement any class's interface
abstract interface class Serializable {
  Map<String, dynamic> toJson();
}

abstract interface class Printable {
  void printInfo();
}

// Mixin — reusable behavior
mixin Timestamped {
  DateTime get createdAt => DateTime.now();

  String get age {
    final diff = DateTime.now().difference(createdAt);
    return '${diff.inDays} days old';
  }
}

// Implementing multiple interfaces + mixin
class User with Timestamped implements Serializable, Printable {
  final String name;
  final String email;

  User(this.name, this.email);

  @override
  Map<String, dynamic> toJson() => {'name': name, 'email': email};

  @override
  void printInfo() => print('User: $name <$email>');
}

void main() {
  final u = User('Alice', 'alice@example.com');
  u.printInfo();
  print(u.toJson());
  print(u is Serializable);  // => true
}
```

## Gotchas

- `implements` requires implementing ALL members — no default implementation is inherited
- `extends` inherits both interface and implementation; `implements` inherits only the interface contract
- A `mixin` can apply constraints with `on ClassName`, limiting which classes can use it
