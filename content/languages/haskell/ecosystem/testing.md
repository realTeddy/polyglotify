---
title: "Testing"
language: "haskell"
feature: "testing"
category: "ecosystem"
applicable: true
---

**HUnit** provides xUnit-style tests; **Hspec** provides BDD-style `describe`/`it` specs; **QuickCheck** provides property-based testing. They are commonly used together. **Tasty** is a popular test framework that integrates all three.

## Example

```haskell
-- test/Spec.hs  (Hspec)
import Test.Hspec
import Test.QuickCheck
import MyProject.Core

main :: IO ()
main = hspec $ do
    describe "greet" $ do
        it "greets a name" $
            greet "Alice" `shouldBe` "Hello, Alice!"

        it "works for any non-empty string" $
            property $ \name ->
                not (null name) ==>
                    greet name == "Hello, " ++ name ++ "!"

    describe "parsePositiveInt" $ do
        it "parses a valid integer" $
            parsePositiveInt "42" `shouldBe` Right 42

        it "returns Left on empty input" $
            parsePositiveInt "" `shouldSatisfy` \case
                Left _ -> True
                _      -> False

-- QuickCheck properties standalone
prop_reverseInvolution :: [Int] -> Bool
prop_reverseInvolution xs = reverse (reverse xs) == xs

prop_addCommutative :: Int -> Int -> Bool
prop_addCommutative x y = x + y == y + x
```

```bash
# Run with Stack
stack test

# Run with Cabal
cabal test

# QuickCheck standalone
stack ghci
> import Test.QuickCheck
> quickCheck prop_reverseInvolution
+++ OK, passed 100 tests.

# Coverage with HPC
stack test --coverage
stack hpc report myproject
```

## Gotchas

- Hspec discovers tests via `hspec-discover`; add `{-# OPTIONS_GHC -F -pgmF hspec-discover #-}` at the top of `Spec.hs`
- QuickCheck generates 100 random test cases by default; increase with `quickCheckWith (stdArgs {maxSuccess=10000})`
- Use `==>` (implication) in QuickCheck properties for preconditions; inputs that don't satisfy the precondition are discarded, not counted
