---
title: "Exceptions & Try/Catch"
language: "matlab"
feature: "exceptions"
category: "error-handling"
applicable: true
---

MATLAB uses `try/catch/end` for exception handling. The `error` function throws an exception with an identifier and message. Caught exceptions are `MException` objects with `identifier`, `message`, and `stack` properties. `rethrow` re-raises a caught exception.

## Example

```matlab
% Basic try/catch
try
    x = 1 / 0;          % Inf, not an error in MATLAB
    v = [1 2 3];
    v(10)                % index out of bounds — throws error
catch e
    fprintf('Caught: %s\n', e.message)
    fprintf('ID: %s\n', e.identifier)
end

% Throwing errors
function result = safe_sqrt(x)
    if ~isnumeric(x)
        error('myapp:badInput', 'Input must be numeric, got %s', class(x))
    end
    if x < 0
        error('myapp:negativeInput', 'Input must be non-negative, got %g', x)
    end
    result = sqrt(x);
end

% Catching specific error IDs
try
    y = safe_sqrt(-5);
catch e
    switch e.identifier
        case 'myapp:negativeInput'
            fprintf('Negative input: %s\n', e.message)
            y = NaN;
        case 'myapp:badInput'
            fprintf('Bad type: %s\n', e.message)
            y = NaN;
        otherwise
            rethrow(e)   % re-raise unexpected errors
    end
end

% MException directly
err = MException('myapp:custom', 'Something went wrong: %d', 42);
throw(err);
```

## Gotchas

- `1/0` in MATLAB returns `Inf`, not an error. Index out of bounds, type mismatches, and explicit `error()` calls do throw.
- The `catch e` variable (`e`) is an `MException` — inspect `e.identifier` and `e.message`.
- Error identifiers follow `'component:mnemonic'` convention — use your app name as the component.
- `warning` raises a non-fatal warning; `error` raises a fatal exception. Use `warning('off', 'id')` to suppress specific warnings.
