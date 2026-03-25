---
title: "Arrays & Lists"
language: "ada"
feature: "arrays"
category: "data-structures"
applicable: true
---

Ada arrays are strongly typed with explicit index ranges. Array types can use any discrete type as an index (including enumerations). Arrays are value types — assignment copies them. Unconstrained arrays (like `String`) have their bounds specified at elaboration. `Ada.Containers.Vectors` provides dynamic arrays.

## Example

```ada
with Ada.Text_IO;         use Ada.Text_IO;
with Ada.Integer_Text_IO; use Ada.Integer_Text_IO;
with Ada.Containers.Vectors;

procedure Arrays_Demo is

   -- Fixed array type
   type Int_Array is array (1 .. 5) of Integer;
   type Matrix    is array (1 .. 3, 1 .. 3) of Float;

   -- Unconstrained array type (bounds defined by object)
   type Dyn_Array is array (Positive range <>) of Integer;

   -- Instantiate a Vector (dynamic array)
   package Int_Vectors is new Ada.Containers.Vectors
      (Index_Type   => Natural,
       Element_Type => Integer);
   use Int_Vectors;

   A : Int_Array := (1, 2, 3, 4, 5);
   B : Int_Array := (others => 0);   -- all zeros
   D : Dyn_Array (1 .. 3) := (10, 20, 30);

   V : Vector;

begin
   -- Access (1-based)
   Put (A (1)); New_Line;      -- 1
   Put (A (A'Last)); New_Line; -- 5

   -- Slices
   declare
      Slice : Int_Array (1 .. 3) := A (1 .. 3);
   begin
      for X of Slice loop
         Put (X); Put (' ');
      end loop;
      New_Line;   -- 1 2 3
   end;

   -- Array attributes
   Put_Line (Integer'Image (A'Length));  -- 5
   Put_Line (Integer'Image (A'First));   -- 1
   Put_Line (Integer'Image (A'Last));    -- 5

   -- For-of loop
   for X of A loop
      Put (X); Put (' ');
   end loop;
   New_Line;

   -- Dynamic vector
   V.Append (10);
   V.Append (20);
   V.Append (30);
   Put_Line (Integer'Image (Integer (V.Length)));  -- 3
   Put (V (0)); New_Line;    -- 10 (0-based in Vectors)
   V.Delete_Last;
   Put_Line (Integer'Image (Integer (V.Length)));  -- 2
end Arrays_Demo;
```

## Gotchas

- Ada arrays are **1-based by default** but can use any index range including negative or enumeration values.
- Assigning one array to another **copies** all elements — arrays are value types.
- `A'Range` gives the index range; `A'Length` the count; `A'First` and `A'Last` the bounds.
- `Ada.Containers.Vectors` is 0-based by default (index starts at `Natural'First` = 0).
- Out-of-bounds access raises `Constraint_Error` at runtime (checked by default, can be disabled with pragmas).
