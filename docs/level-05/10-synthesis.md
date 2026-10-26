# 5.10 综合方法

> **级别**：第 5 级 · 核心算法设计方法  
> **状态**：已展开。

## 学习目标

- 把二分答案、前缀和、哈希、排序、贪心组合起来；
- 判断一个问题该用哪种方法；
- 写清正确性依据与复杂度。

## 二分答案

“最小化最大值”/“最大化最小值”常见：判定 \(x\) 是否可行，再二分。

```python
def min_capacity(weights: list[int], days: int) -> int:
    def feasible(cap: int) -> bool:
        used, cur = 1, 0
        for w in weights:
            if w > cap:
                return False
            if cur + w > cap:
                used += 1
                cur = 0
            cur += w
        return used <= days

    lo, hi = max(weights), sum(weights)
    while lo < hi:
        mid = (lo + hi) // 2
        if feasible(mid):
            hi = mid
        else:
            lo = mid + 1
    return lo
```

时间 \(O(n\log \sum w)\)。

## 前缀和 + 哈希

求和为 \(k\) 的子数组个数：

```python
from collections import defaultdict

def subarray_sum(a: list[int], k: int) -> int:
    count = defaultdict(int)
    count[0] = 1
    prefix = 0
    ans = 0
    for x in a:
        prefix += x
        ans += count[prefix - k]
        count[prefix] += 1
    return ans
```

时间 \(O(n)\)，空间 \(O(n)\)。

## 排序 + 贪心

区间调度、最大相容、最小会议室：

```python
def min_rooms(intervals: list[tuple[int,int]]) -> int:
    events = []
    for l, r in intervals:
        events.append((l, 1))
        events.append((r, 0))
    events.sort(key=lambda e: (e[0], e[1]))  # 先结束
    cur = best = 0
    for _, typ in events:
        if typ == 1:
            cur += 1
            best = max(best, cur)
        else:
            cur -= 1
    return best
```

## C++ 二分答案

```cpp
#include <algorithm>
#include <iostream>
#include <numeric>
#include <vector>

int main() {
    std::vector<int> w{1,2,3,4,5,6,7,8,9,10};
    int days = 5;
    auto ok = [&](int cap) {
        int used = 1, cur = 0;
        for (int x : w) {
            if (x > cap) return false;
            if (cur + x > cap) { ++used; cur = 0; }
            cur += x;
        }
        return used <= days;
    };
    int lo = *std::max_element(w.begin(), w.end());
    int hi = std::accumulate(w.begin(), w.end(), 0);
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (ok(mid)) hi = mid; else lo = mid + 1;
    }
    std::cout << lo << '\n';
}
```

## 方法选择

| 特征 | 方法 |
|---|---|
| 判定单调 + 求最小/最大 | 二分答案 |
| 区间和/子数组计数 | 前缀和 + 哈希 |
| 区间重叠/调度 | 排序 + 贪心 |
| 子问题重叠 + 最优子结构 | DP |
| 枚举 + 约束 | 回溯 + 剪枝 |

## 边界

| 场景 | 注意 |
|---|---|
| 二分上界 | 必须可行 |
| 空数组 | 单独处理 |
| 负权 | 前缀和哈希仍可用；滑动窗口不一定 |
| 区间端点 | 开/闭区间统一 |

## 练习

1. 用二分答案求“最大值最小化”的分割问题。
2. 用前缀和 + 哈希求和最接近 0 的子数组。
3. 设计一个需要“排序 + 双指针 + 二分”的综合题。

## 来源

- [Hello 算法](https://www.hello-algo.com/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)
- [OI Wiki](https://oi-wiki.org/)

## 导航

[← 上一章](09-sequence-dp.md) · [本级总览](index.md)
