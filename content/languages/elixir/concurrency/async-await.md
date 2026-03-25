---
title: "Async/Await"
language: "elixir"
feature: "async-await"
category: "concurrency"
applicable: true
---

Elixir has no `async/await` keywords, but `Task` provides equivalent semantics. `Task.async/1` starts a computation in a new process; `Task.await/2` blocks until the result is ready. `Task.async_stream/3` provides concurrent map with back-pressure.

## Example

```elixir
# Task.async + Task.await
task = Task.async(fn ->
  Process.sleep(100)   # simulate work
  42
end)

# Do other work here...
IO.puts "Working while task runs"

result = Task.await(task, 5000)   # timeout in ms
IO.puts "Task result: #{result}"  # 42

# Run multiple tasks concurrently
tasks =
  Enum.map(1..5, fn i ->
    Task.async(fn ->
      Process.sleep(100)
      i * i
    end)
  end)

results = Task.await_many(tasks)  # waits for all
IO.inspect results  # [1, 4, 9, 16, 25]

# Task.async_stream: concurrent map with back-pressure
urls = ["url1", "url2", "url3", "url4", "url5"]

urls
|> Task.async_stream(fn url ->
     # simulate HTTP request
     Process.sleep(50)
     "response from #{url}"
   end,
   max_concurrency: 3,   # at most 3 concurrent tasks
   timeout: 5000)
|> Enum.each(fn {:ok, result} -> IO.puts result end)

# Fire-and-forget (no await)
Task.start(fn ->
  Process.sleep(1000)
  IO.puts "Background task complete"
end)
```

## Gotchas

- `Task.await/2` has a default timeout of 5 seconds; always set an explicit timeout in production
- If the task process crashes, `Task.await/2` re-raises the exception in the caller
- Use `Task.async_stream/3` instead of mapping `Task.async` manually — it handles back-pressure and errors more robustly
