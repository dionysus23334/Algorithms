# 7.1 动态规划进阶

> **级别**：第 7 级 · 进阶算法与数据结构  
> **状态**：已展开。

## 学习目标

- 识别区间 DP、状态压缩 DP、数位 DP、换根 DP；
- 设计状态与转移；
- 处理维度与初始化。

## 区间 DP

以“最长回文子序列”为例：

`dp[l][r]`：`s[l:r+1]` 的 LPS 长度。

\[
dp[l][r]=
\begin{cases}
dp[l+1][r-1]+2,&s[l]=s[r],\\
\max(dp[l+1][r],dp[l][r-1]),&s[l]\ne s[r].
\end{cases}
\]

```python
def lps(s: str) -> int:
    n = len(s)
    dp = [[0] * n for _ in range(n)]
    for i in range(n):
        dp[i][i] = 1
    for length in range(2, n + 1):
        for l in range(n - length + 1):
            r = l + length - 1
            if s[l] == s[r]:
                dp[l][r] = 2 if length == 2 else dp[l+1][r-1] + 2
            else:
                dp[l][r] = max(dp[l+1][r], dp[l][r-1])
    return dp[0][n-1] if n else 0
```

时间/空间 \(O(n^2)\)。

## 状态压缩 DP

集合状态用位掩码表示。TSP：

`dp[mask][i]`：已访问 `mask`，当前在 `i` 的最小代价。

```python
def tsp(dist: list[list[int]]) -> int:
    n = len(dist)
    INF = 10**18
    dp = [[INF] * n for _ in range(1 << n)]
    dp[1][0] = 0
    for mask in range(1 << n):
        for i in range(n):
            if dp[mask][i] == INF:
                continue
            for j in range(n):
                if mask >> j & 1:
                    continue
                nm = mask | (1 << j)
                dp[nm][j] = min(dp[nm][j], dp[mask][i] + dist[i][j])
    return min(dp[(1 << n) - 1][i] for i in range(n))
```

\(O(2^n n^2)\)，\(n\le20\) 左右。

## 数位 DP

统计 \([0,N]\) 中满足数位条件的数：状态 `pos, tight, started, ...`，记忆化。

## 换根 DP

先求子树信息，再通过父节点“换根”求全局信息；两次 DFS，\(O(n)\)。

## C++ 区间 DP

```cpp
#include <algorithm>
#include <string>
#include <vector>

int lps(const std::string& s) {
    int n = s.size();
    std::vector<std::vector<int>> dp(n, std::vector<int>(n, 0));
    for (int i = 0; i < n; ++i) dp[i][i] = 1;
    for (int len = 2; len <= n; ++len)
        for (int l = 0; l + len - 1 < n; ++l) {
            int r = l + len - 1;
            if (s[l] == s[r]) dp[l][r] = (len == 2 ? 2 : dp[l+1][r-1] + 2);
            else dp[l][r] = std::max(dp[l+1][r], dp[l][r-1]);
        }
    return n ? dp[0][n-1] : 0;
}
```

## 边界

| 场景 | 注意 |
|---|---|
| 空串 | 返回 0 |
| \(n>20\) | 状态压缩不可行 |
| 数位 DP 前导零 | `started` 标记 |
| 换根 | 父子信息方向 |

## 练习

1. 用区间 DP 求矩阵链最小乘法次数。
2. 用状态压缩求集合划分最小代价。
3. 统计 \([0,N]\) 中不含数字 4 的整数个数。

## 来源

- [OI Wiki](https://oi-wiki.org/)
- [cp-algorithms](https://cp-algorithms.com/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## 导航

[← 本级总览](index.md) · [下一章](02-dp-optimization.md)
