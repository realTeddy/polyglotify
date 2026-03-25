---
title: "Parameters & Arguments"
language: "matlab"
feature: "parameters"
category: "functions"
applicable: true
---

MATLAB functions receive arguments positionally. `nargin` and `nargout` give the number of inputs/outputs at runtime, enabling optional parameters. `varargin` and `varargout` accept variable numbers of arguments as cell arrays. The `inputParser` class and `arguments` block (R2019b+) provide structured validation and defaults.

## Example

```matlab
% nargin for optional parameters
function result = power_with_default(x, n)
    if nargin < 2
        n = 2;   % default exponent
    end
    result = x .^ n;
end

% varargin — variable number of inputs
function display_all(label, varargin)
    fprintf('%s: ', label);
    for i = 1:numel(varargin)
        disp(varargin{i})
    end
end

% arguments block (R2019b+) — preferred modern approach
function result = greet(name, options)
    arguments
        name         (1,1) string
        options.greeting (1,1) string = "Hello"
        options.times    (1,1) double {mustBePositive} = 1
    end
    for i = 1:options.times
        result = options.greeting + ", " + name + "!";
        disp(result)
    end
end
```

```matlab
% Calls
power_with_default(3)       % 9 (uses default n=2)
power_with_default(3, 3)    % 27

display_all('Items', 1, 'hello', true)

greet("Alice")
greet("Bob", greeting="Hi", times=3)
```

## Gotchas

- `varargin` is a cell array — access elements with `varargin{i}` (curly braces), not `varargin(i)`.
- `nargin` returns the actual number of arguments provided; checking it is the classic way to implement defaults.
- The `arguments` block validates types and sizes at the start of the function — use it for new code.
- Name-value pairs in the `arguments` block (using a struct parameter named `options`) work like keyword arguments.
