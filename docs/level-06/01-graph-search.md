# 6.1 图搜索

> **级别**：第 6 级 · 常用专题算法  
> **状态**：已展开。

## 学习目标

- 用 BFS/DFS 遍历图；
- 求连通分量与无权最短路；
- 在网格上做洪水填充。

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

时间 \(O(n+m)\)，空间 \(O(n)\)。BFS 求无权图最短路。

## DFS

```python
def dfs(adj: list[list[int]], u: int, seen: list[bool]) -> None:
    seen[u] = True
    for v in adj[u]:
        if not seen[v]:
            dfs(adj, v, seen)
```

递归深度可能为 \(n\)，深图改用显式栈。

## 连通分量

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

## 网格洪水填充

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

## 边界

| 场景 | 注意 |
|---|---|
| 不连通图 | BFS 只覆盖起点分量 |
| 自环/重边 | 不影响 BFS 正确性，但可能重复入队 |
| 网格越界 | 先判断边界 |
| 递归 DFS | 深链栈溢出 |

## 练习

1. 输出无权图的一条最短路径。
2. 统计每个连通分量的大小。
3. 用 BFS 求网格中从起点到终点的最短步数。

## 来源

- [Hello 算法](https://www.hello-algo.com/)
- [cp-algorithms](https://cp-algorithms.com/)
- [OI Wiki](https://oi-wiki.org/)

## 导航

[← 本级总览](index.md) · [下一章](02-graph-structure.md)
