---
title: "Async/Await"
language: "matlab"
feature: "async-await"
category: "concurrency"
applicable: false
---

MATLAB has no async/await syntax. Asynchronous and parallel execution is available through the Parallel Computing Toolbox (`parfeval`, `parfor`, `spmd`). Without that toolbox, MATLAB is single-threaded. `parfeval` is the closest analog to async tasks — it submits work to a parallel pool and returns a `Future` object.

## Example

```matlab
% Requires Parallel Computing Toolbox

% parfeval — async task (like async/await)
pool = gcp();  % get or create parallel pool

% Submit async tasks
f1 = parfeval(pool, @(n) n^2, 1, 5);    % compute 5^2
f2 = parfeval(pool, @(n) n^2, 1, 10);   % compute 10^2

% Await results (fetchOutputs blocks until done)
result1 = fetchOutputs(f1);   % 25
result2 = fetchOutputs(f2);   % 100

fprintf('Results: %d, %d\n', result1, result2)

% Fetch as they complete (non-deterministic order)
futures = [f1 f2];
for i = 1:numel(futures)
    [idx, result] = fetchNext(futures);
    fprintf('Task %d done: %d\n', idx, result)
end

% Cancel a pending task
cancel(f1)
```

## Gotchas

- `parfeval` requires the Parallel Computing Toolbox — it is not part of base MATLAB.
- `fetchOutputs` blocks the main thread until the task completes — it is synchronous from the caller's perspective.
- `fetchNext` returns results as they complete, which is closer to true async behavior.
- Without the toolbox, MATLAB is fully single-threaded and blocking.
