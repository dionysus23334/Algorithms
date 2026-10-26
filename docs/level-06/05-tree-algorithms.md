# 6.5 树上算法

> **级别**：第 6 级 · 常用专题算法  
> **状态**：已展开。

## 学习目标

- 求子树大小与深度；
- 做树形 DP；
- 用倍增求 LCA。

## 子树大小

```python
def subtree_sizes(adj: list[list[int]], root: int = 0) -> list[int]:
    n = len(adj)
    size = [1] * n
    parent = [-1] * n
    order = [root]
    parent[root] = root
    for u in order:
        for v in adj[u]:
            if v != parent[u]:
                parent[v] = u
                order.append(v)
    for u in reversed(order):
        for v in adj[u]:
            if parent[v] == u:
                size[u] += size[v]
    return size
```

时间 \(O(n)\)。

## 树形 DP：最大独立集

选一些点，使任意两点不相邻，最大化权值。

```python
def max_independent(adj: list[list[int]], value: list[int], root: int = 0) -> int:
    n = len(adj)
    parent = [-1] * n
    order = [root]
    parent[root] = root
    for u in order:
        for v in adj[u]:
            if v != parent[u]:
                parent[v] = u
                order.append(v)
    dp0 = [0] * n  # not choose u
    dp1 = [0] * n  # choose u
    for u in reversed(order):
        dp1[u] = value[u]
        for v in adj[u]:
            if parent[v] == u:
                dp1[u] += dp0[v]
                dp0[u] += max(dp0[v], dp1[v])
    return max(dp0[root], dp1[root])
```

## 倍增 LCA

```python
def build_lca(adj: list[list[int]], root: int = 0):
    n = len(adj)
    LOG = max(1, n.bit_length())
    up = [[0] * n for _ in range(LOG)]
    depth = [0] * n
    order = [root]
    up[0][root] = root
    for u in order:
        for v in adj[u]:
            if v != up[0][u]:
                up[0][v] = u
                depth[v] = depth[u] + 1
                order.append(v)
    for k in range(1, LOG):
        for v in range(n):
            up[k][v] = up[k-1][up[k-1][v]]
    def lca(a: int, b: int) -> int:
        if depth[a] < depth[b]:
            a, b = b, a
        diff = depth[a] - depth[b]
        for k in range(LOG):
            if diff >> k & 1:
                a = up[k][a]
        if a == b:
            return a
        for k in reversed(range(LOG)):
            if up[k][a] != up[k][b]:
                a, b = up[k][a], up[k][b]
        return up[0][a]
    return depth, up, lca
```

预处理 \(O(n\log n)\)，单次 LCA \(O(\log n)\)。

## C++ 子树大小

```cpp
#include <vector>

void dfs(int u, int p, const std::vector<std::vector<int>>& adj,
         std::vector<int>& size) {
    size[u] = 1;
    for (int v : adj[u]) {
        if (v == p) continue;
        dfs(v, u, adj, size);
        size[u] += size[v];
    }
}
```

## 边界

| 场景 | 注意 |
|---|---|
| 单节点 | 子树大小 1 |
| 链 | 递归深度 \(n\) |
| 根不固定 | 任选根，结果与根无关 |
| 权值负 | 最大独立集需重新考虑 |

## 练习

1. 求树的直径。
2. 用树形 DP 求最小点覆盖。
3. 用 LCA 求两点距离。

## 来源

- [cp-algorithms](https://cp-algorithms.com/)
- [OI Wiki](https://oi-wiki.org/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## 导航

[← 上一章](04-mst.md) · [本级总览](index.md) · [下一章](06-range-ds.md)
