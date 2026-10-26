# 3.12 图的存储

> **级别**：第 3 级 · 基础数据结构  
> **状态**：已展开。

## 学习目标

- 区分有向/无向、带权/无权图；
- 用邻接表与邻接矩阵建图；
- 根据稀疏/稠密选择存储。

## 术语

- \(n\) 个点，\(m\) 条边；
- 有向边 \((u,v)\)，无向边 \(\{u,v\}\)；
- 带权边 \((u,v,w)\)；
- 自环、重边要明确是否允许。

## 邻接矩阵

`g[u][v]` 表示边权或是否存在边：

```python
n = 4
g = [[0] * n for _ in range(n)]
g[0][1] = g[1][0] = 1  # 无向无权
```

空间 \(O(n^2)\)，查边 \(O(1)\)，适合稠密图。

## 邻接表

```python
n = 4
adj = [[] for _ in range(n)]
edges = [(0, 1), (0, 2), (1, 3)]
for u, v in edges:
    adj[u].append(v)
    adj[v].append(u)  # 无向图
```

空间 \(O(n+m)\)，遍历邻居 \(O(\deg(u))\)，适合稀疏图。

## 带权邻接表

```python
adj = [[] for _ in range(n)]
for u, v, w in [(0, 1, 5), (1, 2, 3)]:
    adj[u].append((v, w))
    adj[v].append((u, w))
```

## C++ 邻接表

```cpp
#include <iostream>
#include <vector>

int main() {
    int n = 4;
    std::vector<std::vector<std::pair<int,int>>> adj(n);
    auto add = [&](int u, int v, int w) {
        adj[u].push_back({v, w});
        adj[v].push_back({u, w});
    };
    add(0, 1, 5);
    add(1, 2, 3);
    for (auto [v, w] : adj[0]) std::cout << v << ':' << w << ' ';
}
```

## 选择存储

| 图的规模 | 建议 |
|---|---|
| 稀疏 \(m\ll n^2\) | 邻接表 |
| 稠密 \(m\approx n^2\) | 邻接矩阵 |
| 需要快速查边 | 矩阵或哈希边集 |
| 需要遍历邻居 | 邻接表 |

## 边界

| 场景 | 注意 |
|---|---|
| 自环 | 是否允许；无向图会加两次 |
| 重边 | 是否保留；最短路可能受影响 |
| 1-indexed | 数组大小 \(n+1\) |
| 大图 | 邻接矩阵可能爆内存 |

## 练习

1. 读入 \(n,m\) 与边，输出每个点的度数。
2. 把邻接矩阵转成邻接表。
3. 判断无向图是否有自环/重边，并说明对算法的影响。

## 来源

- [Hello 算法](https://www.hello-algo.com/)
- [Open Data Structures](https://opendatastructures.org/)
- [cp-algorithms](https://cp-algorithms.com/)

## 导航

[← 上一章](11-dsu.md) · [本级总览](index.md)
