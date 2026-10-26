# 8.3 Advanced DP Optimization

> **Level**: Level 8 · Advanced Algorithms and Computational Methods  
> **Status**: Expanded.

## Learning Objectives

- Identify decision monotonicity;
- Use divide-and-conquer optimization and convex hull optimization;
- Know the conditions under which Knuth optimization applies.

## Divide-and-Conquer Optimization

If the optimal decision point \(opt(i)\) is monotone, we can divide and conquer over the decision range:

```python
def divide_conquer_dp(n: int, cost) -> list[int]:
    INF = 10**18
    dp = [INF] * (n + 1)
    dp[0] = 0

    def solve(l: int, r: int, opt_l: int, opt_r: int) -> None:
        if l > r:
            return
        mid = (l + r) // 2
        best, best_k = INF, opt_l
        for k in range(opt_l, min(mid, opt_r) + 1):
            v = dp[k-1] + cost(k, mid)
            if v < best:
                best, best_k = v, k
        dp[mid] = best
        solve(l, mid - 1, opt_l, best_k)
        solve(mid + 1, r, best_k, opt_r)

    solve(1, n, 1, n)
    return dp
```

It requires \(opt(i)\) to be monotone in \(i\); the time is \(O(n\log n)\) cost evaluations.

## Convex Hull Trick (CHT)

The transition has the form

\[
dp[i]=\min_j (m_j x_i+b_j).
\]

Treat each \(j\) as a line, maintain the lower convex hull; if queries arrive with monotone \(x\), each query costs amortized \(O(1)\).

## Knuth Optimization

If \(opt(i,j-1)\le opt(i,j)\le opt(i+1,j)\), interval DP can be reduced from \(O(n^3)\) to \(O(n^2)\).

## C++ Divide-and-Conquer DP

```cpp
#include <algorithm>
#include <vector>

void solve(int l, int r, int opt_l, int opt_r,
           const std::vector<std::vector<long long>>& cost,
           std::vector<long long>& dp) {
    if (l > r) return;
    int mid = (l + r) / 2, best_k = opt_l;
    long long best = (1LL << 62);
    for (int k = opt_l; k <= std::min(mid, opt_r); ++k) {
        long long v = dp[k-1] + cost[k][mid];
        if (v < best) { best = v; best_k = k; }
    }
    dp[mid] = best;
    solve(l, mid-1, opt_l, best_k, cost, dp);
    solve(mid+1, r, best_k, opt_r, cost, dp);
}
```

## Boundary Cases

| Scenario | Note |
|---|---|
| Decision not monotone | Divide-and-conquer optimization fails |
| Floating-point slopes | Use cross multiplication to avoid errors |
| Queries not monotone | The convex hull needs binary search |
| Cost function | Must be \(O(1)\) or fast to compute |

## Exercises

1. Prove the decision monotonicity of grouped DP.
2. Use CHT to optimize slope DP.
3. Use Knuth optimization for stone merging.

## Sources

- [OI Wiki](https://oi-wiki.org/)
- [cp-algorithms](https://cp-algorithms.com/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## Navigation

[← Previous](02-randomized-algorithms.md) · [Level Overview](index.md) · [Next](04-advanced-graph.md)
