---
title: "Interfaces & Traits"
language: "matlab"
feature: "interfaces"
category: "oop"
applicable: true
---

MATLAB does not have a dedicated `interface` keyword, but abstract classes with only abstract methods serve the same purpose. A class inheriting from an abstract class must implement all abstract methods. This is MATLAB's mechanism for defining contracts.

## Example

```matlab
% Serializable.m — interface-like abstract class
classdef Serializable
    methods (Abstract)
        s = serialize(obj)
    end
    methods (Static, Abstract)
        obj = deserialize(s)
    end
end

% Loggable.m — another "interface"
classdef Loggable
    methods (Abstract)
        log_entry = to_log_string(obj)
    end
end

% User.m — implements both "interfaces"
classdef User < Serializable & Loggable
    properties
        name  (1,1) string
        email (1,1) string
    end
    methods
        function obj = User(name, email)
            obj.name  = name;
            obj.email = email;
        end
        function s = serialize(obj)
            s = sprintf('{"name":"%s","email":"%s"}', obj.name, obj.email);
        end
        function entry = to_log_string(obj)
            entry = sprintf('[User] %s <%s>', obj.name, obj.email);
        end
    end
    methods (Static)
        function obj = deserialize(s)
            % Simplified: real impl would parse JSON
            obj = User("parsed", "parsed@example.com");
        end
    end
end
```

```matlab
u = User("Alice", "alice@example.com");
disp(u.serialize())
disp(u.to_log_string())
isa(u, 'Serializable')   % 1
```

## Gotchas

- Abstract classes serve as both abstract base classes and interfaces — there is no distinct `interface` construct.
- A class can inherit from multiple abstract classes (multiple inheritance), which is how you implement multiple interfaces.
- If any abstract method is not implemented, the subclass is also abstract and cannot be instantiated.
- MATLAB does not enforce interfaces at the language level outside of the class hierarchy.
