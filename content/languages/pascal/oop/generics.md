---
title: "Generics"
language: "pascal"
feature: "generics"
category: "oop"
applicable: true
---

Free Pascal 2.2+ and Delphi support generics for classes, records, interfaces, and functions. The syntax uses angle brackets: `TStack<T>`. Generic constraints are limited (Free Pascal supports `class` and specific class constraints). The `Generics.Collections` unit provides generic `TList<T>`, `TDictionary<K,V>`, `TQueue<T>`, and `TStack<T>`.

## Example

```pascal
program GenericsDemo;

uses Generics.Collections, SysUtils;

// Generic stack class
type
  TStack<T> = class
  private
    FData: TList<T>;
  public
    constructor Create;
    destructor  Destroy; override;
    procedure Push(const item: T);
    function  Pop: T;
    function  Peek: T;
    property  Count: Integer read (FData.Count);
  end;

constructor TStack<T>.Create;
begin
  inherited Create;
  FData := TList<T>.Create;
end;

destructor TStack<T>.Destroy;
begin
  FData.Free;
  inherited;
end;

procedure TStack<T>.Push(const item: T);
begin
  FData.Add(item);
end;

function TStack<T>.Pop: T;
begin
  if FData.Count = 0 then raise Exception.Create('Stack underflow');
  Result := FData.Last;
  FData.Delete(FData.Count - 1);
end;

function TStack<T>.Peek: T;
begin
  if FData.Count = 0 then raise Exception.Create('Stack empty');
  Result := FData.Last;
end;

// Generic function
function Max<T>(a, b: T): T;
begin
  if a > b then Result := a else Result := b;
end;

var
  si: TStack<Integer>;
  ss: TStack<String>;
begin
  si := TStack<Integer>.Create;
  try
    si.Push(1); si.Push(2); si.Push(3);
    WriteLn(si.Pop);    // 3
    WriteLn(si.Count);  // 2
  finally
    si.Free;
  end;

  ss := TStack<String>.Create;
  try
    ss.Push('hello'); ss.Push('world');
    WriteLn(ss.Pop);    // world
  finally
    ss.Free;
  end;

  WriteLn(Max<Integer>(3, 7));   // 7
end.
```

## Gotchas

- Free Pascal generics require `{$mode Delphi}` or `{$mode ObjFPC}` with `{$modeswitch advancedrecords}` in some cases.
- Generic constraints are limited in Free Pascal; you cannot constrain `T` to types that implement a specific interface as easily as in C# or Java.
- Generic functions (`function Max<T>`) work in Delphi but are less well-supported in older Free Pascal versions.
- Instantiating a generic class creates a specialised copy at compile time, not a type-erased version as in Java.
