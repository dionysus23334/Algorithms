# 7.4 Graph Connectivity Structures

> **Level**: Level 7 · Advanced Algorithms and Data Structures  
> **Status**: Expanded.

## Learning Objectives

- Find strongly connected components (SCC) and condense them;
- Find bridges and articulation points;
- Decide whether an Eulerian path exists.

## Tarjan SCC

```python
def scc(adj: list[list[int]]) -> list[list[int]]:
    n = len(adj)
    dfn = [-1] * n
    low = [0] * n
    stack = []
    in_stack = [False] * n
    comps = []
    timer = 0

    def dfs(u: int) -> None:
        nonlocal timer
        dfn[u] = low[u] = timer
        timer += 1
        stack.append(u)
        in_stack[u] = True
        for v in adj[u]:
            if dfn[v] == -1:
                dfs(v)
                low[u] = min(low[u], low[v])
            elif in_stack[v]:
                low[u] = min(low[u], dfn[v])
        if low[u] == dfn[u]:
            comp = []
            while True:
                v = stack.pop()
                in_stack[v] = False
                comp.append(v)
                if v == u:
                    break
            comps.append(comp)

    for u in range(n):
        if dfn[u] == -1:
            dfs(u)
    return comps
```

Time \(O(n+m)\), space \(O(n)\).

## Condensation

Each SCC is contracted into a single vertex, yielding a DAG; then run topological sort / DP on the DAG.

## Bridges and Articulation Points

In a DFS of an undirected graph, if `low[v] > dfn[u]`, then the edge `(u,v)` is a bridge; the condition for an articulation point is more delicate and requires a special case for the root.

## Eulerian Paths

- Undirected graph: connected and the number of odd-degree vertices is 0 or 2;
- Directed graph: weakly connected and the in-degree/out-degree differences satisfy the conditions;
- Output the path with the Hierholzer stack.

## C++ Tarjan Core

```cpp
#include <algorithm>
#include <vector>

void dfs(int u, const std::vector<std::vector<int>>& adj,
         std::vector<int>& dfn, std::vector<int>& low,
         std::vector<int>& st, std::vector<bool>& in,
         int& timer, std::vector<std::vector<int>>& comps) {
    dfn[u] = low[u] = timer++;
    st.push_back(u); in[u] = true;
    for (int v : adj[u]) {
        if (dfn[v] == -1) {
            dfs(v, adj, dfn, low, st, in, timer, comps);
            low[u] = std::min(low[u], low[v]);
        } else if (in[v]) {
            low[u] = std::min(low[u], dfn[v]);
        }
    }
    if (low[u] == dfn[u]) {
        std::vector<int> c;
        while (true) {
            int v = st.back(); st.pop_back(); in[v] = false; c.push_back(v);
            if (v == u) break;
        }
        comps.push_back(c);
    }
}
```

## Boundary Cases

| Scenario | Note |
|---|---|
| Self-loop | Handle separately |
| Multi-edges | Bridge detection needs edge IDs |
| Disconnected | DFS on every component |
| Recursion depth | Use iteration for deep graphs |

## Exercises

1. Find the longest path in the DAG after condensation.
2. Find all bridges of an undirected graph.
3. Output one Eulerian path.

## Sources

- [cp-algorithms](https://cp-algorithms.com/)
- [OI Wiki](https://oi-wiki.org/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## Navigation

[← Previous](03-search-advanced.md) · [Level Overview](index.md) · [Next](05-network-flow.md)
