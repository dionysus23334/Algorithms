# 3.11 并查集

> **级别**：第 3 级 · 基础数据结构  
> **状态**：已展开。

## 学习目标

- 维护不相交集合的合并与查询；
- 实现路径压缩与按大小合并；
- 解释接近 \(O(1)\) 的摊还复杂度。

## 接口

```text
find(x)       返回 x 的代表元
union(a,b)    合并 a、b 所在集合
connected(a,b) find(a)==find(b)
```

## Python 实现

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

## C++ 实现

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

## 复杂度

只用路径压缩或只按大小合并，复杂度 \(O(\log n)\) 级别；两者同时使用，摊还 \(O(\alpha(n))\)，其中 \(\alpha\) 是反 Ackermann 函数，实际几乎常数。

## 应用

- Kruskal 最小生成树；
- 动态连通性；
- 等价关系合并；
- 网格连通块。

## 边界

| 场景 | 注意 |
|---|---|
| 已同集合 | `union` 返回 false |
| 下标范围 | \(0\le x<n\) |
| 递归 find | 可能深；用迭代/路径压缩 |
| 多次合并 | 按大小/秩合并，避免退化 |

## 练习

1. 用并查集统计无向图连通分量数。
2. 实现“带权并查集”，维护到代表元的距离。
3. 证明按大小合并后树高 \(O(\log n)\)。

## 来源

- [Hello 算法](https://www.hello-algo.com/)
- [OI Wiki](https://oi-wiki.org/)
- [cp-algorithms](https://cp-algorithms.com/)

## 导航

[← 上一章](10-heap.md) · [本级总览](index.md) · [下一章](12-graph-storage.md)
