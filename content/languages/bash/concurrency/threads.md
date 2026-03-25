---
title: "Threads"
language: "bash"
feature: "threads"
category: "concurrency"
applicable: false
---

Bash has no threads. Parallelism is achieved at the process level by running commands in the background with `&`. Each background job is a separate process with its own memory space — there is no shared memory. Inter-process communication uses pipes, FIFOs, signals, or temporary files. For CPU-bound parallelism, `GNU Parallel` or `xargs -P` are the idiomatic tools.

## Example

```bash
#!/usr/bin/env bash

# Process-level parallelism with &
compute_square() {
    echo $(( $1 * $1 ))
}

# Run multiple in parallel and collect results
for i in 1 2 3 4 5; do
    compute_square "${i}" &
done
wait   # waits for all; output order is non-deterministic

# Controlled parallelism: max N concurrent jobs
max_jobs=3
job_count=0

for i in {1..10}; do
    sleep 0.2 &
    ((job_count++))
    if (( job_count >= max_jobs )); then
        wait -n 2>/dev/null || wait   # wait for any one job (Bash 4.3+)
        ((job_count--))
    fi
done
wait
echo "All done"

# GNU Parallel (if installed)
# seq 1 10 | parallel -j4 'echo "Processing {}"'

# xargs parallel
# printf '%s\n' *.log | xargs -P4 -I{} gzip {}
```

## Gotchas

- Background processes do not share variables with the parent; assigning to a variable inside a `&` subshell has no effect on the parent's variables.
- `wait -n` (wait for any one background job) requires Bash 4.3+; it is not available in macOS's default Bash 3.2.
- Excessive background processes can exhaust system resources (file descriptors, PIDs); always implement a concurrency limit when launching many jobs.
