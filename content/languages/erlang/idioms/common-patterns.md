---
title: "Common Patterns"
language: "erlang"
feature: "common-patterns"
category: "idioms"
applicable: true
---

Erlang idioms center on the actor model and functional style: "let it crash" (rely on supervisors rather than defensive error handling), tagged tuples for results, tail-recursive loops, message-passing state machines, and list comprehensions. OTP design patterns — GenServer, Supervisor, GenStatem — are the standard vocabulary for concurrent applications.

## Example

```erlang
-module(patterns_demo).
-export([run/0]).

%% 1. Accumulator pattern (functional loop)
sum([], Acc)    -> Acc;
sum([H|T], Acc) -> sum(T, Acc + H).

%% 2. Transform and filter in one comprehension
active_names(Users) ->
    [Name || #{name := Name, active := true} <- Users].

%% 3. Pipeline via variable binding (no pipe operator)
pipeline(Input) ->
    Step1 = lists:map(fun(X) -> X * 2 end, Input),
    Step2 = lists:filter(fun(X) -> X > 4 end, Step1),
    lists:sort(Step2).

%% 4. Idiomatic error propagation
do_work(Input) ->
    case validate(Input) of
        {ok, V}      -> process(V);
        {error, _}=E -> E
    end.

validate(X) when X > 0 -> {ok, X};
validate(_)             -> {error, invalid}.

process(X) -> {ok, X * 10}.

run() ->
    io:format("Sum: ~p~n",      [sum([1,2,3,4,5], 0)]),
    Users = [#{name => "Alice", active => true},
             #{name => "Bob",   active => false}],
    io:format("Active: ~p~n",   [active_names(Users)]),
    io:format("Pipeline: ~p~n", [pipeline([1,2,3,4,5])]),
    io:format("Work: ~p~n",     [do_work(7)]).
```

## Gotchas

- Always use tail-recursive functions for loops over large data; non-tail recursion will overflow the stack.
- The "let it crash" philosophy applies to *unexpected* errors; expected failures should still return `{error, Reason}`.
- Avoid accumulating results in global state; pass accumulators as function parameters.
