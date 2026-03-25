---
title: "Maps & Dictionaries"
language: "matlab"
feature: "maps"
category: "data-structures"
applicable: true
---

MATLAB provides `containers.Map` for key-value storage. Keys must be of a uniform type (string, char, or numeric). Values can be any MATLAB type. As of R2022b, `dictionary` offers a more modern, flexible alternative. Structs with dynamic field names also serve as lightweight maps.

## Example

```matlab
% containers.Map
m = containers.Map();
m('Alice') = 95;
m('Bob')   = 82;
m('Carol') = 88;

% Access
m('Alice')          % 95
m.isKey('Dave')     % false (0)

% Check and retrieve safely
if m.isKey('Alice')
    disp(m('Alice'))
end

% Keys and values
m.keys()    % {'Alice', 'Bob', 'Carol'}
m.values()  % {88, 82, 95} (order may differ)

% Remove
m.remove('Bob')
m.Count         % 2

% Iterate
k = keys(m);
for i = 1:numel(k)
    fprintf('%s -> %d\n', k{i}, m(k{i}))
end

% dictionary (R2022b+) — more flexible
d = dictionary("Alice", 95, "Bob", 82);
d("Carol") = 88;
d("Alice")           % 95
isKey(d, "Dave")     % false
keys(d)
values(d)

% Struct as a simple map (known keys)
s.name = 'Alice';
s.score = 95;
% Dynamic field access:
field = 'score';
s.(field)           % 95
```

## Gotchas

- `containers.Map` keys must all be the same type. If you mix `char` and `string` keys, you get errors.
- Accessing a missing key in `containers.Map` throws an error — always use `isKey` first.
- `dictionary` (R2022b+) is more permissive and supports heterogeneous value types; check your MATLAB version.
- Struct dynamic field access `s.(field)` is useful but slower than direct field access `s.name`.
