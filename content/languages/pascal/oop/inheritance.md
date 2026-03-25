---
title: "Inheritance"
language: "pascal"
feature: "inheritance"
category: "oop"
applicable: true
---

Free Pascal classes support single inheritance. A derived class is declared as `TChild = class(TParent)`. Methods must be explicitly marked `virtual` in the parent and `override` in the child. `inherited` calls the parent's version of the current method. `abstract` methods have no implementation in the parent and force subclasses to provide one.

## Example

```pascal
program InheritanceDemo;

uses SysUtils;

type
  TShape = class
  protected
    FColor: String;
  public
    constructor Create(const color: String);
    function Area: Double; virtual; abstract;
    function Describe: String; virtual;
  end;

  TCircle = class(TShape)
  private
    FRadius: Double;
  public
    constructor Create(const color: String; radius: Double);
    function Area: Double; override;
    function Describe: String; override;
  end;

  TRectangle = class(TShape)
  private
    FW, FH: Double;
  public
    constructor Create(const color: String; w, h: Double);
    function Area: Double; override;
  end;

constructor TShape.Create(const color: String);
begin
  inherited Create;
  FColor := color;
end;

function TShape.Describe: String;
begin
  Result := Format('%s (%s, area=%.2f)', [ClassName, FColor, Area]);
end;

constructor TCircle.Create(const color: String; radius: Double);
begin
  inherited Create(color);
  FRadius := radius;
end;

function TCircle.Area: Double;
begin
  Result := Pi * FRadius * FRadius;
end;

function TCircle.Describe: String;
begin
  Result := inherited Describe + Format(' r=%.1f', [FRadius]);
end;

constructor TRectangle.Create(const color: String; w, h: Double);
begin
  inherited Create(color);
  FW := w; FH := h;
end;

function TRectangle.Area: Double;
begin
  Result := FW * FH;
end;

var
  shapes: array of TShape;
  i: Integer;
begin
  SetLength(shapes, 2);
  shapes[0] := TCircle.Create('red', 5);
  shapes[1] := TRectangle.Create('blue', 3, 4);

  for i := 0 to High(shapes) do
  begin
    WriteLn(shapes[i].Describe);
    shapes[i].Free;
  end;
end.
```

## Gotchas

- Methods are NOT virtual by default; you must add `virtual` in the base class and `override` in derived classes.
- `abstract` without `virtual` is a compile error; abstract implies virtual.
- `inherited` without a method name calls the same-named method in the parent; `inherited Create(args)` calls the parent constructor.
- Instantiating a class with abstract methods is a runtime error (access violation) in Free Pascal — the compiler may warn but not always prevent it.
