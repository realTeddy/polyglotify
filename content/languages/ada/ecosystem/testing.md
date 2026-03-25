---
title: "Testing"
language: "ada"
feature: "testing"
category: "ecosystem"
applicable: true
---

Ada's standard testing framework is **AUnit** (part of the GNAT toolchain and available via Alire). Tests are organized in test suites and test cases. Each test procedure is registered in a suite and run by a test runner. GNAT also provides assertion libraries and tools like `GNATtest` for automatic test stub generation.

## Example

```ada
-- test_math.ads
with AUnit;            use AUnit;
with AUnit.Test_Cases; use AUnit.Test_Cases;

package Test_Math is
   type Math_Test is new Test_Case with null record;

   function Name (T : Math_Test) return Message_String;
   procedure Register_Tests (T : in out Math_Test);

   procedure Test_Add       (T : in out Test_Cases.Test_Case'Class);
   procedure Test_Divide    (T : in out Test_Cases.Test_Case'Class);
   procedure Test_Div_Zero  (T : in out Test_Cases.Test_Case'Class);
end Test_Math;

-- test_math.adb
with AUnit.Assertions; use AUnit.Assertions;
with My_Math;          use My_Math;  -- package under test

package body Test_Math is

   function Name (T : Math_Test) return Message_String is
      pragma Unreferenced (T);
   begin
      return Format ("Math Tests");
   end Name;

   procedure Register_Tests (T : in out Math_Test) is
   begin
      Register_Routine (T, Test_Add'Access, "Test Add");
      Register_Routine (T, Test_Divide'Access, "Test Divide");
      Register_Routine (T, Test_Div_Zero'Access, "Test Div By Zero");
   end Register_Tests;

   procedure Test_Add (T : in out Test_Cases.Test_Case'Class) is
   begin
      Assert (Add (2, 3) = 5, "2 + 3 should equal 5");
      Assert (Add (-1, 1) = 0, "-1 + 1 should equal 0");
   end Test_Add;

   procedure Test_Divide (T : in out Test_Cases.Test_Case'Class) is
   begin
      Assert (Safe_Divide (10, 2) = 5, "10 / 2 should be 5");
   end Test_Divide;

   procedure Test_Div_Zero (T : in out Test_Cases.Test_Case'Class) is
   begin
      Assert_Exception (Divide_By_Zero_Raises'Access, "Should raise exception");
   end Test_Div_Zero;
end Test_Math;
```

```sh
alr with aunit        # add AUnit dependency
alr build && alr run  # build and run test runner
gnattest src/         # auto-generate test stubs (GNAT Pro)
```

## Gotchas

- AUnit requires manual test registration — there is no automatic test discovery.
- `Assert` from `AUnit.Assertions` raises an exception on failure; the test runner catches and reports it.
- `GNATtest` (commercial GNAT Pro) can auto-generate test stubs, reducing boilerplate significantly.
- For simpler projects, a main procedure with `pragma Assert` and exception handlers suffices without AUnit.
