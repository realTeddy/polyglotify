---
title: "Generics"
language: "objective-c"
feature: "generics"
category: "oop"
applicable: false
---

Objective-C does not have true generics. Lightweight generics (introduced in Xcode 7 / LLVM) allow annotating collection types like `NSArray<NSString *>` to enable compile-time warnings when incompatible types are used. These annotations are advisory only — they are erased at compile time and not enforced at runtime. For type-safe heterogeneous containers, custom wrapper classes or Swift interop are the real solutions.

## Example

```objc
#import <Foundation/Foundation.h>

// Lightweight generics — compile-time warnings only
NSArray<NSString *> *names = @[@"Alice", @"Bob"];

// This produces a compiler warning but compiles and runs:
// [names addObject:@42];  // warning: incompatible pointer types

// Generic-style wrapper class as a workaround
@interface TypedBox<__covariant T> : NSObject
@property (nonatomic, strong) T value;
- (instancetype)initWithValue:(T)value;
@end

@implementation TypedBox
- (instancetype)initWithValue:(id)value {
    self = [super init];
    if (self) _value = value;
    return self;
}
@end

int main(void) {
    TypedBox<NSString *> *strBox = [[TypedBox alloc] initWithValue:@"hello"];
    NSLog(@"%@", strBox.value);

    TypedBox<NSNumber *> *numBox = [[TypedBox alloc] initWithValue:@42];
    NSLog(@"%@", numBox.value);

    // No compile error for this, proving it's advisory only:
    TypedBox<NSString *> *oops = [[TypedBox alloc] initWithValue:@99];
    NSLog(@"%@", oops.value);   // works at runtime

    return 0;
}
```

## Gotchas

- Lightweight generics only affect Foundation collection types (`NSArray`, `NSDictionary`, `NSSet`) and custom classes annotated with `__covariant` or `__contravariant`; they do not generalise to arbitrary code.
- The `__covariant` and `__contravariant` qualifiers are clang-specific extensions; they have no effect in standard C or other compilers.
- If you need true generics in Apple's ecosystem, use Swift — Swift's generics are fully type-checked at compile time with no runtime overhead.
