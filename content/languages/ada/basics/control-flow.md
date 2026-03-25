---
title: "Control Flow"
language: "ada"
feature: "control-flow"
category: "basics"
applicable: true
---

Ada provides `if/elsif/else/end if`, `case/when/end case`, `loop`/`exit`, `while loop`, `for loop`, and `goto` (rare). All blocks end with their opening keyword reversed (e.g., `end if`, `end loop`). The `exit when` clause inside loops is the primary way to break out. `exit` without condition is an unconditional break.

## Example

```ada
with Ada.Text_IO; use Ada.Text_IO;

procedure Control_Flow_Demo is
   X   : Integer := 42;
   Day : Integer := 3;
begin
   -- if / elsif / else
   if X > 100 then
      Put_Line ("big");
   elsif X > 10 then
      Put_Line ("medium");      -- prints this
   else
      Put_Line ("small");
   end if;

   -- case statement (exhaustive)
   case Day is
      when 1 => Put_Line ("Monday");
      when 2 => Put_Line ("Tuesday");
      when 3 => Put_Line ("Wednesday");   -- prints this
      when 4 .. 5 => Put_Line ("Thu or Fri");
      when 6 | 7 => Put_Line ("Weekend");
      when others => Put_Line ("Unknown");
   end case;

   -- Basic loop with exit when
   declare
      I : Integer := 1;
   begin
      loop
         exit when I > 5;
         Put_Line (Integer'Image (I));
         I := I + 1;
      end loop;
   end;

   -- While loop
   declare
      N : Integer := 1;
   begin
      while N <= 5 loop
         Put_Line (Integer'Image (N));
         N := N + 1;
      end loop;
   end;

   -- For loop (range)
   for K in 1 .. 5 loop
      Put_Line (Integer'Image (K));
   end loop;

   -- Reverse for loop
   for K in reverse 1 .. 5 loop
      Put_Line (Integer'Image (K));
   end loop;
end Control_Flow_Demo;
```

## Gotchas

- `case` must cover all possible values of the selector — `when others =>` is the catch-all.
- Ada `for` loops iterate over a fixed range determined at loop entry — you cannot change the bounds mid-loop.
- There is no `break`/`continue` — use `exit when` (break) and `if ... then null; else ... end if` or restructuring (continue equivalent).
- Named loops allow `exit Loop_Name when` to break out of nested loops: `Outer: loop ... exit Outer when ...; end loop Outer;`.
