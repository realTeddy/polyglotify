---
title: "Structs & Classes"
language: "pascal"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

Pascal's `record` is the struct equivalent — a value type with named fields, possibly with methods (Free Pascal/Delphi). A `class` in Free Pascal/Delphi is a reference type with full OOP support. Classic Pascal only has records; the OOP class system was introduced in Turbo Pascal and standardised in Delphi/Free Pascal.

## Example

```pascal
program StructsDemo;

uses SysUtils;

// Record (struct) — value type
type
  TPoint = record
    X, Y: Double;

    // Record method (Free Pascal)
    function Distance(const other: TPoint): Double;
    function ToString: String;
  end;

function TPoint.Distance(const other: TPoint): Double;
begin
  Result := Sqrt(Sqr(X - other.X) + Sqr(Y - other.Y));
end;

function TPoint.ToString: String;
begin
  Result := Format('(%.2f, %.2f)', [X, Y]);
end;

// Record with constructor-like factory (Free Pascal)
function MakePoint(x, y: Double): TPoint;
begin
  Result.X := x;
  Result.Y := y;
end;

var
  a, b, c: TPoint;

begin
  a := MakePoint(0, 0);
  b := MakePoint(3, 4);

  WriteLn(a.ToString);          // (0.00, 0.00)
  WriteLn(b.ToString);          // (3.00, 4.00)
  WriteLn(a.Distance(b):0:2);   // 5.00

  // Value-type copy
  c := b;
  c.X := 99;
  WriteLn(b.X:0:2);             // 3.00 — unaffected
end.
```

## Gotchas

- Records are value types; assigning one record to another copies all fields (deep copy for embedded records, shallow for pointer fields).
- Records cannot inherit from other records in standard Pascal; Free Pascal adds `object` (deprecated) and `advanced records` (limited).
- Record methods in Free Pascal are a Delphi compatibility extension; they do not exist in ISO Pascal.
- For heap-allocated, inheritable types with constructors/destructors, use `class` (covered in OOP section).
