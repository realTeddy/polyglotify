---
title: "Arrays & Lists"
language: "pascal"
feature: "arrays"
category: "data-structures"
applicable: true
---

Pascal arrays are statically typed and index-bounded. Static arrays are declared with an explicit index range (`array[1..10] of Integer`). Free Pascal adds dynamic arrays (`array of Integer`) that are heap-allocated and resized with `SetLength`. The `Low`, `High`, and `Length` functions work on both kinds. For growable lists, Free Pascal's `Classes` unit provides `TList` and `TFPList`.

## Example

```pascal
program ArraysDemo;

var
  // Static array (1-based, classic Pascal style)
  fixed: array[1..5] of Integer;

  // Dynamic array (0-based, Free Pascal)
  dyn: array of Integer;

  i: Integer;

begin
  // Static array
  for i := 1 to 5 do
    fixed[i] := i * i;
  WriteLn('Fixed: Low=', Low(fixed), ' High=', High(fixed));
  for i := Low(fixed) to High(fixed) do
    Write(fixed[i], ' ');
  WriteLn;

  // Dynamic array
  SetLength(dyn, 5);
  for i := 0 to Length(dyn) - 1 do
    dyn[i] := i * 2;
  WriteLn('Dyn length: ', Length(dyn));

  // Grow
  SetLength(dyn, 8);
  dyn[5] := 99;
  for i := 0 to High(dyn) do
    Write(dyn[i], ' ');
  WriteLn;

  // Multi-dimensional static array
  var mat: array[1..2, 1..2] of Double;
  mat[1,1] := 1.0; mat[1,2] := 2.0;
  mat[2,1] := 3.0; mat[2,2] := 4.0;
  WriteLn(mat[2,1]:0:1);   // 3.0

  // Copy
  var copy: array of Integer;
  copy := dyn;   // reference copy in FPC (use Move/Copy for deep copy)
end.
```

## Gotchas

- Static arrays are value types (copied on assignment); dynamic arrays are reference types in Free Pascal (assigning copies the reference, not the data — use `Copy()` for a deep copy).
- Classic Pascal arrays can have any ordinal index type (including enumerations), not just integers.
- Accessing out-of-bounds indices causes a runtime error with range checking enabled (`{$R+}`); without it, behaviour is undefined.
- `SetLength` on a dynamic array preserves existing elements; newly added slots are zero-initialised.
