---
title: "Threads"
language: "php"
feature: "threads"
category: "concurrency"
applicable: false
---

Standard PHP does not support threads. The `parallel` extension (by Joe Watkins) provides parallel execution via isolated PHP runtimes (not shared-memory threads). The more common pattern for parallelism in PHP is to use multiple processes (e.g., `pcntl_fork`, `proc_open`, or job queues like Horizon/Beanstalkd).

## Example

```php
<?php
// parallel extension — each task runs in an isolated runtime
// require the parallel extension

use parallel\Runtime;
use parallel\Channel;

$runtime1 = new Runtime();
$runtime2 = new Runtime();

$future1 = $runtime1->run(function(): int {
    $sum = 0;
    for ($i = 0; $i < 100000; $i++) $sum += $i;
    return $sum;
});

$future2 = $runtime2->run(function(): int {
    return array_sum(range(0, 99999));
});

echo $future1->value() . "\n";  // 4999950000
echo $future2->value() . "\n";  // 4999950000

// Using pcntl_fork (Unix only) for process-level parallelism
$pid = pcntl_fork();
if ($pid === 0) {
    echo "Child process\n";
    exit(0);
} else {
    echo "Parent process, child PID: $pid\n";
    pcntl_wait($status);
}
```

## Gotchas

- The `parallel` extension requires a ZTS (Zend Thread Safe) PHP build, which is not the default on most systems.
- Shared state between parallel runtimes is not possible; each runtime is completely isolated — communication uses `Channel` objects.
- For most PHP web applications, horizontal scaling (more PHP-FPM workers or containers) is the practical parallelism strategy, not threading.
