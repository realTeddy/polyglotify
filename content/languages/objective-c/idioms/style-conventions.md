---
title: "Style Conventions"
language: "objective-c"
feature: "style-conventions"
category: "idioms"
applicable: true
---

Objective-C follows Apple's Cocoa Coding Guidelines. Method names are verbose and self-documenting with full-word labels (no abbreviations). Instance variables use a leading underscore (`_name`) but are accessed through properties in modern code. Constants use `k`-prefix by convention (`kMaxRetries`). Two-letter or three-letter prefixes on class names (`NS`, `UI`, `MK`, `AB`) prevent namespace collisions.

## Example

```objc
// Naming conventions
// Classes: PascalCase with prefix
@interface MYUserProfileViewController : UIViewController
// Properties: camelCase, descriptive
@property (nonatomic, copy)   NSString  *firstName;
@property (nonatomic, assign) NSInteger  maximumItemCount;

// Methods: verbose, noun-first, no abbreviations
- (instancetype)initWithUser:(MYUser *)user
                 displayMode:(MYDisplayMode)mode;
- (void)reloadDataAnimated:(BOOL)animated;
- (NSArray<MYUser *> *)usersWithRole:(MYUserRole)role;

@end

// Constants
static NSString *const MYBaseURLString = @"https://api.myapp.com";
static const NSInteger MYMaxRetryCount = 3;
typedef NS_ENUM(NSInteger, MYUserRole) {
    MYUserRoleViewer,
    MYUserRoleEditor,
    MYUserRoleAdmin,
};

// Implementation style
@implementation MYUserProfileViewController

- (instancetype)initWithUser:(MYUser *)user
                 displayMode:(MYDisplayMode)mode {
    self = [super init];
    if (!self) return nil;  // early return on nil
    _user = user;
    _displayMode = mode;
    return self;
}

@end
```

## Gotchas

- Objective-C has no namespace keyword; class prefixes are the only collision-prevention mechanism. Always use a two-or-three-letter prefix for your own classes.
- `NS_ENUM` and `NS_OPTIONS` macros produce better Swift interop than plain `enum` or `typedef enum`; always use them for enumeration types in public APIs.
- Avoid abbreviating property and method names even when they seem obvious; Objective-C conventions favour clarity (`maximumItemCount` over `maxItems`) to make the API readable without documentation.
