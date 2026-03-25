---
title: "Testing"
language: "pascal"
feature: "testing"
category: "ecosystem"
applicable: true
---

Free Pascal ships with **FPCUnit**, a JUnit-style testing framework in the `fpcunit` unit. Tests are classes inheriting from `TTestCase`, grouped into `TTestSuite`, and run by a test runner. Lazarus provides a GUI test runner; CLI tests use the `consoletestrunner` unit. The simpler alternative is plain `Assert` calls in a test program.

## Example

```pascal
// tests/testmath.pas
unit TestMath;

{$mode objfpc}{$H+}

interface

uses
  fpcunit, testregistry, SysUtils;

type
  TTestMath = class(TTestCase)
  published
    procedure TestFactorial;
    procedure TestDivision;
    procedure TestException;
  end;

implementation

uses umath;   // the unit under test

procedure TTestMath.TestFactorial;
begin
  AssertEquals('0!', 1, Factorial(0));
  AssertEquals('5!', 120, Factorial(5));
end;

procedure TTestMath.TestDivision;
var q, r: Integer;
begin
  DivMod(17, 5, q, r);
  AssertEquals('quotient',  3, q);
  AssertEquals('remainder', 2, r);
end;

procedure TTestMath.TestException;
begin
  AssertException('divide by zero', EDivByZero,
    procedure begin SafeDivide(10, 0); end);
end;

initialization
  RegisterTest(TTestMath);
end.
```

```pascal
// testrunner.pas — CLI runner
program TestRunner;
{$mode objfpc}{$H+}
uses
  consoletestrunner, TestMath;
var
  app: TTestRunner;
begin
  app := TTestRunner.Create(nil);
  app.Initialize;
  app.Run;
  app.Free;
end.
```

```bash
fpc testrunner.pas && ./testrunner --all
```

## Gotchas

- `published` methods in `TTestCase` are auto-discovered as test methods; `private` or `protected` methods are not run.
- FPCUnit's `AssertEquals` uses overloaded versions for different types; type mismatches cause obscure errors.
- There is no built-in mocking framework in the standard library; use manual stub objects or community libraries.
- Running tests without Lazarus requires the `consoletestrunner` unit and linking the FPCUnit package (`-Fu` path or installed via `fpmake`).
