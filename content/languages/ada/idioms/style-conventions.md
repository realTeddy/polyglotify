---
title: "Style Conventions"
language: "ada"
feature: "style-conventions"
category: "idioms"
applicable: true
---

Ada uses `Mixed_Case_With_Underscores` (Ada Case) for all identifiers — this is the official Ada style. The language is case-insensitive, but the style guide mandates consistent casing. Package names match file names (lowercased with `-` replacing `.`). Lines are limited to 79 characters. The AdaCore style guide is the de facto standard.

## Example

```ada
-- File: my_app-geometry.ads
-- Package: My_App.Geometry

package My_App.Geometry is

   -- Types: Mixed_Case
   type Point_2D is record
      X, Y : Float := 0.0;
   end record;

   type Distance_Type is digits 10 range 0.0 .. Float'Last;

   -- Constants: Mixed_Case (same rule)
   Pi            : constant Float := 3.14159_26535;
   Max_Dimension : constant Positive := 10_000;

   -- Subprograms: Mixed_Case, verb-first for procedures
   function Distance (P1, P2 : Point_2D) return Distance_Type;
   procedure Translate (P : in out Point_2D; DX, DY : Float);
   function  Make_Point (X, Y : Float) return Point_2D;

   -- Operators can be defined
   function "+" (Left, Right : Point_2D) return Point_2D;

end My_App.Geometry;

package body My_App.Geometry is

   function Distance (P1, P2 : Point_2D) return Distance_Type is
      DX : Float := P2.X - P1.X;
      DY : Float := P2.Y - P1.Y;
   begin
      return Distance_Type (Float'Sqrt (DX * DX + DY * DY));
   end Distance;

   procedure Translate (P : in out Point_2D; DX, DY : Float) is
   begin
      P.X := P.X + DX;
      P.Y := P.Y + DY;
   end Translate;

   function Make_Point (X, Y : Float) return Point_2D is
      ((X => X, Y => Y));
   end Make_Point;

   function "+" (Left, Right : Point_2D) return Point_2D is
      ((X => Left.X + Right.X, Y => Left.Y + Right.Y));
   end "+";

end My_App.Geometry;
```

## Gotchas

- Ada is **case-insensitive** — `procedure`, `PROCEDURE`, and `Procedure` are identical. Style guides standardize on lowercase keywords and `Mixed_Case` identifiers.
- Numeric literals can use `_` as a separator: `1_000_000`, `3.14_15_92`, `16#FF_FF#`.
- Package body name must exactly match the spec name — a mismatch is a compile error.
- Use named parameter associations (`X => value`) in calls for clarity, especially when multiple parameters share a type.
