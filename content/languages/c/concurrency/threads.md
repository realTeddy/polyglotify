---
title: "Threads"
language: "c"
feature: "threads"
category: "concurrency"
applicable: true
---

C11 added a standard threading library in `<threads.h>` (`thrd_t`, `mtx_t`, `cnd_t`, `tss_t`). On POSIX systems, `<pthread.h>` (POSIX Threads) is more widely used and available on Linux, macOS, and BSDs. Threads share the process address space; shared data must be protected with mutexes. C11 also adds `<stdatomic.h>` for lock-free atomic operations.

## Example

```c
#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
#include <stdatomic.h>

/* Shared state */
static int counter = 0;
static pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;
static atomic_int atomic_counter = 0;

/* Worker thread function */
void *increment_worker(void *arg) {
    int iterations = *(int *)arg;
    for (int i = 0; i < iterations; i++) {
        pthread_mutex_lock(&mutex);
        counter++;
        pthread_mutex_unlock(&mutex);

        atomic_fetch_add_explicit(&atomic_counter, 1, memory_order_relaxed);
    }
    return NULL;
}

int main(void) {
    const int NUM_THREADS  = 4;
    const int ITERATIONS   = 10000;

    pthread_t threads[NUM_THREADS];
    int iters = ITERATIONS;

    /* Create threads */
    for (int i = 0; i < NUM_THREADS; i++) {
        if (pthread_create(&threads[i], NULL, increment_worker, &iters) != 0) {
            perror("pthread_create");
            return 1;
        }
    }

    /* Wait for all threads */
    for (int i = 0; i < NUM_THREADS; i++) {
        pthread_join(threads[i], NULL);
    }

    printf("mutex counter:  %d\n", counter);         /* 40000 */
    printf("atomic counter: %d\n", atomic_counter);  /* 40000 */

    pthread_mutex_destroy(&mutex);
    return 0;
}
```

```bash
# Compile with pthread support
gcc -o demo threads.c -lpthread -std=c11
```

## Gotchas

- `pthread_mutex_lock` / `pthread_mutex_unlock` must always be paired. A missed unlock causes a deadlock; a missed lock causes a data race — both are catastrophic. Consider wrapper macros or cleanup attributes for safety.
- Always call `pthread_join` (or `pthread_detach`) on every created thread. A thread that is neither joined nor detached leaks resources until the process exits.
