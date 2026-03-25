---
title: "Classes"
language: "matlab"
feature: "classes"
category: "oop"
applicable: true
---

MATLAB supports object-oriented programming via classdef files. Classes can be value classes (copied on assignment) or handle classes (reference semantics, inheriting from `handle`). Properties hold data; methods provide behaviour. Classes live in `@ClassName/` folders or single `ClassName.m` files.

## Example

```matlab
% BankAccount.m
classdef BankAccount < handle    % handle = reference semantics
    properties
        owner     (1,1) string
        balance   (1,1) double = 0
    end

    properties (Access = private)
        transactions (:,1) double = []
    end

    methods
        function obj = BankAccount(owner, initial)
            obj.owner   = owner;
            obj.balance = initial;
            obj.transactions = initial;
        end

        function deposit(obj, amount)
            if amount <= 0
                error('Amount must be positive')
            end
            obj.balance = obj.balance + amount;
            obj.transactions(end+1) = amount;
        end

        function withdraw(obj, amount)
            if amount > obj.balance
                error('Insufficient funds')
            end
            obj.balance = obj.balance - amount;
            obj.transactions(end+1) = -amount;
        end

        function disp(obj)
            fprintf('%s: $%.2f\n', obj.owner, obj.balance)
        end
    end
end
```

```matlab
% Usage
acct = BankAccount("Alice", 1000);
acct.deposit(500);
acct.withdraw(200);
disp(acct)   % Alice: $1300.00
```

## Gotchas

- Value classes copy on assignment; handle classes share references. Choose based on the semantic you need.
- `handle` classes must be explicitly deleted (`delete(obj)`) or they leak if they hold external resources.
- Property validation syntax (`(1,1) double`) is available in R2016b+ and is checked on every assignment.
- `classdef` files must be named exactly after the class — `BankAccount.m` for `classdef BankAccount`.
