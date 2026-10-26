# 8.4 Advanced Graph Algorithms

> **Level**: Level 8 · Advanced Algorithms and Computational Methods  
> **Status**: Expanded.

## Learning Objectives

- Build a minimum-cost flow model;
- Find augmenting paths with SPFA/potential Dijkstra;
- Learn about matching in general graphs.

## Minimum-Cost Maximum Flow

Each edge has a capacity \(c\) and a cost \(w\); among all maximum flows, minimize the total cost. The reverse edge in the residual network has cost \(-w\).

```python
from collections import deque

class MCMF:
    def __init__(self, n: int) -> None:
        self.n = n
        self.g = [[] for _ in range(n)]

    def add_edge(self, u: int, v: int, cap: int, cost: int) -> None:
        self.g[u].append([v, cap, cost, len(self.g[v])])
        self.g[v].append([u, 0, -cost, len(self.g[u]) - 1])

    def flow(self, s: int, t: int) -> tuple[int,int]:
        total_flow = total_cost = 0
        INF = 10**18
        while True:
            dist = [INF] * self.n
            inq = [False] * self.n
            prev_v = [-1] * self.n
            prev_e = [-1] * self.n
            dist[s] = 0
            q = deque([s]); inq[s] = True
            while q:
                u = q.popleft(); inq[u] = False
                for i, (v, cap, cost, _) in enumerate(self.g[u]):
                    if cap > 0 and dist[u] + cost < dist[v]:
                        dist[v] = dist[u] + cost
                        prev_v[v], prev_e[v] = u, i
                        if not inq[v]:
                            inq[v] = True; q.append(v)
            if dist[t] == INF:
                break
            add = INF
            v = t
            while v != s:
                u, i = prev_v[v], prev_e[v]
                add = min(add, self.g[u][i][1])
                v = u
            v = t
            while v != s:
                u, i = prev_v[v], prev_e[v]
                e = self.g[u][i]
                e[1] -= add
                self.g[v][e[3]][1] += add
                v = u
            total_flow += add
            total_cost += add * dist[t]
        return total_flow, total_cost
```

## Potentials and Dijkstra

With negative costs, SPFA may degrade; using Johnson potentials + Dijkstra achieves \(O(FE\log V)\).

## Matching in General Graphs

Bipartite matching can be solved with maximum flow; general graphs require the Blossom algorithm to handle odd cycles, which is complex to implement, so engineering practice mostly uses mature libraries.

## C++ Cost-Flow Structures

```cpp
#include <queue>
#include <vector>

struct Edge { int to, cap, cost, rev; };
std::vector<std::vector<Edge>> g;

void add_edge(int u, int v, int cap, int cost) {
    g[u].push_back({v, cap, cost, static_cast<int>(g[v].size())});
    g[v].push_back({u, 0, -cost, static_cast<int>(g[u].size()) - 1});
}
```

## Boundary Cases

| Scenario | Note |
|---|---|
| Negative-cost cycle | Minimum-cost flow may be unbounded / needs handling |
| Large flow | Affects the number of augmentations |
| Multi-edges | Build separate edges |
| General graph | Blossom is not bipartite flow |

## Exercises

1. Solve the transportation problem with MCMF.
2. Replace SPFA with potential Dijkstra.
3. Explain why matching in general graphs cannot use plain maximum flow.

## Sources

- [cp-algorithms](https://cp-algorithms.com/)
- [OI Wiki](https://oi-wiki.org/)
- [Tim Roughgarden — CS261](https://timroughgarden.org/w16/w16.html)

## Navigation

[← Previous](03-advanced-dp-optimization.md) · [Level Overview](index.md) · [Next](05-advanced-string.md)
