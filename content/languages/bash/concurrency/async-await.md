---
title: "Async/Await"
language: "bash"
feature: "async-await"
category: "concurrency"
applicable: false
---

Bash has no async/await syntax. Asynchronous execution is achieved by running commands or functions in the background with `&`. The `wait` built-in waits for background jobs to complete (analogous to "await"). Job control (`jobs`, `fg`, `bg`) manages background processes. For structured concurrency, use GNU Parallel or xargs with parallelism flags.

## Example

```bash
#!/usr/bin/env bash

# Background job — the Bash "async"
slow_task() {
    local id="${1}"
    sleep 1
    echo "Task ${id} complete"
}

# Launch background jobs
slow_task 1 &
slow_task 2 &
slow_task 3 &

# "await" — wait for all background jobs
wait
echo "All tasks done"

# Capture output from background jobs using temp files or process substitution
fetch_data() {
    local id="${1}" outfile="${2}"
    sleep 0.5
    echo "data_from_${id}" > "${outfile}"
}

tmpdir=$(mktemp -d)
fetch_data A "${tmpdir}/a" &
fetch_data B "${tmpdir}/b" &
wait

echo "A: $(cat "${tmpdir}/a")"
echo "B: $(cat "${tmpdir}/b")"
rm -rf "${tmpdir}"

# Wait for a specific PID
sleep 2 &
bg_pid=$!
echo "Waiting for PID ${bg_pid}..."
wait "${bg_pid}"
echo "Background job exited with: $?"
```

## Gotchas

- `wait` without arguments waits for all background jobs; `wait $pid` waits for a specific PID and captures its exit code in `$?`.
- Output from background jobs may interleave on stdout; use per-job temp files or `mkfifo` named pipes to collect output safely.
- Signals sent to the parent (e.g., Ctrl-C) do not automatically propagate to background child processes; use `trap 'kill $(jobs -p)' EXIT` to clean up children on exit.
