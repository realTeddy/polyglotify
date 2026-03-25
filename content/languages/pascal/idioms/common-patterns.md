---
title: "Common Patterns"
language: "pascal"
feature: "common-patterns"
category: "idioms"
applicable: true
---

Idiomatic Pascal (particularly Free Pascal/Delphi) patterns include: RAII via `try/finally` + `Free`, the `TObject` hierarchy for all heap objects, `TStringList` for quick key-value storage, `with` statement for record access, property-based encapsulation with `F`-prefixed fields, and the observer/event pattern via procedural types and `TNotifyEvent`.

## Example

```pascal
program PatternsDemo;

{$mode objfpc}{$H+}

uses SysUtils, Classes;

// Pattern 1: RAII with try/finally
procedure ProcessList;
var
  list: TStringList;
begin
  list := TStringList.Create;
  try
    list.Add('apple');
    list.Add('banana');
    list.Sorted := True;
    WriteLn(list.Count, ' items');
    WriteLn(list[0]);   // apple (sorted)
  finally
    list.Free;          // always freed
  end;
end;

// Pattern 2: with statement (record field access)
type TPoint = record X, Y: Double; end;
procedure PrintPoint(const p: TPoint);
begin
  with p do
    WriteLn(X:0:2, ', ', Y:0:2);
end;

// Pattern 3: event/callback via procedural type
type
  TOnChange = procedure(sender: TObject) of object;

  TCounter = class
  private
    FCount: Integer;
    FOnChange: TOnChange;
  public
    procedure Increment;
    property OnChange: TOnChange read FOnChange write FOnChange;
    property Count: Integer read FCount;
  end;

procedure TCounter.Increment;
begin
  Inc(FCount);
  if Assigned(FOnChange) then FOnChange(Self);
end;

// Pattern 4: Singleton
type
  TConfig = class
  private
    class var FInstance: TConfig;
    FDebug: Boolean;
    constructor Create;
  public
    class function Instance: TConfig;
    property Debug: Boolean read FDebug write FDebug;
  end;

constructor TConfig.Create; begin inherited; FDebug := False; end;
class function TConfig.Instance: TConfig;
begin
  if not Assigned(FInstance) then FInstance := TConfig.Create;
  Result := FInstance;
end;

begin
  ProcessList;

  var p: TPoint; p.X := 3; p.Y := 4;
  PrintPoint(p);

  TConfig.Instance.Debug := True;
  WriteLn(TConfig.Instance.Debug);  // True
end.
```

## Gotchas

- `with` statements can cause name-shadowing bugs when the record/object has fields with common names — use them cautiously.
- Always check `Assigned(callback)` before calling a procedural-type variable; calling an unassigned (`nil`) procedure crashes.
- Class variables (`class var`) are shared across all instances and must be initialised before first use (they are `nil`/0 by default).
- `TStringList` is O(n) for lookup; use `TDictionary` from `Generics.Collections` for frequent key-based access.
