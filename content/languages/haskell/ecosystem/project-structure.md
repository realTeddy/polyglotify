---
title: "Project Structure"
language: "haskell"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

A Haskell project is described by a `.cabal` file (or `package.yaml` for Stack/hpack). Source files live under `src/`, executables under `app/`, and tests under `test/`. Modules map directly to file paths relative to the source directory.

## Example

```
myproject/
├── myproject.cabal        -- package description (or package.yaml + hpack)
├── stack.yaml             -- Stack resolver (Stack projects)
├── app/
│   └── Main.hs            -- executable entry point
├── src/
│   └── MyProject/
│       ├── Core.hs        -- module MyProject.Core
│       └── Utils.hs       -- module MyProject.Utils
├── test/
│   └── Spec.hs            -- test suite
└── README.md
```

```haskell
-- src/MyProject/Core.hs
module MyProject.Core
    ( greet
    , Version
    ) where  -- explicit export list

type Version = (Int, Int, Int)

greet :: String -> String
greet name = "Hello, " ++ name ++ "!"
```

```haskell
-- app/Main.hs
module Main where

import MyProject.Core (greet)

main :: IO ()
main = putStrLn (greet "World")
```

```cabal
-- myproject.cabal
cabal-version: 2.4
name:          myproject
version:       0.1.0.0

library
  exposed-modules: MyProject.Core, MyProject.Utils
  hs-source-dirs:  src
  build-depends:   base ^>=4.17, text

executable myproject
  main-is:         Main.hs
  hs-source-dirs:  app
  build-depends:   base, myproject
```

## Gotchas

- Module names must match file paths exactly: `module MyProject.Core` must be in `src/MyProject/Core.hs`
- Always provide an explicit export list; without it, everything is exported, which pollutes the public API
- `hpack` (via `package.yaml`) is more concise than `.cabal` and auto-generates the `.cabal` file; commit both
