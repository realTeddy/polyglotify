---
title: "Channels & Message Passing"
language: "vlang"
feature: "channels"
category: "concurrency"
applicable: true
---

V channels are typed, buffered or unbuffered, and use `<-` for send/receive. `chan T{cap: N}` creates a buffered channel of capacity N. Unbuffered channels synchronize sender and receiver. `select` waits on multiple channels. `ch.close()` closes a channel; receiving from a closed channel returns the zero value.

## Example

```v
fn producer(ch chan int) {
    for i in 0..5 {
        ch <- i       // send
    }
    ch.close()
}

fn main() {
    // Buffered channel
    ch := chan int{cap: 10}
    go producer(ch)

    // Receive until closed
    for {
        val := <-ch or { break }
        print('$val ')
    }
    println('')

    // Unbuffered rendezvous
    ping := chan string{}
    pong := chan string{}

    go fn [ping, pong]() {
        msg := <-ping
        pong <- msg + '-pong'
    }()

    ping <- 'ping'
    println(<-pong)  // ping-pong

    // Select
    ch1 := chan string{cap: 1}
    ch2 := chan string{cap: 1}
    ch1 <- 'one'

    select {
        msg := <-ch1 { println('from ch1: $msg') }
        msg := <-ch2 { println('from ch2: $msg') }
        else { println('no message ready') }
    }
}
```

## Gotchas

- Receiving from a closed, empty channel returns the zero value of the type; use `or { break }` to detect closure.
- `select` in V requires at least one channel operation; the `else` branch handles the case where no channel is immediately ready.
- Sending to a closed channel panics; close channels only from the producer side.
