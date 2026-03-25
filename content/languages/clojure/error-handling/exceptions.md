---
title: "Exceptions & Try/Catch"
language: "clojure"
feature: "exceptions"
category: "error-handling"
applicable: true
---

Clojure uses Java's exception system. `try/catch/finally` handles exceptions; `throw` raises them. `ex-info` creates structured exceptions with a data map. Idiomatic Clojure minimises exception use in pure code, preferring `nil` or `{:error ...}` for expected failures.

## Example

```clojure
;; Basic try/catch
(try
  (/ 1 0)
  (catch ArithmeticException e
    (println "Math error:" (.getMessage e)))
  (finally
    (println "Always runs")))

;; Catch multiple exception types
(try
  (Integer/parseInt "abc")
  (catch NumberFormatException e
    (println "Not a number"))
  (catch Exception e
    (println "Unknown error:" (.getMessage e))))

;; ex-info: structured exception with a data map
(defn fetch-user [id]
  (when-not (pos? id)
    (throw (ex-info "Invalid user ID"
                    {:type :validation-error
                     :field :id
                     :value id}))))

(try
  (fetch-user -1)
  (catch clojure.lang.ExceptionInfo e
    (let [data (ex-data e)]
      (println "Error:" (ex-message e))
      (println "Data:" data))))

;; Custom exception class (rare; prefer ex-info)
;; (gen-class :name com.example.AppException :extends Exception)

;; with-open: resource management (like try-with-resources)
(with-open [r (clojure.java.io/reader "file.txt")]
  (line-seq r))   ; file closed automatically even if exception thrown
```

## Gotchas

- `ex-data` returns the map from `ex-info`; `ex-message` returns the message string
- `with-open` uses `Closeable`; it calls `.close()` in a `finally` block automatically
- Catching `Exception` is too broad; be specific to avoid swallowing unexpected errors
