---
title: "Exceptions & Try/Catch"
language: "pascal"
feature: "exceptions"
category: "error-handling"
applicable: true
---

Free Pascal uses `try`/`except`/`finally` for exception handling. `raise` throws an exception. `try`/`except` catches exceptions; `try`/`finally` ensures cleanup. Custom exceptions inherit from `Exception`. Classic Pascal (ISO) has no exception mechanism — it uses error codes and `{$I-}` I/O error checking.

## Example

```pascal
program ExceptionsDemo;

uses SysUtils;

type
  EAppError = class(Exception)
  private
    FCode: Integer;
  public
    constructor Create(const msg: String; code: Integer);
    property Code: Integer read FCode;
  end;

constructor EAppError.Create(const msg: String; code: Integer);
begin
  inherited Create(msg);
  FCode := code;
end;

function ParsePositive(const s: String): Integer;
begin
  Result := StrToInt(s);   // raises EConvertError on failure
  if Result <= 0 then
    raise EAppError.Create('Must be positive', 400);
end;

procedure Demo;
begin
  try
    WriteLn(ParsePositive('42'));
    WriteLn(ParsePositive('-1'));
  except
    on e: EAppError do
      WriteLn('App error [', e.Code, ']: ', e.Message);
    on e: EConvertError do
      WriteLn('Conversion error: ', e.Message);
    on e: Exception do
      WriteLn('General error: ', e.Message);
  end;
end;

procedure WithFinally;
var
  f: Text;
begin
  Assign(f, 'test.txt');
  Rewrite(f);
  try
    WriteLn(f, 'data');
    // simulate error
    raise Exception.Create('something went wrong');
  finally
    CloseFile(f);   // always runs
    WriteLn('File closed');
  end;
end;

begin
  Demo;
  try
    WithFinally;
  except
    on e: Exception do WriteLn('Caught: ', e.Message);
  end;
end.
```

## Gotchas

- `try`/`except` and `try`/`finally` cannot be nested in the same block; use separate nested `try` statements.
- `on e: EType do` is the Pascal syntax for typed catch; fall-through between handlers does not occur.
- `raise` inside an `except` block re-raises the current exception; `raise E.Create(...)` raises a new one.
- Always call `e.Free` when manually freeing an exception object that was raised with `raise E.Create(...)` and caught without using it further — but in most cases the runtime frees it automatically after the `except` block.
