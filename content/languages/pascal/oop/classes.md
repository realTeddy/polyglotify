---
title: "Classes"
language: "pascal"
feature: "classes"
category: "oop"
applicable: true
---

Free Pascal and Delphi add a full OOP class system. Classes are reference types, heap-allocated, and must be freed manually (or via `TInterfacedObject` reference counting). Visibility sections are `public`, `protected`, `private`, and `published`. Constructors are named `Create` by convention; destructors are named `Destroy` and must call `inherited Destroy`.

## Example

```pascal
program ClassesDemo;

uses SysUtils;

type
  TBankAccount = class
  private
    FOwner:   String;
    FBalance: Double;

  public
    constructor Create(const owner: String; initialBalance: Double = 0);
    destructor  Destroy; override;

    procedure Deposit(amount: Double);
    function  Withdraw(amount: Double): Boolean;

    property Owner:   String read FOwner;
    property Balance: Double read FBalance;

    function ToString: String; override;
  end;

constructor TBankAccount.Create(const owner: String; initialBalance: Double);
begin
  inherited Create;
  FOwner   := owner;
  FBalance := initialBalance;
end;

destructor TBankAccount.Destroy;
begin
  WriteLn('Closing account for ', FOwner);
  inherited Destroy;
end;

procedure TBankAccount.Deposit(amount: Double);
begin
  if amount <= 0 then
    raise Exception.Create('Amount must be positive');
  FBalance += amount;
end;

function TBankAccount.Withdraw(amount: Double): Boolean;
begin
  if amount > FBalance then Exit(False);
  FBalance -= amount;
  Result := True;
end;

function TBankAccount.ToString: String;
begin
  Result := Format('%s: $%.2f', [FOwner, FBalance]);
end;

var
  acc: TBankAccount;
begin
  acc := TBankAccount.Create('Alice', 500);
  try
    acc.Deposit(250);
    WriteLn(acc.Withdraw(100));   // True
    WriteLn(acc.Balance:0:2);     // 650.00
    WriteLn(acc.ToString);
  finally
    acc.Free;
  end;
end.
```

## Gotchas

- Always free class instances with `.Free` (which calls `Destroy` safely even if the object is `nil`); use `try/finally` to ensure cleanup on exceptions.
- Constructors in Pascal are not called implicitly — you must call `TMyClass.Create(...)` explicitly.
- Properties use `F`-prefixed backing fields by convention (`FBalance` for `Balance`).
- All class methods are virtual by default in Free Pascal when declared `virtual`; without `virtual`, they are static (not overridable).
