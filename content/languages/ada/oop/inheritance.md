---
title: "Inheritance"
language: "ada"
feature: "inheritance"
category: "oop"
applicable: true
---

Ada supports single inheritance through **type extension**: `type Child is new Parent with record ... end record`. Extended types inherit all parent operations and can override them. Abstract types (`abstract tagged`) force subclasses to implement abstract operations. Multiple inheritance of interfaces is supported via multiple `interface` types.

## Example

```ada
with Ada.Text_IO; use Ada.Text_IO;

package Animals is

   -- Abstract base type
   type Animal is abstract tagged record
      Name : String (1 .. 20) := (others => ' ');
   end record;

   function Speak (A : Animal) return String is abstract;
   function Num_Legs (A : Animal) return Natural is abstract;

   procedure Introduce (A : Animal'Class);

   -- Concrete child type
   type Dog is new Animal with record
      Breed : String (1 .. 20) := (others => ' ');
   end record;

   function Speak (D : Dog) return String;
   function Num_Legs (D : Dog) return Natural;

   type Bird is new Animal with record
      Can_Fly : Boolean := True;
   end record;

   function Speak (B : Bird) return String;
   function Num_Legs (B : Bird) return Natural;

end Animals;

package body Animals is

   procedure Introduce (A : Animal'Class) is
   begin
      Put_Line ("I am " & A.Name & ". " & Speak (A) &
                " I have " & Natural'Image (Num_Legs (A)) & " legs.");
   end Introduce;

   function Speak (D : Dog) return String is ("Woof!");
   function Num_Legs (D : Dog) return Natural is (4);

   function Speak (B : Bird) return String is ("Tweet!");
   function Num_Legs (B : Bird) return Natural is (2);

end Animals;
```

## Gotchas

- Ada supports **single inheritance** for tagged record types (one parent).
- To override a parent operation, declare a new primitive with the same name and parameter profile in the child's package.
- `A'Class` (class-wide type) enables dynamic dispatch — operations on `Animal'Class` dispatch to the actual runtime type.
- `Parent_Type (Child_Value)` converts upward (view conversion); downward conversions require explicit conversion and raise `Constraint_Error` if wrong.
