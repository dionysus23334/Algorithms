# 7.8 Offline Processing and Block Decomposition

> **Level**: Level 7 · Advanced Algorithms and Data Structures  
> **Status**: expanded.

## Learning Objectives

- Handle range queries with block decomposition;
- Handle offline range queries with Mo's algorithm;
- Understand the sweep line and CDQ divide and conquer.

## Block Decomposition

Split the array into \(\sqrt n\) blocks, tag whole blocks, and handle the scattered elements by brute force.

```python
import math

class SqrtDecomp:
    def __init__(self, a: list[int]) -> None:
        self.a = a
        self.B = max(1, int(math.sqrt(len(a))))
        self.nb = (len(a) + self.B - 1) // self.B
        self.tag = [0] * self.nb
        self.sum = [0] * self.nb
        for i, x in enumerate(a):
            self.sum[i // self.B] += x

    def add(self, l: int, r: int, v: int) -> None:  # [l, r)
        if l >= r:
            return
        b = self.B
        bl, br = l // b, (r - 1) // b
        if bl == br:
            for i in range(l, r):
                self.a[i] += v; self.sum[bl] += v
            return
        end_left = (bl + 1) * b
        for i in range(l, end_left):
            self.a[i] += v; self.sum[bl] += v
        for blk in range(bl + 1, br):
            self.tag[blk] += v; self.sum[blk] += v * b
        start_right = br * b
        for i in range(start_right, r):
            self.a[i] += v; self.sum[br] += v
```

A single operation costs \(O(\sqrt n)\).

## Mo's Algorithm

For offline range queries, sort by block and move with two pointers; the general cost is \(O((n+q)\sqrt n)\). It requires supporting the insertion or deletion of a single element in \(O(1)\).

## Sweep Line

Sort along one dimension and maintain the other dimension with a data structure; used for the union of rectangle areas and for interval coverage.

## CDQ Divide and Conquer

Divide the modifications and queries by time, and handle the contribution of the left half to the right half; commonly used for three-dimensional partial order.

## C++ Block Summation

```cpp
#include <cmath>
#include <vector>

struct Block {
    std::vector<int> a, tag, sum;
    int B;
    explicit Block(std::vector<int> v) : a(std::move(v)) {
        B = std::max(1, static_cast<int>(std::sqrt(a.size())));
        int nb = (a.size() + B - 1) / B;
        tag.assign(nb, 0); sum.assign(nb, 0);
        for (int i = 0; i < static_cast<int>(a.size()); ++i) sum[i / B] += a[i];
    }
};
```

## Boundary Cases

| Scenario | Note |
|---|---|
| Block size | About \(\sqrt n\); constant factors matter |
| Endpoints | Unify half-open and closed intervals |
| Mo's algorithm | Only suitable for offline queries with fast insertion and deletion |
| Forced online | Mo's algorithm cannot be used |

## Exercises

1. Implement range addition and range sum with block decomposition.
2. Use Mo's algorithm to count the number of distinct values in a range.
3. Use a sweep line to compute the union of rectangle areas.

## Sources

- [OI Wiki](https://oi-wiki.org/)
- [cp-algorithms](https://cp-algorithms.com/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## Navigation

[← Previous](07-advanced-trees.md) · [Level Overview](index.md) · [Next](09-nt-advanced.md)
