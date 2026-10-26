# 8.2 随机化算法

> **级别**：第 8 级 · 高级算法与计算方法  
> **状态**：已展开。

## 学习目标

- 用蓄水池抽样做流式均匀抽样；
- 用随机化快速选择；
- 理解随机哈希与去重。

## 蓄水池抽样

从未知长度的流中等概率选 \(k\) 个元素：

```python
import random

def reservoir(stream, k: int) -> list[int]:
    out = []
    for i, x in enumerate(stream):
        if i < k:
            out.append(x)
        else:
            j = random.randint(0, i)
            if j < k:
                out[j] = x
    return out
```

每个元素最终被选中概率 \(k/n\)。

## 随机化快速选择

随机选 pivot，期望 \(O(n)\) 找第 \(k\) 小；最坏仍 \(O(n^2)\)。

```python
import random

def quickselect(a: list[int], k: int) -> int:
    if not 0 <= k < len(a):
        raise IndexError(k)
    lo, hi = 0, len(a) - 1
    while lo <= hi:
        p = random.randint(lo, hi)
        a[lo], a[p] = a[p], a[lo]
        pivot = a[lo]
        i, j = lo, hi
        while i < j:
            while i < j and a[j] >= pivot: j -= 1
            a[i] = a[j]
            while i < j and a[i] <= pivot: i += 1
            a[j] = a[i]
        a[i] = pivot
        if i == k:
            return a[i]
        if i < k:
            lo = i + 1
        else:
            hi = i - 1
    raise AssertionError
```

## 随机哈希

用随机种子构造哈希函数，降低被恶意输入攻击的风险；哈希表的最坏情况仍可能发生，但期望性能好。

## C++ 随机选择

```cpp
#include <algorithm>
#include <random>
#include <vector>

int quickselect(std::vector<int> a, int k) {
    std::mt19937 rng(12345);
    std::nth_element(a.begin(), a.begin() + k, a.end());
    return a[k];
}
```

工程中直接用 `nth_element`；这里展示随机化思想。

## 边界

| 场景 | 注意 |
|---|---|
| \(k>n\) | 非法 |
| 重复值 | 选择第 k 小需定义重复计数 |
| 流长度未知 | 蓄水池适合 |
| 随机种子 | 可复现性 |

## 练习

1. 证明蓄水池抽样的均匀性。
2. 用随机化快速选择求中位数。
3. 设计一个随机化去重/抽样实验。

## 来源

- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)
- [MMDS](https://www.mmds.org/)
- [cp-algorithms](https://cp-algorithms.com/)

## 导航

[← 上一章](01-randomized-basics.md) · [本级总览](index.md) · [下一章](03-advanced-dp-optimization.md)
