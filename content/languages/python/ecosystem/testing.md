---
title: "Testing"
language: "python"
feature: "testing"
category: "ecosystem"
applicable: true
---

The standard testing framework is `unittest` (built-in), but `pytest` is the dominant choice in the ecosystem due to its simpler syntax, powerful fixtures, and rich plugin ecosystem. Tests are discovered automatically by file and function naming conventions.

## Example

```python
# test_math_utils.py  (pytest style)
import pytest
from my_project.math_utils import divide, factorial

# Plain assertion — pytest rewrites assert for rich diffs
def test_divide_normal():
    assert divide(10, 2) == 5.0

def test_divide_by_zero():
    with pytest.raises(ZeroDivisionError):
        divide(1, 0)

# Parametrize — run one test with multiple inputs
@pytest.mark.parametrize("n, expected", [
    (0, 1),
    (1, 1),
    (5, 120),
])
def test_factorial(n, expected):
    assert factorial(n) == expected

# Fixtures — reusable setup/teardown
@pytest.fixture
def sample_user():
    return {"name": "Alice", "age": 30}

def test_user_name(sample_user):
    assert sample_user["name"] == "Alice"

# Mocking with unittest.mock (works with pytest)
from unittest.mock import patch, MagicMock

def test_external_call():
    with patch("my_project.services.requests.get") as mock_get:
        mock_get.return_value = MagicMock(status_code=200, json=lambda: {"ok": True})
        # ... call code that uses requests.get internally
```

```bash
pytest                   # run all tests
pytest -v                # verbose output
pytest tests/test_math_utils.py::test_divide_normal
pytest --cov=src         # with pytest-cov for coverage
```

## Gotchas

- Test files must be named `test_*.py` or `*_test.py` and test functions must start with `test_` for pytest auto-discovery
- Fixtures are injected by parameter name — the fixture name in `@pytest.fixture` must exactly match the parameter name in the test function
- `patch` targets the name where the object is used, not where it is defined — patch `my_module.requests.get`, not `requests.get`
