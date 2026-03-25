---
title: "Return Values"
language: "pascal"
feature: "return-values"
category: "functions"
applicable: true
---

A Pascal `function` returns exactly one value, declared after the colon in the header (`function Foo: ReturnType`). The value is set by assigning to `Result` (Free Pascal) or to the function name (classic Pascal). Procedures return nothing. Multiple return values are achieved via `var`/`out` parameters or by returning a record.

## Example

```pascal
program ReturnValuesDemo;

type
  TDivResult = record
    Quotient, Remainder: Integer;
  end;

// Single return value
function Square(n: Integer): Integer;
begin
  Result := n * n;
end;

// Returning a record (multiple "values")
function DivMod(a, b: Integer): TDivResult;
begin
  Result.Quotient  := a div b;
  Result.Remainder := a mod b;
end;

// Early exit — assign Result then exit
function SafeSqrt(x: Double): Double;
begin
  if x < 0 then
  begin
    Result := 0;
    Exit;   // early return
  end;
  Result := Sqrt(x);
end;

// Boolean function
function IsEven(n: Integer): Boolean;
begin
  Result := (n mod 2 = 0);
end;

var
  dr: TDivResult;
begin
  WriteLn(Square(7));         // 49
  WriteLn(SafeSqrt(-1):0:2); // 0.00
  WriteLn(SafeSqrt(9):0:2);  // 3.00
  WriteLn(IsEven(4));         // True

  dr := DivMod(17, 5);
  WriteLn(dr.Quotient, ' rem ', dr.Remainder);  // 3 rem 2
end.
```

## Gotchas

- Using `Exit` in a function returns immediately; `Result` at that point holds the last assigned value.
- Assigning to the function name in classic Pascal (e.g., `Square := n*n`) does NOT cause early return — execution continues to `end`. Only `Exit` causes early return.
- A function with a record return type copies the entire record on return — for large records, use `var` parameters instead.
- If `Result` is never assigned, the function returns the type's default/uninitialised value — always assign `Result` before `Exit` or at the end.
