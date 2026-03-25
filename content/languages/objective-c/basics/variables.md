---
title: "Variables & Declaration"
language: "objective-c"
feature: "variables"
category: "basics"
applicable: true
---

Objective-C inherits C's variable declaration syntax and adds Objective-C object pointers (declared with `*`) and the `id` type for dynamically typed object references. Local variables are declared with their C type or as object pointers; instance variables are declared in the `@interface` or `@implementation` block. ARC (Automatic Reference Counting) manages object lifetimes automatically in modern Objective-C.

## Example

```objc
#import <Foundation/Foundation.h>

int main(void) {
    // Primitive C variables
    int count = 42;
    double price = 9.99;
    BOOL isActive = YES;   // Objective-C BOOL (typedef of signed char)

    // Object pointers
    NSString *greeting = @"Hello, Objective-C!";
    NSNumber *num = @(count);   // boxed integer

    // Dynamic type
    id anything = @"a string";
    anything = @42;   // reassign to different object type

    // nil — the null object pointer
    NSArray *empty = nil;
    NSLog(@"greeting: %@", greeting);
    NSLog(@"count: %d, price: %.2f", count, price);
    NSLog(@"isActive: %@", isActive ? @"YES" : @"NO");

    return 0;
}
```

## Gotchas

- Sending a message to `nil` in Objective-C is a no-op and returns `nil`/`0`/`NO` — it does not crash, which can silently mask bugs.
- `BOOL` is a `signed char`, not a true boolean; comparisons like `if (x == YES)` can fail when `x` is a non-zero value other than `1`. Use `if (x)` instead.
- ARC manages `NSObject` subclasses but not Core Foundation (`CF`) types; `CFRelease` must still be called manually or bridging casts (`__bridge_transfer`) used.
