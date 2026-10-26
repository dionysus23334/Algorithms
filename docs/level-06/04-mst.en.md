# 6.4 Minimum Spanning Tree

> **Level**: Level 6 · Common Topic Algorithms  
> **Status**: Expanded.

## Learning Objectives

- Understand the cut property;
- Implement Kruskal and Prim;
- Determine that no spanning tree exists when the graph is disconnected.

## Cut Property

Split the vertex set into two parts; the minimum edge crossing the cut always belongs to some minimum spanning tree (and necessarily does so when edge weights are unique). Both Kruskal and Prim are based on this property.

## Kruskal

Sort by edge weight and use a disjoint set union to detect whether a cycle would be formed.

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

Time \(O(m\log m)\), space \(O(n+m)\).

## Prim

Start from any vertex and use a priority queue to take the minimum edge connecting the "selected/unselected" parts.

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

## Boundary Cases

| Scenario | Note |
|---|---|
| Disconnected | No spanning tree exists |
| Multi-edge | Handled naturally after sorting |
| Negative weights | MST still exists; negative cycles do not affect the MST |
| Self-loop | Ignored directly |

## Exercises

1. Output the edges of an MST.
2. Prove the correctness of Kruskal (cut property / exchange argument).
3. Compare the applicable scenarios of Kruskal and Prim.

## Sources

- [cp-algorithms](https://cp-algorithms.com/)
- [OI Wiki](https://oi-wiki.org/)
- [Hello Algo](https://www.hello-algo.com/)

## Navigation

[← Previous](03-shortest-path.md) · [Level Overview](index.md) · [Next](05-tree-algorithms.md)
