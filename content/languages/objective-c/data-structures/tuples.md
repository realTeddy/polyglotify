---
title: "Tuples"
language: "objective-c"
feature: "tuples"
category: "data-structures"
applicable: false
---

Objective-C does not have a tuple type. The common alternatives are: returning multiple values via out-parameters (pointer arguments), returning an `NSDictionary` with named keys, defining a lightweight custom class or `struct`, or using C structs for small groups of primitives. Swift (the modern Apple language) adds true tuple support.

## Example

```objc
#import <Foundation/Foundation.h>

// C struct as a lightweight tuple (for primitives)
typedef struct {
    NSInteger quotient;
    NSInteger remainder;
} DivisionResult;

DivisionResult divmod(NSInteger a, NSInteger b) {
    return (DivisionResult){ .quotient = a / b, .remainder = a % b };
}

// Out-parameter pattern for objects
void minMax(NSArray<NSNumber *> *nums,
            NSNumber **outMin,
            NSNumber **outMax) {
    *outMin = [nums valueForKeyPath:@"@min.self"];
    *outMax = [nums valueForKeyPath:@"@max.self"];
}

// Dictionary as an ad-hoc tuple
NSDictionary *makeRange(NSInteger lo, NSInteger hi) {
    return @{@"lo": @(lo), @"hi": @(hi)};
}

int main(void) {
    DivisionResult r = divmod(17, 5);
    NSLog(@"q=%ld r=%ld", (long)r.quotient, (long)r.remainder);

    NSNumber *mn, *mx;
    minMax(@[@3, @1, @4, @1, @5, @9], &mn, &mx);
    NSLog(@"min=%@ max=%@", mn, mx);

    NSDictionary *range = makeRange(0, 100);
    NSLog(@"lo=%@ hi=%@", range[@"lo"], range[@"hi"]);

    return 0;
}
```

## Gotchas

- Out-parameters (pointer-to-pointer) require callers to declare a variable and pass its address; forgetting the `&` causes a compile error or passing a garbage address.
- `NSDictionary` as a return type is not type-safe; keys and value types are not enforced by the compiler, making refactoring error-prone.
- C structs cannot hold Objective-C object references under ARC without special ownership attributes (`__unsafe_unretained`, `__strong`); use a lightweight `NSObject` subclass for object groupings.
