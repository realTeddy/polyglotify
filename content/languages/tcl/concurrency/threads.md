---
title: "Threads"
language: "tcl"
feature: "threads"
category: "concurrency"
applicable: true
---

Tcl supports threads via the `Thread` package (often bundled with Tcl distributions). Each thread has its own interpreter and variable namespace; variables are NOT shared between threads by default. Communication uses thread IDs, `thread::send` (to execute a script in another thread), shared variables via `tsv` (thread-shared variables), and message queues via `thread::queue`.

## Example

```tcl
package require Thread

# Create a worker thread
set tid [thread::create {
    proc doWork {n} {
        set result 0
        for {set i 1} {$i <= $n} {incr i} {
            incr result $i
        }
        return $result
    }
    thread::wait   ;# keep thread alive, waiting for work
}]

# Send work synchronously (blocks until done)
set result [thread::send $tid {doWork 100}]
puts "Sum 1..100 = $result"   ;# Sum 1..100 = 5050

# Send work asynchronously
thread::send -async $tid {doWork 1000} myVar
# ... do other work ...
thread::wait   ;# (in scripts, not this example)

# Thread-shared variables (tsv)
tsv::set shared counter 0

set workers {}
for {set i 0} {$i < 4} {incr i} {
    lappend workers [thread::create {
        package require Thread
        for {set j 0} {$j < 100} {incr j} {
            tsv::incr shared counter
        }
        thread::wait
    }]
}

# Wait for all workers to finish
foreach w $workers {
    thread::send $w {thread::exit}
    thread::join $w
}

puts "Counter: [tsv::get shared counter]"   ;# 400

# Clean up
thread::release $tid
```

## Gotchas

- Each Tcl thread has a completely isolated interpreter; global variables are NOT shared — use `tsv` for shared state.
- `thread::send` without `-async` blocks the calling thread; with `-async`, the result is stored in a named variable when ready.
- `thread::wait` is required in worker thread scripts to keep the thread alive to receive more `thread::send` calls.
- The `Thread` package must be installed; it is not part of the core Tcl distribution on all platforms.
