# 5.7 动态规划入门

> **级别**：第 5 级 · 核心算法设计方法  
> **状态**：已展开。

## 学习目标

- 定义状态与转移；
- 写记忆化与自底向上；
- 确定遍历顺序与边界。

## 状态设计

以网格路径为例：从 \((0,0)\) 到 \((n-1,m-1)\)，只能向右/下，求路径数。

状态 `dp[i][j]`：到达 \((i,j)\) 的路径数。

转移：

\[
dp[i][j]=dp[i-1][j]+dp[i][j-1].
\]

边界：第一行/第一列只有 1 条路径。

```python
def grid_paths(n: int, m: int) -> int:
    dp = [[0] * m for _ in range(n)]
    for i in range(n):
        for j in range(m):
            if i == 0 or j == 0:
                dp[i][j] = 1
            else:
                dp[i][j] = dp[i-1][j] + dp[i][j-1]
    return dp[n-1][m-1]
```

时间/空间 \(O(nm)\)；可用滚动数组降到 \(O(m)\)。

## 记忆化

```python
from functools import lru_cache

@lru_cache(None)
def climb(n: int) -> int:
    if n <= 1:
        return 1
    return climb(n - 1) + climb(n - 2)
```

自顶向下，只算需要的状态；注意递归深度。

## C++ 网格

```cpp
#include <iostream>
#include <vector>

long long grid_paths(int n, int m) {
    std::vector<std::vector<long long>> dp(n, std::vector<long long>(m, 0));
    for (int i = 0; i < n; ++i)
        for (int j = 0; j < m; ++j)
            dp[i][j] = (i == 0 || j == 0) ? 1 : dp[i-1][j] + dp[i][j-1];
    return dp[n-1][m-1];
}

int main() { std::cout << grid_paths(3, 4) << '\n'; }
```

## DP 的四个问题

1. 状态是什么？
2. 转移从哪些旧状态来？
3. 边界是什么？
4. 按什么顺序计算？

## 边界

| 场景 | 注意 |
|---|---|
| \(n=0\) 或 \(m=0\) | 路径数定义 |
| 大数 | 结果可能溢出，取模或用大整数 |
| 递归记忆化 | 深度与缓存空间 |
| 状态重复 | 确保无后效性 |

## 练习

1. 用滚动数组优化网格路径。
2. 带障碍物的网格路径数。
3. 比较记忆化与自底向上的时间/空间。

## 来源

- [Hello 算法](https://www.hello-algo.com/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)
- [OI Wiki](https://oi-wiki.org/)

## 导航

[← 上一章](06-greedy.md) · [本级总览](index.md) · [下一章](08-knapsack.md)
