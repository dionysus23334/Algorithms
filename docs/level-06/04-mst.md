# 6.4 最小生成树

> **级别**：第 6 级 · 常用专题算法  
> **状态**：已展开。

## 学习目标

- 理解割性质；
- 实现 Kruskal 与 Prim；
- 判断图不连通时不存在生成树。

## 割性质

把点集分成两部分，横跨割的最小边一定属于某棵最小生成树（在权值唯一时必然）。Kruskal/Prim 都基于这个性质。

## Kruskal

按边权排序，用并查集判断是否成环。

```python
def kruskal(n: int, edges: list[tuple[int,int,int]]) -> int | None:
    parent = list(range(n))
    def find(x: int) -> int:
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    edges.sort(key=lambda e: e[2])
    total = used = 0
    for u, v, w in edges:
        ru, rv = find(u), find(v)
        if ru == rv:
            continue
        parent[ru] = rv
        total += w
        used += 1
        if used == n - 1:
            return total
    return None if n > 1 else 0
```

时间 \(O(m\log m)\)，空间 \(O(n+m)\)。

## Prim

从任一点开始，用优先队列取连接“已选/未选”的最小边。

## C++ Kruskal

```cpp
#include <algorithm>
#include <numeric>
#include <vector>

struct Edge { int u, v, w; };

int kruskal(int n, std::vector<Edge> edges) {
    std::vector<int> p(n);
    std::iota(p.begin(), p.end(), 0);
    auto find = [&](auto&& self, int x) -> int {
        return p[x] == x ? x : p[x] = self(self, p[x]);
    };
    std::sort(edges.begin(), edges.end(), [](auto& a, auto& b) { return a.w < b.w; });
    int total = 0, used = 0;
    for (auto e : edges) {
        int a = find(find, e.u), b = find(find, e.v);
        if (a == b) continue;
        p[a] = b;
        total += e.w;
        if (++used == n - 1) return total;
    }
    return n <= 1 ? 0 : -1;
}
```

## 边界

| 场景 | 注意 |
|---|---|
| 不连通 | 生成树不存在 |
| 重边 | 排序后自然处理 |
| 负权 | MST 仍可；负环不影响 MST |
| 自环 | 直接忽略 |

## 练习

1. 输出 MST 的边。
2. 证明 Kruskal 的正确性（割性质/交换论证）。
3. 比较 Kruskal 与 Prim 的适用场景。

## 来源

- [cp-algorithms](https://cp-algorithms.com/)
- [OI Wiki](https://oi-wiki.org/)
- [Hello 算法](https://www.hello-algo.com/)

## 导航

[← 上一章](03-shortest-path.md) · [本级总览](index.md) · [下一章](05-tree-algorithms.md)
