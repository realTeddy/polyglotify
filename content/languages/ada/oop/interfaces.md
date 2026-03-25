---
title: "Interfaces & Traits"
language: "ada"
feature: "interfaces"
category: "oop"
applicable: true
---

Ada 2005 introduced **interface types** as a way to define pure abstract contracts. An interface type has no data fields and only abstract operations. Concrete types implement an interface by inheriting from it (alongside a tagged record base, if any). Multiple interface inheritance is supported.

## Example

```ada
-- interfaces.ads
package Interfaces_Demo is

   -- Interface types (no record fields)
   type Printable is interface;
   function To_String (P : Printable) return String is abstract;

   type Comparable is interface;
   function Less_Than (A, B : Comparable) return Boolean is abstract;

   -- A type implementing multiple interfaces
   type Priority_Task is
      new Printable and Comparable with record
         Name     : String (1 .. 30) := (others => ' ');
         Priority : Natural := 0;
      end record;

   function To_String (T : Priority_Task) return String;
   function Less_Than (A, B : Priority_Task) return Boolean;

   -- A procedure that works on any Printable
   procedure Print_All (Items : in out some_container);  -- illustrative

end Interfaces_Demo;

package body Interfaces_Demo is

   function To_String (T : Priority_Task) return String is
      (T.Name & " (priority: " & Natural'Image (T.Priority) & ")");

   function Less_Than (A, B : Priority_Task) return Boolean is
      (A.Priority < B.Priority);

end Interfaces_Demo;

-- Usage
with Ada.Text_IO; use Ada.Text_IO;
with Interfaces_Demo; use Interfaces_Demo;

procedure Use_Interface is
   T1 : Priority_Task := (Name => "Task A" & (others => ' '), Priority => 5);
   T2 : Priority_Task := (Name => "Task B" & (others => ' '), Priority => 3);

   procedure Show (P : Printable'Class) is
   begin
      Put_Line (To_String (P));
   end Show;
begin
   Show (T1);   -- dispatches to Priority_Task's To_String
   Put_Line (Boolean'Image (Less_Than (T1, T2)));  -- FALSE
end Use_Interface;
```

## Gotchas

- Interface types have no fields and must not have non-abstract operations (except those with defaults).
- A type can inherit from one tagged record type and any number of interface types: `type T is new Base and Iface1 and Iface2 with record ...`.
- Interface operations can have default implementations (Ada 2012): `function Op (X : Iface) return T is (default_expr)`.
- Interfaces in Ada provide a proper contract mechanism — a common request in safety-critical systems.
