---
title: "Sets"
language: "ada"
feature: "sets"
category: "data-structures"
applicable: true
---

Ada provides sets via `Ada.Containers.Hashed_Sets` and `Ada.Containers.Ordered_Sets`. Both are generic packages. For small, static sets of enumeration values, Ada's **bit arrays** or subtypes are often more efficient. The containers package provides full set operations.

## Example

```ada
with Ada.Text_IO;                   use Ada.Text_IO;
with Ada.Integer_Text_IO;           use Ada.Integer_Text_IO;
with Ada.Containers.Ordered_Sets;

procedure Sets_Demo is

   package Int_Sets is new Ada.Containers.Ordered_Sets
      (Element_Type => Integer);
   use Int_Sets;

   A, B, C : Set;
   Cursor  : Int_Sets.Cursor;

begin
   -- Build set A: {1,2,3,4,5}
   for I in 1 .. 5 loop
      A.Insert (I);
   end loop;

   -- Build set B: {3,4,5,6,7}
   for I in 3 .. 7 loop
      B.Insert (I);
   end loop;

   -- Membership test
   if A.Contains (3) then
      Put_Line ("3 is in A");  -- prints
   end if;

   -- Union
   C := A;
   C.Union (B);
   Put_Line ("Union size: " & Integer'Image (Integer (C.Length)));  -- 7

   -- Intersection
   C := A;
   C.Intersection (B);
   -- Iterate intersection
   Cursor := C.First;
   while Cursor /= No_Element loop
      Put (Element (Cursor)); Put (' ');
      Next (Cursor);
   end loop;
   New_Line;  -- 3 4 5

   -- Difference (A - B)
   C := A;
   C.Difference (B);
   Cursor := C.First;
   while Cursor /= No_Element loop
      Put (Element (Cursor)); Put (' ');
      Next (Cursor);
   end loop;
   New_Line;  -- 1 2
end Sets_Demo;
```

## Gotchas

- `Ordered_Sets` requires the element type to have `<` defined (integers work out of the box).
- `Hashed_Sets` requires a `Hash` function and `Equivalent_Elements` (equality) function.
- `Union`, `Intersection`, and `Difference` modify the **target** set in place — they do not return new sets.
- Inserting a duplicate into a `Hashed_Set` raises `Constraint_Error`; use `Include` to silently skip duplicates.
