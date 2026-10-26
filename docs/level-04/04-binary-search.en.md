# 4.4 Binary Search

> **Level**: Level 4 · Basic Algorithms and Techniques  
> **Status**: Expanded.

## Learning Objectives

- Write `lower_bound` / `upper_bound` correctly;
- Explain the interval convention and the termination condition;
- Avoid `mid` overflow and infinite loops.

## Interval Convention

Uniformly adopt the **left-closed, right-open** interval `[lo, hi)`:

- `lo` is the smallest index of a possible answer;
- `hi` is the upper bound (exclusive) of a possible answer;
- The loop condition is `lo < hi`;
- At the end, `lo == hi`.

## lower_bound

Returns the position of the first element \(\ge x\).

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

## upper_bound

Returns the position of the first element \(>x\).

```python
def upper_bound(a: list[int], x: int) -> int:
    lo, hi = 0, len(a)
    while lo < hi:
        mid = (lo + hi) // 2
        if a[mid] <= x:
            lo = mid + 1
        else:
            hi = mid
    return lo
```

## C++ Standard Library

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> a{1, 2, 2, 2, 4, 5};
    auto lo = std::lower_bound(a.begin(), a.end(), 2);
    auto hi = std::upper_bound(a.begin(), a.end(), 2);
    std::cout << (lo - a.begin()) << ' ' << (hi - a.begin()) << '\n'; // 1 4
}
```

## Binary Search on the Answer

When "testing whether a value is feasible" is monotone, you can binary search on the answer:

```python
def first_true(lo: int, hi: int, ok) -> int:
    while lo < hi:
        mid = (lo + hi) // 2
        if ok(mid):
            hi = mid
        else:
            lo = mid + 1
    return lo
```

## Boundary Cases

| Scenario | Note |
|---|---|
| Empty array | Returns 0 |
| All elements less than x | Returns n |
| All elements greater than x | Returns 0 |
| Duplicate values | lower/upper return the endpoints of the range |
| `lo+hi` overflow | Use `lo + (hi-lo)//2` |

## Exercises

1. Use binary search to compute the integer part of \(\sqrt n\).
2. Compute the number of occurrences of \(x\) in a sorted array.
3. Use binary search on the answer to solve the "minimize the maximum split" problem.

## Sources

- [Hello Algorithms](https://www.hello-algo.com/)
- [OI Wiki](https://oi-wiki.org/)
- [cppreference](https://en.cppreference.com/)

## Navigation

[← Previous](03-library-sort.md) · [Level Overview](index.md) · [Next](05-prefix-sum.md)
