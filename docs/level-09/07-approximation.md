# 9.7 近似算法

> **级别**：第 9 级 · 算法理论与计算边界  
> **状态**：已展开。

## 学习目标

- 定义近似比；
- 写顶点覆盖 2-近似；
- 用贪心做集合覆盖。

## 近似比

对最小化问题，算法解 \(A\) 与最优解 \(OPT\) 满足

\[
A\le \rho\cdot OPT
\]

称 \(\rho\)-近似。\(\rho\) 越接近 1 越好。

## 顶点覆盖 2-近似

反复取一条未覆盖边，把两个端点都加入覆盖。

```python
def vertex_cover_2approx(n: int, edges: list[tuple[int,int]]) -> set[int]:
    cover = set()
    used = [False] * len(edges)
    for i, (u, v) in enumerate(edges):
        if used[i]:
            continue
        cover.add(u); cover.add(v)
        for j, (a, b) in enumerate(edges):
            if a in cover or b in cover:
                used[j] = True
    return cover
```

近似比 2：每次选的边至少有一个端点必须在任何覆盖中，而我们选了两个。

## 集合覆盖贪心

每步选覆盖未覆盖元素最多的集合；近似比 \(H_n=O(\log n)\)。

## C++ 顶点覆盖

```cpp
#include <set>
#include <utility>
#include <vector>

std::set<int> vertex_cover(const std::vector<std::pair<int,int>>& edges) {
    std::set<int> cover;
    for (auto [u, v] : edges) {
        if (cover.count(u) || cover.count(v)) continue;
        cover.insert(u); cover.insert(v);
    }
    return cover;
}
```

## 边界

| 场景 | 注意 |
|---|---|
| 最大化问题 | 比值方向相反 |
| 近似比 | 最坏情况保证 |
| 启发式 | 无保证，不是近似算法 |
| 不可近似性 | 某些问题有下界 |

## 练习

1. 证明顶点覆盖 2-近似。
2. 实现集合覆盖贪心并估计近似比。
3. 构造一个贪心达到 2 倍的顶点覆盖实例。

## 来源

- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)
- [Tim Roughgarden — CS261](https://timroughgarden.org/w16/w16.html)
- [Barak — Introduction to Theoretical Computer Science](https://introtcs.org/public/)

## 导航

[← 上一章](06-lower-bounds.md) · [本级总览](index.md) · [下一章](08-online.md)
