---
title: "Sets"
language: "pascal"
feature: "sets"
category: "data-structures"
applicable: true
---

Pascal has a built-in `set of` type for small ordinal sets. A set stores a subset of an ordinal type (enum, subrange, or `Byte`); membership is stored as a bitmask. Set operations are `+` (union), `-` (difference), `*` (intersection), `=`, `<=`, `>=` (subset/superset), and `in`. The base type is limited to at most 256 values. For larger sets, use a dynamic array or bitset from the `SysUtils`/community libraries.

## Example

```pascal
program SetsDemo;

type
  TDay = (Mon, Tue, Wed, Thu, Fri, Sat, Sun);
  TDaySet = set of TDay;

var
  workDays, weekend, allDays, overlap: TDaySet;
  d: TDay;

begin
  workDays := [Mon, Tue, Wed, Thu, Fri];
  weekend  := [Sat, Sun];
  allDays  := workDays + weekend;  // union

  WriteLn(Wed in workDays);         // True
  WriteLn(Sat in workDays);         // False

  // Difference
  var noWed: TDaySet := workDays - [Wed];
  WriteLn(Wed in noWed);            // False

  // Intersection
  overlap := workDays * allDays;
  WriteLn(overlap = workDays);      // True (workDays is a subset)

  // Subset check
  WriteLn(weekend <= allDays);      // True

  // Iteration over set (iterate the base type, check membership)
  Write('Work days: ');
  for d := Mon to Sun do
    if d in workDays then
      Write(Ord(d), ' ');
  WriteLn;

  // include / exclude procedures
  Include(workDays, Sat);
  Exclude(workDays, Mon);
  WriteLn(Sat in workDays);  // True
  WriteLn(Mon in workDays);  // False
end.
```

## Gotchas

- Pascal sets are limited to ordinal types with at most 256 values; you cannot make a `set of Integer` or `set of String`.
- The storage is always a bitmask — a `set of Byte` uses 32 bytes regardless of how many members are present.
- There is no way to iterate over only the members of a set without iterating the entire base type.
- `Include` and `Exclude` are procedures (not operators) available in Free Pascal and Delphi.
