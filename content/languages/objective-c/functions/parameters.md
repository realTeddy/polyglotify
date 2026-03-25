---
title: "Parameters & Arguments"
language: "objective-c"
feature: "parameters"
category: "functions"
applicable: true
---

Objective-C method parameters are interleaved with the method name as part of the selector. Each parameter has a label (part of the selector) and a local name used inside the method body. C-style functions use positional parameters without labels. Variadic parameters use the C `...` syntax with `va_list`, and blocks (closures) are commonly used as callback parameters.

## Example

```objc
#import <Foundation/Foundation.h>

@interface StringUtils : NSObject

// Single parameter
- (NSString *)repeat:(NSString *)str;

// Multiple parameters with labels
- (NSString *)join:(NSArray<NSString *> *)items
         separator:(NSString *)sep
           prefix:(NSString *)prefix;

// Block as parameter (callback)
- (void)processItems:(NSArray *)items
           withBlock:(void (^)(id item, NSUInteger index))block;

@end

@implementation StringUtils

- (NSString *)repeat:(NSString *)str {
    return [str stringByAppendingString:str];
}

- (NSString *)join:(NSArray<NSString *> *)items
         separator:(NSString *)sep
           prefix:(NSString *)prefix {
    return [prefix stringByAppendingString:
            [items componentsJoinedByString:sep]];
}

- (void)processItems:(NSArray *)items
           withBlock:(void (^)(id item, NSUInteger index))block {
    [items enumerateObjectsUsingBlock:block];
}

@end

int main(void) {
    StringUtils *u = [[StringUtils alloc] init];
    NSLog(@"%@", [u repeat:@"ha"]);
    NSLog(@"%@", [u join:@[@"a", @"b", @"c"] separator:@"-" prefix:@">"]);
    [u processItems:@[@1, @2, @3] withBlock:^(id item, NSUInteger idx) {
        NSLog(@"[%lu] %@", (unsigned long)idx, item);
    }];
    return 0;
}
```

## Gotchas

- Objective-C has no optional or default parameter values; the common pattern is to provide multiple method overloads or use a configuration object.
- Block parameters must match the block type signature exactly; passing a block with wrong parameter types causes a compile warning and potential runtime crash.
- Variadic methods like `NSLog` and `arrayWithObjects:` require a terminating `nil` sentinel; omitting it causes the method to read garbage memory past the last argument.
