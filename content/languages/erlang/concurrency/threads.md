---
title: "Threads"
language: "erlang"
feature: "threads"
category: "concurrency"
applicable: false
---

Erlang has no OS threads exposed to the programmer. Instead, it has **processes** — extremely lightweight green threads scheduled by the BEAM VM. Erlang processes share no memory, communicate only via message passing, and can number in the millions on a single machine. The BEAM scheduler maps these processes onto OS threads (schedulers) transparently.

## Example

```erlang
-module(process_demo).
-export([run/0, worker/2]).

worker(Parent, Id) ->
    io:format("Worker ~p started~n", [Id]),
    timer:sleep(100),
    Parent ! {done, Id}.

run() ->
    Parent = self(),

    %% Spawn 5 concurrent processes
    Pids = [spawn(fun() -> worker(Parent, I) end) || I <- lists:seq(1, 5)],

    %% Wait for all to finish
    lists:foreach(fun(_) ->
        receive
            {done, Id} -> io:format("Worker ~p finished~n", [Id])
        end
    end, Pids),

    %% Process info
    io:format("Total processes: ~p~n", [length(processes())]).
```

## Gotchas

- Erlang processes are isolated — a crash in one process does not affect others unless linked.
- Use `spawn_link/1` or `spawn_monitor/1` to detect crashes in spawned processes.
- Process IDs (PIDs) are only valid for the lifetime of the process; storing them long-term requires care.
