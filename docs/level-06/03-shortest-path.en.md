# 6.3 Shortest Paths

> **Level**: Level 6 · Common Topic Algorithms  
> **Status**: Expanded.

## Learning Objectives

- Distinguish non-negative-weight, negative-weight and all-pairs shortest paths;
- Implement Dijkstra, Bellman–Ford and Floyd–Warshall;
- Recognise negative cycles.

## Dijkstra (Non-negative Weights)

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

Time \(O((n+m)\log n)\); it cannot handle negative-weight edges.

## Bellman–Ford (Negative Weights Allowed)

Relax for \(n-1\) rounds; if a relaxation is still possible in round \(n\), there is a negative cycle.

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

Time \(O(nm)\).

## Floyd–Warshall (All-Pairs)

```python
def floyd(dist: list[list[int]]) -> None:
    n = len(dist)
    for k in range(n):
        for i in range(n):
            for j in range(n):
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
```

Time \(O(n^3)\); suitable for small or dense graphs.

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

## Choosing an Algorithm

| Condition | Algorithm |
|---|---|
| Non-negative weights, single source | Dijkstra |
| Negative weights, single source | Bellman–Ford |
| All-pairs, small graph | Floyd |
| Unweighted | BFS |

## Boundary Cases

| Scenario | Note |
|---|---|
| Negative cycle | The shortest path is undefined |
| Unreachable | The distance stays INF |
| Large weights | Use `long long` |
| Multi-edge | Keep the minimum weight |

## Exercises

1. Output the shortest-path tree produced by Dijkstra.
2. Detect a negative cycle with Bellman–Ford.
3. Compare the complexity of Floyd with running Dijkstra \(n\) times.

## Sources

- [cp-algorithms](https://cp-algorithms.com/)
- [OI Wiki](https://oi-wiki.org/)
- [Hello Algo](https://www.hello-algo.com/)

## Navigation

[← Previous](02-graph-structure.md) · [Level Overview](index.md) · [Next](04-mst.md)
