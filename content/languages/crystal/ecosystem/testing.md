---
title: "Testing"
language: "crystal"
feature: "testing"
category: "ecosystem"
applicable: true
---

Crystal has a built-in testing framework called **Spec** (`require "spec"`). Tests are organized with `describe` and `context` blocks; assertions use `it` blocks with `should` matchers or `expect` syntax. `crystal spec` runs all `*_spec.cr` files. The framework supports before/after hooks and pending tests.

## Example

```crystal
# spec/math_spec.cr
require "spec"

def factorial(n : Int32) : Int32
  n <= 1 ? 1 : n * factorial(n - 1)
end

describe "factorial" do
  it "returns 1 for 0" do
    factorial(0).should eq(1)
  end

  it "returns 1 for 1" do
    factorial(1).should eq(1)
  end

  it "computes larger values" do
    factorial(5).should eq(120)
    factorial(10).should eq(3628800)
  end

  it "raises for negative" do
    expect_raises(Exception) { factorial(-1) }
  end

  pending "handles very large numbers"
end

describe Array do
  describe "#sum" do
    it "sums integers" do
      [1, 2, 3].sum.should eq(6)
    end
  end
end
```

```bash
# Run all specs
crystal spec

# Run a specific file
crystal spec spec/math_spec.cr

# Run with verbose output
crystal spec --verbose
```

## Gotchas

- `should` is a method on the object being tested; it reads naturally but requires `require "spec"`.
- `expect_raises` takes an exception type and optionally a message pattern.
- Specs run sequentially by default; there is no built-in parallel test execution.
