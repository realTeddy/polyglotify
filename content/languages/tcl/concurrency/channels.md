---
title: "Channels & Message Passing"
language: "tcl"
feature: "channels"
category: "concurrency"
applicable: true
---

In Tcl, "channel" is also the term for I/O streams (files, sockets, pipes), but for inter-thread communication the `Thread` package provides `thread::queue` — a thread-safe FIFO message queue. Threads can also communicate via `thread::send` (remote script execution) and `tsv` (shared variables). Tcl's event-driven model with `fileevent` handles async I/O channels.

## Example

```tcl
package require Thread

# ---- Thread message queue (channel equivalent) ----
# Producer thread
set producer [thread::create {
    package require Thread
    proc run {consumerTid} {
        for {set i 0} {$i < 5} {incr i} {
            thread::send $consumerTid [list receiveMsg $i]
            after 10
        }
        thread::send $consumerTid {receiveMsg done}
    }
    thread::wait
}]

# Consumer in main thread
set received {}
proc receiveMsg {val} {
    global received
    if {$val eq "done"} {
        set ::finished 1
    } else {
        lappend received $val
    }
}

thread::send -async $producer [list run [thread::id]]
vwait ::finished
puts "Received: $received"   ;# Received: 0 1 2 3 4
thread::release $producer

# ---- I/O channel: pipe-based communication ----
set pipe [open "|echo hello from pipe" r]
set line [gets $pipe]
close $pipe
puts $line   ;# hello from pipe

# ---- Socket as a channel ----
# Server
set srv [socket -server acceptConn 0]
set port [lindex [fconfigure $srv -sockname] 2]

proc acceptConn {sock addr port} {
    puts $sock "Hello, $addr!"
    close $sock
}

# Client connects
set cli [socket localhost $port]
puts [gets $cli]
close $cli
close $srv
```

## Gotchas

- "Channel" in Tcl primarily means an I/O channel (file/socket/pipe handle); inter-thread message queues are a separate concept via `thread::send` and `tsv`.
- `vwait` enters a nested event loop — use it carefully; in Tk applications, the event loop is already running.
- Socket channels are non-blocking when used with `fileevent` — configure with `fconfigure $sock -blocking 0` for async I/O.
- `thread::send` delivers scripts to be `eval`'d in the target thread — ensure scripts are safe and properly quoted to avoid injection.
