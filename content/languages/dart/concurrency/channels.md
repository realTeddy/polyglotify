---
title: "Channels & Message Passing"
language: "dart"
feature: "channels"
category: "concurrency"
applicable: true
---

Dart isolates communicate exclusively through `SendPort` / `ReceivePort` pairs — the equivalent of channels. `ReceivePort` is a stream of messages; `SendPort` is the write end. For in-isolate async communication, `StreamController` serves as a broadcast channel.

## Example

```dart
import 'dart:isolate';
import 'dart:async';

// Bi-directional isolate communication
Future<void> main() async {
  final mainReceive = ReceivePort();
  final isolate = await Isolate.spawn(workerLoop, mainReceive.sendPort);

  final workerSend = await mainReceive.first as SendPort;
  final responsePort = ReceivePort();

  workerSend.send({'port': responsePort.sendPort, 'data': 'hello'});
  final response = await responsePort.first;
  print('Got: $response');

  isolate.kill();
}

void workerLoop(SendPort mainSend) {
  final recv = ReceivePort();
  mainSend.send(recv.sendPort);

  recv.listen((msg) {
    final map      = msg as Map;
    final replyTo  = map['port'] as SendPort;
    replyTo.send('Echo: ${map['data']}');
  });
}

// StreamController as in-process channel
final controller = StreamController<String>.broadcast();
controller.stream.listen((msg) => print('Received: $msg'));
controller.sink.add('hello');
controller.sink.add('world');
```

## Gotchas

- `SendPort.send` copies most objects (deep copy); large objects have significant overhead
- `ReceivePort` is a single-subscription stream; close it with `.close()` to avoid memory leaks
- `StreamController.broadcast()` allows multiple listeners; the default single-subscription controller buffers when there are no listeners
