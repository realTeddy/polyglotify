---
title: "Classes"
language: "erlang"
feature: "classes"
category: "oop"
applicable: false
---

Erlang has no classes. It is a functional, actor-model language. The idiomatic equivalent is a **module** that defines functions operating on data structures (records or maps). For stateful objects, an **OTP GenServer** process encapsulates state and exposes a message-based API, achieving encapsulation without classes.

## Example

```erlang
%% Idiomatic alternative: a module acting as a "class"
-module(counter).
-export([new/0, new/1, increment/1, get/1]).

-record(counter, {value = 0 :: integer()}).

new()    -> #counter{}.
new(N)   -> #counter{value = N}.

increment(#counter{value = V} = C) ->
    C#counter{value = V + 1}.

get(#counter{value = V}) -> V.

%% Usage in another module:
%% C0 = counter:new(),
%% C1 = counter:increment(C0),
%% counter:get(C1).  %% => 1
```

## Gotchas

- State is passed explicitly — functions return updated copies of data, not mutated objects.
- For long-lived mutable state, use a `gen_server` process; it holds state in a loop and handles calls/casts.
- OTP behaviours (`gen_server`, `gen_statem`, `supervisor`) provide the structure that classes provide in OOP languages.
