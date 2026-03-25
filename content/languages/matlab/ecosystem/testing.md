---
title: "Testing"
language: "matlab"
feature: "testing"
category: "ecosystem"
applicable: true
---

MATLAB provides a built-in unit testing framework via the `matlab.unittest` package (available since R2013a). Tests are written as classes inheriting from `matlab.unittest.TestCase` or as simple function-based tests. Run with `runtests`. Test methods must start with `test`.

## Example

```matlab
% TestMath.m — class-based unit tests
classdef TestMath < matlab.unittest.TestCase
    methods (Test)
        function test_add(tc)
            tc.verifyEqual(add(2, 3), 5)
        end

        function test_add_negative(tc)
            tc.verifyEqual(add(-1, 1), 0)
        end

        function test_sqrt_positive(tc)
            tc.verifyEqual(safe_sqrt(4), 2, 'AbsTol', 1e-10)
        end

        function test_sqrt_negative(tc)
            tc.verifyWarning(@() safe_sqrt(-1), 'myapp:negativeInput')
        end

        function test_throws(tc)
            tc.verifyError(@() error('id:msg', 'oops'), 'id:msg')
        end
    end

    methods (TestClassSetup)
        function setup(tc)
            % Runs once before all tests in this class
            addpath('../src')
        end
    end

    methods (TestMethodSetup)
        function per_test_setup(tc)
            % Runs before each test method
        end
    end
end
```

```matlab
% Run tests
results = runtests('TestMath')
results = runtests('tests/')        % all tests in folder
result_table = table(results)

% Function-based tests (simpler)
% TestAdd.m
function tests = TestAdd
    tests = functiontests(localfunctions);
end
function test_basic(tc)
    tc.verifyEqual(add(1, 2), 3)
end
```

## Gotchas

- Test class files must be named after the class (`TestMath.m`).
- `verifyEqual` does not stop the test on failure — use `assertEqual` for a hard stop.
- MATLAB tests are discovered by name: test methods must start with `test` (case-insensitive).
- Code coverage reports are available via `matlab.unittest.plugins.CodeCoveragePlugin`.
