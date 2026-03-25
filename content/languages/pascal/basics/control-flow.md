---
title: "Control Flow"
language: "pascal"
feature: "control-flow"
category: "basics"
applicable: true
---

Pascal provides `if`/`then`/`else`, `case`/`of` (exhaustive switch), `for`/`to`/`downto`/`do`, `while`/`do`, `repeat`/`until`, and `goto`. There is no `break` in standard Pascal for loops (Free Pascal adds `Break` and `Continue` as procedures). All control structures work on single statements; use `begin`/`end` blocks for multiple statements.

## Example

```pascal
program ControlFlowDemo;

var
  i, n: Integer;
  day: Integer;

begin
  n := 5;

  // if / then / else
  if n > 0 then
    WriteLn('positive')
  else if n < 0 then
    WriteLn('negative')
  else
    WriteLn('zero');

  // for loop (always increments by 1)
  for i := 1 to 5 do
    Write(i, ' ');
  WriteLn;

  // for downto
  for i := 5 downto 1 do
    Write(i, ' ');
  WriteLn;

  // while
  i := 0;
  while i < 5 do
  begin
    Write(i, ' ');
    Inc(i);
  end;
  WriteLn;

  // repeat / until (always executes at least once)
  i := 0;
  repeat
    Write(i, ' ');
    Inc(i);
  until i >= 5;
  WriteLn;

  // case / of
  day := 3;
  case day of
    1: WriteLn('Monday');
    2: WriteLn('Tuesday');
    3: WriteLn('Wednesday');
    4, 5: WriteLn('Thu or Fri');
    6..7: WriteLn('Weekend');
  else
    WriteLn('Invalid');
  end;
end.
```

## Gotchas

- A semicolon before `else` is a syntax error in Pascal — `else` attaches directly to the preceding `then` clause without a separating semicolon.
- `for` loops in classic Pascal must step by exactly +1 (`to`) or -1 (`downto`); arbitrary steps require a `while` loop.
- `repeat`/`until` is a post-condition loop — the body always runs at least once, unlike `while`.
- Free Pascal's `Break` and `Continue` are built-in procedures; they are not keywords in ISO Pascal.
