# 2.5 正确性入门

> **级别**：第 2 级 · 算法分析基础  
> **状态**：已展开。

## 学习目标

- 用反例否定错误算法；
- 用循环不变式证明迭代算法；
- 用归纳法证明递归算法；
- 说明终止性。

## 反例

要证明算法错误，只需一个合法输入使输出错误。

```python
def wrong_max(a: list[int]) -> int:
    best = 0
    for x in a:
        if x > best:
            best = x
    return best
```

反例：`[-3, -1, -2]` 返回 0，而正确最大值是 -1。初始化 `best=0` 隐含了“数组非负”的假设。

## 循环不变式

以二分查找的 `lower_bound` 为例：

```python
def lower_bound(a: list[int], x: int) -> int:
    lo, hi = 0, len(a)
    while lo < hi:
        mid = (lo + hi) // 2
        if a[mid] < x:
            lo = mid + 1
        else:
            hi = mid
    return lo
```

不变式：

1. 答案在 \([lo,hi]\) 中；
2. `a[0:lo] < x`；
3. `a[hi:] >= x`。

每轮：

- 若 `a[mid] < x`，答案不可能在 `[lo,mid]`，令 `lo=mid+1`；
- 否则答案在 `[lo,mid]`，令 `hi=mid`。

循环结束时 `lo==hi`，不变式给出答案。

## 终止性

- `hi-lo` 每轮严格减小（`mid < hi` 或 `lo=mid+1`），所以终止；
- 递归必须有基本情况，且每次向基本情况靠近；
- `while` 循环要有可度量的进度量。

## 归纳法

对递归求和：

```python
def sum_to(n: int) -> int:
    if n == 0:
        return 0
    return n + sum_to(n - 1)
```

命题 \(P(n)\)：`sum_to(n)=n(n+1)/2`。

- 基础：\(n=0\)，返回 0；
- 归纳：假设 \(P(n-1)\)，则 `sum_to(n)=n+(n-1)n/2=n(n+1)/2`。

## C++ 版本

```cpp
#include <vector>

int lower_bound_cpp(const std::vector<int>& a, int x) {
    int lo = 0, hi = static_cast<int>(a.size());
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2; // avoid overflow
        if (a[mid] < x) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}
```

`mid = lo + (hi - lo) / 2` 比 `(lo+hi)/2` 更安全。

## 常见错误

| 错误 | 例子 |
|---|---|
| 初始化错误 | 最大值初始化为 0 |
| 边界错误 | `lo <= hi` 与 `lo < hi` 混用 |
| 不终止 | 循环变量不变 |
| 只证部分情况 | 忘了空数组、重复值 |
| 循环不变式不完整 | 没有说明区间含义 |

## 练习

1. 给 `lower_bound` 写出完整的不变式与终止性证明。
2. 找 `wrong_max` 的另一个反例，并修复。
3. 用归纳法证明 `sum_to` 的时间复杂度是 \(O(n)\)。

## 来源

- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)
- [Hello 算法](https://www.hello-algo.com/)
- [Open Data Structures](https://opendatastructures.org/)

## 导航

[← 上一章](04-space-complexity.md) · [本级总览](index.md) · [下一章](06-testing.md)
