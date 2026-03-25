---
title: "Arrays & Lists"
language: "prolog"
feature: "arrays"
category: "data-structures"
applicable: true
---

Prolog's primary sequential structure is the **list**, represented as a recursive compound term. A list is either `[]` (empty) or `[Head|Tail]` where Tail is a list. There are no mutable arrays. SWI-Prolog provides `library(lists)` with predicates like `length`, `nth0`, `nth1`, `append`, `reverse`, `sort`, `msort`, etc.

## Example

```prolog
:- use_module(library(lists)).
:- initialization(main, main).

main :-
    % List construction
    L1 = [1, 2, 3, 4, 5],
    L2 = [a, b | L1],    % prepend: [a,b,1,2,3,4,5]

    % Pattern matching
    [H | T] = L1,
    format("head=~w, tail=~w~n", [H, T]),   % 1, [2,3,4,5]

    % Access by index (0-based: nth0, 1-based: nth1)
    nth0(2, L1, Elem0),   % Elem0 = 3
    nth1(2, L1, Elem1),   % Elem1 = 2
    format("~w ~w~n", [Elem0, Elem1]),

    % Common operations
    length(L1, Len),       % 5
    append([1,2], [3,4], App),  % [1,2,3,4]
    reverse(L1, Rev),      % [5,4,3,2,1]
    sort(L1, Sorted),      % sorted + deduplicated
    last(L1, Last),        % 5
    flatten([1,[2,[3]],4], Flat),   % [1,2,3,4]

    % Membership
    ( member(3, L1) -> write(found) ; write(not_found) ), nl,

    % Generate and test
    findall(X, (member(X, L1), X > 2), BigOnes),
    write(BigOnes), nl,    % [3,4,5]

    write(Len), nl,
    write(Rev), nl,
    write(Sorted), nl.
```

## Gotchas

- Lists are **singly-linked** — random access (`nth0`) is O(n). Prefer head/tail patterns.
- `sort/2` removes duplicates; use `msort/2` to sort while keeping duplicates.
- `append/3` is bidirectional — `append(X, Y, [1,2,3])` generates all ways to split the list.
- Difference lists and DCGs are advanced patterns for efficient list construction (avoiding repeated `append`).
