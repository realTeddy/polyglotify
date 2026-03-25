---
title: "Channels & Message Passing"
language: "php"
feature: "channels"
category: "concurrency"
applicable: false
---

PHP has no built-in channels. The `parallel\Channel` class from the `parallel` extension provides channels between parallel runtimes. For typical PHP applications, message passing is done through external systems: message queues (Redis, RabbitMQ, Amazon SQS) managed by libraries like Laravel Horizon, Symfony Messenger, or php-amqplib.

## Example

```php
<?php
// parallel\Channel — requires parallel extension + ZTS PHP
use parallel\Runtime;
use parallel\Channel;

$channel = new Channel();

$producer = (new Runtime())->run(function(Channel $ch): void {
    for ($i = 1; $i <= 5; $i++) {
        $ch->send("message $i");
    }
    $ch->close();
}, [$channel]);

$consumer = (new Runtime())->run(function(Channel $ch): void {
    while (true) {
        try {
            echo $ch->recv() . "\n";
        } catch (\parallel\Channel\Error\Closed) {
            break;
        }
    }
}, [$channel]);

$producer->value();
$consumer->value();
```

## Gotchas

- `parallel\Channel` requires both the `parallel` extension and a ZTS-compiled PHP binary; most shared hosting and standard PHP builds do not include this.
- For production workloads, use a dedicated message broker (Redis Streams, RabbitMQ) rather than in-process channels; they provide persistence, acknowledgements, and distribution across machines.
- PHP Fibers (8.1+) combined with Amp's `Channel` class offer a fiber-based channel abstraction without requiring a ZTS build.
