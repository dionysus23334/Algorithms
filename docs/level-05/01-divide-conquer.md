# 5.1 分治

> **级别**：第 5 级 · 核心算法设计方法  
> **状态**：已展开。

## 学习目标

- 把问题拆成子问题，递归求解并合并；
- 写对分治的边界与合并步；
- 分析分治的递归复杂度。

## 三步

1. **划分**：把规模 \(n\) 分成若干规模更小的子问题；
2. **递归**：分别求解；
3. **合并**：把子问题结果组合成原问题结果。

分治不是“随便递归”，关键是子问题独立、规模严格减小、合并正确。

## 归并排序

```python
def merge_sort(a: list[int]) -> list[int]:
    if len(a) <= 1:
        return a
    mid = len(a) // 2
    left = merge_sort(a[:mid])
    right = merge_sort(a[mid:])
    return merge(left, right)

def merge(a: list[int], b: list[int]) -> list[int]:
    i = j = 0
    out = []
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            out.append(a[i]); i += 1
        else:
            out.append(b[j]); j += 1
    out.extend(a[i:]); out.extend(b[j:])
    return out
```

时间 \(T(n)=2T(n/2)+O(n)=O(n\log n)\)，空间 \(O(n)\)。

## 快速排序

```python
def quick_sort(a: list[int], lo: int, hi: int) -> None:
    if lo >= hi:
        return
    p = partition(a, lo, hi)
    quick_sort(a, lo, p - 1)
    quick_sort(a, p + 1, hi)

def partition(a: list[int], lo: int, hi: int) -> int:
    pivot = a[hi]
    i = lo
    for j in range(lo, hi):
        if a[j] <= pivot:
            a[i], a[j] = a[j], a[i]
            i += 1
    a[i], a[hi] = a[hi], a[i]
    return i
```

平均 \(O(n\log n)\)，最坏 \(O(n^2)\)（已排序且固定取末元素）。

## 快速选择

找第 \(k\) 小元素：只递归包含 \(k\) 的一侧，平均 \(O(n)\)，最坏 \(O(n^2)\)。

## C++ 归并

```cpp
#include <vector>

std::vector<int> merge_sort(const std::vector<int>& a) {
    if (a.size() <= 1) return a;
    auto mid = a.begin() + a.size() / 2;
    std::vector<int> left(a.begin(), mid), right(mid, a.end());
    left = merge_sort(left);
    right = merge_sort(right);
    std::vector<int> out;
    std::merge(left.begin(), left.end(), right.begin(), right.end(), std::back_inserter(out));
    return out;
}
```

## 边界

| 场景 | 注意 |
|---|---|
| 空/单元素 | 直接返回 |
| 大量重复 | 三路划分可避免退化 |
| 递归深度 | 最坏 \(O(n)\) |
| 合并空间 | 归并需要额外 \(O(n)\) |

## 练习

1. 用分治求数组最大值。
2. 实现三路快速排序。
3. 用快速选择求第 k 小，并分析最坏情况。

## 来源

- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)
- [Hello 算法](https://www.hello-algo.com/)
- [Open Data Structures](https://opendatastructures.org/)

## 导航

[← 本级总览](index.md) · [下一章](02-recursion-complexity.md)
