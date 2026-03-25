---
title: "Result Types"
language: "matlab"
feature: "result-types"
category: "error-handling"
applicable: false
---

MATLAB has no Result type. The idiomatic alternatives are: using `try/catch` for exception-based error handling, returning `(value, success_flag)` pairs from functions, or returning sentinel values (`NaN`, `[]`, `-1`) to indicate failure. MATLAB's style leans toward exceptions for errors.

## Example

```matlab
% Pattern 1: (value, ok) pair
function [result, ok, msg] = safe_divide(a, b)
    if b == 0
        result = NaN;
        ok  = false;
        msg = 'Division by zero';
        return
    end
    result = a / b;
    ok  = true;
    msg = '';
end

[r, ok, msg] = safe_divide(10, 0);
if ~ok
    fprintf('Error: %s\n', msg)
else
    fprintf('Result: %g\n', r)
end

% Pattern 2: NaN as sentinel
function result = safe_log(x)
    if x <= 0
        result = NaN;
        return
    end
    result = log(x);
end

y = safe_log(-1);
if isnan(y)
    disp('Invalid input')
end

% Pattern 3: empty [] as "no result"
function result = find_first(v, target)
    idx = find(v == target, 1);
    if isempty(idx)
        result = [];
    else
        result = v(idx);
    end
end
```

## Gotchas

- MATLAB's convention is to use exceptions (`error`) for truly exceptional conditions and sentinel values for expected missing data.
- `NaN` propagates through arithmetic, so `isnan` checks naturally bubble up — useful but can hide bugs.
- `[]` (empty matrix) is MATLAB's `null`/`None` — many built-in functions return `[]` on failure.
- There is no compiler-enforced result handling — forgetting to check `ok` or `isnan` silently propagates bad data.
