---
title: "Classes"
language: "objective-c"
feature: "classes"
category: "oop"
applicable: true
---

Objective-C classes are defined in two parts: the `@interface` (declaration in the `.h` header file) and the `@implementation` (definition in the `.m` source file). Properties declared with `@property` automatically generate getter and setter methods and a backing instance variable (prefixed with `_`). `alloc` allocates memory and `init` initialises the object; the two are always chained as `[[Class alloc] init]`.

## Example

```objc
// BankAccount.h
#import <Foundation/Foundation.h>

@interface BankAccount : NSObject

@property (nonatomic, readonly) NSString *owner;
@property (nonatomic, readonly) double balance;

- (instancetype)initWithOwner:(NSString *)owner initialBalance:(double)balance;
- (BOOL)deposit:(double)amount;
- (BOOL)withdraw:(double)amount;
- (NSString *)summary;

@end

// BankAccount.m
@implementation BankAccount {
    double _balance;   // private backing ivar (can shadow property)
}

- (instancetype)initWithOwner:(NSString *)owner initialBalance:(double)balance {
    self = [super init];
    if (self) {
        _owner   = [owner copy];
        _balance = balance;
    }
    return self;
}

- (BOOL)deposit:(double)amount {
    if (amount <= 0) return NO;
    _balance += amount;
    return YES;
}

- (BOOL)withdraw:(double)amount {
    if (amount > _balance) return NO;
    _balance -= amount;
    return YES;
}

- (double)balance { return _balance; }

- (NSString *)summary {
    return [NSString stringWithFormat:@"%@ — $%.2f", _owner, _balance];
}

@end
```

## Gotchas

- Instance variables declared in `@implementation {}` are private and not visible to subclasses; instance variables in `@interface {}` are `@protected` by default.
- Overriding a property's getter or setter disables automatic `@synthesize`; you must synthesize the backing ivar manually with `@synthesize prop = _prop;` or implement both accessors.
- `alloc` returns an uninitialised object; always immediately call an `init` method. Using an `alloc`-only object without `init` is undefined behaviour.
