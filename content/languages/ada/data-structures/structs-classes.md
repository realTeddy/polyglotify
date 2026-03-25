---
title: "Structs & Classes"
language: "ada"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

Ada's `record` type is the equivalent of a struct. Records have named fields with explicit types. Records are value types (copied on assignment). For object-oriented behavior, use **tagged records** (Ada's class equivalent). Records support discriminants for variant types.

## Example

```ada
with Ada.Text_IO;         use Ada.Text_IO;
with Ada.Integer_Text_IO; use Ada.Integer_Text_IO;

procedure Structs_Demo is

   -- Simple record (struct)
   type Point is record
      X, Y : Float := 0.0;
   end record;

   -- Record with discriminant (variant record)
   type Shape_Kind is (Circle_Kind, Rect_Kind);
   type Shape (Kind : Shape_Kind) is record
      case Kind is
         when Circle_Kind => Radius : Float;
         when Rect_Kind   => Width, Height : Float;
      end case;
   end record;

   -- Record with default field values
   type Person is record
      Name  : String (1 .. 50) := (others => ' ');
      Age   : Natural := 0;
      Score : Float   := 0.0;
   end record;

   -- Functions operating on records
   function Distance (P1, P2 : Point) return Float is
      DX : Float := P2.X - P1.X;
      DY : Float := P2.Y - P1.Y;
   begin
      return Float'Sqrt (DX * DX + DY * DY);
   end Distance;

   P1 : Point := (X => 0.0, Y => 0.0);
   P2 : Point := (X => 3.0, Y => 4.0);
   C  : Shape (Circle_Kind) := (Kind => Circle_Kind, Radius => 5.0);
   R  : Shape (Rect_Kind)   := (Kind => Rect_Kind, Width => 3.0, Height => 4.0);

begin
   Put_Line (Float'Image (Distance (P1, P2)));  -- 5.0

   case C.Kind is
      when Circle_Kind => Put_Line (Float'Image (C.Radius));
      when Rect_Kind   => Put_Line (Float'Image (R.Width));
   end case;

   -- Record aggregate
   P1 := (X => 1.0, Y => 2.0);
   P2 := P1;          -- copy
   P2.X := 99.0;
   Put_Line (Float'Image (P1.X));  -- 1.0 (unchanged)
end Structs_Demo;
```

## Gotchas

- Records are **value types** — `B := A` copies all fields; modifying `B` does not affect `A`.
- Discriminants fix certain aspects of a record at creation and cannot be changed afterward (for constrained objects).
- Record fields with fixed-length `String` types are common in Ada but require padding care. Consider `Unbounded_String`.
- Tagged records add a type tag for OOP dispatch — see the Classes section for details.
