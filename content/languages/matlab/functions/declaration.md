---
title: "Function Declaration"
language: "matlab"
feature: "declaration"
category: "functions"
applicable: true
---

MATLAB functions are declared with the `function` keyword. Each function lives either in its own `.m` file (the file name must match the function name) or as a local/nested function inside another file. Functions support multiple output arguments. Scripts and functions share the same `.m` extension but scripts have no `function` declaration.

## Example

```matlab
% myfile.m — file must be named myfile.m for the primary function
function result = square(x)
    result = x .^ 2;
end

% Multiple outputs
function [mn, mx, avg] = stats(v)
    mn  = min(v);
    mx  = max(v);
    avg = mean(v);
end

% Function with no output
function print_greeting(name)
    fprintf('Hello, %s!\n', name);
end

% Local function in same file (only accessible within this file)
function y = helper(x)
    y = x + 1;
end
```

```matlab
% Usage (in another script or the Command Window)
s = square(5)          % 25
[lo, hi, av] = stats([3 1 4 1 5 9 2 6])
print_greeting('Alice')
```

## Gotchas

- The primary function in a `.m` file must have the same name as the file — a mismatch causes a warning or error.
- Local functions (defined after the primary function in the same file) are not accessible from outside that file.
- Nested functions (defined inside another function's body) have access to the outer function's workspace — different from local functions.
- MATLAB functions do not have access to the calling workspace variables unless passed as arguments.
