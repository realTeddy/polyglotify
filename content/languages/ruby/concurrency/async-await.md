---
title: "Async/Await"
language: "ruby"
feature: "async-await"
category: "concurrency"
applicable: false
---

Ruby does not have native `async/await` syntax. Asynchronous, non-blocking I/O is provided by the `Async` gem (built on Ruby's `Fiber` scheduler) and the `concurrent-ruby` gem. Ruby 3.0 introduced a `Fiber::Scheduler` interface, enabling frameworks to provide async I/O transparently.

## Example

```ruby
# Using the 'async' gem
require 'async'
require 'async/http/internet'

Async do |task|
  internet = Async::HTTP::Internet.new

  # These two requests run concurrently
  task.async do
    response = internet.get("https://api.example.com/users")
    puts response.read
  end

  task.async do
    response = internet.get("https://api.example.com/posts")
    puts response.read
  end
end

# Fiber-based manual async
fiber = Fiber.new do
  puts "Step 1"
  Fiber.yield
  puts "Step 2"
end

fiber.resume  # => "Step 1"
fiber.resume  # => "Step 2"
```

## Gotchas

- The `async` gem requires explicit `Async do` blocks; it does not add keywords to the language
- Ruby's Global Interpreter Lock (GIL) in MRI still limits true CPU parallelism; `async` helps only with I/O-bound concurrency
- `Fiber.yield` is cooperative — the fiber must explicitly yield control
