---
title: "Result Types"
language: "objective-c"
feature: "result-types"
category: "error-handling"
applicable: false
---

Objective-C does not have a built-in `Result` type. The language-idiomatic equivalent is the `NSError **` out-parameter pattern combined with a `BOOL` or nullable return value. This is the foundation of all Cocoa error handling. Swift (interoperable with Objective-C) adds a native `Result<T, E>` type and `throws`/`try` syntax, and these can be bridged to Objective-C APIs.

## Example

```objc
#import <Foundation/Foundation.h>

// Cocoa error pattern — the idiomatic "Result type" in Objective-C
@interface FileLoader : NSObject
+ (NSData *)loadFile:(NSString *)path error:(NSError **)outError;
@end

@implementation FileLoader
+ (NSData *)loadFile:(NSString *)path error:(NSError **)outError {
    NSData *data = [NSData dataWithContentsOfFile:path
                                          options:0
                                            error:outError];
    return data;   // nil on failure (outError is set)
}
@end

// Completion-handler pattern (async "result")
typedef void (^ResultHandler)(NSData * _Nullable data,
                               NSError * _Nullable error);

void fetchAsync(NSString *urlString, ResultHandler handler) {
    NSURL *url = [NSURL URLWithString:urlString];
    NSURLSessionDataTask *task =
        [[NSURLSession sharedSession] dataTaskWithURL:url
            completionHandler:^(NSData *d, NSURLResponse *r, NSError *e) {
                handler(d, e);
            }];
    [task resume];
}

int main(void) {
    NSError *err = nil;
    NSData *data = [FileLoader loadFile:@"/etc/hosts" error:&err];
    if (data) {
        NSLog(@"Loaded %lu bytes", (unsigned long)data.length);
    } else {
        NSLog(@"Failed: %@", err.localizedDescription);
    }
    return 0;
}
```

## Gotchas

- The `NSError **` pattern requires the caller to declare a variable and pass its address; many callers pass `NULL` to ignore errors, leading to silent failures.
- A method returning `nil` does not always mean failure; some methods return `nil` on success (e.g., `NSUserDefaults` for a missing key). Always read the documentation.
- When bridging Objective-C `NSError **` methods to Swift, the Swift compiler automatically converts them to `throws`; this is a one-way transformation.
