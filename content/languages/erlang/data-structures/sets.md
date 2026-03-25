---
title: "Sets"
language: "erlang"
feature: "sets"
category: "data-structures"
applicable: true
---

Erlang has two set implementations in the standard library: `sets` (based on hash sets, OTP 24+ uses a map internally) and `ordsets` (sorted lists, O(n) for most operations but preserves order and is easier to pattern-match). Both are immutable. Use `sets` for better average-case performance and `ordsets` when a sorted representation is needed.

## Example

```erlang
-module(sets_demo).
-export([run/0]).

run() ->
    %% Create
    S1 = sets:from_list([1, 2, 3, 4, 5]),
    S2 = sets:from_list([3, 4, 5, 6, 7]),

    %% Membership
    io:format("Member: ~p~n", [sets:is_element(3, S1)]),

    %% Add / remove
    S3 = sets:add_element(10, S1),
    S4 = sets:del_element(1, S3),

    %% Set operations
    Union   = sets:union(S1, S2),
    Inter   = sets:intersection(S1, S2),
    Diff    = sets:subtract(S1, S2),

    io:format("Union: ~p~n",        [lists:sort(sets:to_list(Union))]),
    io:format("Intersection: ~p~n", [lists:sort(sets:to_list(Inter))]),
    io:format("Difference: ~p~n",   [lists:sort(sets:to_list(Diff))]),

    %% ordsets — sorted list-based set
    OS = ordsets:from_list([3, 1, 4, 1, 5, 9, 2]),
    io:format("Ordset: ~p~n", [OS]).
```

## Gotchas

- `sets:to_list/1` returns elements in an unspecified order; sort if a deterministic order is needed.
- The internal representation of `sets` changed in OTP 24; avoid pattern-matching on the raw structure.
- For small sets used as bit flags, atoms in a list or a map `#{flag => true}` is often simpler.
