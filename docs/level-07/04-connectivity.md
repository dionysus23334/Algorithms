# 7.4 图的连通结构

> **级别**：第 7 级 · 进阶算法与数据结构  
> **状态**：已展开。

## 学习目标

- 求强连通分量（SCC）并缩点；
- 求桥与割点；
- 判断欧拉路径。

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

时间 \(O(n+m)\)，空间 \(O(n)\)。

## 缩点

每个 SCC 缩成一个点，得到 DAG；在 DAG 上做拓扑/DP。

## 桥与割点

无向图 DFS 中，若 `low[v] > dfn[u]`，边 `(u,v)` 是桥；割点条件更细，需要根节点特判。

## 欧拉路径

- 无向图：连通且奇度点 0 或 2 个；
- 有向图：弱连通且入度/出度差满足条件；
- 输出路径用 Hierholzer 栈。

## C++ Tarjan 核心

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

## 边界

| 场景 | 注意 |
|---|---|
| 自环 | 单独处理 |
| 重边 | 桥判断需边编号 |
| 不连通 | 每个分量 DFS |
| 递归深度 | 深图用迭代 |

## 练习

1. 缩点后求 DAG 最长路。
2. 求无向图所有桥。
3. 输出一条欧拉路径。

## 来源

- [cp-algorithms](https://cp-algorithms.com/)
- [OI Wiki](https://oi-wiki.org/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## 导航

[← 上一章](03-search-advanced.md) · [本级总览](index.md) · [下一章](05-network-flow.md)
