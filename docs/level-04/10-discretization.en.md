# 4.10 Discretization

> **Level**: Level 4 · Basic Algorithms and Techniques  
> **Status**: Expanded.

## Learning Objectives

- Map large coordinates to small ranks;
- Preserve order relations;
- Handle duplicate values and queries.

## Why Discretization Is Needed

Coordinates can be as large as \(10^9\), but there are only \(n\le10^5\) distinct values. Allocating an array directly would blow up memory; discretization maps values to \(1..k\), where \(k\) is the number of distinct values.

## Sorting with Deduplication + Binary Search

```python
from bisect import bisect_left

def compress(values: list[int]) -> tuple[list[int], list[int]]:
    xs = sorted(set(values))
    ranks = [bisect_left(xs, v) + 1 for v in values]  # 1-indexed
    return xs, ranks
```

Time \(O(n\log n)\), space \(O(n)\).

## Query Mapping

```python
def rank_of(xs: list[int], x: int) -> int:
    i = bisect_left(xs, x)
    if i == len(xs) or xs[i] != x:
        return 0  # not found
    return i + 1
```

## C++ Version

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> a{100, 5, 100, 7, 5};
    std::vector<int> xs = a;
    std::sort(xs.begin(), xs.end());
    xs.erase(std::unique(xs.begin(), xs.end()), xs.end());
    for (int x : a) {
        int rank = std::lower_bound(xs.begin(), xs.end(), x) - xs.begin() + 1;
        std::cout << rank << ' ';
    }
}
```

## Preserving Order

Discretization only compresses coordinates and does not change the ordering relations: \(x<y\iff \text{rank}(x)<\text{rank}(y)\). Duplicate values map to the same rank.

## Applications

- Index compression for Fenwick trees / segment trees;
- Sweep line;
- Two-dimensional coordinate problems;
- Counting when the value range is large but the number of points is small.

## Boundaries

| Scenario | Note |
|---|---|
| Duplicate values | deduplicate with `set` / `unique` |
| Query value does not exist | return 0 explicitly, or insert it |
| 0-index/1-index | keep it uniform throughout |
| Negative numbers | sorting is still correct |

## Exercises

1. Discretize an array and output the ranks.
2. Use discretization + a Fenwick tree to count inversions.
3. Handle the case where "the queried value is not in the original array": design a re-discretization after insertion.

## Sources

- [Hello Algo](https://www.hello-algo.com/)
- [OI Wiki](https://oi-wiki.org/)
- [cp-algorithms](https://cp-algorithms.com/)

## Navigation

[← Previous](09-bitwise.md) · [Level Overview](index.md)
