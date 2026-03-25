---
title: "Common Patterns"
language: "ada"
feature: "common-patterns"
category: "idioms"
applicable: true
---

Ada idioms include: strong typing with range constraints for safety, `declare` blocks for local variables, protected objects for shared data, generic instantiation for reusable containers, and contract-based programming with `Pre`/`Post` conditions (Ada 2012). The `renames` clause improves readability for long names.

## Example

```ada
with Ada.Text_IO;                   use Ada.Text_IO;
with Ada.Containers.Vectors;

procedure Common_Patterns is

   -- 1. Strong typing with constraints prevents bugs at compile time
   type Temperature_C is digits 4 range -273.15 .. Float'Last;
   type Temperature_F is digits 4 range -459.67 .. Float'Last;

   function To_Fahrenheit (C : Temperature_C) return Temperature_F is
      (Temperature_F (Float (C) * 9.0 / 5.0 + 32.0));

   -- 2. Generic instantiation
   package Float_Vectors is new Ada.Containers.Vectors
      (Index_Type => Natural, Element_Type => Float);
   use Float_Vectors;

   -- 3. Ada 2012 pre/post conditions
   function Safe_Sqrt (X : Float) return Float
      with Pre  => X >= 0.0,
           Post => Safe_Sqrt'Result >= 0.0
   is (Float'Sqrt (X));

   -- 4. Renames for long package names
   package FV renames Float_Vectors;

   -- 5. Declare block for local scope
   Temp  : Temperature_C := 100.0;
   V     : Float_Vectors.Vector;

begin
   -- 1. Type safety
   Put_Line (Temperature_F'Image (To_Fahrenheit (Temp)));  -- 212.0

   -- 2. Generic vector
   V.Append (1.0);
   V.Append (2.0);
   V.Append (3.0);
   Put_Line (Integer'Image (Integer (V.Length)));  -- 3

   -- 3. Preconditions checked at runtime (or proved by SPARK)
   Put_Line (Float'Image (Safe_Sqrt (25.0)));  -- 5.0

   -- 4. Declare block
   declare
      Sum : Float := 0.0;
   begin
      for F of V loop
         Sum := Sum + F;
      end loop;
      Put_Line (Float'Image (Sum));  -- 6.0
   end;

   -- 5. Numeric_IO for formatted output
   declare
      package F_IO is new Ada.Text_IO.Float_IO (Float);
   begin
      F_IO.Put (3.14159, Fore => 1, Aft => 4, Exp => 0);
      New_Line;
   end;
end Common_Patterns;
```

## Gotchas

- Distinct types (`type A is new B`) prevent accidental mixing — use this aggressively for domain modelling.
- `declare` blocks create new scopes — use them to keep complex procedures readable with localized variables.
- Pre/Post conditions (`with Pre => ...`) are checked at runtime by default; SPARK can prove them statically.
- `renames` does not copy data — it creates an alias. For procedures, `R renames P.Q.R` avoids repeating long qualifications.
