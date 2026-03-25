---
title: "Testing"
language: "objective-c"
feature: "testing"
category: "ecosystem"
applicable: true
---

Objective-C testing is done with **XCTest**, Apple's built-in test framework integrated directly into Xcode. Tests are subclasses of `XCTestCase` with methods prefixed `test`. XCTest provides assertion macros (`XCTAssertEqual`, `XCTAssertNil`, `XCTAssertThrows`, etc.), performance testing via `measureBlock:`, and asynchronous testing with `XCTestExpectation`. **OCMock** is the most popular mocking library.

## Example

```objc
// UserServiceTests.m
#import <XCTest/XCTest.h>
#import "UserService.h"
#import "User.h"

@interface UserServiceTests : XCTestCase
@property (nonatomic, strong) UserService *service;
@end

@implementation UserServiceTests

- (void)setUp {
    [super setUp];
    self.service = [[UserService alloc] init];
}

- (void)tearDown {
    self.service = nil;
    [super tearDown];
}

- (void)testFindUserByIdReturnsCorrectUser {
    User *user = [self.service findUserById:1];
    XCTAssertNotNil(user);
    XCTAssertEqual(user.userId, 1);
    XCTAssertEqualObjects(user.name, @"Alice");
}

- (void)testFindUserByIdReturnsNilForMissing {
    User *user = [self.service findUserById:999];
    XCTAssertNil(user);
}

- (void)testAsyncFetch {
    XCTestExpectation *exp = [self expectationWithDescription:@"fetch completes"];
    [self.service fetchUserAsync:1 completion:^(User *user, NSError *error) {
        XCTAssertNil(error);
        XCTAssertNotNil(user);
        [exp fulfill];
    }];
    [self waitForExpectationsWithTimeout:5.0 handler:nil];
}

- (void)testPerformance {
    [self measureBlock:^{
        for (int i = 0; i < 1000; i++) {
            [self.service findUserById:i % 10];
        }
    }];
}

@end
```

## Gotchas

- Asynchronous tests must call `[exp fulfill]` on every code path (including error paths); unfulfilled expectations time out and report a test failure, which can mask the real issue.
- `XCTAssertEqual` uses `==` for primitives and `isEqual:` for objects; use `XCTAssertEqualObjects` explicitly for objects to avoid accidental pointer comparison.
- Tests run in the same process as the app; test `setUp` and `tearDown` run for every test method — always reset state fully to avoid test-ordering dependencies.
