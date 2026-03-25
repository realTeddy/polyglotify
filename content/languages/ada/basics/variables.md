---
title: "Variables & Declaration"
language: "ada"
feature: "variables"
category: "basics"
applicable: true
---

Ada requires explicit variable declarations in a declarative region before the `begin` keyword. Variables have a type and optional initial value. Constants use the `constant` keyword. Ada uses `:=` for assignment. All variables are zero-initialized by default if no initial value is given (numeric types to 0, booleans to False, etc.).

## Example

```ada
with Ada.Text_IO; use Ada.Text_IO;

procedure Variables_Demo is
   -- Variable declarations (before begin)
   X       : Integer;                 -- initialized to 0
   Y       : Integer := 42;
   Name    : String  := "Alice";
   Pi      : constant Float := 3.14159;
   Flag    : Boolean := True;

   -- Multiple variables of same type
   A, B, C : Integer := 0;

   -- Subtype constraint
   Score   : Integer range 0 .. 100 := 85;

begin
   X := 10;           -- assignment
   A := Y + X;
   B := A * 2;

   Put_Line ("X = " & Integer'Image(X));
   Put_Line ("Y = " & Integer'Image(Y));
   Put_Line ("Name = " & Name);
   Put_Line ("Pi = " & Float'Image(Pi));
   Put_Line ("A = " & Integer'Image(A));
end Variables_Demo;
```

## Gotchas

- Ada variables must be declared in the **declarative region** (between `is` and `begin`) — you cannot declare variables in the middle of a block.
- `constant` requires an initial value — `Pi : constant Float;` is a deferred constant (only valid in package specs with completion in body).
- Range-constrained variables (`Score : Integer range 0..100`) raise `Constraint_Error` if assigned an out-of-range value.
- Ada is case-insensitive for identifiers: `MyVar`, `myvar`, and `MYVAR` are the same.
