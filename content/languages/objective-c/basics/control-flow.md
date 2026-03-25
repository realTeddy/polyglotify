---
title: "Control Flow"
language: "objective-c"
feature: "control-flow"
category: "basics"
applicable: true
---

Objective-C uses all standard C control-flow constructs: `if`/`else`, `switch`, `for`, `while`, and `do-while`. Modern Objective-C adds the fast enumeration syntax `for (type *item in collection)` for iterating `NSFastEnumeration`-conforming objects. Blocks (closures) combined with GCD provide asynchronous control flow. `switch` only works with integer-compatible types, not objects.

## Example

```objc
#import <Foundation/Foundation.h>

int main(void) {
    // if/else
    NSInteger score = 85;
    if (score >= 90) {
        NSLog(@"A");
    } else if (score >= 80) {
        NSLog(@"B");   // prints this
    } else {
        NSLog(@"C or below");
    }

    // switch on integer
    int day = 3;
    switch (day) {
        case 1: NSLog(@"Mon"); break;
        case 2: NSLog(@"Tue"); break;
        case 3: NSLog(@"Wed"); break;   // prints this
        default: NSLog(@"Other"); break;
    }

    // Fast enumeration
    NSArray<NSString *> *langs = @[@"ObjC", @"Swift", @"C"];
    for (NSString *lang in langs) {
        NSLog(@"  %@", lang);
    }

    // C-style for loop
    for (int i = 0; i < 3; i++) {
        NSLog(@"i = %d", i);
    }

    // while
    NSUInteger n = 1;
    while (n < 8) n *= 2;
    NSLog(@"n = %lu", (unsigned long)n);   // 8

    return 0;
}
```

## Gotchas

- `switch` cannot operate on `NSString` or any Objective-C object; use `if`/`else if` chains or a dispatch table (dictionary of blocks) instead.
- Fast enumeration with `for-in` must not mutate the collection being iterated; doing so raises `NSGenericException` at runtime.
- Forgetting `break` in a `switch` case causes fall-through to the next case — a common C bug that Objective-C inherits.
