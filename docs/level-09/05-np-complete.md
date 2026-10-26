# 9.5 NP 完全问题

> **级别**：第 9 级 · 算法理论与计算边界  
> **状态**：已展开。

## 学习目标

- 认识 SAT、3-SAT、团、顶点覆盖、子集和；
- 用小规模求解器验证；
- 理解归约链。

## 经典 NP 完全问题

- **SAT**：布尔公式可满足性；
- **3-SAT**：每个子句恰 3 个字面量；
- **团**：图是否有大小 \(k\) 的完全子图；
- **顶点覆盖**：是否有大小 \(k\) 的点覆盖所有边；
- **子集和**：是否有子集和等于目标。

## 小规模 SAT 求解

```python
from itertools import product

def sat_bruteforce(n: int, clauses: list[list[int]]) -> list[bool] | None:
    for bits in product([False, True], repeat=n):
        if all(any(bits[abs(l)-1] == (l > 0) for l in c) for c in clauses):
            return list(bits)
    return None
```

\(O(2^n\cdot m)\)；只适合很小的 \(n\)。

## 归约链

\[
\text{SAT}\le_p\text{3-SAT}\le_p\text{独立集}\le_p\text{顶点覆盖}.
\]

每一步都要保持答案，并在多项式时间内构造。

## 顶点覆盖暴力

```python
from itertools import combinations

def has_vertex_cover(n: int, edges: list[tuple[int,int]], k: int) -> bool:
    for chosen in combinations(range(n), k):
        s = set(chosen)
        if all(u in s or v in s for u, v in edges):
            return True
    return False
```

## C++ 子集和

```cpp
#include <iostream>
#include <vector>

bool subset_sum(const std::vector<int>& a, int target) {
    std::vector<bool> dp(target + 1, false);
    dp[0] = true;
    for (int x : a)
        for (int j = target; j >= x; --j)
            dp[j] = dp[j] || dp[j-x];
    return dp[target];
}
```

注意：这是伪多项式 \(O(n\cdot target)\)，不是多项式。

## 边界

| 场景 | 注意 |
|---|---|
| 小 \(n\) | 暴力/回溯可行 |
| 大 \(n\) | 需要近似/参数化/启发式 |
| 伪多项式 | target 的位数是指数 |
| 归约 | 参数与图构造 |

## 练习

1. 用暴力验证一个 3-SAT 实例。
2. 把顶点覆盖归约到独立集。
3. 说明子集和 DP 为什么不是多项式时间。

## 来源

- [Barak — Introduction to Theoretical Computer Science](https://introtcs.org/public/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)
- [Tim Roughgarden — CS261](https://timroughgarden.org/w16/w16.html)

## 导航

[← 上一章](04-complexity-classes.md) · [本级总览](index.md) · [下一章](06-lower-bounds.md)
