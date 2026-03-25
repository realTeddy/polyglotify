---
title: "Channels & Message Passing"
language: "ada"
feature: "channels"
category: "concurrency"
applicable: true
---

Ada tasks communicate via **rendezvous** — a synchronous meeting where the caller and callee exchange data. The calling task blocks until the called task executes an `accept` for the entry. Protected objects provide asynchronous shared-data communication. `select` enables non-blocking and multi-entry waiting.

## Example

```ada
with Ada.Text_IO; use Ada.Text_IO;

procedure Channels_Demo is

   -- Task with entry points (like a typed message queue)
   task type Channel (Capacity : Natural) is
      entry Send (Item : Integer);
      entry Receive (Item : out Integer);
      entry Close;
   end Channel;

   -- Simple bounded buffer using protected object
   protected type Bounded_Buffer (Max : Positive) is
      entry Put (Item : Integer);
      entry Get (Item : out Integer);
   private
      Data  : array (1 .. Max) of Integer := (others => 0);
      Count : Natural := 0;
      Head  : Positive := 1;
      Tail  : Positive := 1;
   end Bounded_Buffer;

   protected body Bounded_Buffer is
      entry Put (Item : Integer) when Count < Max is
      begin
         Data (Tail) := Item;
         Tail  := (Tail mod Max) + 1;
         Count := Count + 1;
      end Put;

      entry Get (Item : out Integer) when Count > 0 is
      begin
         Item := Data (Head);
         Head  := (Head mod Max) + 1;
         Count := Count - 1;
      end Get;
   end Bounded_Buffer;

   Buffer : Bounded_Buffer (5);

   task Producer;
   task Consumer;

   task body Producer is
   begin
      for I in 1 .. 5 loop
         Buffer.Put (I * 10);
         Put_Line ("Produced: " & Integer'Image (I * 10));
      end loop;
   end Producer;

   task body Consumer is
      V : Integer;
   begin
      for I in 1 .. 5 loop
         Buffer.Get (V);
         Put_Line ("Consumed: " & Integer'Image (V));
      end loop;
   end Consumer;

begin
   null;  -- tasks run and complete before end
end Channels_Demo;
```

## Gotchas

- Protected entry guards (`when condition`) cause the caller to block until the condition is true — this is how backpressure works.
- `select` with `accept` allows a task to wait on multiple entry calls simultaneously (like Go's `select`).
- Rendezvous is synchronous — caller and callee both block until the `accept` body completes.
- `select ... or delay 1.0 => ...` provides timed entry calls — the task continues after the timeout if no entry arrives.
