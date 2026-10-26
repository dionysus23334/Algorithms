# 9.9 参数化算法

> **级别**：第 9 级 · 算法理论与计算边界  
> **状态**：已展开。

## 学习目标

- 定义 FPT；
- 用搜索树解顶点覆盖；
- 了解核化。

## 参数化复杂度

问题实例带参数 \(k\)；若算法时间

\[
O(f(k)\cdot n^c)
\]

其中 \(c\) 与 \(k\) 无关，称固定参数可解（FPT）。

## 顶点覆盖搜索树

选一条边 \((u,v)\)，任何覆盖必含 \(u\) 或 \(v\)：

```python
def vertex_cover_fpt(n: int, edges: list[tuple[int,int]], k: int) -> set[int] | None:
    if not edges:
        return set()
    if k == 0:
        return None
    u, v = edges[0]
    rest = [e for e in edges if u not in e and v not in e]
    left = vertex_cover_fpt(n, rest, k - 1)
    if left is not None:
        return left | {u}
    right = vertex_cover_fpt(n, rest, k - 1)
    if right is not None:
        return right | {v}
    return None
```

时间 \(O(2^k\cdot m)\)。

## 核化

用规则把实例缩小到大小只依赖 \(k\) 的核；例如顶点覆盖中度数 \(>k\) 的点必选。

## C++ 递归框架

```cpp
#include <utility>
#include <vector>

bool vc(int k, std::vector<std::pair<int,int>> edges) {
    if (edges.empty()) return true;
    if (k == 0) return false;
    auto [u, v] = edges.front();
    std::vector<std::pair<int,int>> rest;
    for (auto e : edges) if (e.first != u && e.second != u && e.first != v && e.second != v) rest.push_back(e);
    return vc(k-1, rest);
}
```

（示例只探索一侧；完整版需分别尝试 \(u\)、\(v\)。）

## 边界

| 场景 | 注意 |
|---|---|
| \(k\) 大 | \(2^k\) 爆炸 |
| 参数选择 | 影响 FPT |
| 核大小 | 需证明规则安全 |
| NP 难 | 参数化不改变最坏情况 |

## 练习

1. 实现完整的两分支顶点覆盖。
2. 用度数规则做核化。
3. 说明 \(O(n^k)\) 为什么不是 FPT。

## 来源

- [Barak — Introduction to Theoretical Computer Science](https://introtcs.org/public/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)
- [Tim Roughgarden — CS261](https://timroughgarden.org/w16/w16.html)

## 导航

[← 上一章](08-online.md) · [本级总览](index.md) · [下一章](10-randomized-theory.md)
