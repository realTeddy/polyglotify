---
title: "Function Declaration"
language: "pascal"
feature: "declaration"
category: "functions"
applicable: true
---

Pascal distinguishes between **procedures** (no return value, declared with `procedure`) and **functions** (return a value, declared with `function`). Both must be declared before they are called (or forward-declared with `forward`). The function result is assigned to the function name or to the special variable `Result` (Free Pascal).

## Example

```pascal
program FunctionsDemo;

// Forward declaration
function Factorial(n: Integer): Integer; forward;

// Procedure — no return value
procedure Greet(const name: String);
begin
  WriteLn('Hello, ', name, '!');
end;

// Function — returns Integer
function Add(a, b: Integer): Integer;
begin
  Result := a + b;   // Free Pascal style (or: Add := a + b;)
end;

// Recursive function (uses forward-declared Factorial)
function Factorial(n: Integer): Integer;
begin
  if n <= 1 then
    Result := 1
  else
    Result := n * Factorial(n - 1);
end;

// Nested function
function HypotSquared(x, y: Double): Double;
  function Square(v: Double): Double;
  begin
    Result := v * v;
  end;
begin
  Result := Square(x) + Square(y);
end;

begin
  Greet('World');
  WriteLn(Add(3, 4));
  WriteLn(Factorial(6));
  WriteLn(HypotSquared(3, 4):0:2);  // 25.00
end.
```

## Gotchas

- In classic Pascal, `function Foo: T; begin Foo := value; end;` assigns the result to the function name. Free Pascal also accepts `Result := value`.
- Functions and procedures must appear before their callers unless a `forward` declaration is used.
- Pascal allows nested function/procedure declarations — inner routines have access to the outer routine's local variables (closure-like scoping, but not first-class).
- Missing a `Result` assignment in all paths is a logic bug (compiler may warn but won't always catch it).
