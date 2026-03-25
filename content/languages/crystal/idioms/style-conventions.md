---
title: "Style Conventions"
language: "crystal"
feature: "style-conventions"
category: "idioms"
applicable: true
---

Crystal follows conventions very similar to Ruby. Names use `snake_case` for methods and variables, `PascalCase` for types and modules, `SCREAMING_SNAKE_CASE` for constants. Two-space indentation is standard. Predicate methods end with `?`; mutating/dangerous methods end with `!`. The official formatter is `crystal tool format`.

## Example

```crystal
# snake_case methods and variables
def calculate_total_price(items : Array(Float64)) : Float64
  items.sum
end

# PascalCase types
class ShoppingCart
  # SCREAMING_SNAKE_CASE constants
  MAX_ITEMS = 100

  # Predicate method
  def empty? : Bool
    @items.empty?
  end

  # Mutating method
  def clear! : Nil
    @items.clear
  end
end

# Type annotations for public APIs
def parse_config(path : String) : Hash(String, String)
  # ...
  {} of String => String
end

# Prefer blocks over explicit iteration
items = [1, 2, 3]
# Idiomatic:
items.each { |x| puts x }
# Avoid:
# i = 0; while i < items.size; puts items[i]; i += 1; end
```

```bash
# Auto-format code
crystal tool format src/

# Check formatting without modifying
crystal tool format --check src/
```

## Gotchas

- Run `crystal tool format` before committing; CI pipelines often fail on unformatted code.
- Avoid using `protected` and `private` on every method — Crystal's encapsulation defaults are reasonable; annotate selectively.
- Follow the one-class-per-file convention for large projects; small helper classes can share a file.
