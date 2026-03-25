---
title: "Function Declaration"
language: "dart"
feature: "declaration"
category: "functions"
applicable: true
---

Dart functions are first-class objects. They can be declared at the top level, inside classes, or nested inside other functions. Functions have explicit return types; `void` indicates no return value. Arrow syntax (`=>`) provides a concise single-expression form.

## Example

```dart
// Top-level function
int add(int a, int b) {
  return a + b;
}

// Arrow function (single expression)
int multiply(int a, int b) => a * b;

// void function
void printGreeting(String name) {
  print('Hello, $name!');
}

// Nested function
int outer(int x) {
  int inner(int y) => y * 2;  // only visible inside outer
  return inner(x) + 1;
}

// Function as a value
final greet = (String name) => 'Hi, $name!';
print(greet('Alice'));  // => "Hi, Alice!"

// Passing functions
List<int> applyToAll(List<int> nums, int Function(int) fn) {
  return nums.map(fn).toList();
}
applyToAll([1, 2, 3], (n) => n * 2);  // => [2, 4, 6]
```

## Gotchas

- Dart does not support function overloading; use optional/named parameters instead
- The return type `void` and omitting the type are different; omitting returns `dynamic`
- Arrow functions can only contain a single expression, not a block with multiple statements
