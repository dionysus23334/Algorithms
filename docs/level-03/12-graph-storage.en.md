# 3.12 Graph Storage

> **Level**: Level 3 · Basic Data Structures  
> **Status**: expanded.

## Learning Objectives

- Distinguish directed/undirected and weighted/unweighted graphs;
- Build graphs with adjacency lists and adjacency matrices;
- Choose the storage according to sparsity/density.

## Terminology

- \(n\) vertices, \(m\) edges;
- directed edge \((u,v)\), undirected edge \(\{u,v\}\);
- weighted edge \((u,v,w)\);
- self-loops and multi-edges: state explicitly whether they are allowed.

## Adjacency Matrix

`g[u][v]` represents the edge weight or whether an edge exists:

```python
n = 4
g = [[0] * n for _ in range(n)]
g[0][1] = g[1][0] = 1  # undirected, unweighted
```

Space \(O(n^2)\), edge lookup \(O(1)\), suitable for dense graphs.

## Adjacency List

```python
n = 4
adj = [[] for _ in range(n)]
edges = [(0, 1), (0, 2), (1, 3)]
for u, v in edges:
    adj[u].append(v)
    adj[v].append(u)  # undirected graph
```

Space \(O(n+m)\), iterating over the neighbors of a vertex costs \(O(\deg(u))\), suitable for sparse graphs.

## Weighted Adjacency List

```python
adj = [[] for _ in range(n)]
for u, v, w in [(0, 1, 5), (1, 2, 3)]:
    adj[u].append((v, w))
    adj[v].append((u, w))
```

## C++ Adjacency List

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

## Choosing Storage

| Graph scale | Suggestion |
|---|---|
| Sparse \(m\ll n^2\) | adjacency list |
| Dense \(m\approx n^2\) | adjacency matrix |
| Fast edge lookup needed | matrix or hash edge set |
| Iterating over neighbors needed | adjacency list |

## Boundary Cases

| Scenario | Note |
|---|---|
| Self-loop | whether it is allowed; an undirected graph adds it twice |
| Multi-edge | whether to keep it; shortest paths may be affected |
| 1-indexed | array size \(n+1\) |
| Large graph | an adjacency matrix may exceed memory |

## Exercises

1. Read \(n,m\) and the edges, then output the degree of every vertex.
2. Convert an adjacency matrix into an adjacency list.
3. Determine whether an undirected graph has self-loops/multi-edges, and explain their impact on the algorithms.

## Sources

- [Hello Algo](https://www.hello-algo.com/)
- [Open Data Structures](https://opendatastructures.org/)
- [cp-algorithms](https://cp-algorithms.com/)

## Navigation

[← Previous](11-dsu.md) · [Level Overview](index.md)
