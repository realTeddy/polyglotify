---
title: "Control Flow"
language: "matlab"
feature: "control-flow"
category: "basics"
applicable: true
---

MATLAB provides `if/elseif/else/end`, `for`/`while`/`end` loops, `switch/case/otherwise/end`, and `break`/`continue`/`return`. All blocks end with `end`. The `for` loop iterates over columns of a matrix. `while` loops support `break` and `continue`. There is no `do/while`.

## Example

```matlab
% if / elseif / else
x = 42;
if x > 100
    disp('big')
elseif x > 10
    disp('medium')
else
    disp('small')
end

% for loop (iterates over columns)
total = 0;
for i = 1:5
    total = total + i;
end
disp(total)  % 15

% for over matrix columns
M = [1 2 3; 4 5 6];
for col = M
    disp(col)  % each column as a vector
end

% while loop
n = 1;
while n < 100
    n = n * 2;
end
disp(n)  % 128

% break and continue
for k = 1:10
    if k == 3, continue, end
    if k == 7, break, end
    fprintf('%d ', k)
end

% switch / case
lang = 'MATLAB';
switch lang
    case 'Python'
        disp('python')
    case {'MATLAB', 'Octave'}
        disp('matlab or octave')
    otherwise
        disp('unknown')
end
```

## Gotchas

- All control blocks must end with `end` — missing `end` is a common syntax error.
- `for i = matrix` iterates over **columns** of the matrix, not rows or elements.
- `switch` uses `==` equality by default; it supports cell arrays of values in a `case` (e.g., `case {'a', 'b'}`).
- MATLAB has no `do/while` — simulate with `while true ... if cond, break, end ... end`.
