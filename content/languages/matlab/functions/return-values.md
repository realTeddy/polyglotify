---
title: "Return Values"
language: "matlab"
feature: "return-values"
category: "functions"
applicable: true
---

MATLAB functions return values by assigning to the named output variables declared in the function signature. Multiple outputs are listed in `[out1, out2, ...]`. The caller uses `~` to discard specific outputs. The `return` statement exits the function early (but does not specify a value — outputs are whatever was assigned).

## Example

```matlab
% Single output
function result = double_it(x)
    result = x * 2;
end

% Multiple outputs
function [sorted_v, idx] = sort_with_index(v)
    [sorted_v, idx] = sort(v);
end

% Variable number of outputs with nargout
function varargout = flexible(x)
    varargout{1} = x;
    if nargout > 1
        varargout{2} = x^2;
    end
    if nargout > 2
        varargout{3} = x^3;
    end
end

% Early return
function result = safe_sqrt(x)
    if x < 0
        result = NaN;
        return        % exits function here
    end
    result = sqrt(x);
end
```

```matlab
% Calling conventions
y = double_it(5)               % 10
[s, i] = sort_with_index([3 1 2])

% Discard with ~
[~, idx] = sort([5 2 8 1])     % only get idx, not sorted values

a = flexible(3)        % just x
[a, b] = flexible(3)   % x and x^2
[a, b, c] = flexible(3) % x, x^2, x^3
```

## Gotchas

- MATLAB does not use `return value` — outputs are assigned to the named output variables in the signature.
- `return` exits the function early; unassigned output variables cause an error if the caller requested them.
- `nargout` lets the function adapt to how many outputs the caller requested — use it to avoid unnecessary computation.
- `~` discards specific outputs: `[~, idx] = sort(v)` gets only the index.
