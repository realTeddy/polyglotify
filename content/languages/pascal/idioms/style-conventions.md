---
title: "Style Conventions"
language: "pascal"
feature: "style-conventions"
category: "idioms"
applicable: true
---

Pascal style conventions (Delphi/Free Pascal community) use `PascalCase` for types, functions, and procedures; `camelCase` or `F`-prefix for private fields; `T` prefix for type names; `E` prefix for exception classes; `I` prefix for interfaces. Two-space or two-tab indentation is common. Keywords are case-insensitive but conventionally written in lowercase in modern FPC code or TitleCase in Delphi style.

## Example

```pascal
// Good Free Pascal style
unit UStringUtils;

{$mode objfpc}{$H+}

interface

uses SysUtils;

type
  EStringError = class(Exception);   // E prefix for exceptions

  IFormatter = interface             // I prefix for interfaces
    function Format(const s: String): String;
  end;

  TStringHelper = class              // T prefix for types
  private
    FMaxLen: Integer;                // F prefix for fields
  public
    constructor Create(maxLen: Integer);
    function Truncate(const s: String): String;
    function IsEmpty(const s: String): Boolean;
    property MaxLen: Integer read FMaxLen write FMaxLen;
  end;

implementation

constructor TStringHelper.Create(maxLen: Integer);
begin
  inherited Create;
  FMaxLen := maxLen;
end;

function TStringHelper.Truncate(const s: String): String;
begin
  if Length(s) <= FMaxLen then
    Result := s
  else
    Result := Copy(s, 1, FMaxLen) + '...';
end;

function TStringHelper.IsEmpty(const s: String): Boolean;
begin
  Result := Trim(s) = '';
end;

end.
```

## Gotchas

- Pascal keywords are case-insensitive (`BEGIN` = `begin` = `Begin`), but community style picks one and sticks to it — lowercase is the modern FPC convention.
- Units have an `interface` section (public declarations) and `implementation` section (bodies); putting implementation details in `interface` exposes internals unintentionally.
- The `T` prefix for types is a Delphi convention adopted by most Free Pascal code; ignoring it makes code harder to read for Pascal developers.
- `uses` order matters for name resolution: the last unit in `uses` wins for name conflicts. Always put your own units last.
