---
title: "Operators"
language: "objective-c"
feature: "operators"
category: "basics"
applicable: true
---

Objective-C uses all standard C operators for arithmetic, comparison, logical, and bitwise operations. Object equality must use `isEqual:` or `isEqualToString:` rather than `==`, which compares pointer addresses. Objective-C adds the message-send bracket syntax `[receiver message]` as its object-interaction operator, and modern Objective-C adds dot syntax for property access.

## Example

```objc
#import <Foundation/Foundation.h>

int main(void) {
    // Arithmetic (C operators)
    int a = 10, b = 3;
    NSLog(@"%d %d %d %d %d", a+b, a-b, a*b, a/b, a%b);

    // Comparison
    NSLog(@"a > b: %d", a > b);   // 1 (YES)

    // Logical
    BOOL t = YES, f = NO;
    NSLog(@"t && f: %d, t || f: %d, !t: %d", t && f, t || f, !t);

    // Bitwise
    NSLog(@"a & b = %d", a & b);   // 2
    NSLog(@"a | b = %d", a | b);   // 11
    NSLog(@"a ^ b = %d", a ^ b);   // 9
    NSLog(@"a << 1 = %d", a << 1); // 20

    // Object equality — use isEqual: not ==
    NSString *s1 = @"hello";
    NSString *s2 = [NSString stringWithFormat:@"hel%@", @"lo"];
    NSLog(@"== (pointer): %d", s1 == s2);             // may be 0
    NSLog(@"isEqual: %d", [s1 isEqual:s2]);           // 1
    NSLog(@"isEqualToString: %d", [s1 isEqualToString:s2]);  // 1

    // Ternary
    int max = (a > b) ? a : b;
    NSLog(@"max: %d", max);   // 10

    return 0;
}
```

## Gotchas

- `==` on `NSString` compares pointers; two strings with identical content stored separately will compare as unequal. Always use `isEqualToString:`.
- The ternary operator `?:` (with empty middle operand, a GCC extension) is not standard Objective-C and should be avoided for portability.
- Bitwise operations on signed integers use implementation-defined right-shift behaviour; use `NSUInteger` for bit manipulation to avoid sign-extension surprises.
