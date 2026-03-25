---
title: "Threads"
language: "cpp"
feature: "threads"
category: "concurrency"
applicable: true
---

C++11 introduced `std::thread` along with mutexes, condition variables, and atomic types in `<thread>`, `<mutex>`, `<condition_variable>`, and `<atomic>`. C++20 adds `std::jthread` (joinable thread that auto-joins on destruction) and `std::stop_token` for cooperative cancellation. Thread-safe data is managed with `std::mutex` + `std::lock_guard`/`std::unique_lock`, or lock-free types from `<atomic>`.

## Example

```cpp
#include <thread>
#include <mutex>
#include <vector>
#include <atomic>
#include <iostream>

// std::jthread + stop_token (C++20) — preferred
void worker(std::stop_token stop, int id) {
    while (!stop.stop_requested()) {
        std::cout << "Thread " << id << " working\n";
        std::this_thread::sleep_for(std::chrono::milliseconds(5));
    }
}

// Mutex-protected shared state
class SafeCounter {
public:
    void increment() {
        std::lock_guard lock(mutex_);
        ++count_;
    }
    int value() const {
        std::lock_guard lock(mutex_);
        return count_;
    }
private:
    mutable std::mutex mutex_;
    int count_ = 0;
};

// Atomic — lock-free for simple operations
std::atomic<int> global_counter{0};

int main() {
    SafeCounter counter;

    // Spawn threads
    std::vector<std::jthread> threads;
    threads.reserve(4);
    for (int i = 0; i < 4; i++) {
        threads.emplace_back([&counter]() {
            for (int j = 0; j < 1000; j++) counter.increment();
        });
    }
    // jthread joins automatically when destroyed

    std::cout << "Count: " << counter.value() << "\n";  // 4000

    // Atomic operations
    std::jthread t1([&]() { global_counter.fetch_add(1, std::memory_order_relaxed); });
    std::jthread t2([&]() { global_counter.fetch_add(1, std::memory_order_relaxed); });
    // Both join here

    std::cout << "Atomic: " << global_counter.load() << "\n";  // 2

    return 0;
}
```

## Gotchas

- `std::thread` must be joined or detached before destruction — failing to do so calls `std::terminate`. Use `std::jthread` (C++20) which auto-joins to avoid this.
- Data races (accessing shared data without synchronization) are undefined behavior — not just incorrect behavior. Always protect shared mutable state with a mutex or atomic.
