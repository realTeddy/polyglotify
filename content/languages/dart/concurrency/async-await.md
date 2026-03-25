---
title: "Async/Await"
language: "dart"
feature: "async-await"
category: "concurrency"
applicable: true
---

Dart has first-class `async/await` built into the language. An `async` function returns a `Future<T>`. `await` suspends the current isolate's event loop entry until the future completes. Dart is single-threaded per isolate, so async/await is cooperative and non-blocking.

## Example

```dart
import 'dart:io';

// Async function
Future<String> fetchUser(String id) async {
  final response = await HttpClient().getUrl(Uri.parse('https://api.example.com/users/$id'));
  final result   = await response.close();
  return await result.transform(const Utf8Decoder()).join();
}

// Awaiting in main
Future<void> main() async {
  try {
    final user = await fetchUser('123');
    print(user);
  } catch (e) {
    print('Error: $e');
  }
}

// Running multiple futures concurrently
Future<void> parallel() async {
  final results = await Future.wait([
    fetchUser('1'),
    fetchUser('2'),
    fetchUser('3'),
  ]);
  print(results);
}

// Async stream
Stream<int> countUp(int max) async* {
  for (var i = 0; i <= max; i++) {
    await Future.delayed(Duration(milliseconds: 100));
    yield i;
  }
}

await for (final n in countUp(5)) {
  print(n);
}
```

## Gotchas

- `async` functions run synchronously until the first `await`; state mutations before the first await are synchronous
- `Future.wait` fails fast on the first error; use `Future.wait(..., eagerError: false)` to collect all results
- `unawaited()` from `dart:async` explicitly marks a future as intentionally not awaited (suppresses linter warnings)
