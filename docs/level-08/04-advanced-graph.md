# 8.4 高级图算法

> **级别**：第 8 级 · 高级算法与计算方法  
> **状态**：已展开。

## 学习目标

- 建最小费用流模型；
- 用 SPFA/势能 Dijkstra 求增广路；
- 了解一般图匹配。

## 最小费用最大流

每条边有容量 \(c\) 与费用 \(w\)；在最大流中最小化总费用。残量网络的反向边费用为 \(-w\)。

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

## 势能与 Dijkstra

有负费用时，SPFA 可能退化；用 Johnson 势能 + Dijkstra 可做到 \(O(FE\log V)\)。

## 一般图匹配

二分图匹配可用最大流；一般图需要 Blossom 算法处理奇环，实现复杂，工程中多用成熟库。

## C++ 费用流结构

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

## 边界

| 场景 | 注意 |
|---|---|
| 负费用环 | 最小费用流可能无界/需处理 |
| 大流量 | 增广次数影响 |
| 重边 | 分开建边 |
| 一般图 | Blossom 不是二分图流 |

## 练习

1. 用 MCMF 解运输问题。
2. 用势能 Dijkstra 替换 SPFA。
3. 说明为什么一般图匹配不能用普通最大流。

## 来源

- [cp-algorithms](https://cp-algorithms.com/)
- [OI Wiki](https://oi-wiki.org/)
- [Tim Roughgarden — CS261](https://timroughgarden.org/w16/w16.html)

## 导航

[← 上一章](03-advanced-dp-optimization.md) · [本级总览](index.md) · [下一章](05-advanced-string.md)
