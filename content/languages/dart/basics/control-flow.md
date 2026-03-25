---
title: "Control Flow"
language: "dart"
feature: "control-flow"
category: "basics"
applicable: true
---

Dart supports `if/else`, `for`, `for-in`, `while`, `do-while`, `switch`, and `break`/`continue`. Dart 3.0 added exhaustive `switch` expressions and pattern matching, significantly improving control-flow expressiveness.

## Example

```dart
// if / else
if (score >= 90) {
  print('A');
} else if (score >= 80) {
  print('B');
} else {
  print('C');
}

// for loop
for (var i = 0; i < 5; i++) {
  print(i);
}

// for-in
for (final item in ['a', 'b', 'c']) {
  print(item);
}

// while / do-while
while (queue.isNotEmpty) {
  process(queue.removeFirst());
}

// Switch expression (Dart 3+)
final label = switch (status) {
  Status.ok      => 'success',
  Status.error   => 'error',
  Status.pending => 'waiting',
};

// Pattern matching with switch
switch (shape) {
  case Circle(radius: var r):
    print('Circle: $r');
  case Rectangle(width: var w, height: var h):
    print('Rect: ${w}x${h}');
}
```

## Gotchas

- Dart `switch` statements (pre-3.0 style) fall through only with empty cases; non-empty cases require `break`
- Dart 3 switch expressions are exhaustive — the compiler requires all cases to be covered
- `continue` in a `for-in` loop skips to the next iteration; `break` exits the loop
