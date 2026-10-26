# 5.6 贪心

> **级别**：第 5 级 · 核心算法设计方法  
> **状态**：已展开。

## 学习目标

- 识别贪心选择性质；
- 用交换论证证明正确；
- 知道贪心何时失败。

## 区间调度

选最多不重叠区间：按右端点排序，能选就选。

```python
def max_intervals(intervals: list[tuple[int,int]]) -> int:
    intervals.sort(key=lambda x: x[1])
    count = 0
    end = float("-inf")
    for l, r in intervals:
        if l >= end:
            count += 1
            end = r
    return count
```

时间 \(O(n\log n)\)。

**交换论证**：最优解的第一个区间可以换成右端点最小的可行区间，不会减少后续可选数量。

## Huffman 编码

每次合并频率最小的两棵树，用优先队列：

```python
import heapq

def huffman_cost(freq: list[int]) -> int:
    heapq.heapify(freq)
    total = 0
    while len(freq) > 1:
        a = heapq.heappop(freq)
        b = heapq.heappop(freq)
        total += a + b
        heapq.heappush(freq, a + b)
    return total
```

时间 \(O(n\log n)\)。

## 贪心失败例

硬币面值 `{1,3,4}`，凑 6：贪心选 4+1+1（3 枚），最优 3+3（2 枚）。所以贪心需要证明，不能凭直觉。

## C++ 区间调度

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<std::pair<int,int>> a{{1,3},{2,4},{3,5},{5,6}};
    std::sort(a.begin(), a.end(), [](auto& x, auto& y) { return x.second < y.second; });
    int count = 0, end = -1;
    for (auto [l, r] : a) if (l >= end) { ++count; end = r; }
    std::cout << count << '\n';
}
```

## 边界

| 场景 | 注意 |
|---|---|
| 空区间集 | 返回 0 |
| 端点相接 | 是否算重叠，按题意 |
| 权重不同 | 区间调度贪心不保证最大权 |
| 货币面值 | 不满足贪心性质时失败 |

## 练习

1. 用交换论证证明区间调度。
2. 构造一个贪心失败的最小反例。
3. 比较 Huffman 与固定长度编码的代价。

## 来源

- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)
- [Hello 算法](https://www.hello-algo.com/)
- [OI Wiki](https://oi-wiki.org/)

## 导航

[← 上一章](05-pruning-dedup.md) · [本级总览](index.md) · [下一章](07-dp-intro.md)
