---
title: "Arrays & Lists"
language: "matlab"
feature: "arrays"
category: "data-structures"
applicable: true
---

Arrays (matrices) are MATLAB's fundamental data type. All scalars are 1×1 matrices. Row vectors are 1×N, column vectors N×1, and matrices M×N. Arrays are created with `[]`, `zeros`, `ones`, `linspace`, `colon`, etc. Indexing is 1-based. MATLAB arrays are homogeneous (all elements same type); heterogeneous data uses cell arrays.

## Example

```matlab
% Row vector
v = [1 2 3 4 5];         % or [1, 2, 3, 4, 5]

% Column vector
col = [1; 2; 3; 4; 5];

% Matrix
M = [1 2 3; 4 5 6; 7 8 9];

% Ranges
r = 1:10          % [1..10]
r2 = 0:0.5:2      % [0 0.5 1 1.5 2]
r3 = linspace(0, 1, 5)  % [0 0.25 0.5 0.75 1]

% Indexing (1-based)
v(1)       % first element = 1
v(end)     % last element = 5
v(2:4)     % [2 3 4]
M(2, 3)    % row 2, col 3 = 6
M(:, 2)    % entire second column

% Modification
v(3) = 99;
v(end+1) = 6;   % append by growing (triggers copy)

% Common operations
numel(v)        % number of elements
size(M)         % [3 3]
length(v)       % 5 (longest dimension)
zeros(3,4)      % 3×4 matrix of zeros
ones(2,2)       % 2×2 matrix of ones
reshape(v, 1, 5)

% Concatenation
h = [v, [10 11]];    % horizontal
c2 = [[1;2]; [3;4]]; % vertical

% Vectorized operations
v .^ 2         % element-wise squaring
sum(v)         % 15
cumsum(v)      % cumulative sum
sort(v)
```

## Gotchas

- MATLAB uses **1-based indexing** — `v(0)` is an error, not the first element.
- `end` inside indexing refers to the last index: `v(end)`, `v(end-1)`.
- Growing an array inside a loop (`v(end+1) = x`) is slow — pre-allocate with `zeros` or `cell`.
- `size(v, 1)` is the number of rows; `size(v, 2)` is columns. `numel` gives total elements.
