# 6.5 Algorithms on Trees

> **Level**: Level 6 · Common Topic Algorithms  
> **Status**: Expanded.

## Learning Objectives

- Compute subtree sizes and depths;
- Do tree DP;
- Find the LCA with binary lifting.

## Subtree Sizes

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

Time \(O(n)\).

## Tree DP: Maximum Independent Set

Choose a set of vertices such that no two of them are adjacent, maximizing the total weight.

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

## Binary-Lifting LCA

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

Preprocessing takes \(O(n\log n)\); a single LCA query takes \(O(\log n)\).

## C++ Subtree Sizes

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

## Boundary Cases

| Case | Note |
|---|---|
| Single node | subtree size 1 |
| Chain | recursion depth \(n\) |
| Root not fixed | choose any root; the result does not depend on the root |
| Negative weights | the maximum independent set needs to be reconsidered |

## Exercises

1. Find the diameter of the tree.
2. Use tree DP to find a minimum vertex cover.
3. Use the LCA to find the distance between two vertices.

## Sources

- [cp-algorithms](https://cp-algorithms.com/)
- [OI Wiki](https://oi-wiki.org/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## Navigation

[← Previous](04-mst.md) · [Level Overview](index.md) · [Next](06-range-ds.md)
