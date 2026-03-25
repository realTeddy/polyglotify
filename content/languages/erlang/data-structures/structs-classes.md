---
title: "Structs & Classes"
language: "erlang"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

Erlang has no structs or classes. The idiomatic alternatives are **records** (compile-time macros over tuples with named fields) and **maps** (dynamic key-value stores). Records provide field names and pattern-matching sugar at compile time. Maps are more flexible and preferred in modern code. Neither supports methods — behavior is encoded in modules that operate on the data.

## Example

```erlang
-module(records_demo).
-export([run/0]).

%% Record definition (compile-time macro)
-record(person, {
    name    :: string(),
    age     :: non_neg_integer(),
    email   = "" :: string()   % default value
}).

run() ->
    %% Create
    Alice = #person{name = "Alice", age = 30},
    Bob   = #person{name = "Bob",   age = 25, email = "bob@example.com"},

    %% Access fields
    io:format("~s is ~p~n", [Alice#person.name, Alice#person.age]),

    %% Update (returns new record)
    Alice2 = Alice#person{age = 31},
    io:format("Updated age: ~p~n", [Alice2#person.age]),

    %% Pattern match
    #person{name = Name, email = Email} = Bob,
    io:format("~s: ~s~n", [Name, Email]).
```

## Gotchas

- Records are syntactic sugar over tuples; the tag `person` is stored as the first tuple element.
- Record definitions must be included in every module that uses them (via `-include` or `-include_lib`).
- Maps are preferred in new code because they don't require compile-time definitions and are introspectable at runtime.
