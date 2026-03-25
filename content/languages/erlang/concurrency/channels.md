---
title: "Channels & Message Passing"
language: "erlang"
feature: "channels"
category: "concurrency"
applicable: true
---

Message passing is Erlang's core concurrency primitive. Every process has a mailbox. The `!` operator sends a message asynchronously. `receive` blocks until a matching message arrives. Messages can be any Erlang term. Unlike Go channels, Erlang mailboxes are unbounded and associated with a process, not a separate object.

## Example

```erlang
-module(messages_demo).
-export([run/0, echo_server/0]).

echo_server() ->
    receive
        {echo, From, Msg} ->
            From ! {reply, Msg},
            echo_server();
        stop ->
            ok
    end.

run() ->
    %% Start the echo server process
    Server = spawn(fun echo_server/0),

    %% Send a message
    Server ! {echo, self(), "hello"},

    %% Receive the reply
    receive
        {reply, Msg} ->
            io:format("Got: ~s~n", [Msg])
    after 1000 ->
        io:format("Timeout~n")
    end,

    %% Stop the server
    Server ! stop,

    %% Send to multiple processes with selective receive
    [spawn(fun() ->
        self() ! {self(), N * N},
        receive
            {Pid, Sq} when Pid =:= self() ->
                io:format("Square of ~p = ~p~n", [N, Sq])
        end
    end) || N <- [2, 3, 4]].
```

## Gotchas

- Messages are delivered in order from a single sender but not across multiple senders.
- The `after` clause in `receive` sets a timeout in milliseconds; use `0` for a non-blocking poll.
- Unmatched messages accumulate in the mailbox; a full mailbox causes memory issues.
