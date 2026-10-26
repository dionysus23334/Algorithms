# 6.6 Range Data Structures

> **Level**: Level 6 · Common Topic Algorithms  
> **Status**: Expanded.

## Learning Objectives

- Use a Fenwick tree for prefix sums / point updates;
- Use a segment tree for range queries / lazy tags;
- Know the conditions under which a sparse table applies.

## Fenwick Tree

Maintains prefix sums; point add and prefix query both take \(O(\log n)\).

```python
class Fenwick:
    def __init__(self, n: int) -> None:
        self.n = n
        self.t = [0] * (n + 1)

    def add(self, i: int, delta: int) -> None:
        while i <= self.n:
            self.t[i] += delta
            i += i & -i

    def sum(self, i: int) -> int:
        s = 0
        while i > 0:
            s += self.t[i]
            i -= i & -i
        return s

    def range_sum(self, l: int, r: int) -> int:
        return self.sum(r) - self.sum(l - 1)
```

`i & -i` extracts the lowest set bit.

## Segment Tree

Supports range queries and range updates; lazy tags postpone an update until it is actually needed.

```python
class SegTree:
    def __init__(self, a: list[int]) -> None:
        self.n = len(a)
        self.t = [0] * (4 * self.n)
        self._build(1, 0, self.n - 1, a)

    def _build(self, p: int, l: int, r: int, a: list[int]) -> None:
        if l == r:
            self.t[p] = a[l]
            return
        m = (l + r) // 2
        self._build(2*p, l, m, a)
        self._build(2*p+1, m+1, r, a)
        self.t[p] = self.t[2*p] + self.t[2*p+1]

    def query(self, ql: int, qr: int, p: int = 1, l: int = 0, r: int = -1) -> int:
        if r == -1:
            r = self.n - 1
        if ql <= l and r <= qr:
            return self.t[p]
        m = (l + r) // 2
        res = 0
        if ql <= m:
            res += self.query(ql, qr, 2*p, l, m)
        if qr > m:
            res += self.query(ql, qr, 2*p+1, m+1, r)
        return res
```

## C++ Fenwick Tree

```cpp
#include <vector>

struct Fenwick {
    int n;
    std::vector<long long> t;
    explicit Fenwick(int n) : n(n), t(n + 1, 0) {}
    void add(int i, long long x) {
        for (; i <= n; i += i & -i) t[i] += x;
    }
    long long sum(int i) {
        long long s = 0;
        for (; i > 0; i -= i & -i) s += t[i];
        return s;
    }
};
```

## Sparse Table

Range extrema on a static array: preprocessing \(O(n\log n)\), query \(O(1)\), updates not supported.

## Choosing a Structure

| Requirement | Structure |
|---|---|
| Prefix sums / point updates | Fenwick tree |
| Range sums / range updates | segment tree + lazy tags |
| Static RMQ | sparse table |
| k-th smallest in a range | persistent segment tree / sqrt decomposition |

## Boundary Cases

| Case | Note |
|---|---|
| 1-based indices | Fenwick trees usually use 1..n |
| Empty range | the query returns 0 |
| Lazy tags | the push-down order must not be wrong |
| Large values | `long long` |

## Exercises

1. Use a Fenwick tree to count inversions.
2. Add range add and range sum to the segment tree.
3. Use a sparse table to find the range maximum.

## Sources

- [OI Wiki](https://oi-wiki.org/)
- [cp-algorithms](https://cp-algorithms.com/)
- [Hello Algo](https://www.hello-algo.com/)

## Navigation

[← Previous](05-tree-algorithms.md) · [Level Overview](index.md) · [Next](07-monotonic.md)
