---
title: "Types & Type Systems"
language: "pascal"
feature: "types"
category: "basics"
applicable: true
---

Pascal has a rich static type system. Primitive types include `Integer`, `LongInt`, `Int64`, `Byte`, `Word`, `Cardinal`, `Single`, `Double`, `Extended`, `Boolean`, `Char`, and `String`. Pascal supports user-defined types via the `type` section: enumerations, subranges, arrays, records, sets, and pointers. Free Pascal adds `AnsiString`, `UnicodeString`, and generic types.

## Example

```pascal
program TypesDemo;

type
  // Enumeration
  TDay = (Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday);

  // Subrange
  TWorkDay = Monday..Friday;

  // Record (struct)
  TPoint = record
    X, Y: Double;
  end;

  // Array type
  TMatrix = array[1..3, 1..3] of Double;

  // Pointer
  PInteger = ^Integer;

var
  day   : TDay;
  pt    : TPoint;
  mat   : TMatrix;
  n     : Integer;
  p     : PInteger;

begin
  day := Wednesday;
  WriteLn(Ord(day));   // 2

  pt.X := 3.0;
  pt.Y := 4.0;
  WriteLn(pt.X, ' ', pt.Y);

  mat[1,1] := 1.0;

  n := 42;
  p := @n;             // address-of
  WriteLn(p^);         // dereference: 42
end.
```

## Gotchas

- Pascal's `Integer` size is platform-dependent in some dialects; use `LongInt` (32-bit) or `Int64` for portable code.
- String lengths in classic Pascal are fixed (255 chars max); Free Pascal's `AnsiString` is heap-allocated and unlimited.
- Subrange types (`Monday..Friday`) provide compile-time and runtime bounds checking, which is one of Pascal's safety features.
- Type compatibility rules are strict: assigning a `LongInt` to an `Integer` may require an explicit conversion (`Integer(longIntVar)`).
