---
title: "Common Patterns"
language: "objective-c"
feature: "common-patterns"
category: "idioms"
applicable: true
---

Classic Objective-C idioms include the delegate pattern (for object-to-object callbacks), the target/action pattern (used throughout UIKit), KVO (Key-Value Observing) for change notifications, and the category pattern for extending existing classes. The builder pattern appears via method chaining using `instancetype` returns, and the singleton pattern uses `dispatch_once` for thread-safe lazy initialisation.

## Example

```objc
#import <Foundation/Foundation.h>

// Singleton with dispatch_once
@interface AppConfig : NSObject
@property (nonatomic, copy) NSString *apiBase;
+ (instancetype)shared;
@end

@implementation AppConfig
+ (instancetype)shared {
    static AppConfig *instance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        instance = [[self alloc] init];
        instance.apiBase = @"https://api.example.com";
    });
    return instance;
}
@end

// Category — extending NSString
@interface NSString (Validation)
- (BOOL)isValidEmail;
@end

@implementation NSString (Validation)
- (BOOL)isValidEmail {
    NSString *pattern = @"[A-Z0-9a-z._%+\\-]+@[A-Za-z0-9.\\-]+\\.[A-Za-z]{2,}";
    NSPredicate *pred = [NSPredicate predicateWithFormat:@"SELF MATCHES %@", pattern];
    return [pred evaluateWithObject:self];
}
@end

// Nil-safe message chaining
NSString *result = [[[AppConfig shared].apiBase
    stringByAppendingPathComponent:@"v1"]
    stringByAppendingPathComponent:@"users"];
NSLog(@"%@", result);

// isKindOfClass for safe casting
id value = @42;
if ([value isKindOfClass:[NSNumber class]]) {
    NSNumber *num = (NSNumber *)value;
    NSLog(@"Double: %.1f", num.doubleValue);
}

NSLog(@"valid: %d", [@"user@example.com" isValidEmail]);
```

## Gotchas

- Categories cannot add instance variables; use associated objects (`objc_setAssociatedObject`) if you need state in a category.
- KVO observers must be removed before the observed object or the observer is deallocated; failing to do so causes a crash when the notification fires on a dangling pointer.
- `dispatch_once` tokens must be `static` or `global`; using a stack-local `dispatch_once_t` variable defeats its purpose because a new token is created on every call.
