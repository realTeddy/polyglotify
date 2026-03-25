---
title: "Closures & Lambdas"
language: "dart"
feature: "closures"
category: "functions"
applicable: true
---

Dart functions are first-class objects and form closures over their enclosing scope. Anonymous functions can be inline or assigned to variables. Arrow functions (`=>`) provide concise single-expression lambdas.

## Example

```dart
// Anonymous function assigned to variable
final double = (int n) => n * 2;
double(5);  // => 10

// Inline anonymous function
var evens = [1, 2, 3, 4, 5].where((n) => n.isEven).toList();

// Closure — captures outer variable
Function makeAdder(int addend) {
  return (int n) => n + addend;  // captures addend
}
final addFive = makeAdder(5);
print(addFive(3));  // => 8

// Closure mutates outer variable
int counter = 0;
final increment = () => counter++;
increment();
increment();
print(counter);  // => 2

// Passing closures as callbacks
void forEach<T>(List<T> list, void Function(T) callback) {
  for (final item in list) callback(item);
}
forEach([1, 2, 3], (n) => print(n * n));

// Tearing off a method (method reference)
final nums = [3, 1, 2];
nums.sort(Comparable.compare);
```

## Gotchas

- All variables captured by a closure are captured by reference, not by value — mutations are visible in the closure
- Method tear-offs create a closure bound to the specific instance: `obj.method` is equivalent to `() => obj.method()`
- Dart closures do not capture `this` implicitly in static contexts
