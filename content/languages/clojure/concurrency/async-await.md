---
title: "Async/Await"
language: "clojure"
feature: "async-await"
category: "concurrency"
applicable: true
---

Clojure provides `core.async` as its primary async/channel library. `go` blocks create lightweight cooperative coroutines; `<!` parks (awaits) inside a `go` block; `<!!` blocks a real thread. This is similar to Go's goroutines and channels.

## Example

```clojure
(require '[clojure.core.async :as async
           :refer [go chan >! <! >!! <!! timeout close!]])

;; go block: lightweight coroutine (parks, not blocks)
(go
  (let [c (chan)]
    (>! c 42)         ; put value into channel (parks if full)
    (println (<! c))) ; take value from channel (parks if empty)
)

;; async pattern: produce result asynchronously
(defn fetch-data [url]
  (let [result (chan 1)]          ; buffered channel of size 1
    (go
      (async/<! (timeout 100))   ; simulate async work
      (>! result {:url url :body "data"}))
    result))                     ; return the channel

;; await the result
(let [ch (fetch-data "http://example.com")]
  (println (<!! ch)))    ; <!! blocks a real thread

;; Run multiple async operations concurrently
(defn parallel-fetch [urls]
  (let [channels (map fetch-data urls)]
    (async/map vector channels)))   ; combine all channels

;; async/pipeline for concurrent data processing
(let [in  (chan 10)
      out (chan 10)]
  (async/pipeline 4            ; 4 parallel workers
    out
    (map #(* % 2))
    in)
  (go (doseq [x (range 10)] (>! in x) (close! in)))
  (go (loop []
        (when-let [v (<! out)]
          (print v " ")
          (recur)))))
```

## Gotchas

- `<!` and `>!` can only be used inside `go` blocks; use `<!!` and `>!!` on real threads (blocks the thread)
- `go` blocks run on a thread pool; avoid blocking IO or `Thread/sleep` inside them — use `go-loop` + `timeout` instead
- Channels should be closed with `close!` when no more values will be sent; consumers can check for `nil` to detect closure
