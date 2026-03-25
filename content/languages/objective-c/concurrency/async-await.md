---
title: "Async/Await"
language: "objective-c"
feature: "async-await"
category: "concurrency"
applicable: false
---

Objective-C does not support `async`/`await` syntax. Asynchronous programming in Objective-C uses completion handler blocks and Grand Central Dispatch (GCD). Swift 5.5+ added native async/await, and Swift async methods are callable from Objective-C as completion-handler methods via the `@objc` bridge. For new Apple platform projects, Swift async/await is the recommended approach.

## Example

```objc
#import <Foundation/Foundation.h>

// Completion handler pattern — the Objective-C async model
typedef void (^FetchCompletion)(NSData * _Nullable data,
                                NSError * _Nullable error);

void fetchURL(NSURL *url, FetchCompletion completion) {
    NSURLSessionDataTask *task =
        [[NSURLSession sharedSession]
            dataTaskWithURL:url
          completionHandler:^(NSData *d, NSURLResponse *r, NSError *e) {
              dispatch_async(dispatch_get_main_queue(), ^{
                  completion(d, e);
              });
          }];
    [task resume];
}

// Chaining async operations (callback hell)
void fetchAndProcess(NSURL *url) {
    fetchURL(url, ^(NSData *data, NSError *error) {
        if (error) {
            NSLog(@"Fetch error: %@", error.localizedDescription);
            return;
        }
        dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
            // Process data on background queue
            NSString *result = [[NSString alloc] initWithData:data
                                                     encoding:NSUTF8StringEncoding];
            dispatch_async(dispatch_get_main_queue(), ^{
                NSLog(@"Result length: %lu", (unsigned long)result.length);
            });
        });
    });
}

int main(void) {
    NSURL *url = [NSURL URLWithString:@"https://httpbin.org/get"];
    fetchAndProcess(url);
    // Keep process alive for async operation
    [[NSRunLoop mainRunLoop] runUntilDate:[NSDate dateWithTimeIntervalSinceNow:5]];
    return 0;
}
```

## Gotchas

- Completion handler nesting (callback hell) becomes unmanageable for multi-step async workflows; consider breaking operations into named methods.
- Always specify which queue the completion handler is called on; Cocoa does not guarantee the main queue for callbacks, causing UI updates from background threads.
- When Swift async methods are bridged to Objective-C, the async version is not exposed — only the completion-handler version with `completionHandler:` suffix is visible.
