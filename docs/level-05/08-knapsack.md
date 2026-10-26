# 5.8 背包问题

> **级别**：第 5 级 · 核心算法设计方法  
> **状态**：已展开。

## 学习目标

- 写 0/1 背包与完全背包；
- 理解一维空间优化的遍历顺序；
- 处理不可达状态与边界。

## 0/1 背包

每件物品最多选一次，容量 \(W\)，价值 \(v_i\)，重量 \(w_i\)。

状态 `dp[j]`：容量不超过 \(j\) 的最大价值。

```python
def knapsack_01(weights: list[int], values: list[int], W: int) -> int:
    dp = [0] * (W + 1)
    for w, v in zip(weights, values):
        for j in range(W, w - 1, -1):   # 逆序：每件只用一次
            dp[j] = max(dp[j], dp[j - w] + v)
    return dp[W]
```

时间 \(O(nW)\)，空间 \(O(W)\)。

## 完全背包

每件物品可用无限次，内层正序：

```python
def knapsack_complete(weights: list[int], values: list[int], W: int) -> int:
    dp = [0] * (W + 1)
    for w, v in zip(weights, values):
        for j in range(w, W + 1):       # 正序：可重复选
            dp[j] = max(dp[j], dp[j - w] + v)
    return dp[W]
```

## 初始化与不可达

如果要求“恰好装满”，`dp[0]=0`，其余 `-inf`；最后 `dp[W]` 为负表示不可达。

```python
NEG = float("-inf")
dp = [NEG] * (W + 1)
dp[0] = 0
```

## C++ 0/1 背包

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> w{1, 3, 4}, v{15, 20, 30};
    int W = 4;
    std::vector<int> dp(W + 1, 0);
    for (int i = 0; i < static_cast<int>(w.size()); ++i)
        for (int j = W; j >= w[i]; --j)
            dp[j] = std::max(dp[j], dp[j - w[i]] + v[i]);
    std::cout << dp[W] << '\n';
}
```

## 边界

| 场景 | 注意 |
|---|---|
| \(W=0\) | 只能选重量 0 的物品 |
| 重量 0 | 正序/逆序都要避免无限收益 |
| 恰好装满 | 初始化 `-inf` |
| 大 \(W\) | \(O(nW)\) 可能不可行；考虑其他模型 |

## 练习

1. 输出选择的物品，而不只是最大价值。
2. 实现二维费用背包。
3. 比较 0/1 与完全背包的遍历顺序。

## 来源

- [Hello 算法](https://www.hello-algo.com/)
- [OI Wiki](https://oi-wiki.org/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## 导航

[← 上一章](07-dp-intro.md) · [本级总览](index.md) · [下一章](09-sequence-dp.md)
