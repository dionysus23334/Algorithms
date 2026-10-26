# 4.10 离散化

> **级别**：第 4 级 · 基础算法与常用技巧  
> **状态**：已展开。

## 学习目标

- 把大坐标映射到小排名；
- 保持顺序关系；
- 处理重复值与查询。

## 为什么需要离散化

坐标可达 \(10^9\)，但只有 \(n\le10^5\) 个不同值。直接开数组会爆内存；离散化把值映射到 \(1..k\)，其中 \(k\) 是不同值个数。

## 排序去重 + 二分

```python
from bisect import bisect_left

def compress(values: list[int]) -> tuple[list[int], list[int]]:
    xs = sorted(set(values))
    ranks = [bisect_left(xs, v) + 1 for v in values]  # 1-indexed
    return xs, ranks
```

时间 \(O(n\log n)\)，空间 \(O(n)\)。

## 查询映射

```python
def rank_of(xs: list[int], x: int) -> int:
    i = bisect_left(xs, x)
    if i == len(xs) or xs[i] != x:
        return 0  # not found
    return i + 1
```

## C++ 版本

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> a{100, 5, 100, 7, 5};
    std::vector<int> xs = a;
    std::sort(xs.begin(), xs.end());
    xs.erase(std::unique(xs.begin(), xs.end()), xs.end());
    for (int x : a) {
        int rank = std::lower_bound(xs.begin(), xs.end(), x) - xs.begin() + 1;
        std::cout << rank << ' ';
    }
}
```

## 保持顺序

离散化只压缩坐标，不改变大小关系：\(x<y\iff \text{rank}(x)<\text{rank}(y)\)。重复值映射到同一排名。

## 应用

- 树状数组/线段树的下标压缩；
- 扫描线；
- 二维坐标问题；
- 值域很大但点数不多的计数。

## 边界

| 场景 | 注意 |
|---|---|
| 重复值 | `set` / `unique` 去重 |
| 查询值不存在 | 明确返回 0 或插入 |
| 0-index/1-index | 全局统一 |
| 负数 | 排序仍正确 |

## 练习

1. 对数组离散化并输出排名。
2. 用离散化 + 树状数组求逆序对。
3. 处理“查询值不在原数组”的情况，设计插入后重新离散化。

## 来源

- [Hello 算法](https://www.hello-algo.com/)
- [OI Wiki](https://oi-wiki.org/)
- [cp-algorithms](https://cp-algorithms.com/)

## 导航

[← 上一章](09-bitwise.md) · [本级总览](index.md)
