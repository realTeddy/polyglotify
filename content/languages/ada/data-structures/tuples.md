---
title: "Tuples"
language: "ada"
feature: "tuples"
category: "data-structures"
applicable: false
---

Ada has no built-in tuple type. Records with named fields serve this purpose and are the idiomatic approach. Anonymous record aggregates can be used inline in some contexts. Ada 2012 allows `declare` expressions to introduce temporary names, partially simulating destructuring.

## Example

```ada
with Ada.Text_IO;         use Ada.Text_IO;
with Ada.Integer_Text_IO; use Ada.Integer_Text_IO;

procedure Tuples_Demo is

   -- Record as a named tuple
   type Int_Pair is record
      First  : Integer;
      Second : Integer;
   end record;

   type Point_3D is record
      X, Y, Z : Float;
   end record;

   -- Function returning a record (tuple-like)
   function Divmod (A, B : Integer) return Int_Pair is
   begin
      return (First => A / B, Second => A mod B);
   end Divmod;

   function Origin return Point_3D is
   begin
      return (X => 0.0, Y => 0.0, Z => 0.0);
   end Origin;

   Result : Int_Pair;
   P      : Point_3D;

begin
   Result := Divmod (17, 5);
   Put (Result.First);  Put (' ');   -- 3
   Put (Result.Second); New_Line;    -- 2

   P := Origin;
   Put_Line (Float'Image (P.X));  -- 0.0

   -- Inline aggregate (positional)
   declare
      Q : Int_Pair := (10, 20);  -- positional initialization
   begin
      Put (Q.First); New_Line;   -- 10
   end;
end Tuples_Demo;
```

## Gotchas

- Ada has no anonymous tuple type — all multi-field groupings require a named `record` type declaration.
- Record aggregates `(X => ..., Y => ...)` provide named initialization similar to named tuple construction.
- Positional aggregates `(10, 20)` are valid but less readable — prefer named associations.
- For temporary grouping without a named type, use `out` parameters from a procedure (multiple "returns").
