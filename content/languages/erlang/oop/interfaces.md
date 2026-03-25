---
title: "Interfaces & Traits"
language: "erlang"
feature: "interfaces"
category: "oop"
applicable: false
---

Erlang has no interfaces or traits in the OOP sense. The equivalent is the **behaviour** mechanism: a module declares a set of callback functions that implementing modules must export. At compile time, Erlang warns if a callback is missing. This provides a lightweight contract similar to an interface.

## Example

```erlang
%% Define a behaviour (like an interface)
-module(shape).
-callback area(term()) -> float().
-callback perimeter(term()) -> float().

%% ---- Implementing module ----
-module(circle).
-behaviour(shape).
-export([area/1, perimeter/1]).

area({circle, R})      -> math:pi() * R * R.
perimeter({circle, R}) -> 2 * math:pi() * R.

%% ---- Another implementing module ----
-module(rectangle).
-behaviour(shape).
-export([area/1, perimeter/1]).

area({rect, W, H})      -> W * H.
perimeter({rect, W, H}) -> 2 * (W + H).

%% ---- Polymorphic dispatch via pattern or explicit module ----
%% area(circle, {circle, 5.0})  -> circle:area({circle, 5.0})
```

## Gotchas

- Erlang's behaviours don't provide runtime polymorphism automatically; you dispatch to a specific module explicitly or store the module name as data.
- The `-callback` attribute defines the contract; `-behaviour(ModName)` opts a module into that contract.
- No default implementations exist; each implementing module must define all callbacks.
