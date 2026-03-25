---
title: "Sets"
language: "matlab"
feature: "sets"
category: "data-structures"
applicable: true
---

MATLAB has no dedicated set data structure, but provides built-in functions for set operations on arrays: `unique`, `union`, `intersect`, `setdiff`, `ismember`, and `setxor`. These work on sorted arrays or cell arrays of strings. For large-scale membership testing, `containers.Map` with dummy values is more efficient.

## Example

```matlab
% Set operations on numeric arrays
A = [1 2 3 4 5];
B = [3 4 5 6 7];

U = union(A, B)          % [1 2 3 4 5 6 7]
I = intersect(A, B)      % [3 4 5]
D = setdiff(A, B)        % [1 2] (in A but not B)
X = setxor(A, B)         % [1 2 6 7] (symmetric difference)

% Membership test
ismember(3, A)            % 1 (true)
ismember([2 6], A)        % [1 0]

% Unique elements (deduplicate — like a set)
v = [3 1 4 1 5 9 2 6 5 3];
u = unique(v)             % [1 2 3 4 5 6 9]

% String sets (cell arrays)
fruits_a = {'apple', 'banana', 'cherry'};
fruits_b = {'banana', 'date', 'cherry'};
union(fruits_a, fruits_b)         % {'apple','banana','cherry','date'}
intersect(fruits_a, fruits_b)     % {'banana','cherry'}
ismember('apple', fruits_a)       % 1

% Efficient membership with containers.Map
big_set = containers.Map({'a','b','c'}, {1,1,1});
big_set.isKey('a')   % true
big_set.isKey('z')   % false
```

## Gotchas

- Set functions return **sorted** arrays — the original order is not preserved.
- `ismember(A, B)` returns a logical array of the same size as `A`, not a scalar.
- For repeated membership tests on large sets, `containers.Map` is O(1) vs. `ismember`'s O(n log n).
- `unique` removes duplicates but also sorts — if you only want to remove duplicates and preserve order, use `unique(v, 'stable')`.
