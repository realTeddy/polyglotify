---
title: "Interfaces & Traits"
language: "ruby"
feature: "interfaces"
category: "oop"
applicable: true
---

Ruby has no `interface` keyword. Instead, it uses modules as mixins to share behavior across unrelated classes. Ruby relies on duck typing — if an object responds to the required methods, it's compatible. The `Comparable` and `Enumerable` modules are canonical examples of this pattern.

## Example

```ruby
# Module as interface/mixin
module Serializable
  def serialize
    instance_variables.each_with_object({}) do |var, hash|
      hash[var.to_s.delete("@")] = instance_variable_get(var)
    end
  end

  def to_json
    require 'json'
    serialize.to_json
  end
end

module Printable
  def print_info
    puts to_s
  end
end

class User
  include Serializable
  include Printable

  attr_reader :name, :email

  def initialize(name, email)
    @name  = name
    @email = email
  end

  def to_s
    "User: #{@name} <#{@email}>"
  end
end

u = User.new("Alice", "alice@example.com")
u.serialize    # => {"name"=>"Alice", "email"=>"alice@example.com"}
u.print_info   # => "User: Alice <alice@example.com>"
```

## Gotchas

- Modules included with `include` add instance methods; `extend` adds them as class methods
- Module inclusion order matters: later-included modules take precedence in the method lookup chain
- Duck typing means there is no compile-time check that a class implements required methods
