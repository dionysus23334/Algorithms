# 3.11 Disjoint Set Union

> **Level**: Level 3 · Basic Data Structures  
> **Status**: expanded.

## Learning Objectives

- Maintain the union and query of disjoint sets;
- Implement path compression and union by size;
- Explain the near-\(O(1)\) amortized complexity.

## Interface

```text
find(x)       returns the representative of x
union(a,b)    merges the sets containing a and b
connected(a,b) find(a)==find(b)
```

## Python Implementation

```python
class DSU:
    def __init__(self, n: int) -> None:
        self.parent = list(range(n))
        self.size = [1] * n

    def find(self, x: int) -> int:
        while self.parent[x] != x:
            self.parent[x] = self.parent[self.parent[x]]  # path halving
            x = self.parent[x]
        return x

    def union(self, a: int, b: int) -> bool:
        ra, rb = self.find(a), self.find(b)
        if ra == rb:
            return False
        if self.size[ra] < self.size[rb]:
            ra, rb = rb, ra
        self.parent[rb] = ra
        self.size[ra] += self.size[rb]
        return True
```

## C++ Implementation

```cpp
#include <vector>

class DSU {
    std::vector<int> parent_, size_;
public:
    explicit DSU(int n) : parent_(n), size_(n, 1) {
        for (int i = 0; i < n; ++i) parent_[i] = i;
    }
    int find(int x) {
        while (parent_[x] != x) {
            parent_[x] = parent_[parent_[x]];
            x = parent_[x];
        }
        return x;
    }
    bool unite(int a, int b) {
        int ra = find(a), rb = find(b);
        if (ra == rb) return false;
        if (size_[ra] < size_[rb]) std::swap(ra, rb);
        parent_[rb] = ra;
        size_[ra] += size_[rb];
        return true;
    }
};
```

## Complexity

With only path compression or only union by size, the complexity is on the order of \(O(\log n)\); with both, the amortized cost is \(O(\alpha(n))\), where \(\alpha\) is the inverse Ackermann function, which is practically almost constant.

## Applications

- Kruskal's minimum spanning tree;
- dynamic connectivity;
- merging equivalence relations;
- connected components on a grid.

## Boundary Cases

| Scenario | Note |
|---|---|
| Already in the same set | `union` returns false |
| Index range | \(0\le x<n\) |
| Recursive find | may be deep; use iteration/path compression |
| Many unions | union by size/rank to avoid degeneration |

## Exercises

1. Use a disjoint set union to count the connected components of an undirected graph.
2. Implement a "weighted disjoint set union" that maintains the distance to the representative.
3. Prove that after union by size the tree height is \(O(\log n)\).

## Sources

- [Hello Algo](https://www.hello-algo.com/)
- [OI Wiki](https://oi-wiki.org/)
- [cp-algorithms](https://cp-algorithms.com/)

## Navigation

[← Previous](10-heap.md) · [Level Overview](index.md) · [Next](12-graph-storage.md)
