---
title: "Async/Await"
language: "php"
feature: "async-await"
category: "concurrency"
applicable: false
---

Traditional PHP (FPM/CGI) is synchronous and single-threaded per request; there is no native `async`/`await`. However, several ecosystems provide async support: ReactPHP and Amp are event-loop-based libraries, and Swoole/OpenSwoole are PHP extensions that provide native coroutines with `go()` and `Co::create()`. PHP Fibers (8.1+) are the language-level primitive that these libraries build on.

## Example

```php
<?php
// Using PHP Fibers (8.1+) — the building block for async
$fiber = new Fiber(function(): void {
    $value = Fiber::suspend('first suspension');
    echo "Resumed with: $value\n";
    Fiber::suspend('second suspension');
});

$result1 = $fiber->start();
echo "Fiber suspended with: $result1\n";

$result2 = $fiber->resume('hello from outside');
echo "Fiber suspended again with: $result2\n";

$fiber->resume();  // fiber returns

// With Amp (v3) — async/await style
// require 'vendor/autoload.php';
// use Amp\async, Amp\delay;
// $promise = async(function() {
//     delay(0.1);
//     return "result";
// });
// echo \Amp\await($promise);
```

## Gotchas

- PHP Fibers are low-level; application-level async requires a library (ReactPHP, Amp, Revolt) that provides an event loop, promises, and higher-level abstractions.
- Traditional PHP-FPM does not benefit from async I/O — the worker handles one request at a time; async matters for long-running processes (CLI daemons, WebSocket servers).
- Mixing blocking I/O (e.g., `file_get_contents`) inside a Fiber-based event loop blocks the entire event loop thread.
