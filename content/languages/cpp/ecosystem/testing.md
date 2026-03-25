---
title: "Testing"
language: "cpp"
feature: "testing"
category: "ecosystem"
applicable: true
---

The dominant C++ testing frameworks are **Google Test** (gtest), **Catch2**, and **doctest**. All integrate with CMake's `CTest`. Google Test provides rich matchers (via Google Mock), parameterized tests, and death tests. Catch2 and doctest offer BDD-style `SCENARIO`/`GIVEN`/`WHEN`/`THEN` macros and header-only distribution. `ctest` runs all registered tests; `--output-on-failure` shows output only for failing tests.

## Example

```cpp
// tests/test_math.cpp — Google Test
#include <gtest/gtest.h>
#include "mylib/math.hpp"

// Simple test
TEST(AddTest, PositiveNumbers) {
    EXPECT_EQ(add(2, 3), 5);
    EXPECT_EQ(add(0, 0), 0);
}

TEST(AddTest, NegativeNumbers) {
    EXPECT_EQ(add(-1, -2), -3);
    EXPECT_EQ(add(-1, 1), 0);
}

// Fixture
class StackTest : public ::testing::Test {
protected:
    void SetUp() override {
        stack_.push(1);
        stack_.push(2);
        stack_.push(3);
    }
    Stack<int> stack_;
};

TEST_F(StackTest, PopReturnsLastPushed) {
    EXPECT_EQ(stack_.pop(), 3);
}

TEST_F(StackTest, SizeDecreasesAfterPop) {
    stack_.pop();
    EXPECT_EQ(stack_.size(), 2u);
}

// Parameterized test
class DivTest : public ::testing::TestWithParam<std::tuple<int, int, int>> {};

TEST_P(DivTest, Divides) {
    auto [a, b, expected] = GetParam();
    EXPECT_EQ(divide(a, b), expected);
}

INSTANTIATE_TEST_SUITE_P(Cases, DivTest, ::testing::Values(
    std::make_tuple(6, 2, 3),
    std::make_tuple(10, 5, 2)
));
```

```bash
cmake -S . -B build && cmake --build build
cd build && ctest --output-on-failure
```

## Gotchas

- `ASSERT_*` macros abort the current test function on failure; `EXPECT_*` continues but marks the test as failed. Use `ASSERT_` when subsequent code would crash or give meaningless results if the check fails.
- Google Test discovers test executables registered via `gtest_discover_tests` in CMake — tests not registered this way won't appear in `ctest` output.
