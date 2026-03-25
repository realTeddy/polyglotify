---
title: "Parameters & Arguments"
language: "pascal"
feature: "parameters"
category: "functions"
applicable: true
---

Pascal supports four parameter passing modes: by value (default copy), `var` (by reference — caller's variable is modified), `const` (read-only reference, no copy), and `out` (Free Pascal — like `var` but guaranteed to be written before reading). Parameters of the same type can be grouped. Default parameter values are supported in Free Pascal with `= defaultValue`.

## Example

```pascal
program ParametersDemo;

// Value parameter (copy)
procedure DoubleValue(n: Integer);
begin
  n := n * 2;   // does not affect caller
  WriteLn('Inside: ', n);
end;

// var parameter (reference)
procedure DoubleRef(var n: Integer);
begin
  n := n * 2;   // modifies caller's variable
end;

// const parameter (read-only, no copy overhead)
function StringLength(const s: String): Integer;
begin
  Result := Length(s);
end;

// out parameter (Free Pascal)
procedure Divide(a, b: Integer; out quotient, remainder: Integer);
begin
  quotient  := a div b;
  remainder := a mod b;
end;

// Multiple same-type params grouped
function Add(a, b, c: Integer): Integer;
begin
  Result := a + b + c;
end;

// Default parameters (Free Pascal)
procedure Connect(const host: String; port: Word = 8080);
begin
  WriteLn('Connecting to ', host, ':', port);
end;

var
  x, q, r: Integer;
begin
  x := 10;
  DoubleValue(x);
  WriteLn(x);          // 10 — unchanged

  DoubleRef(x);
  WriteLn(x);          // 20 — changed

  WriteLn(StringLength('hello'));   // 5

  Divide(17, 5, q, r);
  WriteLn(q, ' rem ', r);          // 3 rem 2

  WriteLn(Add(1, 2, 3));           // 6

  Connect('localhost');             // port defaults to 8080
  Connect('example.com', 443);
end.
```

## Gotchas

- `var` parameters require an lvalue (a variable); passing a literal is a compile error.
- `const` parameters prevent assignment inside the function; they are passed by reference internally for efficiency.
- `out` parameters (Free Pascal) give no guarantee the caller initialised the variable; the callee is expected to always write to them.
- Classic Pascal has no default parameter values; that is a Free Pascal extension.
