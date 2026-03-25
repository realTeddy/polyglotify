---
title: "Interfaces & Traits"
language: "pascal"
feature: "interfaces"
category: "oop"
applicable: true
---

Free Pascal and Delphi support COM-style `interface` declarations. An interface defines a set of methods with no implementation. Classes implement interfaces by listing them in the class header. Interface references are reference-counted (like COM); classes that implement interfaces should inherit from `TInterfacedObject` for automatic reference counting. Pascal has no traits.

## Example

```pascal
program InterfacesDemo;

uses SysUtils;

type
  IDrawable = interface
    ['{A1B2C3D4-0000-0000-0000-000000000001}']  // GUID (optional but recommended)
    procedure Draw;
    function  GetArea: Double;
  end;

  IResizable = interface
    ['{A1B2C3D4-0000-0000-0000-000000000002}']
    procedure Resize(factor: Double);
  end;

  TCircle = class(TInterfacedObject, IDrawable, IResizable)
  private
    FRadius: Double;
  public
    constructor Create(r: Double);
    procedure Draw;
    function  GetArea: Double;
    procedure Resize(factor: Double);
  end;

constructor TCircle.Create(r: Double);
begin
  inherited Create;
  FRadius := r;
end;

procedure TCircle.Draw;
begin
  WriteLn(Format('Circle(r=%.2f, area=%.2f)', [FRadius, GetArea]));
end;

function TCircle.GetArea: Double;
begin
  Result := Pi * FRadius * FRadius;
end;

procedure TCircle.Resize(factor: Double);
begin
  FRadius *= factor;
end;

procedure RenderAll(const shapes: array of IDrawable);
var
  s: IDrawable;
begin
  for s in shapes do s.Draw;
end;

var
  c: TCircle;
  d: IDrawable;
begin
  c := TCircle.Create(5.0);
  d := c;                 // interface reference — ref-counted
  d.Draw;
  (d as IResizable).Resize(2.0);
  d.Draw;
end.
```

## Gotchas

- GUIDs (the `['{...}']` syntax) are needed for `QueryInterface` (COM) and `as` type-casting to work; without them, `as` will raise `EIntfCastError`.
- `TInterfacedObject` implements `IUnknown` with reference counting; when all interface references go out of scope, the object is freed automatically.
- Do NOT mix direct `Free` calls and interface references on the same object — double-free will result.
- Pascal interfaces cannot contain fields, constants, or default implementations (unlike modern languages).
