---
title: "Closures & Lambdas"
language: "objective-c"
feature: "closures"
category: "functions"
applicable: true
---

Objective-C closures are called **blocks**. A block is a chunk of code that captures variables from the surrounding scope and can be stored, passed, and called like a function pointer. Block type syntax uses `^`: `void (^blockName)(int)` declares a block taking an `int` and returning `void`. Blocks are used extensively in Cocoa APIs for callbacks, animations, and GCD concurrency.

## Example

```objc
#import <Foundation/Foundation.h>

int main(void) {
    // Block variable
    int (^add)(int, int) = ^(int a, int b) { return a + b; };
    NSLog(@"add: %d", add(3, 4));   // 7

    // Capturing scope
    NSInteger multiplier = 5;
    NSInteger (^times)(NSInteger) = ^(NSInteger n) {
        return n * multiplier;
    };
    NSLog(@"times: %ld", (long)times(6));   // 30

    // Block as method argument
    NSArray *nums = @[@3, @1, @4, @1, @5, @9];
    NSArray *sorted = [nums sortedArrayUsingComparator:^(id a, id b) {
        return [a compare:b];
    }];
    NSLog(@"%@", sorted);

    // Block stored in variable and called later
    typedef void (^CompletionBlock)(BOOL success);
    CompletionBlock completion = ^(BOOL success) {
        NSLog(@"Done: %@", success ? @"OK" : @"FAIL");
    };
    completion(YES);

    // Modifying captured variable with __block
    __block NSInteger counter = 0;
    void (^increment)(void) = ^{ counter++; };
    increment();
    increment();
    NSLog(@"counter: %ld", (long)counter);   // 2

    return 0;
}
```

## Gotchas

- Blocks capture variables by value by default (a copy at the time of block creation); use `__block` to allow the block to mutate the original variable.
- Capturing `self` strongly inside a block that is stored as a property creates a retain cycle; use `__weak typeof(self) weakSelf = self;` and reference `weakSelf` inside the block.
- Block syntax is notoriously complex; `typedef` for frequently used block types improves readability significantly.
