---
title: "Classes"
language: "powershell"
feature: "classes"
category: "oop"
applicable: true
---

PowerShell 5+ supports classes with the `class` keyword. Classes can have properties, methods, static members, and constructors. Visibility is limited — there is no `private` keyword (all members are effectively public). Classes are primarily used for defining module-level types, custom exceptions, and structured data. For production use, many prefer C# classes loaded via `Add-Type`.

## Example

```powershell
class BankAccount {
    [string]$Owner
    hidden [double]$_balance   # 'hidden' hides from default display

    BankAccount([string]$owner, [double]$initialBalance) {
        $this.Owner    = $owner
        $this._balance = $initialBalance
    }

    [bool] Deposit([double]$amount) {
        if ($amount -le 0) { return $false }
        $this._balance += $amount
        return $true
    }

    [bool] Withdraw([double]$amount) {
        if ($amount -gt $this._balance) { return $false }
        $this._balance -= $amount
        return $true
    }

    [double] GetBalance() { return $this._balance }

    [string] ToString() {
        return "$($this.Owner) — `$$($this._balance)"
    }

    static [BankAccount] CreateFunded([string]$owner) {
        return [BankAccount]::new($owner, 100.0)
    }
}

$acct = [BankAccount]::new("Alice", 500)
$acct.Deposit(100)
$acct.Withdraw(50)
Write-Host $acct.GetBalance()   # 550
Write-Host $acct

$bonus = [BankAccount]::CreateFunded("Bob")
Write-Host $bonus.GetBalance()   # 100
```

## Gotchas

- PowerShell classes have no access modifiers other than `hidden` (which only hides from default display and tab completion, not from code); all members are accessible from outside the class.
- Class definitions in a `.ps1` file are not exported by `Import-Module`; place classes in a `.psm1` module file and use `using module` to import them.
- Inheritance is single-class only; use interfaces (via `Add-Type` C# code) for multiple interface implementations.
