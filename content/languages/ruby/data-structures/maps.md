---
title: "Maps & Dictionaries"
language: "ruby"
feature: "maps"
category: "data-structures"
applicable: true
---

Ruby's `Hash` is an ordered (since Ruby 1.9) key-value store. Keys are most commonly symbols or strings. Hashes support a clean literal syntax with the hash rocket `=>` or the symbol shorthand `key:` for symbol keys.

## Example

```ruby
# Creation
person = { name: "Alice", age: 30 }          # symbol keys (shorthand)
config = { "host" => "localhost", "port" => 3000 }  # string keys

# Access
person[:name]       # => "Alice"
person[:missing]    # => nil (no error)
person.fetch(:age)  # => 30
person.fetch(:missing, "default")  # => "default"

# Mutation
person[:email] = "alice@example.com"
person.delete(:age)

# Iteration
person.each { |key, value| puts "#{key}: #{value}" }

# Transformation
person.map { |k, v| [k, v.to_s] }.to_h
person.select { |k, v| v.is_a?(String) }
person.transform_values { |v| v.to_s }

# Merging
defaults = { role: "guest", active: true }
defaults.merge(person)   # person values win on conflict
```

## Gotchas

- Hashes are ordered by insertion order since Ruby 1.9
- `Hash#[]` returns `nil` for missing keys; `Hash#fetch` raises `KeyError` — prefer `fetch` when the key must exist
- Symbol and string keys are distinct: `{a: 1}[:a]` works but `{"a" => 1}[:a]` returns `nil`
