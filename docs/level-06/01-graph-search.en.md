# 6.1 Graph Search

> **Level**: Level 6 · Common Topic Algorithms  
> **Status**: Expanded.

## Learning Objectives

- Traverse a graph with BFS/DFS;
- Find connected components and unweighted shortest paths;
- Perform flood fill on a grid.

## BFS

```python
from collections import deque

def bfs(adj: list[list[int]], s: int) -> list[int]:
    dist = [-1] * len(adj)
    dist[s] = 0
    q = deque([s])
    while q:
        u = q.popleft()
        for v in adj[u]:
            if dist[v] == -1:
                dist[v] = dist[u] + 1
                q.append(v)
    return dist
```

Time \(O(n+m)\), space \(O(n)\). BFS computes shortest paths in unweighted graphs.

## DFS

```python
def dfs(adj: list[list[int]], u: int, seen: list[bool]) -> None:
    seen[u] = True
    for v in adj[u]:
        if not seen[v]:
            dfs(adj, v, seen)
```

The recursion depth may be \(n\); use an explicit stack for deep graphs.

## Connected Components

```python
def components(adj: list[list[int]]) -> int:
    seen = [False] * len(adj)
    count = 0
    for i in range(len(adj)):
        if not seen[i]:
            count += 1
            dfs(adj, i, seen)
    return count
```

## Grid Flood Fill

```python
def flood(grid: list[list[int]], sr: int, sc: int, color: int) -> None:
    old = grid[sr][sc]
    if old == color:
        return
    n, m = len(grid), len(grid[0])
    q = deque([(sr, sc)])
    grid[sr][sc] = color
    while q:
        r, c = q.popleft()
        for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
            nr, nc = r + dr, c + dc
            if 0 <= nr < n and 0 <= nc < m and grid[nr][nc] == old:
                grid[nr][nc] = color
                q.append((nr, nc))
```

## C++ BFS

```cpp
#include <iostream>
#include <queue>
#include <vector>

std::vector<int> bfs(const std::vector<std::vector<int>>& adj, int s) {
    std::vector<int> dist(adj.size(), -1);
    std::queue<int> q;
    dist[s] = 0; q.push(s);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (dist[v] == -1) { dist[v] = dist[u] + 1; q.push(v); }
        }
    }
    return dist;
}
```

## Boundary Cases

| Scenario | Note |
|---|---|
| Disconnected graph | BFS only covers the component of the start vertex |
| Self-loop / multi-edge | Does not affect BFS correctness, but a vertex may be enqueued repeatedly |
| Grid out of bounds | Check the boundary first |
| Recursive DFS | Stack overflow on deep chains |

## Exercises

1. Output one shortest path in an unweighted graph.
2. Count the size of each connected component.
3. Use BFS to find the minimum number of steps from a start cell to a target cell in a grid.

## Sources

- [Hello Algo](https://www.hello-algo.com/)
- [cp-algorithms](https://cp-algorithms.com/)
- [OI Wiki](https://oi-wiki.org/)

## Navigation

[← Level Overview](index.md) · [Next](02-graph-structure.md)
