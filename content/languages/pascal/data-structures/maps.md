---
title: "Maps & Dictionaries"
language: "pascal"
feature: "maps"
category: "data-structures"
applicable: true
---

Classic Pascal has no built-in map or dictionary type. Free Pascal provides `TFPHashTable`, `TFPHashList`, and the generic `TFPGMap<K,V>` in the `fgl` unit. The `Contnrs` unit offers `TObjectList` and `TStringList` (which has a key=value mode). For modern code, `TFPGMap` or `TDictionary` (available in newer FPC via `Generics.Collections`) are the idiomatic choices.

## Example

```pascal
program MapsDemo;

uses
  Generics.Collections;   // Free Pascal 3.2+

var
  scores: TDictionary<String, Integer>;
  pair:   TPair<String, Integer>;
  value:  Integer;

begin
  scores := TDictionary<String, Integer>.Create;
  try
    // Insert
    scores.Add('Alice', 95);
    scores.Add('Bob',   87);
    scores['Carol'] := 92;   // insert or update

    // Access
    WriteLn(scores['Alice']);           // 95

    // Safe access
    if scores.TryGetValue('Dave', value) then
      WriteLn(value)
    else
      WriteLn('Dave not found');

    // Contains
    WriteLn(scores.ContainsKey('Bob'));  // True

    // Iteration
    for pair in scores do
      WriteLn(pair.Key, ': ', pair.Value);

    // Count and removal
    WriteLn(scores.Count);   // 3
    scores.Remove('Bob');
    WriteLn(scores.Count);   // 2
  finally
    scores.Free;
  end;
end.
```

## Gotchas

- `TDictionary` requires `Generics.Collections`, available in Free Pascal 3.2+ and Delphi.
- Always free dictionary instances with `Free` (or wrap in `try/finally`) to avoid memory leaks.
- Accessing a missing key with `[]` in `TDictionary` raises an `EListError`; use `TryGetValue` for safe access.
- `TStringList` in key=value mode (`Values['key']`) is simpler but slower (linear search) and string-only.
