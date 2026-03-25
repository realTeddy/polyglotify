---
title: "Parameters & Arguments"
language: "dart"
feature: "parameters"
category: "functions"
applicable: true
---

Dart has three parameter types: required positional, optional positional (`[]`), and named parameters (`{}`). Named parameters are required unless marked with a default or `required`. Named parameters improve readability at call sites.

## Example

```dart
// Required positional
int add(int a, int b) => a + b;
add(2, 3);

// Optional positional (in square brackets)
String greet(String name, [String greeting = 'Hello']) {
  return '$greeting, $name!';
}
greet('Alice');           // => "Hello, Alice!"
greet('Alice', 'Hi');     // => "Hi, Alice!"

// Named parameters (in curly braces)
void createUser({required String name, int age = 0}) {
  print('$name, age $age');
}
createUser(name: 'Alice', age: 30);
createUser(name: 'Bob');   // age defaults to 0

// Nullable named parameter (optional without default)
void log({String? tag, required String message}) {
  print('[${tag ?? 'INFO'}] $message');
}

// Function type as parameter
void repeat(int times, void Function() action) {
  for (var i = 0; i < times; i++) action();
}
repeat(3, () => print('hello'));
```

## Gotchas

- Named parameters are optional by default; mark with `required` to force callers to supply them
- Optional positional and named parameters cannot be mixed in the same function signature
- Dart does not support rest/variadic parameters; use a `List` parameter instead
