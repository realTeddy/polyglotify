---
title: "Exceptions & Try/Catch"
language: "julia"
feature: "exceptions"
category: "error-handling"
applicable: true
---

Julia uses `try/catch/finally/end` for exception handling. Exceptions are thrown with `throw(e)` or convenience functions like `error(msg)`, `ArgumentError`, `BoundsError`. Caught exceptions are bound in the `catch` clause. `finally` runs regardless of success or failure. Julia also has `rethrow()` to re-raise the current exception.

## Example

```julia
# Basic try/catch
function safe_sqrt(x)
    try
        x < 0 && throw(DomainError(x, "sqrt of negative number"))
        sqrt(x)
    catch e
        if e isa DomainError
            println("Domain error: ", e.msg)
            NaN
        else
            rethrow()   # re-raise unknown exceptions
        end
    end
end

# finally block
function read_data(path)
    f = open(path)
    try
        read(f, String)
    finally
        close(f)   # always runs
    end
end

# Custom exception type
struct ValidationError <: Exception
    field::String
    message::String
end
Base.showerror(io::IO, e::ValidationError) =
    print(io, "ValidationError on '", e.field, "': ", e.message)

function validate_age(age)
    age < 0 && throw(ValidationError("age", "must be non-negative"))
    age
end

println(safe_sqrt(9.0))
println(safe_sqrt(-1.0))
try
    validate_age(-5)
catch e
    println(e)
end
```

## Gotchas

- Julia exceptions do not require declaration in function signatures (no checked exceptions).
- `error(msg)` throws an `ErrorException`; prefer typed exception types for programmatic handling.
- `catch e` captures the exception as any type; use `e isa SomeType` to branch on exception type.
