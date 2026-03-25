---
title: "Parameters & Arguments"
language: "ada"
feature: "parameters"
category: "functions"
applicable: true
---

Ada parameters have explicit **modes**: `in` (read-only, default), `out` (write-only, uninitialized at entry), and `in out` (read/write). Parameters can have default values. Ada also supports named parameter association (`F(X => 1, Y => 2)`) allowing arguments in any order.

## Example

```ada
with Ada.Text_IO;         use Ada.Text_IO;
with Ada.Integer_Text_IO; use Ada.Integer_Text_IO;

procedure Parameters_Demo is

   -- in parameters (default mode — read-only in subprogram)
   function Add (A, B : in Integer) return Integer is
   begin
      return A + B;
   end Add;

   -- out parameter — written, not read in subprogram
   procedure Init_Coords (X, Y : out Integer) is
   begin
      X := 0;
      Y := 0;
   end Init_Coords;

   -- in out parameter — read and written
   procedure Increment (N : in out Integer; By : Integer := 1) is
   begin
      N := N + By;
   end Increment;

   -- Default parameter values
   procedure Greet (Name : String; Times : Positive := 1) is
   begin
      for I in 1 .. Times loop
         Put_Line ("Hello, " & Name);
      end loop;
   end Greet;

   A, B, Counter : Integer;

begin
   Put (Add (3, 4)); New_Line;   -- 7

   Init_Coords (A, B);
   Put (A); Put (B); New_Line;   -- 0 0

   Counter := 10;
   Increment (Counter);          -- By defaults to 1
   Increment (Counter, By => 5); -- named argument
   Put (Counter); New_Line;      -- 16

   Greet ("Alice");              -- once
   Greet (Name => "Bob", Times => 3);  -- named args, any order
end Parameters_Demo;
```

## Gotchas

- `in` parameters are **not** passed by reference for scalars — they behave as values. For large records, the compiler may optimize.
- `out` parameters must be assigned before being read inside the subprogram, or the program has undefined behavior (though GNAT often catches this).
- Named associations (`X => value`) allow passing arguments in any order and are highly recommended for readability.
- `access` types (pointers) can be used as parameters to avoid copying large structures — see access types for details.
