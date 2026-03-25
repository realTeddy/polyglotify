---
title: "Async/Await"
language: "tcl"
feature: "async-await"
category: "concurrency"
applicable: false
---

Tcl has no `async`/`await` keywords. Tcl's event-driven model (`vwait`, `after`, `fileevent`, `socket`) provides asynchronous I/O without explicit async/await syntax. Tcl 8.6 coroutines (`coroutine`, `yield`) enable async-like cooperative multitasking. The Tcl event loop (via `vwait` or Tk's event loop) is the backbone of async I/O.

## Example

```tcl
# Event-driven async I/O — callback style
proc onReadable {sock} {
    set line [gets $sock]
    if {[eof $sock]} {
        fileevent $sock readable {}
        close $sock
        puts "Connection closed"
        set ::done 1
    } else {
        puts "Received: $line"
    }
}

# Simulating async with after (setTimeout equivalent)
proc delayedPrint {msg ms} {
    after $ms [list puts $msg]
}
delayedPrint "Hello after 500ms" 500
delayedPrint "Hello after 1s"   1000

# Coroutine-based async (Tcl 8.6+)
proc asyncTask {name steps} {
    for {set i 1} {$i <= $steps} {incr i} {
        puts "$name: step $i"
        yield   ;# cooperatively yield to the scheduler
    }
}

proc scheduler {tasks} {
    set running 1
    while {$running} {
        set running 0
        foreach t $tasks {
            if {[info commands $t] ne ""} {
                catch {$t}   ;# resume coroutine
                set running 1
            }
        }
    }
}

coroutine task1 asyncTask "A" 3
coroutine task2 asyncTask "B" 2
scheduler {task1 task2}

# vwait — wait for a global variable to be set (event loop)
# after 1000 {set ::result "done"}
# vwait ::result
# puts $::result
```

## Gotchas

- Tcl's event loop is single-threaded; blocking operations (long `expr`, file I/O without `fileevent`) stall all callbacks.
- `after 0 script` schedules a callback for "as soon as possible" — useful for yielding control without a delay.
- Coroutines in Tcl are not OS threads; they run cooperatively on the single event-loop thread.
- `vwait` enters a nested event loop — using it inside a callback can cause re-entrancy bugs; prefer coroutine-based designs.
