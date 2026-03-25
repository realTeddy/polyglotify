---
title: "Closures & Lambdas"
language: "ada"
feature: "closures"
category: "functions"
applicable: false
---

Ada has no closures or anonymous functions in the traditional sense. Ada 2012 added anonymous access-to-subprogram types, enabling function pointers as parameters. Nested subprograms can access enclosing scope variables but cannot be returned (they do not survive the enclosing scope). Ada's equivalent pattern uses tagged types with dispatching.

## Example

```ada
with Ada.Text_IO;         use Ada.Text_IO;
with Ada.Integer_Text_IO; use Ada.Integer_Text_IO;

procedure Closures_Demo is

   -- Access-to-procedure type (function pointer)
   type Int_Transform is access function (X : Integer) return Integer;

   function Double (X : Integer) return Integer is (X * 2);
   function Square (X : Integer) return Integer is (X * X);

   -- Higher-order procedure using access-to-function
   procedure Apply_To_Range (F    : Int_Transform;
                             From, To : Integer) is
   begin
      for I in From .. To loop
         Put (F (I)); Put (' ');
      end loop;
      New_Line;
   end Apply_To_Range;

   -- Nested subprogram (accesses enclosing scope, but cannot be returned)
   Base : Integer := 10;

   function Add_Base (X : Integer) return Integer is
   begin
      return X + Base;  -- accesses enclosing Base
   end Add_Base;

begin
   Apply_To_Range (Double'Access, 1, 5);  -- 2 4 6 8 10
   Apply_To_Range (Square'Access, 1, 5);  -- 1 4 9 16 25

   Put (Add_Base (5)); New_Line;  -- 15

   -- Change captured variable
   Base := 100;
   Put (Add_Base (5)); New_Line;  -- 105 (sees updated Base)
end Closures_Demo;
```

## Gotchas

- Nested functions in Ada can access enclosing scope variables but **cannot be passed out** of that scope as access values (this would dangerously reference a potentially-deallocated frame).
- `'Access` gives an access-to-subprogram value; `'Unrestricted_Access` bypasses the accessibility check but is unsafe.
- Ada has no lambda/anonymous function syntax — you must declare a named subprogram even for simple operations.
- For closure-like patterns, use tagged types with `Dispatch` or pass state explicitly via additional `in` parameters.
