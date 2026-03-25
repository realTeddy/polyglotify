---
title: "Testing"
language: "clojure"
feature: "testing"
category: "ecosystem"
applicable: true
---

**clojure.test** is the built-in testing framework. **Kaocha** is a popular test runner with rich output and extensibility. **test.check** provides property-based testing. Tests use `deftest` and `is` assertions.

## Example

```clojure
;; test/myapp/core_test.clj
(ns myapp.core-test
  (:require [clojure.test :refer [deftest is testing are run-tests]]
            [myapp.core :as core]))

;; Basic test
(deftest test-add
  (is (= 5 (core/add 2 3)))
  (is (= 0 (core/add 0 0))))

;; Nested context with testing
(deftest test-safe-divide
  (testing "successful division"
    (is (= {:ok 5} (core/safe-divide 10 2))))
  (testing "division by zero"
    (is (= {:error "division by zero"} (core/safe-divide 10 0)))))

;; are: table-driven tests
(deftest test-classify
  (are [input expected] (= expected (core/classify input))
    :foo   "unknown"
    :bar   "special"
    nil    "none"))

;; Test exceptions
(deftest test-validation
  (is (thrown? clojure.lang.ExceptionInfo
               (core/fetch-user -1)))
  (is (thrown-with-msg? Exception #"Invalid"
                         (core/validate! nil))))

;; Property-based with clojure.test.check
(require '[clojure.test.check.generators :as gen]
         '[clojure.test.check.properties :as prop]
         '[clojure.test.check :as tc])

(def prop-add-commutative
  (prop/for-all [a gen/int b gen/int]
    (= (+ a b) (+ b a))))

(tc/quick-check 1000 prop-add-commutative)
```

```bash
# Run tests
lein test             # Leiningen
clj -M:test           # deps.edn with test runner
clj -X:test           # Kaocha
```

## Gotchas

- Test namespaces must match source namespaces with a `_test` suffix; `myapp.core` → `myapp.core-test`
- `is` assertions print the failing form on failure, which is very helpful for debugging
- `deftest` forms are discovered by the test runner via metadata; avoid putting test setup in top-level `do` forms
