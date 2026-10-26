# 7.3 搜索进阶

> **级别**：第 7 级 · 进阶算法与数据结构  
> **状态**：已展开。

## 学习目标

- 用双向 BFS 降低搜索层数；
- 用折半搜索处理 \(2^n\)；
- 了解 IDA* 与 A* 的启发函数。

## 双向 BFS

从起点和终点同时 BFS，相遇即最短。

```python
from collections import deque

def bidirectional(start: int, goal: int, neighbors) -> int:
    if start == goal:
        return 0
    front, back = {start}, {goal}
    dist_f, dist_b = {start: 0}, {goal: 0}
    while front and back:
        if len(front) > len(back):
            front, back = back, front
            dist_f, dist_b = dist_b, dist_f
        nxt = set()
        for u in front:
            for v in neighbors(u):
                if v in dist_f:
                    continue
                if v in dist_b:
                    return dist_f[u] + 1 + dist_b[v]
                dist_f[v] = dist_f[u] + 1
                nxt.add(v)
        front = nxt
    return -1
```

## 折半搜索

\(n\le40\) 的子集和：分成两半，各枚举 \(2^{n/2}\)，排序后二分。

```python
def subset_sum_count(a: list[int], target: int) -> int:
    def sums(arr):
        out = [0]
        for x in arr:
            out += [s + x for s in out]
        return out
    mid = len(a) // 2
    left, right = sums(a[:mid]), sums(a[mid:])
    right.sort()
    from bisect import bisect_left
    return sum(bisect_left(right, target - s + 1) for s in left)
```

## IDA* 与 A*

- A*：`f = g + h`，优先队列；
- IDA*：迭代加深 + 启发剪枝，空间 \(O(depth)\)；
- 启发函数必须可采纳（不高估）。

## C++ 折半搜索

```cpp
#include <algorithm>
#include <vector>

std::vector<long long> subset_sums(const std::vector<int>& a, int l, int r) {
    std::vector<long long> out{0};
    for (int i = l; i < r; ++i) {
        int n = out.size();
        for (int j = 0; j < n; ++j) out.push_back(out[j] + a[i]);
    }
    return out;
}
```

## 边界

| 场景 | 注意 |
|---|---|
| 起点=终点 | 返回 0 |
| 不可达 | 返回 -1 |
| 启发函数 | 不可采纳会丢最优 |
| 状态重复 | 用 visited 去重 |

## 练习

1. 用双向 BFS 解八数码。
2. 用折半搜索求子集和等于 target 的个数。
3. 设计一个可采纳的 A* 启发函数。

## 来源

- [OI Wiki](https://oi-wiki.org/)
- [cp-algorithms](https://cp-algorithms.com/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## 导航

[← 上一章](02-dp-optimization.md) · [本级总览](index.md) · [下一章](04-connectivity.md)
