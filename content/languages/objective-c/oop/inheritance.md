---
title: "Inheritance"
language: "objective-c"
feature: "inheritance"
category: "oop"
applicable: true
---

Objective-C supports single inheritance; every class except `NSObject` (the root class) must have exactly one superclass. Subclasses override methods simply by redeclaring and reimplementing them — no keyword is required, though `@override` is available as a compiler attribute. `super` calls the parent implementation. Method dispatch is dynamic, so polymorphism works even on `id`-typed references.

## Example

```objc
#import <Foundation/Foundation.h>

@interface Vehicle : NSObject
@property (nonatomic, assign) NSInteger speed;
- (instancetype)initWithSpeed:(NSInteger)speed;
- (NSString *)describe;
- (void)accelerate:(NSInteger)delta;
@end

@implementation Vehicle
- (instancetype)initWithSpeed:(NSInteger)speed {
    self = [super init];
    if (self) _speed = speed;
    return self;
}
- (NSString *)describe {
    return [NSString stringWithFormat:@"Vehicle at %ld km/h", (long)_speed];
}
- (void)accelerate:(NSInteger)delta { _speed += delta; }
@end

@interface Car : Vehicle
@property (nonatomic, copy) NSString *brand;
- (instancetype)initWithBrand:(NSString *)brand speed:(NSInteger)speed;
@end

@implementation Car
- (instancetype)initWithBrand:(NSString *)brand speed:(NSInteger)speed {
    self = [super initWithSpeed:speed];
    if (self) _brand = [brand copy];
    return self;
}
- (NSString *)describe {
    // Call super, then extend
    return [[super describe] stringByAppendingFormat:@" (%@)", _brand];
}
@end

int main(void) {
    NSArray<Vehicle *> *fleet = @[
        [[Vehicle alloc] initWithSpeed:60],
        [[Car alloc] initWithBrand:@"Tesla" speed:100],
    ];
    for (Vehicle *v in fleet) {
        [v accelerate:20];
        NSLog(@"%@", [v describe]);
    }
    return 0;
}
```

## Gotchas

- All Objective-C method calls are dynamically dispatched; there is no way to declare a method `final` to prevent overriding (unlike Swift or Java).
- If a subclass overrides `init`, it must call `[super init]` and check the returned value — the superclass `init` may return a different object or `nil`.
- Calling a method not implemented by the subclass or any superclass raises `NSInvalidArgumentException: unrecognized selector` at runtime, not a compile error.
