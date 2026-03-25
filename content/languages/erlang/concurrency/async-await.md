---
title: "Async/Await"
language: "erlang"
feature: "async-await"
category: "concurrency"
applicable: false
---

Erlang has no async/await syntax. Erlang's concurrency model is based on lightweight **processes** and **message passing** (the actor model). Every process runs concurrently by default. The equivalent of async/await is spawning a process and waiting for a message reply using `receive` — this is the fundamental building block rather than a special syntax.

## Example

```erlang
-module(async_demo).
-export([run/0]).

%% Spawn a concurrent task and collect its result via message
async_task(Caller, N) ->
    %% Simulate work
    Result = N * N,
    Caller ! {result, self(), Result}.

run() ->
    Parent = self(),

    %% Spawn multiple concurrent "tasks"
    Pids = [spawn(fun() -> async_task(Parent, N) end)
            || N <- [1, 2, 3, 4, 5]],

    %% Collect results (like await)
    Results = [receive
                   {result, _Pid, R} -> R
               after 5000 -> timeout
               end
               || _ <- Pids],

    io:format("Results: ~p~n", [Results]).
```

## Gotchas

- Erlang processes are cheap (sub-microsecond spawn time); create them freely unlike OS threads.
- `receive` blocks the current process but not the Erlang scheduler — other processes continue.
- For structured async patterns, use `gen_server:call` (synchronous RPC) or `rpc:async_call/4` from the `rpc` module.
