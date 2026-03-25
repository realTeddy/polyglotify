---
title: "Async/Await"
language: "perl"
feature: "async-await"
category: "concurrency"
applicable: false
---

Perl does not have native async/await syntax. Asynchronous programming is available via event loops: `AnyEvent`, `IO::Async`, and `Mojo::IOLoop` (from the Mojolicious framework). The `Future::AsyncAwait` CPAN module adds `async`/`await` keywords backed by coroutines.

## Example

```perl
use strict;
use warnings;

# Future::AsyncAwait (CPAN)
use Future::AsyncAwait;
use IO::Async::Loop;

my $loop = IO::Async::Loop->new;

async sub fetch_data {
    my ($url) = @_;
    my $http = await $loop->new_future;  # simplified
    return $http;
}

async sub main {
    my $result = await fetch_data("https://example.com");
    print "Got: $result\n";
}

$loop->run;

# Mojo::IOLoop for async I/O
use Mojo::IOLoop;
use Mojo::UserAgent;

my $ua = Mojo::UserAgent->new;
Mojo::IOLoop->start unless Mojo::IOLoop->is_running;

$ua->get_p("https://example.com")
   ->then(sub { print $_[0]->result->body })
   ->catch(sub { warn "Error: $_[0]" })
   ->finally(sub { Mojo::IOLoop->stop });

Mojo::IOLoop->start;
```

## Gotchas

- `Future::AsyncAwait` requires `Future` objects — not all CPAN modules return futures
- Unlike JavaScript, Perl async is not baked into the runtime; you must choose and commit to an event loop
- Mixing blocking and non-blocking code in an event loop freezes the loop — use async variants of all I/O
