---
title: "Tuples"
language: "matlab"
feature: "tuples"
category: "data-structures"
applicable: false
---

MATLAB has no tuple type. The idiomatic equivalents are: multiple output arguments from functions, cell arrays `{a, b, c}` for heterogeneous data, or small structs. Multiple return values are the closest analog to tuples in other languages.

## Example

```matlab
% Multiple outputs (closest to tuples)
function [x, y, z] = get_coords()
    x = 1.0;
    y = 2.5;
    z = -0.3;
end

[px, py, pz] = get_coords();

% Cell array as heterogeneous tuple-like container
pair  = {'Alice', 30};
triple = {42, 'hello', true};

% Access cell array elements
name = pair{1};   % 'Alice'
age  = pair{2};   % 30

% Struct as a named tuple
point.x = 3.0;
point.y = 4.0;
point.z = 0.0;

% MATLAB's sort/min/max return (value, index) pairs
[val, idx] = max([3 1 4 1 5 9]);
fprintf('max=%d at index=%d\n', val, idx)

% deal() to unpack a cell array
c = {10, 'hello', true};
[a, b, d] = deal(c{:});
```

## Gotchas

- Cell arrays `{...}` are the closest to tuples but are heap-allocated and slower than numeric arrays.
- Multiple return values from functions are the idiomatic pattern — not a stored tuple type.
- `deal(c{:})` unpacks a cell array into multiple variables (simulates tuple unpacking).
- Struct fields must be named, making them more like named tuples.
