# 8.3 高级 DP 优化

> **级别**：第 8 级 · 高级算法与计算方法  
> **状态**：已展开。

## 学习目标

- 识别决策单调性；
- 用分治优化与凸包优化；
- 知道 Knuth 优化的适用条件。

## 分治优化

若最优决策点 \(opt(i)\) 单调，可对决策区间分治：

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

要求 \(opt(i)\) 随 \(i\) 单调；时间 \(O(n\log n)\) 次代价计算。

## 凸包优化（CHT）

转移形如

\[
dp[i]=\min_j (m_j x_i+b_j).
\]

把每个 \(j\) 看成直线，维护下凸包，查询按 \(x\) 单调则均摊 \(O(1)\)。

## Knuth 优化

若 \(opt(i,j-1)\le opt(i,j)\le opt(i+1,j)\)，可把区间 DP 从 \(O(n^3)\) 降到 \(O(n^2)\)。

## C++ 分治 DP

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

## 边界

| 场景 | 注意 |
|---|---|
| 决策不单调 | 分治优化失效 |
| 浮点斜率 | 用交叉乘法避免误差 |
| 查询不单调 | 凸包需二分 |
| 代价函数 | 必须 \(O(1)\) 或可快速计算 |

## 练习

1. 证明分组 DP 的决策单调性。
2. 用 CHT 优化斜率 DP。
3. 用 Knuth 优化石子合并。

## 来源

- [OI Wiki](https://oi-wiki.org/)
- [cp-algorithms](https://cp-algorithms.com/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## 导航

[← 上一章](02-randomized-algorithms.md) · [本级总览](index.md) · [下一章](04-advanced-graph.md)
