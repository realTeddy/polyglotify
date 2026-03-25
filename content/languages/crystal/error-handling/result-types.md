---
title: "Result Types"
language: "crystal"
feature: "result-types"
category: "error-handling"
applicable: true
---

Crystal does not have a built-in `Result` type, but nilable return types (`T?`) are the standard lightweight alternative. For richer error information, custom `Result` unions or exception-based flow are common. Some libraries implement a `Result(T, E)` pattern using union types and pattern matching.

## Example

```crystal
# Nilable return (common idiom)
def find_user(id : Int32) : String?
  users = {1 => "Alice", 2 => "Bob"}
  users[id]?
end

user = find_user(1)
if user
  puts "Found: #{user}"
else
  puts "Not found"
end

# Custom Result type
abstract class Result(T, E)
end

class Ok(T, E) < Result(T, E)
  getter value : T
  def initialize(@value : T); end
end

class Err(T, E) < Result(T, E)
  getter error : E
  def initialize(@error : E); end
end

def parse_int(s : String) : Result(Int32, String)
  Ok(Int32, String).new(s.to_i)
rescue ArgumentError
  Err(Int32, String).new("Not a valid integer: #{s}")
end

result = parse_int("42")
case result
when Ok
  puts "Parsed: #{result.value}"
when Err
  puts "Error: #{result.error}"
end
```

## Gotchas

- Nilable types (`T?`) lose error information; use them only when the "not found" case is self-explanatory.
- Crystal's type system allows union types like `Int32 | ArgumentError` but pattern matching on them requires `case`/`when` with type checks.
- The `?`-suffix method convention (e.g., `Hash#[]?`) is Crystal's built-in way to signal optional results.
