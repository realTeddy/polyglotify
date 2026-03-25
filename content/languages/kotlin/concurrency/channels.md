---
title: "Channels & Message Passing"
language: "kotlin"
feature: "channels"
category: "concurrency"
applicable: true
---

Kotlin coroutines provide `Channel<T>` for communication between coroutines, similar to Go's channels. Channels can be buffered or unbuffered. `Flow<T>` is the cold, reactive alternative for streams of values. `StateFlow` and `SharedFlow` are hot flows used in Android architecture components.

## Example

```kotlin
import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

fun CoroutineScope.produce(nums: List<Int>): ReceiveChannel<Int> = produce {
    for (n in nums) {
        send(n)
    }
}

fun CoroutineScope.square(input: ReceiveChannel<Int>): ReceiveChannel<Int> = produce {
    for (n in input) {
        send(n * n)
    }
}

fun main() = runBlocking {
    val numbers = produce(listOf(1, 2, 3, 4, 5))
    val squares = square(numbers)

    for (v in squares) {
        println(v)
    }

    // Buffered channel
    val channel = Channel<String>(capacity = 3)
    launch { channel.send("hello"); channel.close() }
    for (msg in channel) println(msg)
}
```

## Gotchas

- Sending to a full unbuffered channel suspends the sender; sending to a closed channel throws `ClosedSendChannelException`.
- `Channel` is a hot source — values are produced regardless of consumers; `Flow` is cold and only produces values when collected.
- The `produce` coroutine builder automatically closes the channel when the block completes, which is why the `for` loop in the consumer terminates naturally.
