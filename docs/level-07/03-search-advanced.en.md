# 7.3 Advanced Search

> **Level**: Level 7 · Advanced Algorithms and Data Structures  
> **Status**: Expanded.

## Learning Objectives

- Use bidirectional BFS to reduce the number of search layers;
- Use meet-in-the-middle search to handle \(2^n\);
- Understand the heuristic functions of IDA* and A*.

## Bidirectional BFS

Run BFS from the start and the goal simultaneously; meeting means shortest.

```python
from collections import deque

def bidirectional(start: int, goal: int, neighbors) -> int:
    if start == goal:
        return 0
    front, back = {start}, {goal}
    dist_f, dist_b = {start: 0}, {goal: 0}
    while front and back:
        if len(front) > len(back):
            front, back = back, front
            dist_f, dist_b = dist_b, dist_f
        nxt = set()
        for u in front:
            for v in neighbors(u):
                if v in dist_f:
                    continue
                if v in dist_b:
                    return dist_f[u] + 1 + dist_b[v]
                dist_f[v] = dist_f[u] + 1
                nxt.add(v)
        front = nxt
    return -1
```

## Meet-in-the-Middle Search

Subset sum with \(n\le40\): split into two halves, enumerate \(2^{n/2}\) for each, then sort and binary search.

```python
def subset_sum_count(a: list[int], target: int) -> int:
    def sums(arr):
        out = [0]
        for x in arr:
            out += [s + x for s in out]
        return out
    mid = len(a) // 2
    left, right = sums(a[:mid]), sums(a[mid:])
    right.sort()
    from bisect import bisect_left
    return sum(bisect_left(right, target - s + 1) for s in left)
```

## IDA* and A*

- A*: `f = g + h`, priority queue;
- IDA*: iterative deepening + heuristic pruning, space \(O(depth)\);
- The heuristic function must be admissible (must not overestimate).

## C++ Meet-in-the-Middle Search

```cpp
#include <algorithm>
#include <vector>

std::vector<long long> subset_sums(const std::vector<int>& a, int l, int r) {
    std::vector<long long> out{0};
    for (int i = l; i < r; ++i) {
        int n = out.size();
        for (int j = 0; j < n; ++j) out.push_back(out[j] + a[i]);
    }
    return out;
}
```

## Boundary Cases

| Scenario | Note |
|---|---|
| Start = goal | Return 0 |
| Unreachable | Return -1 |
| Heuristic function | An inadmissible heuristic loses optimality |
| Duplicate states | Deduplicate with visited |

## Exercises

1. Solve the eight-puzzle with bidirectional BFS.
2. Use meet-in-the-middle search to count the subsets whose sum equals target.
3. Design an admissible A* heuristic function.

## Sources

- [OI Wiki](https://oi-wiki.org/)
- [cp-algorithms](https://cp-algorithms.com/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## Navigation

[← Previous](02-dp-optimization.md) · [Level Overview](index.md) · [Next](04-connectivity.md)
