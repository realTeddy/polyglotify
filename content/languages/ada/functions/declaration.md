---
title: "Function Declaration"
language: "ada"
feature: "declaration"
category: "functions"
applicable: true
---

Ada distinguishes **procedures** (no return value) and **functions** (return a value). Both are declared with a specification and a body. Functions must have a return type and use `return` to produce a value. Subprograms can be declared in packages (spec + body separated), or as nested subprograms.

## Example

```ada
with Ada.Text_IO;         use Ada.Text_IO;
with Ada.Integer_Text_IO; use Ada.Integer_Text_IO;

procedure Function_Demo is

   -- Function specification and body together (local)
   function Square (N : Integer) return Integer is
   begin
      return N * N;
   end Square;

   function Max (A, B : Integer) return Integer is
   begin
      if A >= B then
         return A;
      else
         return B;
      end if;
   end Max;

   -- Procedure (no return value)
   procedure Print_Greeting (Name : String) is
   begin
      Put_Line ("Hello, " & Name & "!");
   end Print_Greeting;

   -- Expression function (Ada 2012+)
   function Double (N : Integer) return Integer is (N * 2);
   function Is_Even (N : Integer) return Boolean is (N mod 2 = 0);

   Result : Integer;

begin
   Result := Square (7);
   Put (Result); New_Line;   -- 49

   Put (Max (3, 8)); New_Line;   -- 8

   Print_Greeting ("Ada");

   Put (Double (5)); New_Line;   -- 10
   Put_Line (Boolean'Image (Is_Even (4)));  -- TRUE
end Function_Demo;
```

## Gotchas

- Functions must end with a `return` statement on all paths — the compiler checks for missing returns.
- Ada functions are **pure** by convention — they should not modify `out` parameters or global state (though Ada allows it).
- Expression functions `function F(X : T) return T is (expr)` are available since Ada 2012.
- Separating specification from body (in package spec vs. body) requires the spec to precede any use of the subprogram.
