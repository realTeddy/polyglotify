---
title: "Async / Await"
language: "cpp"
feature: "async-await"
category: "concurrency"
applicable: true
---

C++ has no built-in `async/await` keywords. The closest standard mechanism is `std::async` and `std::future<T>`, which launch work asynchronously and block on `future.get()`. C++20 coroutines (`co_await`, `co_yield`, `co_return`) provide the language-level infrastructure for async programming, but require library support (C++ Standard Library coroutine machinery or libraries like `cppcoro`, `libunifex`, or C++23 `std::generator`).

## Example

```cpp
#include <future>
#include <thread>
#include <vector>
#include <numeric>
#include <iostream>

// std::async — simplest async operation
std::future<int> compute_async(int n) {
    return std::async(std::launch::async, [n]() {
        // Simulate expensive computation
        std::this_thread::sleep_for(std::chrono::milliseconds(10));
        int sum = 0;
        for (int i = 1; i <= n; i++) sum += i;
        return sum;
    });
}

// std::promise — manual future/promise pair
void produce(std::promise<int>&& p) {
    std::this_thread::sleep_for(std::chrono::milliseconds(5));
    p.set_value(42);
}

int main() {
    // Parallel work with futures
    auto f1 = compute_async(100);
    auto f2 = compute_async(200);

    // .get() blocks until result is ready
    int r1 = f1.get();  // 5050
    int r2 = f2.get();  // 20100
    std::cout << r1 + r2 << "\n";  // 25150

    // promise / future pair for thread communication
    std::promise<int> prom;
    std::future<int> fut = prom.get_future();

    std::thread t(produce, std::move(prom));
    std::cout << fut.get() << "\n";  // 42
    t.join();

    // std::async with deferred (lazy) launch
    auto lazy = std::async(std::launch::deferred, []() {
        return std::string("computed lazily");
    });
    // Not computed yet — runs when .get() is called
    std::cout << lazy.get() << "\n";

    return 0;
}
```

## Gotchas

- `std::async` with `std::launch::async` guarantees a new thread; with `std::launch::async | std::launch::deferred` (the default), the implementation chooses — it may run synchronously. Specify `std::launch::async` explicitly.
- The future returned by `std::async` blocks in its destructor if the task hasn't completed yet — this means temporary futures like `std::async(...)` without saving the return value will block immediately.
