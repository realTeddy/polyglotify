---
title: "Operators"
language: "ada"
feature: "operators"
category: "basics"
applicable: true
---

Ada provides standard arithmetic (`+`, `-`, `*`, `/`, `**`, `mod`, `rem`, `abs`), relational (`=`, `/=`, `<`, `>`, `<=`, `>=`), logical (`and`, `or`, `not`, `xor`), and short-circuit (`and then`, `or else`) operators. String concatenation uses `&`. No operator overloading by default — user can define it in packages.

## Example

```ada
with Ada.Text_IO;         use Ada.Text_IO;
with Ada.Integer_Text_IO; use Ada.Integer_Text_IO;

procedure Operators_Demo is
   A : Integer := 17;
   B : Integer := 5;
   X : Float   := 2.5;
   Y : Float   := 4.0;
begin
   -- Arithmetic
   Put (A + B);  New_Line;   -- 22
   Put (A - B);  New_Line;   -- 12
   Put (A * B);  New_Line;   -- 85
   Put (A / B);  New_Line;   -- 3 (integer division)
   Put (A mod B); New_Line;  -- 2
   Put (A rem B); New_Line;  -- 2 (rem vs mod differ for negatives)
   Put_Line (Integer'Image (2 ** 10));  -- 1024
   Put_Line (Integer'Image (abs (-42))); -- 42

   -- Float arithmetic
   Put_Line (Float'Image (X * Y));     -- 10.0
   Put_Line (Float'Image (Y ** 2.0));  -- 16.0

   -- Comparison (result is Boolean)
   if A > B then
      Put_Line ("A is greater");
   end if;
   Put_Line (Boolean'Image (A /= B));  -- TRUE

   -- Logical operators
   Put_Line (Boolean'Image (True and False)); -- FALSE
   Put_Line (Boolean'Image (True or False));  -- TRUE
   Put_Line (Boolean'Image (not True));       -- FALSE

   -- Short-circuit (safe: second operand not evaluated if not needed)
   if B /= 0 and then A / B > 2 then
      Put_Line ("quotient > 2");
   end if;

   -- String concatenation
   Put_Line ("Hello" & ", " & "Ada!");
end Operators_Demo;
```

## Gotchas

- `mod` and `rem` differ for negative operands: `mod` result has the sign of the divisor; `rem` has the sign of the dividend.
- `**` (exponentiation) requires the right operand to be a `Natural` for integer bases, or any real for float bases.
- `and`, `or`, `xor` are NOT short-circuit — both sides are always evaluated. Use `and then` / `or else` for short-circuit.
- Operator `/=` means "not equal" (not `!=` as in C-family languages).
