# 7.5 网络流与匹配

> **级别**：第 7 级 · 进阶算法与数据结构  
> **状态**：已展开。

## 学习目标

- 建残量网络；
- 用 Dinic 求最大流；
- 理解最大流最小割与二分图匹配。

## 网络模型

- 源点 \(s\)，汇点 \(t\)；
- 每条边有容量 \(c\)；
- 流量满足容量限制与守恒；
- 残量 = 容量 - 流量，反向边用于退流。

## Dinic

BFS 分层 + DFS 阻塞流。

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

## 最大流最小割

最大流值等于最小割容量；残量网络中从 \(s\) 可达的点构成最小割的一侧。

## 二分图匹配

源点连左部、左连右、右连汇点，容量 1；最大流即最大匹配。

## 边界

| 场景 | 注意 |
|---|---|
| 重边 | 合并容量或保留 |
| 大容量 | 用 `long long` |
| 递归 DFS | 深图可能栈溢出 |
| 匹配 | 左右部编号分开 |

## 练习

1. 用 Dinic 求二分图最大匹配。
2. 输出一个最小割。
3. 比较 Edmonds–Karp 与 Dinic 的复杂度。

## 来源

- [cp-algorithms](https://cp-algorithms.com/)
- [OI Wiki](https://oi-wiki.org/)
- [Tim Roughgarden — CS261](https://timroughgarden.org/w16/w16.html)

## 导航

[← 上一章](04-connectivity.md) · [本级总览](index.md) · [下一章](06-string-advanced.md)
