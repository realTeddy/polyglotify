---
title: "Structs & Classes"
language: "matlab"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

MATLAB structs group named fields. They are created with dot notation or `struct(...)`. Struct arrays allow arrays of structs with identical fields. For object-oriented patterns, MATLAB has a full class system (see OOP section). Structs are value types — assignment creates a copy.

## Example

```matlab
% Creating a struct
person.name  = 'Alice';
person.age   = 30;
person.email = 'alice@example.com';

% Alternative creation
person2 = struct('name', 'Bob', 'age', 25, 'email', 'bob@example.com');

% Field access
disp(person.name)
person.age = 31;   % modify a field

% Dynamic field names
field = 'name';
disp(person.(field))  % 'Alice'

% Struct array
for i = 1:3
    people(i).name  = sprintf('Person%d', i);
    people(i).score = i * 10;
end
disp(people(2).name)   % 'Person2'

% Vectorized field access
scores = [people.score]   % [10 20 30]

% Check fields
fieldnames(person)         % {'name'; 'age'; 'email'}
isfield(person, 'email')   % 1

% Remove a field
person = rmfield(person, 'email');

% Nested struct
config.server.host = 'localhost';
config.server.port = 8080;
disp(config.server.port)  % 8080
```

## Gotchas

- Structs are **value types** in MATLAB — assigning a struct to a new variable creates a copy.
- Building a struct array in a loop by expanding (`s(i).field = ...`) pre-allocates on first use but can be slow. Pre-allocate with `struct('field', cell(1, N), ...)`.
- `fieldnames` returns a cell array of strings.
- MATLAB structs do not have methods — for object-oriented behavior, use classes.
