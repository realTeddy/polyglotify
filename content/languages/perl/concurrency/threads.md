---
title: "Threads"
language: "perl"
feature: "threads"
category: "concurrency"
applicable: true
---

Perl supports threads via the `threads` module (interpreter-level threads). Data is not shared by default; the `threads::shared` module enables shared variables. However, Perl threads are heavyweight (each copies the interpreter state) and `fork()` is generally preferred on Unix systems.

## Example

```perl
use strict;
use warnings;
use threads;
use threads::shared;

# Shared variable
my $counter :shared = 0;
my $mutex = shared_clone({});

# Create threads
my @workers = map {
    threads->create(sub {
        for (1..100) {
            lock($counter);     # acquire lock
            $counter++;
        }
    });
} 1..4;

# Wait for all threads
$_->join() for @workers;
print "Counter: $counter\n";   # => 400

# Thread with return value
my $t = threads->create(sub {
    sleep(1);
    return 42;
});
my $result = $t->join();
print "Result: $result\n";

# fork() — preferred on Unix
my $pid = fork();
if ($pid == 0) {
    # Child process
    print "Child: $$\n";
    exit 0;
} else {
    # Parent process
    waitpid($pid, 0);
    print "Parent done\n";
}
```

## Gotchas

- Perl `threads` copies the entire interpreter per thread — creating many threads is expensive
- `lock()` on a shared variable serializes access; unlocking happens automatically when the variable goes out of scope
- `fork()` is more efficient than `threads` on Unix but does not work on Windows
