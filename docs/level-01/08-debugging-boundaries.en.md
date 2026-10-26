# 1.8 Debugging and Boundaries

> **Level**: Level 1 · Programming and Algorithms: Getting Started  
> **Status**: expanded.

## Learning Objectives

- Locate errors with assertions and minimal cases;
- Systematically check empty input, duplicate values, out-of-range access, integer ranges and floating-point error;
- Know that "it runs" does not mean "it is correct".

## Debugging Order

1. **Reproduce**: keep the minimal input;
2. **Shrink**: delete irrelevant data;
3. **Observe**: print the key state, not just the result;
4. **Hypothesise**: propose one verifiable cause;
5. **Verify**: change one thing and rerun;
6. **Regress**: add the case to the tests so that it cannot reappear.

```python
def max_index(a: list[int]) -> int:
    assert a, "max_index requires a non-empty list"
    best = 0
    for i in range(1, len(a)):
        if a[i] > a[best]:
            best = i
    return best
```

## Common Boundary Cases

### Empty Input

```python
def first(a):
    if not a:
        raise ValueError("empty")
    return a[0]
```

### Duplicate Values

Should the first maximum or the last maximum be returned? This must be stated clearly and tested.

```python
def first_max(a: list[int]) -> int:
    best = 0
    for i in range(1, len(a)):
        if a[i] > a[best]:  # strictly greater: keeps the first one
            best = i
    return best
```

### Out-of-range Access and Off-by-one

Binary search is the most prone to mixing up `left <= right` and `left < right`:

```python
def lower_bound(a: list[int], x: int) -> int:
    lo, hi = 0, len(a)
    while lo < hi:
        mid = (lo + hi) // 2
        if a[mid] < x:
            lo = mid + 1
        else:
            hi = mid
    return lo
```

Returns the position of the first element \(\ge x\); `hi = len(a)` allows returning `n` when all elements are less than \(x\).

### Integer Ranges

```python
def safe_sum(a: list[int]) -> int:
    return sum(a)  # Python integers do not overflow
```

In C++ the upper bound must be estimated:

```cpp
#include <vector>

long long sum(const std::vector<int>& a) {
    long long s = 0;
    for (int x : a) s += x;
    return s;
}
```

### Floating-point Error

```python
def close(a: float, b: float, eps: float = 1e-9) -> bool:
    return abs(a - b) <= eps * max(1.0, abs(a), abs(b))
```

Do not compare computed results with `==`; relative and absolute error must be considered together.

## Randomised Cross-checking

Use a brute-force solution to validate an optimised solution:

```python
import random

def brute(a):
    return max(a) if a else None

def fast(a):
    return max(a) if a else None

for _ in range(1000):
    n = random.randint(0, 20)
    a = [random.randint(-10, 10) for _ in range(n)]
    assert brute(a) == fast(a), a
```

## Checklist

- [ ] empty input, a single element, all elements equal;
- [ ] minimum, maximum, negative numbers;
- [ ] indices 0, `n-1`, `n`;
- [ ] integer overflow and type conversion;
- [ ] floating-point error and tolerance;
- [ ] whether assertions are kept in release builds;
- [ ] whether the error message is informative enough to locate the problem.

## Exercises

1. Write 10 boundary cases for `summarize` from Section 1.1.
2. Implement `upper_bound` and explain how it differs from `lower_bound`.
3. Use randomised cross-checking to verify that insertion sort produces the same results as `sorted`.

## Sources

- [Python Tutorial](https://docs.python.org/zh-cn/3/tutorial/)
- [Hello Algo](https://www.hello-algo.com/)
- [OI Wiki](https://oi-wiki.org/)

## Navigation

[← Previous](07-simulation.md) · [Level Overview](index.md)
