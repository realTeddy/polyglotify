---
title: "Threads"
language: "objective-c"
feature: "threads"
category: "concurrency"
applicable: true
---

Objective-C provides direct thread access via `NSThread`, but modern Objective-C code almost exclusively uses **Grand Central Dispatch (GCD)** — a C-based API for submitting blocks to queues. GCD manages a thread pool automatically and provides serial queues (for safe synchronisation) and concurrent queues (for parallelism). `NSOperationQueue` offers a higher-level abstraction with dependencies, priorities, and cancellation.

## Example

```objc
#import <Foundation/Foundation.h>

int main(void) {
    // GCD — global concurrent queue
    dispatch_queue_t bg = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
    dispatch_queue_t main = dispatch_get_main_queue();

    dispatch_async(bg, ^{
        // Background work
        NSLog(@"Working on: %@", [NSThread currentThread]);
        NSArray *result = @[@1, @2, @3];
        dispatch_async(main, ^{
            NSLog(@"Result on main: %@", result);
        });
    });

    // Serial queue for synchronised access
    dispatch_queue_t serial = dispatch_queue_create("com.example.db", DISPATCH_QUEUE_SERIAL);
    __block NSInteger counter = 0;
    for (int i = 0; i < 100; i++) {
        dispatch_async(serial, ^{ counter++; });
    }
    dispatch_sync(serial, ^{ NSLog(@"counter = %ld", (long)counter); });

    // dispatch_group — wait for multiple async tasks
    dispatch_group_t group = dispatch_group_create();
    for (int i = 0; i < 3; i++) {
        dispatch_group_async(group, bg, ^{
            NSLog(@"Task %d", i);
        });
    }
    dispatch_group_wait(group, DISPATCH_TIME_FOREVER);
    NSLog(@"All tasks done");

    [[NSRunLoop mainRunLoop] runUntilDate:[NSDate dateWithTimeIntervalSinceNow:1]];
    return 0;
}
```

## Gotchas

- `dispatch_sync` on the current serial queue causes a deadlock; never call `dispatch_sync` on a queue you are already running on.
- UI updates must always happen on the main queue; submitting UI work to a background queue causes crashes or silent corruption that is hard to debug.
- `NSThread` is lower-level than GCD and provides little benefit over it; prefer GCD or `NSOperationQueue` for all new concurrency code.
