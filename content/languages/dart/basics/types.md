---
title: "Types & Type Systems"
language: "dart"
feature: "types"
category: "basics"
applicable: true
---

Dart is a statically typed, sound null-safe language. Every variable has a static type and the compiler prevents null-dereference errors. The type hierarchy has `Object?` at the top; `Object` is the root of non-nullable types and `Never` is the bottom type.

## Example

```dart
// Primitive types
int    count   = 42;
double ratio   = 3.14;
bool   active  = true;
String label   = 'hello';

// Collections
List<int>          nums   = [1, 2, 3];
Map<String, int>   scores = {'Alice': 95};
Set<String>        tags   = {'dart', 'flutter'};

// Nullable vs non-nullable
String  name = 'Alice';   // never null
String? nick = null;      // can be null

// Type checking & casting
Object val = 'hello';
if (val is String) {
  print(val.length);   // smart-cast: val is String here
}
int n = val as int;    // explicit cast; throws if wrong type

// Special types
dynamic   x = anything;   // disables static checks
Object?   y = null;        // top type, nullable
Never     z;               // represents unreachable code (never returns)
```

## Gotchas

- `dynamic` disables type checking entirely; prefer `Object?` when you need a top type with safety
- `as` cast throws `CastError` at runtime if the type is wrong; prefer `is` with smart-casting
- `num` is the supertype of both `int` and `double`
