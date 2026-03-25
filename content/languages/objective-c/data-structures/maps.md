---
title: "Maps & Dictionaries"
language: "objective-c"
feature: "maps"
category: "data-structures"
applicable: true
---

Objective-C's dictionary type is `NSDictionary` (immutable) and `NSMutableDictionary` (mutable). The literal syntax `@{key: value, ...}` creates an `NSDictionary`. Both keys and values must be Objective-C objects; keys must conform to `NSCopying`. Dictionaries are unordered and backed by a hash table, providing O(1) average-case lookups.

## Example

```objc
#import <Foundation/Foundation.h>

int main(void) {
    // Immutable dictionary literal
    NSDictionary<NSString *, NSNumber *> *scores = @{
        @"Alice": @95,
        @"Bob":   @87,
        @"Carol": @92,
    };

    // Access
    NSLog(@"Alice: %@", scores[@"Alice"]);
    NSLog(@"Dave: %@",  scores[@"Dave"]);   // nil — missing key

    // Safe access with default
    NSNumber *dave = scores[@"Dave"] ?: @0;
    NSLog(@"Dave (default): %@", dave);

    // Mutable dictionary
    NSMutableDictionary *config = [NSMutableDictionary dictionary];
    config[@"host"]    = @"localhost";
    config[@"port"]    = @8080;
    config[@"timeout"] = @30;
    [config removeObjectForKey:@"timeout"];

    // Iteration
    [scores enumerateKeysAndObjectsUsingBlock:^(NSString *key, NSNumber *val, BOOL *stop) {
        NSLog(@"  %@: %@", key, val);
    }];

    // Keys and values as arrays
    NSArray *keys   = [scores allKeys];
    NSArray *values = [scores allValues];
    NSLog(@"keys: %@", [keys sortedArrayUsingSelector:@selector(compare:)]);

    return 0;
}
```

## Gotchas

- Accessing a missing key returns `nil`, not an exception; always check for `nil` before using the returned value as an object.
- `NSDictionary` keys must implement `NSCopying`; custom class keys must implement both `isEqual:` and `hash` correctly to work as dictionary keys.
- `NSMutableDictionary` is not thread-safe; concurrent reads and writes require external synchronisation with `dispatch_barrier_async` or a lock.
