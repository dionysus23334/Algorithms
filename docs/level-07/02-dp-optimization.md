# 7.2 动态规划优化

> **级别**：第 7 级 · 进阶算法与数据结构  
> **状态**：已展开。

## 学习目标

- 用滚动数组降维；
- 用前缀和/单调队列优化转移；
- 判断优化是否保持正确性。

## 滚动数组

0/1 背包只用一维，内层逆序保证每件物品只用一次：

```python
def knapsack(weights: list[int], values: list[int], W: int) -> int:
    dp = [0] * (W + 1)
    for w, v in zip(weights, values):
        for j in range(W, w - 1, -1):
            dp[j] = max(dp[j], dp[j-w] + v)
    return dp[W]
```

空间从 \(O(nW)\) 降到 \(O(W)\)。

## 前缀和优化

转移形如

\[
dp[i]=\min_{j<i}dp[j]+w(j,i)
\]

若 \(w(j,i)\) 可拆成前缀差，可用前缀和/前缀最小值。

## 单调队列优化

转移窗口固定：

\[
dp[i]=\min_{i-k\le j\le i-1}dp[j]+c.
\]

用单调队列维护窗口最小值，\(O(n)\)。

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

## 分治优化/凸包优化

- 决策单调 + 分治：\(O(n\log n)\)；
- 斜率优化/凸包：\(O(n)\) 或 \(O(n\log n)\)；
- 需要证明决策单调性或凸性，不能硬套。

## C++ 滚动背包

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

## 边界

| 场景 | 注意 |
|---|---|
| 逆序/正序 | 0/1 与完全背包方向相反 |
| 窗口大小 | 队列过期条件 |
| 负数代价 | 单调性可能失效 |
| 决策单调 | 需证明 |

## 练习

1. 用单调队列优化“跳石头”最小代价。
2. 用前缀和优化分组 DP。
3. 说明滚动数组为什么不能恢复方案。

## 来源

- [OI Wiki](https://oi-wiki.org/)
- [cp-algorithms](https://cp-algorithms.com/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## 导航

[← 上一章](01-dp-advanced.md) · [本级总览](index.md) · [下一章](03-search-advanced.md)
