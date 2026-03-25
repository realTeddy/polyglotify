---
title: "Types & Type Systems"
language: "ada"
feature: "types"
category: "basics"
applicable: true
---

Ada has a rich, strong, static type system. Types include: scalar types (integer, float, enumeration, boolean, character), composite types (array, record), access types (pointers), and tagged types (for OOP). Ada distinguishes **types** (new types, incompatible with parent) from **subtypes** (compatible constraints). The type system prevents most implicit conversions.

## Example

```ada
with Ada.Text_IO; use Ada.Text_IO;

procedure Types_Demo is
   -- Enumeration type
   type Day is (Mon, Tue, Wed, Thu, Fri, Sat, Sun);
   type Color is (Red, Green, Blue);

   -- Integer type with range
   type Age_Type is range 0 .. 150;
   type Score is range 0 .. 100;

   -- Floating point
   type Probability is digits 6 range 0.0 .. 1.0;

   -- Record type
   type Point is record
      X, Y : Float;
   end record;

   -- Array type
   type Int_Array is array (1 .. 10) of Integer;
   type Matrix is array (1..3, 1..3) of Float;

   -- Subtype (compatible with base type)
   subtype Weekday is Day range Mon .. Fri;
   subtype Positive_Int is Integer range 1 .. Integer'Last;

   -- Variables
   Today   : Day        := Wed;
   Age     : Age_Type   := 30;
   P       : Point      := (X => 1.0, Y => 2.0);
   Arr     : Int_Array  := (others => 0);

begin
   Put_Line (Day'Image (Today));    -- "WED"
   Age := 31;
   Arr (1) := 42;

   -- Type attributes
   Put_Line (Integer'Image (Integer'First));
   Put_Line (Integer'Image (Integer'Last));
   Put_Line (Day'Image (Day'First));   -- "MON"
   Put_Line (Day'Image (Day'Succ (Mon)));  -- "TUE"
end Types_Demo;
```

## Gotchas

- `type A is new B` creates a truly new type — you cannot assign `A` values to `B` variables without explicit conversion.
- `subtype A is B range ...` creates a compatible subtype — you can use `A` values where `B` is expected.
- Enumeration types have `'Image`, `'Value`, `'First`, `'Last`, `'Succ`, `'Pred` attributes.
- Implicit conversions between numeric types are NOT allowed — use explicit type conversion: `Float(some_integer)`.
