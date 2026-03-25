---
title: "Generics"
language: "ada"
feature: "generics"
category: "oop"
applicable: true
---

Ada has a powerful generics system. Generic units (packages, procedures, functions) are parameterized by types, subprograms, and objects. Generics are instantiated explicitly to produce concrete versions. Generic formal parameters can constrain the acceptable types using signatures (`<>`, `limited`, `private`, `tagged`, `(<>)` for any discrete type, etc.).

## Example

```ada
-- A generic stack package
generic
   type Element_Type is private;   -- any non-limited type
   Max_Size : Positive := 100;
package Generic_Stack is

   type Stack is limited private;

   procedure Push (S : in out Stack; Item : Element_Type);
   procedure Pop  (S : in out Stack; Item : out Element_Type);
   function Is_Empty (S : Stack) return Boolean;
   function Size (S : Stack) return Natural;

   Stack_Empty : exception;
   Stack_Full  : exception;

private
   type Array_Type is array (1 .. Max_Size) of Element_Type;
   type Stack is record
      Data : Array_Type;
      Top  : Natural := 0;
   end record;

end Generic_Stack;

package body Generic_Stack is

   procedure Push (S : in out Stack; Item : Element_Type) is
   begin
      if S.Top = Max_Size then raise Stack_Full; end if;
      S.Top := S.Top + 1;
      S.Data (S.Top) := Item;
   end Push;

   procedure Pop (S : in out Stack; Item : out Element_Type) is
   begin
      if S.Top = 0 then raise Stack_Empty; end if;
      Item := S.Data (S.Top);
      S.Top := S.Top - 1;
   end Pop;

   function Is_Empty (S : Stack) return Boolean is (S.Top = 0);
   function Size (S : Stack) return Natural is (S.Top);

end Generic_Stack;

-- Instantiation
with Ada.Text_IO;         use Ada.Text_IO;
with Ada.Integer_Text_IO; use Ada.Integer_Text_IO;
with Generic_Stack;

procedure Generics_Demo is
   package Int_Stack is new Generic_Stack (Element_Type => Integer);
   use Int_Stack;

   S : Stack;
   V : Integer;
begin
   Push (S, 10);
   Push (S, 20);
   Push (S, 30);

   Put (Integer (Size (S))); New_Line;  -- 3

   Pop (S, V);
   Put (V); New_Line;   -- 30
end Generics_Demo;
```

## Gotchas

- Generics in Ada are **instantiated** (expanded at compile time) — each instantiation produces a distinct copy.
- Generic formal type parameters carry constraints: `is private` (any type), `is limited private` (including limited types), `is tagged private` (tagged types only), `(<>)` (any discrete type).
- You can also pass subprograms as generic parameters: `with function "<"(A, B : T) return Boolean;`.
- Ada generics are safer than C++ templates — formal parameters are checked at the generic definition, not at instantiation.
