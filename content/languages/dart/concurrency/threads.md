---
title: "Threads"
language: "dart"
feature: "threads"
category: "concurrency"
applicable: false
---

Dart does not use threads for concurrency. Instead, it uses **Isolates** — fully isolated workers with their own heap, event loop, and no shared memory. Communication between isolates happens exclusively via message passing, eliminating data races by design.

## Example

```dart
import 'dart:isolate';

// Spawning an isolate
Future<void> main() async {
  final receivePort = ReceivePort();

  await Isolate.spawn(worker, receivePort.sendPort);

  final result = await receivePort.first;
  print('Result: $result');
}

void worker(SendPort sendPort) {
  // This runs in a separate isolate with its own heap
  final result = heavyComputation();
  sendPort.send(result);
}

int heavyComputation() {
  return List.generate(1000000, (i) => i).fold(0, (a, b) => a + b);
}

// Simplified with Isolate.run (Dart 2.19+)
Future<void> simpleIsolate() async {
  final result = await Isolate.run(() => heavyComputation());
  print(result);
}
```

## Gotchas

- Isolates cannot share mutable state; all data sent between isolates must be copyable (or transferred)
- `Isolate.run` (Dart 2.19+) is the simplest way to offload a computation and get back a result
- Flutter's `compute()` function is a Flutter-specific wrapper around `Isolate.run`
