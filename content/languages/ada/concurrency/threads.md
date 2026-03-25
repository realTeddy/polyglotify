---
title: "Threads"
language: "ada"
feature: "threads"
category: "concurrency"
applicable: true
---

Ada's concurrency model uses **tasks** — language-level concurrent units. Tasks are declared like types or objects and run automatically. They are safer than OS threads: the language defines their semantics and synchronization. Protected objects provide mutex-like synchronized shared data. Tasks terminate when their body completes; they are waited for at scope exit.

## Example

```ada
with Ada.Text_IO;    use Ada.Text_IO;
with Ada.Numerics.Float_Random; use Ada.Numerics.Float_Random;

procedure Tasks_Demo is

   -- Protected object — thread-safe shared counter
   protected Counter is
      procedure Increment;
      procedure Decrement;
      function Value return Integer;
   private
      Count : Integer := 0;
   end Counter;

   protected body Counter is
      procedure Increment is begin Count := Count + 1; end;
      procedure Decrement is begin Count := Count - 1; end;
      function Value return Integer is (Count);
   end Counter;

   -- Task type (creates multiple workers)
   task type Worker (Id : Integer);

   task body Worker is
   begin
      for I in 1 .. 100 loop
         Counter.Increment;
      end loop;
      Put_Line ("Worker " & Integer'Image (Id) & " done");
   end Worker;

   -- Declare task objects (they start immediately)
   W1 : Worker (1);
   W2 : Worker (2);
   W3 : Worker (3);

begin
   -- W1, W2, W3 all run concurrently here
   Put_Line ("Main: waiting for workers...");
   -- Tasks complete before leaving the scope
end Tasks_Demo;
-- After end: Put_Line ("Final count: " & Integer'Image (Counter.Value));
-- (illustrative — scope has ended, but Counter.Value would be 300)
```

## Gotchas

- Tasks start when their **enclosing scope is elaborated** — declaring `W1 : Worker(1)` starts the task immediately.
- The enclosing subprogram **waits for all tasks** to complete before it can return — implicit `join`.
- Protected objects are Ada's monitor pattern — all operations are mutually exclusive.
- Avoid shared mutable data outside protected objects — there is no language enforcement (except `SPARK` subset).
- Task termination by exception causes the exception to propagate to the task's master at scope exit.
