---
title: "Types & Type Systems"
language: "matlab"
feature: "types"
category: "basics"
applicable: true
---

MATLAB is dynamically typed. The default numeric type is `double` (64-bit float). Other types include `int8/16/32/64`, `uint8/16/32/64`, `single`, `logical`, `char`, `string`, `cell`, `struct`, and `table`. All numeric arrays are matrices by default. Type checking functions (`isa`, `isnumeric`, `ischar`, etc.) are used instead of static types.

## Example

```matlab
% Numeric types
d  = 3.14;           % double (default)
f  = single(3.14);   % single precision
i  = int32(42);      % 32-bit integer
u  = uint8(255);     % unsigned 8-bit

% Logical
b = true;
c = false;
mask = [1 0 1 0] > 0;  % logical array

% Character and string
ch  = 'hello';       % char array (1×5 char)
str = "hello";       % string scalar (newer MATLAB)

% Cell array (heterogeneous)
c = {1, 'two', [3 4 5], true};

% Struct
s.name  = 'Alice';
s.age   = 30;
s.score = 95.5;

% Type checking
class(d)          % 'double'
isa(i, 'int32')   % 1 (true)
isnumeric(d)      % 1
ischar(ch)        % 1
isstring(str)     % 1

% Type conversion
n = double(i);
t = int32(d);

% Check size and type together
whos
```

## Gotchas

- `double` is the default — even integer literals like `42` are stored as `double` unless explicitly cast.
- `char` arrays and `string` scalars are different types with different behavior. Prefer `string` for new code.
- Integer arithmetic wraps at type limits (e.g., `int8(127) + int8(1)` = `int8(127)`, not overflow).
- Cell arrays can hold any mix of types but are slower than numeric arrays. Prefer numeric arrays for performance.
