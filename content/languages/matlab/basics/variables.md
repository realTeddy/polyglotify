---
title: "Variables & Declaration"
language: "matlab"
feature: "variables"
category: "basics"
applicable: true
---

MATLAB variables require no declaration or type annotation — they are created by assignment. The workspace holds all variables in scope. By default, everything is a `double` matrix. MATLAB is dynamically typed and case-sensitive. The `clear` command removes variables; `whos` lists all workspace variables with types and sizes.

## Example

```matlab
% Basic assignment — no declaration needed
x = 42;          % scalar double
name = 'Alice';  % character array (old-style string)
msg = "Hello";   % string (double-quoted, newer MATLAB)

% Suppressing output with semicolon
y = 3.14;        % silent assignment
z = x + y        % prints: z = 45.14 (no semicolon)

% Multiple assignment from function
[mn, mx] = bounds([3 1 4 1 5 9]);

% Logical
flag = true;
result = x > 10;  % true

% Clear variables
clear x y
whos              % list remaining variables

% Persistent (in functions — survives between calls)
function count()
    persistent n
    if isempty(n)
        n = 0;
    end
    n = n + 1;
    disp(n)
end
```

## Gotchas

- MATLAB is case-sensitive: `X` and `x` are different variables.
- Omitting the semicolon `;` prints the result to the console — a common source of slow scripts (output is expensive).
- Variables persist in the workspace between script runs in the same session. Use `clear all` to reset.
- `ans` is a built-in variable that holds the last unassigned expression result.
