---
title: "Channels & Message Passing"
language: "dlang"
feature: "channels"
category: "concurrency"
applicable: true
---

D does not have Go-style typed channels as a built-in, but `std.concurrency` provides a mailbox-based message-passing system via `send` and `receive`. Each thread/fiber has an implicit mailbox. For typed buffered channels, the community library `std.experimental.checkedint` or third-party `dchan` can be used. `std.concurrency`'s `receiveOnly!T` is the closest equivalent to a typed channel receive.

## Example

```d
import std.stdio;
import std.concurrency;

// Producer: sends integers to a consumer
void producer(Tid consumer, int count)
{
    foreach (i; 0..count)
        send(consumer, i);
    send(consumer, -1);  // sentinel
}

// Consumer: receives and processes
void consumer(Tid main_)
{
    int total = 0;
    while (true)
    {
        int val = receiveOnly!int();
        if (val < 0) break;
        total += val;
    }
    send(main_, total);
}

void main()
{
    Tid cons = spawn(&consumer, thisTid);
    spawn(&producer, cons, 5);   // sends 0,1,2,3,4 then -1

    int result = receiveOnly!int();
    writeln("Sum: ", result);    // Sum: 10

    // Selective receive with a timeout
    bool gotMsg = receiveTimeout(
        dur!"msecs"(100),
        (string s) { writeln("String: ", s); }
    );
    writeln("Got message: ", gotMsg);  // false (timeout)
}
```

## Gotchas

- Only `immutable`, value types, or `shared` objects can be sent — sending a non-`shared` class reference is a compile error.
- `receiveOnly!T` throws `MessageMismatch` if the next message is not of type `T`; use `receive` with multiple handlers for type-discriminated dispatch.
- There is no built-in buffered channel; the mailbox is unbounded by default (configurable with `setMaxMailboxSize`).
- `receiveTimeout` returns `false` on timeout, `true` if a message was processed.
