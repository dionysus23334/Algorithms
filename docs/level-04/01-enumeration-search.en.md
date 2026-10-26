# 4.1 Enumeration and Search

> **Level**: Level 4 · Basic Algorithms and Techniques  
> **Status**: Expanded.

## Learning Objectives

- Cover all legal cases by enumeration;
- Use linear search with early termination;
- Estimate the enumeration scale and avoid exponential blow-up.

## Linear Search

```python
def linear_search(a: list[int], x: int) -> int:
    for i, value in enumerate(a):
        if value == x:
            return i
    return -1
```

Time \(O(n)\), space \(O(1)\). If the value is not found, return `-1`; if the array may legitimately contain `-1` as a valid index, use `None` or `(found, index)` instead.

## Enumerating All Pairs

```python
def has_pair_sum(a: list[int], target: int) -> bool:
    n = len(a)
    for i in range(n):
        for j in range(i + 1, n):
            if a[i] + a[j] == target:
                return True
    return False
```

Time \(O(n^2)\). Sorting first and then using two pointers brings this down to \(O(n\log n)\), and a hash table averages \(O(n)\).

## Early Termination

Enumeration does not have to run to completion; once the answer is found, you may return. But when there is "no answer", you must prove that all cases have been covered.

```python
def first_even(a: list[int]) -> int | None:
    for x in a:
        if x % 2 == 0:
            return x
    return None
```

## C++ Version

```cpp
#include <iostream>
#include <vector>

bool has_pair_sum(const std::vector<int>& a, int target) {
    for (int i = 0; i < static_cast<int>(a.size()); ++i)
        for (int j = i + 1; j < static_cast<int>(a.size()); ++j)
            if (a[i] + a[j] == target) return true;
    return false;
}

int main() {
    std::cout << has_pair_sum({1, 2, 3, 4}, 6) << '\n';
}
```

## Enumeration Scale

| Enumerated object | Scale |
|---|---|
| Subarrays | \(O(n^2)\) |
| Subsequences | \(O(2^n)\) |
| Permutations | \(O(n!)\) |
| Combinations | \(O(\binom nk)\) |

Estimate the scale first, then decide whether pruning, binary search, DP or greedy is needed.

## Boundary Cases

| Scenario | Note |
|---|---|
| Empty array | Return not found |
| Duplicate values | Return the first one or any one |
| Target absent | Must return an explicit result |
| Large \(n\) | \(O(n^2)\) may exceed the time limit |

## Exercises

1. Find all pairs in the array whose sum is target (without duplicates).
2. Rewrite `has_pair_sum` using sorting + two pointers.
3. Estimate the running time of enumerating all subsets when \(n=30\).

## Sources

- [Hello Algorithms](https://www.hello-algo.com/)
- [OI Wiki](https://oi-wiki.org/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## Navigation

[← Level Overview](index.md) · [Next](02-basic-sorts.md)
