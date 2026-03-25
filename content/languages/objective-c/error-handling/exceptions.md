---
title: "Exceptions & Try/Catch"
language: "objective-c"
feature: "exceptions"
category: "error-handling"
applicable: true
---

Objective-C has `@try`/`@catch`/`@finally` for exceptions, but Apple's Cocoa guidelines strongly discourage using exceptions for normal error flow. Exceptions are reserved for programming errors (bugs) that should terminate the process. For recoverable errors, the conventional pattern is to return `nil` / `NO` and pass an `NSError **` out-parameter. ARC and exceptions do not interact cleanly without `-fobjc-arc-exceptions`.

## Example

```objc
#import <Foundation/Foundation.h>

// Preferred: NSError out-parameter pattern
BOOL parseAge(NSString *input, NSInteger *outAge, NSError **outError) {
    NSInteger age = [input integerValue];
    if (age <= 0 && ![input isEqualToString:@"0"]) {
        if (outError) {
            *outError = [NSError errorWithDomain:@"ParseDomain"
                                           code:100
                                       userInfo:@{NSLocalizedDescriptionKey:
                                           [NSString stringWithFormat:@"Invalid age: %@", input]}];
        }
        return NO;
    }
    if (outAge) *outAge = age;
    return YES;
}

int main(void) {
    // NSError pattern
    NSInteger age;
    NSError *error = nil;
    if (parseAge(@"abc", &age, &error)) {
        NSLog(@"Age: %ld", (long)age);
    } else {
        NSLog(@"Error: %@", error.localizedDescription);
    }

    // @try/@catch — for exceptional/programming errors only
    @try {
        NSArray *arr = @[@1, @2];
        NSLog(@"%@", arr[5]);   // raises NSRangeException
    } @catch (NSException *ex) {
        NSLog(@"Caught: %@ — %@", ex.name, ex.reason);
    } @finally {
        NSLog(@"Finally block always runs");
    }

    return 0;
}
```

## Gotchas

- ARC does not automatically release objects in stack frames unwound by an exception unless compiled with `-fobjc-arc-exceptions`; this flag adds overhead and is not enabled by default.
- Never use exceptions to signal expected conditions (missing keys, invalid user input, network errors); use the `NSError **` pattern instead.
- `@finally` always runs, but if an exception propagates past `@catch`, the stack continues unwinding; do not assume code after `@try`/`@catch` runs on exception.
