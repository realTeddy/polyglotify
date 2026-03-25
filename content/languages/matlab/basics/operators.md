---
title: "Operators"
language: "matlab"
feature: "operators"
category: "basics"
applicable: true
---

MATLAB operators work on matrices by default. Element-wise versions of `*`, `/`, `^`, and `\` are prefixed with `.` (e.g., `.*`, `./`). The `'` operator transposes a matrix (conjugate for complex); `.'` is non-conjugate transpose. Logical operators `&`, `|`, `~` work element-wise; `&&`, `||` are short-circuit scalars.

## Example

```matlab
% Arithmetic (matrix operations)
A = [1 2; 3 4];
B = [5 6; 7 8];

C = A + B          % element-wise addition
D = A * B          % matrix multiplication
E = A .* B         % element-wise multiplication
F = A .^ 2         % element-wise squaring
G = A / B          % matrix right division (A * inv(B))
H = A ./ B         % element-wise division

% Scalar arithmetic
x = 10;
y = 3;
disp(x + y)   % 13
disp(x / y)   % 3.333...
disp(mod(x, y))  % 1 (modulo)

% Relational operators (return logical array)
v = [1 5 3 8 2];
v > 3         % [0 1 0 1 0]
v == 5        % [0 1 0 0 0]

% Logical
~true         % false  (NOT)
true & false  % false  (AND, element-wise)
true | false  % true   (OR, element-wise)
true && false % false  (short-circuit AND, scalars only)

% String concatenation
s = ['Hello' ', ' 'World'];   % char arrays
s2 = "Hello" + " World";     % strings (actually numeric — use strcat or +)
s3 = strcat("Hello", " World");

% Colon operator (range)
r = 1:5        % [1 2 3 4 5]
r2 = 0:0.5:2   % [0 0.5 1 1.5 2]
```

## Gotchas

- `*` is matrix multiplication, NOT element-wise. Forgetting `.* ` is a very common error.
- `'` (single quote transpose) conjugates complex numbers. Use `.'` for non-conjugate transpose.
- `==` on floating-point values is unreliable — use `abs(a - b) < tol` for comparisons.
- `+` on `string` arrays does numeric addition, not concatenation — use `+` only for `char` arrays, or use `strcat`.
