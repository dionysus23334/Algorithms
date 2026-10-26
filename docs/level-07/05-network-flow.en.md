# 7.5 Network Flow and Matching

> **Level**: Level 7 · Advanced Algorithms and Data Structures  
> **Status**: expanded.

## Learning Objectives

- Build the residual network;
- Compute the maximum flow with Dinic;
- Understand max-flow min-cut and bipartite matching.

## Network Model

- Source \(s\), sink \(t\);
- Each edge has a capacity \(c\);
- Flow satisfies the capacity constraints and conservation;
- Residual = capacity - flow; reverse edges are used to cancel flow.

## Dinic

BFS level graph + DFS blocking flow.

```python
from collections import deque

class Dinic:
    def __init__(self, n: int) -> None:
        self.n = n
        self.g = [[] for _ in range(n)]

    def add_edge(self, u: int, v: int, cap: int) -> None:
        self.g[u].append([v, cap, len(self.g[v])])
        self.g[v].append([u, 0, len(self.g[u]) - 1])

    def bfs(self, s: int, t: int) -> bool:
        self.level = [-1] * self.n
        self.level[s] = 0
        q = deque([s])
        while q:
            u = q.popleft()
            for v, cap, _ in self.g[u]:
                if cap > 0 and self.level[v] < 0:
                    self.level[v] = self.level[u] + 1
                    q.append(v)
        return self.level[t] >= 0

    def dfs(self, u: int, t: int, f: int) -> int:
        if u == t:
            return f
        while self.it[u] < len(self.g[u]):
            e = self.g[u][self.it[u]]
            v, cap, rev = e
            if cap > 0 and self.level[v] == self.level[u] + 1:
                d = self.dfs(v, t, min(f, cap))
                if d:
                    e[1] -= d
                    self.g[v][rev][1] += d
                    return d
            self.it[u] += 1
        return 0

    def max_flow(self, s: int, t: int) -> int:
        flow = 0
        INF = 10**18
        while self.bfs(s, t):
            self.it = [0] * self.n
            while True:
                f = self.dfs(s, t, INF)
                if not f:
                    break
                flow += f
        return flow
```

## Max-Flow Min-Cut

The maximum flow value equals the minimum cut capacity; the vertices reachable from \(s\) in the residual network form one side of a minimum cut.

## Bipartite Matching

Connect the source to the left part, the left part to the right part, and the right part to the sink, all with capacity 1; the maximum flow is then the maximum matching.

## C++ Implementation

```cpp
#include <algorithm>
#include <iostream>
#include <queue>
#include <vector>

struct Dinic {
    struct Edge { int to, cap, rev; };
    int n;
    std::vector<std::vector<Edge>> g;
    std::vector<int> level, it;
    explicit Dinic(int n) : n(n), g(n), level(n), it(n) {}
    void add(int u, int v, int c) {
        g[u].push_back({v, c, static_cast<int>(g[v].size())});
        g[v].push_back({u, 0, static_cast<int>(g[u].size()) - 1});
    }
    bool bfs(int s, int t) {
        std::fill(level.begin(), level.end(), -1);
        std::queue<int> q; level[s] = 0; q.push(s);
        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (auto& e : g[u]) if (e.cap > 0 && level[e.to] < 0) {
                level[e.to] = level[u] + 1; q.push(e.to);
            }
        }
        return level[t] >= 0;
    }
    int dfs(int u, int t, int f) {
        if (u == t) return f;
        for (int& i = it[u]; i < static_cast<int>(g[u].size()); ++i) {
            Edge& e = g[u][i];
            if (e.cap > 0 && level[e.to] == level[u] + 1) {
                int d = dfs(e.to, t, std::min(f, e.cap));
                if (d > 0) { e.cap -= d; g[e.to][e.rev].cap += d; return d; }
            }
        }
        return 0;
    }
    int max_flow(int s, int t) {
        int flow = 0;
        while (bfs(s, t)) {
            std::fill(it.begin(), it.end(), 0);
            while (int f = dfs(s, t, 1 << 30)) flow += f;
        }
        return flow;
    }
};

int main() {
    Dinic d(4);
    d.add(0, 1, 3); d.add(1, 3, 2); d.add(0, 2, 2); d.add(2, 3, 3);
    std::cout << d.max_flow(0, 3) << '\n';
}
```

## Boundary Cases

| Scenario | Note |
|---|---|
| Duplicate edges | Merge the capacities or keep both edges |
| Large capacities | Use `long long` |
| Recursive DFS | Deep graphs may overflow the stack |
| Matching | Number the left and right parts separately |

## Exercises

1. Use Dinic to find a maximum bipartite matching.
2. Output a minimum cut.
3. Compare the complexity of Edmonds–Karp and Dinic.

## Sources

- [cp-algorithms](https://cp-algorithms.com/)
- [OI Wiki](https://oi-wiki.org/)
- [Tim Roughgarden — CS261](https://timroughgarden.org/w16/w16.html)

## Navigation

[← Previous](04-connectivity.md) · [Level Overview](index.md) · [Next](06-string-advanced.md)
