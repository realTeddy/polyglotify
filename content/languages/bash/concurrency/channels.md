---
title: "Channels & Message Passing"
language: "bash"
feature: "channels"
category: "concurrency"
applicable: false
---

Bash has no channel type, but Unix pipes and named pipes (FIFOs) serve as the closest equivalent. An anonymous pipe `|` connects one process's stdout to another's stdin as a stream. Named pipes (`mkfifo`) allow two processes to communicate without a shared parent. These are blocking, unidirectional, and byte-stream-based — not typed message channels.

## Example

```bash
#!/usr/bin/env bash

# Anonymous pipe — producer | consumer
producer() {
    for i in 1 2 3 4 5; do
        echo "message_${i}"
        sleep 0.1
    done
}

consumer() {
    while IFS= read -r msg; do
        echo "Received: ${msg}"
    done
}

producer | consumer

# Named pipe (FIFO) — communication between separate processes
fifo=$(mktemp -u)
mkfifo "${fifo}"

# Writer (producer) in background
{
    for msg in "alpha" "beta" "gamma"; do
        echo "${msg}"
        sleep 0.2
    done
} > "${fifo}" &

# Reader (consumer) in foreground
while IFS= read -r line; do
    echo "Got: ${line}"
done < "${fifo}"

rm -f "${fifo}"

# Bidirectional communication with two FIFOs
request_fifo=$(mktemp -u); mkfifo "${request_fifo}"
response_fifo=$(mktemp -u); mkfifo "${response_fifo}"
# (server and client processes would open both ends)
rm -f "${request_fifo}" "${response_fifo}"
```

## Gotchas

- Reading from an empty FIFO blocks until a writer opens the other end; if the writer never comes, the reader hangs indefinitely.
- Pipes are unidirectional; for bidirectional communication, create two FIFOs (one in each direction).
- Named pipes must be removed with `rm` after use; they persist on the filesystem until deleted and can cause hangs if re-opened accidentally.
