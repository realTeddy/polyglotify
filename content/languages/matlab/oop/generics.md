---
title: "Generics"
language: "matlab"
feature: "generics"
category: "oop"
applicable: false
---

MATLAB has no generics or templates. MATLAB is dynamically typed, so functions and classes naturally work with any compatible type without explicit type parameters. Type validation is done at runtime using `isa`, `isnumeric`, `validateattributes`, and property validation blocks.

## Example

```matlab
% In MATLAB, functions work generically via dynamic typing
function result = my_max(a, b)
    % Works for double, int32, string, etc.
    if a > b
        result = a;
    else
        result = b;
    end
end

disp(my_max(3, 5))         % 5 (double)
disp(my_max(int32(3), int32(5)))  % int32(5)
disp(my_max("apple", "banana"))   % "banana"

% "Generic" container using cell arrays
classdef TypedStack
    properties (Access = private)
        data cell = {}
        element_type char
    end
    methods
        function obj = TypedStack(type_name)
            obj.element_type = type_name;
        end
        function push(obj, val)
            if ~isa(val, obj.element_type)
                error('Expected %s', obj.element_type)
            end
            obj.data{end+1} = val;
        end
        function val = pop(obj)
            val = obj.data{end};
            obj.data(end) = [];
        end
    end
end
```

## Gotchas

- MATLAB's dynamic typing means "generics" are implicit — there is no compile-time type checking for generic code.
- Runtime type errors replace the compile-time errors you'd get with generics.
- Use `validateattributes` or property validation blocks for explicit runtime type enforcement.
- Performance-critical code should use typed arrays (e.g., `double`) rather than cell arrays for generic containers.
