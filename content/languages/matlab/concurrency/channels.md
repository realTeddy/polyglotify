---
title: "Channels & Message Passing"
language: "matlab"
feature: "channels"
category: "concurrency"
applicable: false
---

MATLAB has no channel or message-passing primitives. Communication between parallel workers in the Parallel Computing Toolbox uses `labSend`/`labReceive` (in `spmd` blocks) or shared data stores (`SharedMessageQueue` in R2021a+, `parallel.pool.DataQueue` for unidirectional streaming).

## Example

```matlab
% Requires Parallel Computing Toolbox

% DataQueue — unidirectional stream from workers to client
queue = parallel.pool.DataQueue;
afterEach(queue, @(data) fprintf('Received: %d\n', data));

parfor i = 1:5
    % Workers send data back to the client
    send(queue, i * i);
end

% labSend / labReceive in spmd (worker-to-worker)
spmd (4)
    if labindex == 1
        % Worker 1 sends to worker 2
        labSend(42, 2)
    elseif labindex == 2
        % Worker 2 receives from worker 1
        data = labReceive(1);
        fprintf('Worker 2 got: %d\n', data)
    end
end

% SharedMemoryArray (R2023a+) — shared between workers
if exist('sharedmemory', 'file')
    sm = sharedmemory('my_mem', 'InitialValue', zeros(1, 100));
end
```

## Gotchas

- `DataQueue` is one-directional (workers to client) and is the recommended approach for progress reporting.
- `labSend`/`labReceive` only work inside `spmd` blocks and communicate between specific workers.
- There is no general-purpose channel or message queue in base MATLAB.
- Parallel computing in MATLAB is primarily designed for data-parallel workloads (each worker processes independent data), not task-parallel pipelines with communication.
