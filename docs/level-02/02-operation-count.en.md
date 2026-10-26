# 2.2 Operation Count

> **Level**: Level 2 · Foundations of Algorithm Analysis  
> **Status**: Expanded.

## Learning Objectives

- Compare algorithms by their "number of basic operations";
- Distinguish the input size \(n\), the iteration count and the actual running time;
- Understand why halving the size produces \(\log n\).

## Basic Operations

First agree on what counts as one operation: comparison, assignment, arithmetic, array access. Different conventions change the constant factor but not the growth order.

```python
def linear_search(a: list[int], x: int) -> int:
    ops = 0
    for i, value in enumerate(a):
        ops += 1          # comparison
        if value == x:
            return i, ops
    return -1, ops
```

The worst case performs \(n\) comparisons; the best case 1; the average is about \(n/2\) (assuming equal probability and that the element exists).

## Halving the Size

```python
def binary_search(a: list[int], x: int) -> tuple[int, int]:
    lo, hi = 0, len(a)
    ops = 0
    while lo < hi:
        mid = (lo + hi) // 2
        ops += 1
        if a[mid] < x:
            lo = mid + 1
        else:
            hi = mid
    return lo, ops
```

Each round roughly halves the interval length: \(n,n/2,n/4,\dots,1\), for at most \(\lceil\log_2(n+1)\rceil\) rounds.

## Operation Counting in C++

```cpp
#include <iostream>
#include <vector>

std::pair<int,int> linear_search(const std::vector<int>& a, int x) {
    int ops = 0;
    for (int i = 0; i < static_cast<int>(a.size()); ++i) {
        ++ops;
        if (a[i] == x) return {i, ops};
    }
    return {-1, ops};
}

int main() {
    std::vector<int> a{1, 3, 5, 7, 9};
    auto [i, ops] = linear_search(a, 7);
    std::cout << i << ' ' << ops << '\n';
}
```

## Common Iteration Counts

| Code shape | Count | Growth |
|---|---|---|
| `for i in range(n)` | \(n\) | linear |
| Nested `for` | \(n^2\) | quadratic |
| `while n > 1: n //= 2` | \(\log_2 n\) | logarithmic |
| `i *= 2` each round until \(n\) | \(\log_2 n\) | logarithmic |
| Recursion \(T(n)=2T(n/2)+n\) | \(n\log n\) | linearithmic |

## Boundaries and Caveats

- An operation count is a **model**, not real time; caches, branch prediction and interpreter overhead all affect the constant factor;
- Best/worst/average cases must be stated separately;
- For small \(n\), a lower-growth algorithm is not necessarily faster;
- The counting code itself adds overhead; use it for analysis only and keep it out of production paths.

## Exercises

1. Add counting to binary search and verify that the operation count is about \(\log_2 n\) for \(n=10^3,10^6\).
2. Write the operation-count formula for the triple loop \(\sum_{i<j<k}1\).
3. Compare the iteration counts of "\(i+=1\) per round" and "\(i*=2\) per round".

## Sources

- [Hello Algo](https://www.hello-algo.com/)
- [Open Data Structures](https://opendatastructures.org/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## Navigation

[← Previous](01-problem-definition.md) · [Level Overview](index.md) · [Next](03-time-complexity.md)
