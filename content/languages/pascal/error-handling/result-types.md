---
title: "Result Types"
language: "pascal"
feature: "result-types"
category: "error-handling"
applicable: false
---

Pascal has no built-in result/option type. Error handling is done via exceptions (`try`/`except`) in Free Pascal, or via error-code return values in classic Pascal. The pattern of returning a boolean success flag plus an `out` parameter for the value is the closest idiomatic equivalent to a `Result<T, E>` type. There is no `Option<T>` or `Maybe` in the standard library.

## Example

```pascal
program ResultTypesDemo;

uses SysUtils;

// Pascal idiom: boolean return + out parameter
function TryParseInt(const s: String; out value: Integer): Boolean;
begin
  try
    value  := StrToInt(s);
    Result := True;
  except
    on EConvertError do
    begin
      value  := 0;
      Result := False;
    end;
  end;
end;

// Manual result record
type
  TResult = record
    OK:    Boolean;
    Value: Integer;
    Error: String;
  end;

function SafeDivide(a, b: Integer): TResult;
begin
  if b = 0 then
  begin
    Result.OK    := False;
    Result.Value := 0;
    Result.Error := 'division by zero';
  end
  else
  begin
    Result.OK    := True;
    Result.Value := a div b;
    Result.Error := '';
  end;
end;

var
  n:  Integer;
  dr: TResult;
begin
  // Boolean + out pattern
  if TryParseInt('42', n) then
    WriteLn('Parsed: ', n)
  else
    WriteLn('Parse failed');

  if not TryParseInt('abc', n) then
    WriteLn('abc is not an integer');

  // Manual result record
  dr := SafeDivide(10, 0);
  if dr.OK then
    WriteLn(dr.Value)
  else
    WriteLn('Error: ', dr.Error);
end.
```

## Gotchas

- The `TryXxx` naming convention (e.g., `TryStrToInt` in `SysUtils`) is idiomatic Pascal for fallible operations that return `Boolean`.
- Error-code patterns from classic Pascal (`IOResult` after `{$I-}`) are low-level and error-prone; prefer exceptions in Free Pascal.
- There is no compiler enforcement that callers check the return value — a missed `if not TryParse(...)` is a logic bug.
- Community libraries (e.g., for FPC) provide generic `TNullable<T>` or `TOptional<T>` but they are not in the standard library.
