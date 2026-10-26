# 9.3 问题归约

> **级别**：第 9 级 · 算法理论与计算边界  
> **状态**：已展开。

## 学习目标

- 写多项式时间归约；
- 判断归约方向；
- 用归约证明 NP 难。

## 归约的定义

\(A\le_p B\)：存在多项式时间函数 \(f\)，使

\[
x\in A\iff f(x)\in B.
\]

若 \(B\) 可多项式时间求解，则 \(A\) 也可；若 \(A\) 难，则 \(B\) 难。

## 例子：独立集 → 团

图 \(G=(V,E)\) 有大小 \(k\) 的独立集 \(\iff\) 补图 \(\bar G\) 有大小 \(k\) 的团。

```python
def complement_graph(n: int, edges: set[tuple[int,int]]) -> set[tuple[int,int]]:
    out = set()
    for i in range(n):
        for j in range(i + 1, n):
            if (i, j) not in edges:
                out.add((i, j))
    return out
```

归约只改变图，不改变 \(k\)，时间 \(O(n^2)\)。

## 方向

- 证明 \(B\) 是 NP 难：从已知 NP 难问题 \(A\) 归约到 \(B\)；
- 不要反向归约；
- 归约必须保持答案（是/否）。

## 组合例子

- 3-SAT \(\le_p\) 团；
- 团 \(\le_p\) 顶点覆盖（补图/参数变换）；
- 子集和 \(\le_p\) 划分。

## C++ 补图

```cpp
#include <set>
#include <utility>
#include <vector>

std::set<std::pair<int,int>> complement(int n, const std::set<std::pair<int,int>>& e) {
    std::set<std::pair<int,int>> out;
    for (int i = 0; i < n; ++i)
        for (int j = i + 1; j < n; ++j)
            if (!e.count({i, j})) out.insert({i, j});
    return out;
}
```

## 边界

| 场景 | 注意 |
|---|---|
| 归约方向 | 容易写反 |
| 多项式时间 | 构造不能指数 |
| 参数 | \(k\) 是否保持/变换 |
| 答案保持 | 是/否必须对应 |

## 练习

1. 把独立集归约到顶点覆盖。
2. 把 3-SAT 归约到独立集。
3. 证明若 \(A\le_p B\) 且 \(B\in P\)，则 \(A\in P\)。

## 来源

- [Barak — Introduction to Theoretical Computer Science](https://introtcs.org/public/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)
- [Tim Roughgarden — CS261](https://timroughgarden.org/w16/w16.html)

## 导航

[← 上一章](02-computability.md) · [本级总览](index.md) · [下一章](04-complexity-classes.md)
