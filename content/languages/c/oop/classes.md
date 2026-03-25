---
title: "Classes"
language: "c"
feature: "classes"
category: "oop"
applicable: false
---

C has no classes. Object-oriented patterns are emulated using structs, function pointers, and naming conventions. Encapsulation is achieved with opaque types (see `structs-classes`). "Methods" are free functions that take a pointer to the struct as the first argument (by convention named `self` or with the type prefix). This is precisely how CPython, GTK (GObject), and the Linux kernel implement OOP in C.

## Example

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/* "Class" BankAccount implemented in C style */

typedef struct BankAccount BankAccount;

/* "Constructor" */
BankAccount *bank_account_new(const char *owner, double initial_balance);

/* "Methods" */
void   bank_account_free(BankAccount *self);
int    bank_account_deposit(BankAccount *self, double amount);
int    bank_account_withdraw(BankAccount *self, double amount);
double bank_account_balance(const BankAccount *self);
const char *bank_account_owner(const BankAccount *self);
void   bank_account_print(const BankAccount *self);

/* Implementation (would normally be in a .c file) */
struct BankAccount {
    char   owner[64];
    double balance;
};

BankAccount *bank_account_new(const char *owner, double initial) {
    if (initial < 0) return NULL;
    BankAccount *a = malloc(sizeof(BankAccount));
    strncpy(a->owner, owner, 63);
    a->balance = initial;
    return a;
}

void   bank_account_free(BankAccount *self) { free(self); }
double bank_account_balance(const BankAccount *self) { return self->balance; }
const char *bank_account_owner(const BankAccount *self) { return self->owner; }

int bank_account_deposit(BankAccount *self, double amount) {
    if (amount <= 0) return -1;
    self->balance += amount;
    return 0;
}

int bank_account_withdraw(BankAccount *self, double amount) {
    if (amount > self->balance) return -1;
    self->balance -= amount;
    return 0;
}

void bank_account_print(const BankAccount *self) {
    printf("BankAccount[%s, $%.2f]\n", self->owner, self->balance);
}

int main(void) {
    BankAccount *acct = bank_account_new("Alice", 1000.0);
    bank_account_deposit(acct, 500.0);
    bank_account_withdraw(acct, 200.0);
    bank_account_print(acct);  /* BankAccount[Alice, $1300.00] */
    bank_account_free(acct);
    return 0;
}
```

## Gotchas

- There is no `this` pointer or automatic dispatch — the caller must always call the correct function for the correct type. This is precisely what C++ vtables automate.
- Forgetting `bank_account_free` (the "destructor") leaks memory. C has no RAII or garbage collection — resource management is entirely manual.
