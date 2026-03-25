---
title: "Common Patterns"
language: "matlab"
feature: "common-patterns"
category: "idioms"
applicable: true
---

MATLAB idioms revolve around vectorization (avoiding loops with element-wise operations), logical indexing, and the matrix-first mindset. Pre-allocating arrays, using `cellfun`/`arrayfun` for functional patterns, and leveraging built-in functions are all idiomatic. The `@` anonymous function handle is central to functional programming in MATLAB.

## Example

```matlab
% 1. Vectorization over loops
v = 1:1000;
squares_loop = zeros(1, 1000);
for i = 1:1000                    % slow
    squares_loop(i) = i^2;
end
squares_vec = v .^ 2;             % fast — vectorized

% 2. Logical indexing
data = [3 -1 4 -1 5 -9 2 -6];
positives = data(data > 0)        % [3 4 5 2]
data(data < 0) = 0                % zero out negatives

% 3. Matrix operations instead of loops
A = magic(4);
row_sums = sum(A, 2)     % sum each row (dim=2)
col_means = mean(A, 1)   % mean of each column

% 4. cellfun for cell arrays
names = {'Alice', 'Bob', 'Charlie'};
lengths = cellfun(@numel, names)    % [5 3 7]
upper = cellfun(@upper, names, 'UniformOutput', false)

% 5. Pre-allocation (critical for performance)
n = 10000;
result = zeros(1, n);     % pre-allocate
for i = 1:n
    result(i) = sin(i);
end

% 6. Broadcasting (implicit expansion, R2016b+)
row = [1 2 3];
col = [10; 20; 30];
M = row + col             % 3×3 matrix via broadcasting

% 7. String formatting
names = ["Alice", "Bob"];
scores = [95, 82];
for i = 1:numel(names)
    fprintf('%-10s: %d\n', names(i), scores(i))
end
```

## Gotchas

- Always pre-allocate arrays before filling them in a loop — dynamic growth is slow due to repeated reallocation.
- Prefer vectorized operations over `for` loops; MATLAB's JIT optimizes vectorized code well.
- Logical indexing is faster than `find` for masking operations.
- Implicit expansion (broadcasting) was introduced in R2016b — older code uses `bsxfun` for the same effect.
