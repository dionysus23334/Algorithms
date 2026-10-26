# 7.2 Dynamic Programming Optimization

> **Level**: Level 7 · Advanced Algorithms and Data Structures  
> **Status**: Expanded.

## Learning Objectives

- Reduce dimensionality with rolling arrays;
- Optimize transitions with prefix sums / monotonic queues;
- Decide whether an optimization preserves correctness.

## Rolling Arrays

0/1 knapsack uses only one dimension, and the inner loop runs in reverse order to ensure that each item is used at most once:

```python
def knapsack(weights: list[int], values: list[int], W: int) -> int:
    dp = [0] * (W + 1)
    for w, v in zip(weights, values):
        for j in range(W, w - 1, -1):
            dp[j] = max(dp[j], dp[j-w] + v)
    return dp[W]
```

Space drops from \(O(nW)\) to \(O(W)\).

## Prefix-Sum Optimization

The transition has the form

\[
dp[i]=\min_{j<i}dp[j]+w(j,i)
\]

If \(w(j,i)\) can be split into a difference of prefixes, prefix sums / prefix minima can be used.

## Monotonic Queue Optimization

The transition window is fixed:

\[
dp[i]=\min_{i-k\le j\le i-1}dp[j]+c.
\]

Maintain the window minimum with a monotonic queue, \(O(n)\).

```python
from collections import deque

def min_window_dp(a: list[int], k: int) -> list[int]:
    dp = [0] * len(a)
    q = deque()
    for i in range(len(a)):
        while q and q[0] < i - k:
            q.popleft()
        if q:
            dp[i] = dp[q[0]] + a[i]
        while q and dp[q[-1]] >= dp[i]:
            q.pop()
        q.append(i)
    return dp
```

## Divide-and-Conquer Optimization / Convex Hull Optimization

- Monotone decisions + divide and conquer: \(O(n\log n)\);
- Slope optimization / convex hull: \(O(n)\) or \(O(n\log n)\);
- One must prove the monotonicity of decisions or the convexity; it cannot be applied mechanically.

## C++ Rolling Knapsack

```cpp
#include <algorithm>
#include <vector>

int knapsack(const std::vector<int>& w, const std::vector<int>& v, int W) {
    std::vector<int> dp(W + 1, 0);
    for (std::size_t i = 0; i < w.size(); ++i)
        for (int j = W; j >= w[i]; --j)
            dp[j] = std::max(dp[j], dp[j - w[i]] + v[i]);
    return dp[W];
}
```

## Boundary Cases

| Scenario | Note |
|---|---|
| Reverse/forward order | 0/1 knapsack and complete knapsack run in opposite directions |
| Window size | Expiry condition of the queue |
| Negative costs | Monotonicity may fail |
| Monotone decisions | Must be proved |

## Exercises

1. Use a monotonic queue to optimize the minimum cost of the "stone jumping" problem.
2. Use prefix sums to optimize a grouped DP.
3. Explain why a rolling array cannot recover the solution.

## Sources

- [OI Wiki](https://oi-wiki.org/)
- [cp-algorithms](https://cp-algorithms.com/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## Navigation

[← Previous](01-dp-advanced.md) · [Level Overview](index.md) · [Next](03-search-advanced.md)
