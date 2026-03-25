---
title: "Types & Type Systems"
language: "objective-c"
feature: "types"
category: "basics"
applicable: true
---

Objective-C is a superset of C and therefore uses all C types plus its own object-oriented layer. Primitive types include `int`, `float`, `double`, `char`, and the Objective-C aliases `NSInteger`, `NSUInteger`, `CGFloat`, and `BOOL`. Object types are pointer types to `NSObject` subclasses. Lightweight generics were added in Objective-C 2015, allowing `NSArray<NSString *>` annotations that provide compile-time warnings without runtime enforcement.

## Example

```objc
#import <Foundation/Foundation.h>

int main(void) {
    // C primitives
    int i = -10;
    NSUInteger u = 42;   // unsigned, platform-width integer
    CGFloat f = 3.14f;   // platform-width float (32 or 64-bit)
    BOOL flag = YES;

    // Objective-C object types
    NSString    *str  = @"Hello";
    NSNumber    *num  = @3.14;
    NSArray     *arr  = @[@1, @2, @3];
    NSDictionary *dict = @{@"key": @"value"};

    // Lightweight generics (compile-time annotation only)
    NSArray<NSString *> *names = @[@"Alice", @"Bob"];
    NSMutableArray<NSNumber *> *scores = [NSMutableArray array];
    [scores addObject:@95];

    // Type checking at runtime
    if ([str isKindOfClass:[NSString class]]) {
        NSLog(@"It's a string: %@", str);
    }

    // id — dynamic type
    id value = names;
    NSLog(@"Dynamic: %@", [value firstObject]);

    return 0;
}
```

## Gotchas

- `NSInteger` and `NSUInteger` are 32-bit on 32-bit platforms and 64-bit on 64-bit platforms; use them instead of `int` for values that may be platform-dependent (array counts, indices).
- Lightweight generics are advisory only; the compiler emits warnings but does not prevent adding a wrong-typed object at runtime.
- `CGFloat` is `float` on 32-bit and `double` on 64-bit; always use `CGFloat` for geometry values to avoid precision loss when switching between architectures.
