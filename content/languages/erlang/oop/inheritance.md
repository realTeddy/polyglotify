---
title: "Inheritance"
language: "erlang"
feature: "inheritance"
category: "oop"
applicable: false
---

Erlang has no inheritance. Code reuse is achieved through **module composition**, **behaviours** (similar to interfaces with callbacks), and higher-order functions. OTP behaviours like `gen_server` define a set of required callbacks that a module must implement, providing a form of polymorphism without inheritance hierarchies.

## Example

```erlang
%% OTP behaviour as the idiomatic alternative to inheritance
-module(my_server).
-behaviour(gen_server).

%% "Implementing" the gen_server interface
-export([init/1, handle_call/3, handle_cast/2, handle_info/2,
         terminate/2, code_change/3]).
-export([start_link/0, get_count/0, increment/0]).

start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

get_count() -> gen_server:call(?MODULE, get).
increment()  -> gen_server:cast(?MODULE, increment).

init([])                              -> {ok, 0}.
handle_call(get, _From, State)        -> {reply, State, State}.
handle_cast(increment, State)         -> {noreply, State + 1}.
handle_info(_Info, State)             -> {noreply, State}.
terminate(_Reason, _State)            -> ok.
code_change(_OldVsn, State, _Extra)   -> {ok, State}.
```

## Gotchas

- Behaviours enforce a callback contract at compile time; missing callbacks produce warnings.
- Code reuse happens via composition: call functions from another module explicitly.
- There is no method overriding; each module provides its own implementation of the callback.
