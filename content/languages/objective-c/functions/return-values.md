---
title: "Return Values"
language: "objective-c"
feature: "return-values"
category: "functions"
applicable: true
---

Objective-C methods return a single value declared before the method name in parentheses. `void` indicates no return value. Object methods commonly return `instancetype` to enable fluent/builder patterns and correct subclass inference. Multiple values are returned via out-parameters (pointer-to-pointer for objects, plain pointer for primitives), or by returning an `NSDictionary` or custom object.

## Example

```objc
#import <Foundation/Foundation.h>

@interface MathUtils : NSObject

// Returns primitive
+ (NSInteger)factorial:(NSInteger)n;

// Returns object
+ (NSNumber *)boxedSquare:(NSInteger)n;

// Returns instancetype (self-typed)
+ (instancetype)utils;

// Out-parameter pattern (NSError**)
+ (NSArray *)parseCSV:(NSString *)csv
                error:(NSError **)outError;
@end

@implementation MathUtils

+ (NSInteger)factorial:(NSInteger)n {
    if (n <= 1) return 1;
    return n * [self factorial:n - 1];
}

+ (NSNumber *)boxedSquare:(NSInteger)n {
    return @(n * n);
}

+ (instancetype)utils { return [[self alloc] init]; }

+ (NSArray *)parseCSV:(NSString *)csv error:(NSError **)outError {
    if (!csv || [csv length] == 0) {
        if (outError) {
            *outError = [NSError errorWithDomain:@"CSVError"
                                           code:1
                                       userInfo:@{NSLocalizedDescriptionKey: @"Empty input"}];
        }
        return nil;
    }
    return [csv componentsSeparatedByString:@","];
}

@end

int main(void) {
    NSLog(@"%ld", (long)[MathUtils factorial:5]);   // 120
    NSLog(@"%@", [MathUtils boxedSquare:7]);         // 49

    NSError *err = nil;
    NSArray *rows = [MathUtils parseCSV:@"a,b,c" error:&err];
    if (err) NSLog(@"Error: %@", err.localizedDescription);
    else     NSLog(@"%@", rows);

    return 0;
}
```

## Gotchas

- The out-parameter `NSError **` pattern is a convention, not enforced by the compiler; callers can pass `NULL` to ignore the error, so always check return value first, then inspect the error.
- `instancetype` is preferred over `id` as a return type for `init` and factory methods because the compiler can infer the subclass type in method chains.
- Returning a primitive from an Objective-C method wraps it as a C value, not an `NSNumber`; callers expecting an object must box it explicitly with `@(value)`.
