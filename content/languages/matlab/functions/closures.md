---
title: "Closures & Lambdas"
language: "matlab"
feature: "closures"
category: "functions"
applicable: true
---

MATLAB supports anonymous functions using the `@(args) expr` syntax. These are closures — they capture variables from the surrounding workspace at the time of creation (by value). Anonymous functions can only contain a single expression. For multi-statement lambdas, use a local function or `@(x) deal(...)` tricks.

## Example

```matlab
% Anonymous function (lambda)
square = @(x) x.^2;
disp(square(5))      % 25
disp(square([1 2 3]))  % [1 4 9]

% Closure capturing a variable
a = 10;
add_a = @(x) x + a;
disp(add_a(5))   % 15
a = 99;          % changing a does NOT affect the closure
disp(add_a(5))   % still 15 — captured at creation time

% Higher-order functions
apply = @(f, x) f(x);
disp(apply(square, 4))   % 16

% Function composition
double = @(x) x * 2;
inc    = @(x) x + 1;
double_then_inc = @(x) inc(double(x));
disp(double_then_inc(5))  % 11

% Using with arrayfun / cellfun
nums = 1:5;
results = arrayfun(square, nums)  % [1 4 9 16 25]

% Passing anonymous functions
data = {1, 4, 9, 16};
roots = cellfun(@sqrt, data)  % [1 2 3 4]

% Function handle to named function
f_handle = @sqrt;
disp(f_handle(16))  % 4
```

## Gotchas

- Anonymous functions capture variables **by value at creation time** — later changes to captured variables do not affect the closure.
- Anonymous functions are limited to a **single expression** — use local functions for multi-statement logic.
- `@functionname` creates a handle to an existing function without creating a closure.
- `arrayfun` and `cellfun` apply a function to each element but are often slower than vectorized operations. Prefer vectorization.
