---
title: "Async/Await"
language: "ada"
feature: "async-await"
category: "concurrency"
applicable: false
---

Ada has no async/await syntax. Ada's concurrency model is based on **tasks** and **protected objects**, which are language-level constructs (not a library). Tasks run concurrently with the rest of the program from the point of their elaboration. Synchronization is through **rendezvous** (entry calls and `accept` statements) and **protected objects** (monitors).

## Example

```ada
with Ada.Text_IO; use Ada.Text_IO;

procedure Async_Demo is

   -- An Ada task (runs concurrently — like a "thread" or "goroutine")
   task Worker is
      entry Start (N : Integer);  -- rendezvous entry point
   end Worker;

   task body Worker is
      Local_N : Integer;
   begin
      -- Wait for Start to be called
      accept Start (N : Integer) do
         Local_N := N;
      end Start;

      -- Do async work
      for I in 1 .. Local_N loop
         Put_Line ("Working: " & Integer'Image (I));
      end loop;
   end Worker;

begin
   -- Calling entry is like "await" — blocks until the task accepts
   Worker.Start (5);
   Put_Line ("Main: task started, continuing...");
   -- Task runs concurrently; main waits for it at end of scope
   Put_Line ("Main: done");
   -- Worker finishes before the procedure exits
end Async_Demo;
```

## Gotchas

- Ada tasks start automatically when their enclosing scope is elaborated — there is no explicit "spawn".
- Entry calls block the caller until the called task is ready to accept (synchronous rendezvous by default).
- `select` statements allow non-blocking entry calls and timed alternatives (`select ... or delay ...`).
- Tasks are language constructs, not libraries — this makes them safer and more analyzable than OS threads.
