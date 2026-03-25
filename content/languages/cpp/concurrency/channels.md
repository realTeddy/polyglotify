---
title: "Channels"
language: "cpp"
feature: "channels"
category: "concurrency"
applicable: true
---

C++ has no built-in channel type, but a thread-safe queue — the equivalent of a channel — is straightforward to implement using `std::queue`, `std::mutex`, and `std::condition_variable`. Libraries like `moodycamel::ConcurrentQueue` provide lock-free alternatives. C++20 `std::latch` and `std::barrier` cover specific synchronization patterns. For higher-level actor/channel frameworks, look at Intel TBB's `tbb::concurrent_queue` or HPX.

## Example

```cpp
#include <queue>
#include <mutex>
#include <condition_variable>
#include <optional>
#include <thread>
#include <iostream>

template<typename T>
class Channel {
public:
    explicit Channel(std::size_t capacity = 0) : capacity_(capacity) {}

    // Send — blocks if bounded channel is full
    void send(T value) {
        std::unique_lock lock(mutex_);
        if (capacity_ > 0)
            not_full_.wait(lock, [this] { return queue_.size() < capacity_ || closed_; });
        if (closed_) throw std::runtime_error("Channel is closed");
        queue_.push(std::move(value));
        not_empty_.notify_one();
    }

    // Receive — blocks until value available or channel closed
    std::optional<T> receive() {
        std::unique_lock lock(mutex_);
        not_empty_.wait(lock, [this] { return !queue_.empty() || closed_; });
        if (queue_.empty()) return std::nullopt;  // closed and empty
        T val = std::move(queue_.front());
        queue_.pop();
        not_full_.notify_one();
        return val;
    }

    void close() {
        std::lock_guard lock(mutex_);
        closed_ = true;
        not_empty_.notify_all();
        not_full_.notify_all();
    }

private:
    std::queue<T> queue_;
    std::mutex mutex_;
    std::condition_variable not_empty_, not_full_;
    std::size_t capacity_;
    bool closed_ = false;
};

int main() {
    Channel<int> ch(5);  // buffered channel, capacity 5

    std::jthread producer([&] {
        for (int i = 1; i <= 5; i++) {
            ch.send(i);
            std::cout << "Sent: " << i << "\n";
        }
        ch.close();
    });

    std::jthread consumer([&] {
        while (auto val = ch.receive()) {
            std::cout << "Received: " << *val << "\n";
        }
    });

    return 0;
}
```

## Gotchas

- `condition_variable::wait` can spuriously wake up — always wrap in a predicate lambda (`wait(lock, predicate)`) to re-check the condition.
- This implementation uses a single mutex, which is sufficient for most use cases. For high-throughput scenarios, a lock-free queue (e.g., `moodycamel::ConcurrentQueue`) avoids contention.
