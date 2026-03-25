---
title: "Inheritance"
language: "ruby"
feature: "inheritance"
category: "oop"
applicable: true
---

Ruby supports single inheritance using `<`. A subclass inherits all methods and can override them, calling the parent's version with `super`. Mixins (modules) provide a way to compose behavior without multiple inheritance.

## Example

```ruby
class Animal
  attr_reader :name

  def initialize(name)
    @name = name
  end

  def speak
    "..."
  end

  def to_s
    "#{self.class.name}(#{@name})"
  end
end

class Dog < Animal
  def speak
    "Woof!"
  end

  def fetch(item)
    "#{@name} fetches the #{item}"
  end
end

class GuideDog < Dog
  def initialize(name, owner)
    super(name)         # call parent initialize
    @owner = owner
  end

  def speak
    super + " (gentle)"  # extend parent behavior
  end
end

rex = GuideDog.new("Rex", "Bob")
rex.speak   # => "Woof! (gentle)"
rex.is_a?(Animal)  # => true
```

## Gotchas

- Ruby only supports single inheritance; use modules/mixins for shared behavior across hierarchies
- `super` with no arguments passes all arguments of the current method to the parent; `super()` passes none
- `super` without parentheses passes the current method's arguments automatically
