# 6.2 Basic Graph Structures

> **Level**: Level 6 · Common Topic Algorithms  
> **Status**: Expanded.

## Learning Objectives

- Detect cycles in a directed graph;
- Decide whether a graph is bipartite;
- Perform topological sorting and dynamic programming on a DAG.

## Cycle Detection in Directed Graphs

DFS with three colors: 0 unvisited, 1 on the stack, 2 finished. Encountering a neighbour that is "on the stack" means there is a cycle.

```python
def has_cycle(adj: list[list[int]]) -> bool:
    state = [0] * len(adj)
    def dfs(u: int) -> bool:
        state[u] = 1
        for v in adj[u]:
            if state[v] == 1:
                return True
            if state[v] == 0 and dfs(v):
                return True
        state[u] = 2
        return False
    return any(state[i] == 0 and dfs(i) for i in range(len(adj)))
```

## Bipartite Graph

BFS colouring:

```python
from collections import deque

def is_bipartite(adj: list[list[int]]) -> bool:
    color = [-1] * len(adj)
    for s in range(len(adj)):
        if color[s] != -1:
            continue
        color[s] = 0
        q = deque([s])
        while q:
            u = q.popleft()
            for v in adj[u]:
                if color[v] == -1:
                    color[v] = color[u] ^ 1
                    q.append(v)
                elif color[v] == color[u]:
                    return False
    return True
```

## Topological Sort (Kahn)

```python
from collections import deque

def topo(adj: list[list[int]]) -> list[int] | None:
    indeg = [0] * len(adj)
    for u in range(len(adj)):
        for v in adj[u]:
            indeg[v] += 1
    q = deque([i for i, d in enumerate(indeg) if d == 0])
    out = []
    while q:
        u = q.popleft()
        out.append(u)
        for v in adj[u]:
            indeg[v] -= 1
            if indeg[v] == 0:
                q.append(v)
    return out if len(out) == len(adj) else None
```

Returning `None` means there is a cycle.

## C++ Topological Sort

```cpp
#include <queue>
#include <vector>

std::vector<int> topo(const std::vector<std::vector<int>>& adj) {
    std::vector<int> indeg(adj.size(), 0), out;
    for (auto& es : adj) for (int v : es) ++indeg[v];
    std::queue<int> q;
    for (int i = 0; i < static_cast<int>(indeg.size()); ++i)
        if (indeg[i] == 0) q.push(i);
    while (!q.empty()) {
        int u = q.front(); q.pop(); out.push_back(u);
        for (int v : adj[u]) if (--indeg[v] == 0) q.push(v);
    }
    return out.size() == adj.size() ? out : std::vector<int>{};
}
```

## DP on a DAG

A topological order guarantees that predecessors are computed first; for example, the longest path:

\[
dp[v]=\max_{(u,v)}(dp[u]+w).
\]

## Boundary Cases

| Scenario | Note |
|---|---|
| Self-loop | Immediately a cycle |
| Disconnected | Every component must be checked |
| Bipartite graph | An isolated vertex counts as bipartite |
| Non-unique topological order | The queue order determines one valid solution |

## Exercises

1. Decide whether an undirected graph has a cycle.
2. Output the two parts of a bipartite graph.
3. Find the longest path in a DAG.

## Sources

- [cp-algorithms](https://cp-algorithms.com/)
- [OI Wiki](https://oi-wiki.org/)
- [Hello Algo](https://www.hello-algo.com/)

## Navigation

[← Previous](01-graph-search.md) · [Level Overview](index.md) · [Next](03-shortest-path.md)
