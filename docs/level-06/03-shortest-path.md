# 6.3 最短路径

> **级别**：第 6 级 · 常用专题算法  
> **状态**：已展开。

## 学习目标

- 区分非负权/负权/全源最短路；
- 实现 Dijkstra、Bellman–Ford、Floyd–Warshall；
- 识别负环。

## Dijkstra（非负权）

```python
import heapq

def dijkstra(adj: list[list[tuple[int,int]]], s: int) -> list[int]:
    INF = 10**18
    dist = [INF] * len(adj)
    dist[s] = 0
    pq = [(0, s)]
    while pq:
        d, u = heapq.heappop(pq)
        if d != dist[u]:
            continue
        for v, w in adj[u]:
            nd = d + w
            if nd < dist[v]:
                dist[v] = nd
                heapq.heappush(pq, (nd, v))
    return dist
```

时间 \(O((n+m)\log n)\)，不能处理负权边。

## Bellman–Ford（可负权）

松弛 \(n-1\) 轮；第 \(n\) 轮还能松弛说明有负环。

```python
def bellman_ford(n: int, edges: list[tuple[int,int,int]], s: int) -> list[int] | None:
    INF = 10**18
    dist = [INF] * n
    dist[s] = 0
    for _ in range(n - 1):
        for u, v, w in edges:
            if dist[u] != INF and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
    for u, v, w in edges:
        if dist[u] != INF and dist[u] + w < dist[v]:
            return None  # negative cycle
    return dist
```

时间 \(O(nm)\)。

## Floyd–Warshall（全源）

```python
def floyd(dist: list[list[int]]) -> None:
    n = len(dist)
    for k in range(n):
        for i in range(n):
            for j in range(n):
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
```

时间 \(O(n^3)\)，适合小图或稠密图。

## C++ Dijkstra

```cpp
#include <queue>
#include <vector>

std::vector<long long> dijkstra(const std::vector<std::vector<std::pair<int,int>>>& adj, int s) {
    const long long INF = 4e18;
    std::vector<long long> dist(adj.size(), INF);
    using P = std::pair<long long,int>;
    std::priority_queue<P, std::vector<P>, std::greater<P>> pq;
    dist[s] = 0; pq.push({0, s});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d != dist[u]) continue;
        for (auto [v, w] : adj[u]) {
            if (d + w < dist[v]) { dist[v] = d + w; pq.push({dist[v], v}); }
        }
    }
    return dist;
}
```

## 选择

| 条件 | 算法 |
|---|---|
| 非负权、单源 | Dijkstra |
| 负权、单源 | Bellman–Ford |
| 全源、小图 | Floyd |
| 无权 | BFS |

## 边界

| 场景 | 注意 |
|---|---|
| 负环 | 最短路无定义 |
| 不可达 | 距离保持 INF |
| 大权值 | 用 `long long` |
| 重边 | 保留最小权 |

## 练习

1. 输出 Dijkstra 的最短路径树。
2. 用 Bellman–Ford 检测负环。
3. 比较 Floyd 与 n 次 Dijkstra 的复杂度。

## 来源

- [cp-algorithms](https://cp-algorithms.com/)
- [OI Wiki](https://oi-wiki.org/)
- [Hello 算法](https://www.hello-algo.com/)

## 导航

[← 上一章](02-graph-structure.md) · [本级总览](index.md) · [下一章](04-mst.md)
