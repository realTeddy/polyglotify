---
title: "Inheritance"
language: "matlab"
feature: "inheritance"
category: "oop"
applicable: true
---

MATLAB supports single and multiple inheritance via `classdef ChildClass < ParentClass` syntax. Subclasses inherit all properties and methods of the parent. Overriding a method replaces the parent's version. `@` before a method call invokes the parent's version. Abstract classes use `abstract` methods.

## Example

```matlab
% Shape.m — abstract base class
classdef Shape
    properties (Abstract)
        color (1,1) string
    end

    methods (Abstract)
        a = area(obj)
        p = perimeter(obj)
    end

    methods
        function describe(obj)
            fprintf('%s with area=%.2f\n', class(obj), obj.area())
        end
    end
end

% Circle.m
classdef Circle < Shape
    properties
        radius (1,1) double
        color  (1,1) string = "red"
    end
    methods
        function obj = Circle(r)
            obj.radius = r;
        end
        function a = area(obj)
            a = pi * obj.radius^2;
        end
        function p = perimeter(obj)
            p = 2 * pi * obj.radius;
        end
    end
end

% Rectangle.m
classdef Rectangle < Shape
    properties
        width  (1,1) double
        height (1,1) double
        color  (1,1) string = "blue"
    end
    methods
        function obj = Rectangle(w, h)
            obj.width = w; obj.height = h;
        end
        function a = area(obj)
            a = obj.width * obj.height;
        end
        function p = perimeter(obj)
            p = 2 * (obj.width + obj.height);
        end
    end
end
```

```matlab
c = Circle(5);
r = Rectangle(3, 4);
c.describe()   % Circle with area=78.54
r.describe()   % Rectangle with area=12.00
isa(c, 'Shape')  % true
```

## Gotchas

- Multiple inheritance is supported but property/method name conflicts must be resolved explicitly.
- Abstract classes cannot be instantiated — trying to do so throws an error.
- Call parent constructor with `obj = obj@ParentClass(args)` in the subclass constructor.
- Method resolution is similar to other OOP languages but MATLAB's dispatch is file-based.
