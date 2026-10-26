# 6.2 图的基本结构

> **级别**：第 6 级 · 常用专题算法  
> **状态**：已展开。

## 学习目标

- 判断有向图环；
- 判断二分图；
- 做拓扑排序与 DAG 动态规划。

## 有向图环检测

DFS 三色标记：0 未访问、1 在栈中、2 完成。遇到“在栈中”的邻居说明有环。

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

## 二分图

BFS 染色：

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

## 拓扑排序（Kahn）

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

返回 `None` 表示有环。

## C++ 拓扑

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

## DAG 上的 DP

拓扑序保证前驱先算；例如最长路径：

\[
dp[v]=\max_{(u,v)}(dp[u]+w).
\]

## 边界

| 场景 | 注意 |
|---|---|
| 自环 | 立即有环 |
| 不连通 | 每个分量都要检查 |
| 二分图 | 孤立点算二分图 |
| 拓扑序不唯一 | 队列顺序决定一个合法解 |

## 练习

1. 判断无向图是否有环。
2. 输出一个二分图的两个部分。
3. 在 DAG 上求最长路径。

## 来源

- [cp-algorithms](https://cp-algorithms.com/)
- [OI Wiki](https://oi-wiki.org/)
- [Hello 算法](https://www.hello-algo.com/)

## 导航

[← 上一章](01-graph-search.md) · [本级总览](index.md) · [下一章](03-shortest-path.md)
