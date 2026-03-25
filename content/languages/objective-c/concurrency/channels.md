---
title: "Channels & Message Passing"
language: "objective-c"
feature: "channels"
category: "concurrency"
applicable: false
---

Objective-C does not have channels or built-in message-passing primitives. The equivalent patterns are GCD serial queues (for serialised access to shared state), `NSNotificationCenter` (for broadcast events), and completion-handler blocks (for point-to-point async results). `NSOperationQueue` with operation dependencies models structured pipelines.

## Example

```objc
#import <Foundation/Foundation.h>

// NSNotificationCenter — broadcast message passing
static NSString *const kDataReadyNotification = @"DataReadyNotification";

@interface Producer : NSObject
- (void)produceData;
@end

@implementation Producer
- (void)produceData {
    dispatch_async(dispatch_get_global_queue(0, 0), ^{
        // Simulate work
        NSDictionary *payload = @{@"value": @42};
        [[NSNotificationCenter defaultCenter]
            postNotificationName:kDataReadyNotification
                          object:self
                        userInfo:payload];
    });
}
@end

// GCD channel-style with dispatch_semaphore
void channelDemo(void) {
    dispatch_semaphore_t sem = dispatch_semaphore_create(0);
    __block NSString *received = nil;

    // "Send" (producer)
    dispatch_async(dispatch_get_global_queue(0, 0), ^{
        [NSThread sleepForTimeInterval:0.1];
        received = @"hello from producer";
        dispatch_semaphore_signal(sem);
    });

    // "Receive" (consumer) — blocks until signal
    dispatch_semaphore_wait(sem, DISPATCH_TIME_FOREVER);
    NSLog(@"Received: %@", received);
}

int main(void) {
    channelDemo();

    Producer *p = [[Producer alloc] init];
    [[NSNotificationCenter defaultCenter]
        addObserverForName:kDataReadyNotification
                    object:nil
                     queue:[NSOperationQueue mainQueue]
                usingBlock:^(NSNotification *note) {
                    NSLog(@"Got notification: %@", note.userInfo[@"value"]);
                }];
    [p produceData];

    [[NSRunLoop mainRunLoop] runUntilDate:[NSDate dateWithTimeIntervalSinceNow:1]];
    return 0;
}
```

## Gotchas

- `NSNotificationCenter` delivers notifications synchronously on the posting thread unless an `NSOperationQueue` is specified; posting from a background thread and expecting main-queue delivery requires explicit queue routing.
- `dispatch_semaphore_wait` with `DISPATCH_TIME_FOREVER` blocks the thread indefinitely if the signal never comes; always use a timeout in production code.
- Observers registered with `NSNotificationCenter` using block-based API return an opaque token that must be removed with `removeObserver:` to prevent leaks and unexpected callbacks.
