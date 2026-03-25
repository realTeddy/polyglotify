---
title: "Testing"
language: "ruby"
feature: "testing"
category: "ecosystem"
applicable: true
---

Ruby has two dominant testing frameworks: **Minitest** (ships with Ruby's standard library) and **RSpec** (the most popular in the community). RSpec uses a behavior-driven DSL with `describe`/`it` blocks. Both integrate with Bundler and CI pipelines.

## Example

```ruby
# RSpec example
# spec/calculator_spec.rb
require 'spec_helper'
require 'calculator'

RSpec.describe Calculator do
  describe "#add" do
    it "returns the sum of two numbers" do
      calc = Calculator.new
      expect(calc.add(2, 3)).to eq(5)
    end

    it "handles negative numbers" do
      expect(Calculator.new.add(-1, 1)).to eq(0)
    end
  end

  describe "#divide" do
    it "raises ZeroDivisionError when dividing by zero" do
      expect { Calculator.new.divide(1, 0) }.to raise_error(ZeroDivisionError)
    end
  end
end

# Minitest example
require 'minitest/autorun'
require 'calculator'

class CalculatorTest < Minitest::Test
  def test_add
    assert_equal 5, Calculator.new.add(2, 3)
  end
end
```

```bash
bundle exec rspec            # run all RSpec tests
bundle exec rspec spec/models
bundle exec ruby -Itest test/calculator_test.rb
```

## Gotchas

- RSpec's `let` is lazily evaluated; use `let!` to force evaluation before each example
- `before(:each)` runs before every example; `before(:all)` runs once per describe block and shares state
- Use `FactoryBot` for test data creation rather than fixtures for flexibility
