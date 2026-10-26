# 5.9 序列动态规划

> **级别**：第 5 级 · 核心算法设计方法  
> **状态**：已展开。

## 学习目标

- 设计以“前 i 个元素”为状态的 DP；
- 写 LIS、LCS、编辑距离；
- 恢复方案而不只求长度。

## 最长递增子序列（LIS）

`dp[i]`：以 `a[i]` 结尾的 LIS 长度。

```python
def lis(a: list[int]) -> int:
    if not a:
        return 0
    dp = [1] * len(a)
    for i in range(len(a)):
        for j in range(i):
            if a[j] < a[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    return max(dp)
```

时间 \(O(n^2)\)；用贪心 + 二分可到 \(O(n\log n)\)（耐心排序）。

## 最长公共子序列（LCS）

`dp[i][j]`：`a[:i]` 与 `b[:j]` 的 LCS 长度。

```python
def lcs(a: str, b: str) -> int:
    n, m = len(a), len(b)
    dp = [[0] * (m + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if a[i-1] == b[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[n][m]
```

## 编辑距离

插入/删除/替换代价均为 1：

```python
def edit_distance(a: str, b: str) -> int:
    n, m = len(a), len(b)
    dp = [[0] * (m + 1) for _ in range(n + 1)]
    for i in range(n + 1): dp[i][0] = i
    for j in range(m + 1): dp[0][j] = j
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            cost = 0 if a[i-1] == b[j-1] else 1
            dp[i][j] = min(dp[i-1][j] + 1, dp[i][j-1] + 1, dp[i-1][j-1] + cost)
    return dp[n][m]
```

## C++ LCS

```cpp
#include <algorithm>
#include <string>
#include <vector>

int lcs(const std::string& a, const std::string& b) {
    int n = a.size(), m = b.size();
    std::vector<std::vector<int>> dp(n + 1, std::vector<int>(m + 1, 0));
    for (int i = 1; i <= n; ++i)
        for (int j = 1; j <= m; ++j)
            dp[i][j] = (a[i-1] == b[j-1]) ? dp[i-1][j-1] + 1
                                           : std::max(dp[i-1][j], dp[i][j-1]);
    return dp[n][m];
}
```

## 恢复方案

从 `dp[n][m]` 回溯：相等则取对角，否则向较大的相邻状态移动。要保存选择或根据 DP 表判断。

## 边界

| 场景 | 注意 |
|---|---|
| 空串 | LCS/编辑距离有定义 |
| 重复字符 | LIS 严格递增还是非降 |
| 空间 | 二维表 \(O(nm)\)；可滚动到 \(O(m)\) |
| 恢复方案 | 滚动数组会丢失路径 |

## 练习

1. 用 \(O(n\log n)\) 求 LIS。
2. 输出一个 LCS，而不只是长度。
3. 给编辑距离加不同插入/删除/替换代价。

## 来源

- [Hello 算法](https://www.hello-algo.com/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)
- [OI Wiki](https://oi-wiki.org/)

## 导航

[← 上一章](08-knapsack.md) · [本级总览](index.md) · [下一章](10-synthesis.md)
