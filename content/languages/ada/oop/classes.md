---
title: "Classes"
language: "ada"
feature: "classes"
category: "oop"
applicable: true
---

Ada OOP uses **tagged types** (records with a type tag) to enable object-oriented programming. Methods are primitive operations — subprograms declared in the same package as the tagged type, with the tagged type as a parameter. Tagged types can be extended (inherited) and dispatched dynamically.

## Example

```ada
-- shapes.ads (package specification)
package Shapes is

   type Shape is tagged record
      Color : String (1 .. 10) := "black     ";
   end record;

   function Area (S : Shape) return Float;
   function Perimeter (S : Shape) return Float;
   procedure Describe (S : Shape);

   type Circle is new Shape with record
      Radius : Float;
   end record;

   function Area (C : Circle) return Float;
   function Perimeter (C : Circle) return Float;

   type Rectangle is new Shape with record
      Width, Height : Float;
   end record;

   function Area (R : Rectangle) return Float;
   function Perimeter (R : Rectangle) return Float;

end Shapes;

-- shapes.adb (package body)
package body Shapes is
   function Area (S : Shape) return Float is (0.0);
   function Perimeter (S : Shape) return Float is (0.0);

   procedure Describe (S : Shape) is
   begin
      Ada.Text_IO.Put_Line ("Area: " & Float'Image (Area (S)));
   end Describe;

   function Area (C : Circle) return Float is
      (Float'(3.14159) * C.Radius * C.Radius);
   function Perimeter (C : Circle) return Float is
      (2.0 * Float'(3.14159) * C.Radius);

   function Area (R : Rectangle) return Float is (R.Width * R.Height);
   function Perimeter (R : Rectangle) return Float is
      (2.0 * (R.Width + R.Height));
end Shapes;
```

```ada
-- main.adb
with Shapes; use Shapes;
with Ada.Text_IO; use Ada.Text_IO;

procedure Main is
   C : Circle    := (Color => "red       ", Radius => 5.0);
   R : Rectangle := (Color => "blue      ", Width => 3.0, Height => 4.0);
begin
   Put_Line (Float'Image (Area (C)));  -- 78.53975
   Put_Line (Float'Image (Area (R)));  -- 12.0
end Main;
```

## Gotchas

- Tagged types must be declared in a package — local tagged types are not allowed to have primitive operations.
- Primitive operations are subprograms declared **in the same package** as the tagged type, with the type as a parameter.
- Use `'Class` (class-wide type) for dynamic dispatch: `procedure Process (S : in out Shape'Class)`.
- Ada's access types (`access Shape`) are needed to store tagged objects polymorphically (to avoid storage constraint issues with extended types).
