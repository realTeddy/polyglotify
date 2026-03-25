---
title: "Result Types"
language: "ada"
feature: "result-types"
category: "error-handling"
applicable: false
---

Ada does not have a built-in Result type. Ada's primary error mechanism is exceptions. For functions where failure is expected (not exceptional), the idiomatic approach uses `out` parameters for a success flag, variant records as tagged status values, or returning an optional-like discriminant record.

## Example

```ada
with Ada.Text_IO;         use Ada.Text_IO;
with Ada.Integer_Text_IO; use Ada.Integer_Text_IO;

procedure Result_Types_Demo is

   -- Pattern 1: out Boolean parameter
   procedure Safe_Divide (A, B : Integer; Q : out Integer; Ok : out Boolean) is
   begin
      if B = 0 then
         Q  := 0;
         Ok := False;
      else
         Q  := A / B;
         Ok := True;
      end if;
   end Safe_Divide;

   -- Pattern 2: Discriminant record (like a Result/Option type)
   type Maybe_Int (Has_Value : Boolean := False) is record
      case Has_Value is
         when True  => Value : Integer;
         when False => null;
      end case;
   end record;

   function Find_First_Positive (Arr : array (Positive range <>) of Integer)
      return Maybe_Int is
   begin
      for X of Arr loop
         if X > 0 then
            return (Has_Value => True, Value => X);
         end if;
      end loop;
      return (Has_Value => False);
   end Find_First_Positive;

   Q     : Integer;
   Ok    : Boolean;
   Input : array (1 .. 5) of Integer := (-3, -1, 0, 5, 8);
   Found : Maybe_Int;

begin
   Safe_Divide (10, 3, Q, Ok);
   if Ok then
      Put_Line ("Result: " & Integer'Image (Q));
   else
      Put_Line ("Division failed");
   end if;

   Safe_Divide (10, 0, Q, Ok);
   if not Ok then
      Put_Line ("Division by zero");
   end if;

   Found := Find_First_Positive (Input);
   if Found.Has_Value then
      Put_Line ("First positive: " & Integer'Image (Found.Value));
   else
      Put_Line ("No positive found");
   end if;
end Result_Types_Demo;
```

## Gotchas

- Discriminant records provide a compile-time-checked way to represent optional/result values, but require accessing the discriminant before the variant field.
- There is no standard `Optional` or `Result` type in the Ada standard library — each project defines its own.
- The community package `Ada_Literate` and frameworks like GNAT.Strings provide some optional types.
- Exceptions remain the idiomatic Ada approach for error propagation — Result types are a pattern borrowed from functional languages.
