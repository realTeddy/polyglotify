---
title: "Classes"
language: "elixir"
feature: "classes"
category: "oop"
applicable: false
---

Elixir has no object-oriented classes. State and behaviour are separated: **structs** (defined with `defstruct`) hold data, and module functions operate on that data. Behaviour contracts are expressed through **protocols** and **behaviours** (Elixir's interface mechanisms).

The module + struct pattern is the idiomatic equivalent of a class with data and methods.

## Example

```elixir
# "Class-like" module: struct for data, functions for behaviour
defmodule BankAccount do
  defstruct owner: "", balance: 0

  # "Constructor"
  def new(owner, initial_balance \\ 0) do
    %BankAccount{owner: owner, balance: initial_balance}
  end

  # "Methods" (pure functions returning a new struct)
  def deposit(%BankAccount{balance: bal} = acc, amount) when amount > 0 do
    %{acc | balance: bal + amount}
  end

  def withdraw(%BankAccount{balance: bal} = acc, amount)
      when amount > 0 and amount <= bal do
    {:ok, %{acc | balance: bal - amount}}
  end
  def withdraw(_, _), do: {:error, :insufficient_funds}

  def balance(%BankAccount{balance: bal}), do: bal
end

# Usage
acc = BankAccount.new("Alice", 100)
acc = BankAccount.deposit(acc, 50)

case BankAccount.withdraw(acc, 200) do
  {:ok, updated}   -> IO.puts "New balance: #{BankAccount.balance(updated)}"
  {:error, reason} -> IO.puts "Error: #{reason}"
end
```

## Gotchas

- There is no implicit `self`; the struct must be passed explicitly to every function
- Elixir functions are pure by default; all "mutations" return a new struct
- For polymorphism across different struct types, use protocols (Elixir's equivalent of interfaces)
