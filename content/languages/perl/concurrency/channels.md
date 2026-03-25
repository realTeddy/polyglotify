---
title: "Channels & Message Passing"
language: "perl"
feature: "channels"
category: "concurrency"
applicable: false
---

Perl does not have built-in channels. Thread-safe message passing is done via shared arrays used as queues (`Thread::Queue`). For process-based concurrency, pipes, sockets, or `IPC::Shareable` serve as IPC channels.

## Example

```perl
use strict;
use warnings;
use threads;
use Thread::Queue;

# Thread::Queue — thread-safe FIFO channel
my $queue = Thread::Queue->new();

my $producer = threads->create(sub {
    for my $i (1..5) {
        $queue->enqueue("message $i");
        sleep(0.1);
    }
    $queue->end();   # signal no more items
});

my $consumer = threads->create(sub {
    while (defined(my $msg = $queue->dequeue())) {
        print "Received: $msg\n";
    }
});

$producer->join();
$consumer->join();

# Pipe-based IPC between processes
use IPC::Open2;
my ($child_out, $child_in);
my $pid = open2($child_out, $child_in, "sort");
print $child_in "banana\napple\ncherry\n";
close $child_in;
print while <$child_out>;
waitpid $pid, 0;
```

## Gotchas

- `Thread::Queue->end()` signals consumers that no more data will be added; `dequeue()` returns `undef` after `end()`
- `dequeue_nb()` is non-blocking — returns `undef` immediately if the queue is empty
- For process-based parallelism, consider `Parallel::ForkManager` which provides a higher-level fork pool
