---
title: "Threads"
language: "matlab"
feature: "threads"
category: "concurrency"
applicable: false
---

Base MATLAB is single-threaded (the main interpreter). True multithreading is available via the Parallel Computing Toolbox (`parfor`, `spmd`, parallel pools). MATLAB internally uses threads for BLAS/LAPACK linear algebra operations, but this is transparent. `parfor` is the most common parallel idiom.

## Example

```matlab
% Requires Parallel Computing Toolbox

% parfor — parallel for loop (distributed across workers)
n = 1000;
results = zeros(1, n);

parfor i = 1:n
    results(i) = expensive_function(i);
end
disp(sum(results))

% spmd — single program, multiple data
spmd
    % Each worker runs this block
    lab_id = labindex;         % worker number (1..numworkers)
    total  = numlabs;          % total number of workers
    my_data = lab_id * 10;
    fprintf('Worker %d of %d: data=%d\n', lab_id, total, my_data)
end

% Set number of workers
parpool(4)   % start a pool with 4 workers
delete(gcp)  % shut down the pool

function result = expensive_function(x)
    result = sum(sin(1:x));   % example computation
end
```

## Gotchas

- `parfor` workers cannot share mutable state — each worker has its own workspace copy.
- Variables used inside `parfor` must be sliced (each iteration gets an independent slice) or broadcast (read-only).
- The overhead of starting a parallel pool (~seconds) means `parfor` is only beneficial for heavy computations.
- MATLAB's JIT and vectorization often outperform `parfor` for simple element-wise operations.
