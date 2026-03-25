---
title: "Channels"
language: "c"
feature: "channels"
category: "concurrency"
applicable: false
---

C has no built-in channel type. The equivalent is a **thread-safe queue** built from a circular buffer (or linked list) protected by a mutex and a condition variable. POSIX pipes (`pipe(2)`) are a kernel-level byte-stream channel between processes or threads. For intra-process typed channels, the mutex+condvar queue below is the idiomatic pattern, matching what higher-level languages call a "bounded channel."

## Example

```c
#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define CAPACITY 8

/* Typed bounded channel (int values) */
typedef struct {
    int  buf[CAPACITY];
    int  head, tail, count;
    bool closed;
    pthread_mutex_t mutex;
    pthread_cond_t  not_full;
    pthread_cond_t  not_empty;
} IntChannel;

void chan_init(IntChannel *c) {
    c->head = c->tail = c->count = 0;
    c->closed = false;
    pthread_mutex_init(&c->mutex, NULL);
    pthread_cond_init(&c->not_full, NULL);
    pthread_cond_init(&c->not_empty, NULL);
}

void chan_close(IntChannel *c) {
    pthread_mutex_lock(&c->mutex);
    c->closed = true;
    pthread_cond_broadcast(&c->not_empty);
    pthread_cond_broadcast(&c->not_full);
    pthread_mutex_unlock(&c->mutex);
}

/* Returns 0 on success, -1 if channel is closed */
int chan_send(IntChannel *c, int value) {
    pthread_mutex_lock(&c->mutex);
    while (c->count == CAPACITY && !c->closed)
        pthread_cond_wait(&c->not_full, &c->mutex);
    if (c->closed) { pthread_mutex_unlock(&c->mutex); return -1; }
    c->buf[c->tail] = value;
    c->tail = (c->tail + 1) % CAPACITY;
    c->count++;
    pthread_cond_signal(&c->not_empty);
    pthread_mutex_unlock(&c->mutex);
    return 0;
}

/* Returns 0 on success, -1 if closed and empty */
int chan_recv(IntChannel *c, int *out) {
    pthread_mutex_lock(&c->mutex);
    while (c->count == 0 && !c->closed)
        pthread_cond_wait(&c->not_empty, &c->mutex);
    if (c->count == 0) { pthread_mutex_unlock(&c->mutex); return -1; }
    *out = c->buf[c->head];
    c->head = (c->head + 1) % CAPACITY;
    c->count--;
    pthread_cond_signal(&c->not_full);
    pthread_mutex_unlock(&c->mutex);
    return 0;
}

static IntChannel ch;

void *producer(void *arg) {
    for (int i = 1; i <= 5; i++) chan_send(&ch, i);
    chan_close(&ch);
    return NULL;
}

void *consumer(void *arg) {
    int v;
    while (chan_recv(&ch, &v) == 0) printf("recv: %d\n", v);
    return NULL;
}

int main(void) {
    chan_init(&ch);
    pthread_t p, c;
    pthread_create(&p, NULL, producer, NULL);
    pthread_create(&c, NULL, consumer, NULL);
    pthread_join(p, NULL);
    pthread_join(c, NULL);
    return 0;
}
```

## Gotchas

- `pthread_cond_wait` can spuriously wake up — the `while` loop (not `if`) around the wait is essential to re-check the condition.
- Always call `pthread_cond_broadcast` (not just `signal`) when closing the channel, so all blocked senders and receivers can observe the closed state.
