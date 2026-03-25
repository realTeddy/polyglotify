---
title: "Return Values"
language: "ada"
feature: "return-values"
category: "functions"
applicable: true
---

Ada functions return exactly one value using the `return` statement. To return multiple values, use `out` parameters, a record type, or a tuple-like record. Ada 2012 introduced expression functions for concise single-expression returns. Exceptions are the primary error mechanism.

## Example

```ada
with Ada.Text_IO; use Ada.Text_IO;

procedure Return_Values_Demo is

   -- Single return value
   function Square (N : Integer) return Integer is
   begin
      return N * N;
   end Square;

   -- Return a record (multiple values)
   type Point is record
      X, Y : Float;
   end record;

   function Make_Point (X, Y : Float) return Point is
   begin
      return (X => X, Y => Y);
   end Make_Point;

   -- Out parameters for multiple "returns"
   procedure Divmod (A, B : Integer; Q, R : out Integer) is
   begin
      Q := A / B;
      R := A mod B;
   end Divmod;

   -- Return with exception on error
   function Safe_Sqrt (X : Float) return Float is
   begin
      if X < 0.0 then
         raise Constraint_Error with "Cannot take sqrt of negative";
      end if;
      return Float'Sqrt (X);   -- or use Ada.Numerics.Elementary_Functions
   end Safe_Sqrt;

   -- Expression function (Ada 2012)
   function Celsius_To_Fahrenheit (C : Float) return Float is
      (C * 9.0 / 5.0 + 32.0);

   P : Point;
   Q, R : Integer;

begin
   Put_Line (Integer'Image (Square (7)));  -- 49

   P := Make_Point (3.0, 4.0);
   Put_Line (Float'Image (P.X) & " " & Float'Image (P.Y));

   Divmod (17, 5, Q, R);
   Put_Line (Integer'Image (Q) & " rem " & Integer'Image (R));  -- 3 rem 2

   Put_Line (Float'Image (Celsius_To_Fahrenheit (100.0)));  -- 212.0
end Return_Values_Demo;
```

## Gotchas

- Ada functions must have a `return` on all execution paths — missing `return` is a compile error.
- Using `out` parameters to simulate multiple returns is common and idiomatic in Ada.
- `return` in a procedure (without a value) exits the procedure early, similar to a bare `return` in C.
- Extended return statements (`return R : T do ... end return`) allow complex initialization of the return value.
