---
title: "Function Declaration"
language: "objective-c"
feature: "declaration"
category: "functions"
applicable: true
---

Objective-C has two kinds of callable units: C functions (declared with standard C syntax) and Objective-C methods (declared with `+` for class methods and `-` for instance methods inside `@interface`/`@implementation`). Method declarations interleave the method name with parameter labels, producing a keyword-based message syntax that makes call sites highly readable.

## Example

```objc
#import <Foundation/Foundation.h>

// C function
NSInteger clamp(NSInteger value, NSInteger lo, NSInteger hi) {
    if (value < lo) return lo;
    if (value > hi) return hi;
    return value;
}

@interface Calculator : NSObject

// Class method (factory / utility)
+ (instancetype)calculator;

// Instance method
- (NSInteger)add:(NSInteger)a to:(NSInteger)b;

// Method with multiple parameters
- (NSString *)formatValue:(double)value
              withPrecision:(NSInteger)precision
                    prefix:(NSString *)prefix;
@end

@implementation Calculator

+ (instancetype)calculator {
    return [[self alloc] init];
}

- (NSInteger)add:(NSInteger)a to:(NSInteger)b {
    return a + b;
}

- (NSString *)formatValue:(double)value
              withPrecision:(NSInteger)precision
                    prefix:(NSString *)prefix {
    return [NSString stringWithFormat:@"%@%.*f", prefix, (int)precision, value];
}

@end

int main(void) {
    NSLog(@"clamp: %ld", (long)clamp(150, 0, 100));   // 100

    Calculator *calc = [Calculator calculator];
    NSLog(@"add: %ld", (long)[calc add:7 to:8]);        // 15
    NSLog(@"fmt: %@", [calc formatValue:3.14159
                          withPrecision:2
                                 prefix:@"$"]);          // $3.14
    return 0;
}
```

## Gotchas

- Method names in Objective-C include the parameter labels as part of the selector; `add:to:` and `add:` are different methods. Calling the wrong selector is a runtime error (`unrecognized selector sent to instance`).
- `+` (class) methods are inherited by subclasses, similar to static methods in other languages, but they participate in polymorphism.
- Long multi-keyword method names are intentional style — they make call sites self-documenting, which is the design philosophy of the language and Cocoa APIs.
