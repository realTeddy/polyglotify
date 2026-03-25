---
title: "Variables & Declaration"
language: "pascal"
feature: "variables"
category: "basics"
applicable: true
---

Pascal requires all variables to be declared in a `var` section before the code block that uses them. Variables are statically typed, explicitly declared, and zero-initialised by default in most Pascal compilers (Free Pascal initialises global variables; local variables may be uninitialised). Constants are declared in a `const` section and may use typed or untyped forms.

## Example

```pascal
program VariablesDemo;

const
  MaxSize = 100;           // untyped constant
  Pi: Double = 3.14159;   // typed constant (Free Pascal)

var
  name: String;
  age: Integer;
  score: Double;
  active: Boolean;
  initial: Char;

begin
  name    := 'Alice';
  age     := 30;
  score   := 95.5;
  active  := True;
  initial := 'A';

  WriteLn(name, ' is ', age, ' years old.');
  WriteLn('Score: ', score:0:2);
  WriteLn('Active: ', active);
  WriteLn('Initial: ', initial);
  WriteLn('MaxSize: ', MaxSize);
end.
```

## Gotchas

- Pascal uses `:=` for assignment; `=` is used only for comparisons and constant definitions.
- All variables must be declared before the `begin` of the block; you cannot declare them inline.
- Local variables in procedures/functions are not automatically zero-initialised in all Pascal dialects — always assign before use.
- Free Pascal (FPC) extends Pascal with `type` aliases, record helpers, and generics beyond the classic ISO standard.
