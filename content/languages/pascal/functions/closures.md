---
title: "Closures & Lambdas"
language: "pascal"
feature: "closures"
category: "functions"
applicable: true
---

Classic Pascal has no closures or lambda expressions. Free Pascal (2.6+) supports **anonymous procedures** and **nested functions**, which can capture variables from the enclosing scope. Procedural types (`procedure of object`, `function(...): T`) act as function pointers. Delphi (another Pascal dialect) introduced anonymous methods with full closure semantics.

## Example

```pascal
program ClosuresDemo;

type
  // Procedural type (function pointer)
  TIntFunc = function(n: Integer): Integer;
  // Method pointer (requires object context)
  TIntProc = procedure(n: Integer) of object;

function Square(n: Integer): Integer;
begin
  Result := n * n;
end;

function ApplyFunc(f: TIntFunc; n: Integer): Integer;
begin
  Result := f(n);
end;

// Free Pascal anonymous procedure / closure
procedure RunWithClosure;
var
  base: Integer;
  addBase: function(x: Integer): Integer;
begin
  base := 100;

  // Anonymous function capturing 'base'
  addBase := function(x: Integer): Integer
  begin
    Result := x + base;   // captures base by reference
  end;

  WriteLn(addBase(7));    // 107
  base := 200;
  WriteLn(addBase(7));    // 207
end;

// Nested function (not a closure — local scope only)
procedure PrintSquares(limit: Integer);
  function Square(n: Integer): Integer;
  begin
    Result := n * n;
  end;
var
  i: Integer;
begin
  for i := 1 to limit do
    WriteLn(i, '^2 = ', Square(i));
end;

var
  f: TIntFunc;
begin
  f := @Square;
  WriteLn(ApplyFunc(f, 5));   // 25

  RunWithClosure;
  PrintSquares(4);
end.
```

## Gotchas

- Anonymous functions in Free Pascal require at least version 2.6 and are not available in classic Turbo Pascal.
- Closures capture variables by reference; if the captured variable is freed before the closure runs, the result is undefined.
- Procedural types (`TIntFunc`) are not closures — they hold only a code pointer with no captured environment.
- Free Pascal anonymous functions are reference-counted internally; large closures holding many variables may have GC overhead.
