---
title: "Operators"
language: "pascal"
feature: "operators"
category: "basics"
applicable: true
---

Pascal uses word-based logical operators (`and`, `or`, `not`, `xor`) instead of symbols. Integer division uses `div` and modulo uses `mod`. The standard arithmetic operators (`+`, `-`, `*`) apply to numbers. String concatenation uses `+`. Comparison operators are `=`, `<>` (not equal), `<`, `>`, `<=`, `>=`. Pointer dereference is `^`. Set operators include `+` (union), `-` (difference), `*` (intersection), and `in`.

## Example

```pascal
program OperatorsDemo;

var
  a, b, q, r: Integer;
  x: Double;
  s1, s2: String;
  flag: Boolean;

begin
  a := 17;
  b := 5;

  // Arithmetic
  WriteLn(a + b);    // 22
  WriteLn(a - b);    // 12
  WriteLn(a * b);    // 85
  WriteLn(a div b);  // 3  (integer division)
  WriteLn(a mod b);  // 2  (modulo)
  x := a / b;        // 3.4 (real division)
  WriteLn(x:0:4);

  // Comparison
  WriteLn(a > b);    // True
  WriteLn(a = b);    // False
  WriteLn(a <> b);   // True

  // Logical (word operators)
  flag := (a > 0) and (b > 0);
  WriteLn(flag);     // True
  WriteLn(not flag); // False
  WriteLn((a > 10) or (b > 10));  // True
  WriteLn(True xor False);        // True

  // Bitwise (integer)
  WriteLn(a and b);  // 1  (bitwise AND)
  WriteLn(a or  b);  // 21 (bitwise OR)
  WriteLn(a shl 1);  // 34 (shift left)
  WriteLn(a shr 1);  // 8  (shift right)

  // String concatenation
  s1 := 'Hello';
  s2 := s1 + ', World!';
  WriteLn(s2);
end.
```

## Gotchas

- `and`, `or`, `not` are both logical AND bitwise operators depending on operand type — there is no short-circuit guarantee in all compilers (Free Pascal short-circuits logical booleans).
- `/` always produces a `Real`/`Double` result; use `div` for integer division.
- `=` is comparison inside expressions; `:=` is assignment — confusing them is a common beginner error.
- `shl`/`shr` are arithmetic shifts; the behaviour for negative numbers is implementation-defined.
