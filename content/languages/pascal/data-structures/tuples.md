---
title: "Tuples"
language: "pascal"
feature: "tuples"
category: "data-structures"
applicable: false
---

Pascal has no tuple type. The closest equivalent is a `record` (struct), which provides named fields and is a value type like a tuple. Records are declared in the `type` section and can group heterogeneous values. Free Pascal 3.x does not add a generic tuple type, but anonymous record literals (using `record ... end` inline) can serve the same purpose in some contexts.

## Example

```pascal
program TuplesDemo;

// Use a record as a tuple equivalent
type
  TIntPair = record
    First, Second: Integer;
  end;

  TNameAge = record
    Name: String;
    Age:  Integer;
  end;

function DivMod(a, b: Integer): TIntPair;
begin
  Result.First  := a div b;
  Result.Second := a mod b;
end;

function MakePerson(const name: String; age: Integer): TNameAge;
begin
  Result.Name := name;
  Result.Age  := age;
end;

var
  dr: TIntPair;
  p:  TNameAge;
begin
  dr := DivMod(17, 5);
  WriteLn(dr.First, ' remainder ', dr.Second);   // 3 remainder 2

  p := MakePerson('Alice', 30);
  WriteLn(p.Name, ' is ', p.Age);                // Alice is 30

  // out parameters as an alternative to tuples
  // procedure Swap(var a, b: Integer) serves as a 2-tuple return
end.
```

## Gotchas

- Records must be declared in a `type` section with a name — there are no anonymous tuple literals in standard Pascal.
- Returning a record from a function copies the entire record; for large records, pass a `var` parameter instead.
- Free Pascal supports `record ... end` type expressions inline in some contexts (e.g., local type declarations inside procedures), but they are still named and not truly anonymous.
- If you need multiple return values, `var`/`out` parameters are often simpler than defining a dedicated record type.
