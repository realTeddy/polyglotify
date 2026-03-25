---
title: "Exceptions & Try/Catch"
language: "ada"
feature: "exceptions"
category: "error-handling"
applicable: true
---

Ada has a comprehensive exception mechanism. Exceptions are declared, raised with `raise`, and handled in `exception` sections of blocks or subprograms. The predefined exceptions are `Constraint_Error`, `Program_Error`, `Storage_Error`, and `Tasking_Error`. Exception information is available via `Ada.Exceptions`.

## Example

```ada
with Ada.Text_IO;   use Ada.Text_IO;
with Ada.Exceptions; use Ada.Exceptions;

procedure Exception_Demo is

   -- Declare custom exceptions
   Invalid_Input  : exception;
   Database_Error : exception;

   function Parse_Positive (S : String) return Positive is
   begin
      declare
         N : Integer := Integer'Value (S);  -- raises Constraint_Error if invalid
      begin
         if N <= 0 then
            raise Invalid_Input with "Must be positive, got: " & S;
         end if;
         return N;
      end;
   exception
      when Constraint_Error =>
         raise Invalid_Input with "Not a valid integer: " & S;
   end Parse_Positive;

   procedure Risky_Operation is
   begin
      raise Database_Error with "Connection refused";
   end Risky_Operation;

begin
   -- Basic exception handling
   begin
      Put_Line (Positive'Image (Parse_Positive ("42")));
   exception
      when E : Invalid_Input =>
         Put_Line ("Error: " & Exception_Message (E));
   end;

   begin
      Put_Line (Positive'Image (Parse_Positive ("-5")));
   exception
      when E : Invalid_Input =>
         Put_Line ("Error: " & Exception_Message (E));
   end;

   -- Handle multiple exceptions
   begin
      Risky_Operation;
   exception
      when E : Database_Error =>
         Put_Line ("DB Error: " & Exception_Message (E));
         Put_Line ("Name: " & Exception_Name (E));
      when others =>
         Put_Line ("Unknown error");
   end;

   -- Re-raise
   begin
      raise Constraint_Error with "test";
   exception
      when Constraint_Error =>
         Put_Line ("Caught, re-raising...");
         raise;  -- re-raise the same exception
   end;

end Exception_Demo;
```

## Gotchas

- `when others =>` is a catch-all — always put it last. Avoid using it to silently swallow errors.
- `Exception_Message(E)` gets the message string; `Exception_Name(E)` gets the exception type name; `Exception_Information(E)` gets both plus traceback (GNAT extension).
- `raise` (bare, without an expression) re-raises the current exception — only valid in an exception handler.
- Ada exceptions are not part of the type system — there is no checked-exception mechanism like Java.
