---
title: "Maps & Dictionaries"
language: "ada"
feature: "maps"
category: "data-structures"
applicable: true
---

Ada provides maps via `Ada.Containers.Hashed_Maps` (hash-based) and `Ada.Containers.Ordered_Maps` (tree-based, ordered by key). Both are generic packages that must be instantiated with key and element types. They are mutable containers with cursor-based iteration.

## Example

```ada
with Ada.Text_IO;                   use Ada.Text_IO;
with Ada.Integer_Text_IO;           use Ada.Integer_Text_IO;
with Ada.Strings.Unbounded;         use Ada.Strings.Unbounded;
with Ada.Containers.Hashed_Maps;
with Ada.Strings.Unbounded.Hash;

procedure Maps_Demo is

   -- Instantiate a String -> Integer hashed map
   package Score_Maps is new Ada.Containers.Hashed_Maps
      (Key_Type        => Unbounded_String,
       Element_Type    => Integer,
       Hash            => Ada.Strings.Unbounded.Hash,
       Equivalent_Keys => "=");
   use Score_Maps;

   Scores : Map;
   Cursor : Score_Maps.Cursor;

begin
   -- Insert
   Scores.Insert (To_Unbounded_String ("Alice"), 95);
   Scores.Insert (To_Unbounded_String ("Bob"),   82);
   Scores.Insert (To_Unbounded_String ("Carol"), 88);

   -- Lookup
   declare
      Key : Unbounded_String := To_Unbounded_String ("Alice");
   begin
      if Scores.Contains (Key) then
         Put (Scores.Element (Key)); New_Line;  -- 95
      end if;
   end;

   -- Update
   Scores.Replace (To_Unbounded_String ("Bob"), 90);

   -- Delete
   Scores.Delete (To_Unbounded_String ("Carol"));

   -- Iterate
   Cursor := Scores.First;
   while Cursor /= No_Element loop
      Put_Line (To_String (Key (Cursor)) & ": " &
                Integer'Image (Element (Cursor)));
      Next (Cursor);
   end loop;

   Put_Line ("Size: " & Integer'Image (Integer (Scores.Length)));
end Maps_Demo;
```

## Gotchas

- You must provide a `Hash` function and `Equivalent_Keys` function when instantiating `Hashed_Maps`.
- `Ordered_Maps` requires a `<` ordering function instead of a hash function.
- Accessing a missing key with `Element` raises `Constraint_Error` — always use `Contains` first or `Find`.
- `Insert` raises `Constraint_Error` if the key already exists — use `Include` to insert-or-replace, or `Replace` to update.
