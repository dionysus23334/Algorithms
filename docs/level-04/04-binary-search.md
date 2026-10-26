# 4.4 二分查找

> **级别**：第 4 级 · 基础算法与常用技巧  
> **状态**：已展开。

## 学习目标

- 写对 `lower_bound` / `upper_bound`；
- 说明区间约定与终止条件；
- 避免 `mid` 溢出和死循环。

## 区间约定

统一采用**左闭右开** `[lo, hi)`：

- `lo` 是可能答案的最小下标；
- `hi` 是可能答案的上界（不含）；
- 循环条件 `lo < hi`；
- 结束时 `lo == hi`。

## lower_bound

返回第一个 \(\ge x\) 的位置。

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

## upper_bound

返回第一个 \(>x\) 的位置。

```python
def upper_bound(a: list[int], x: int) -> int:
    lo, hi = 0, len(a)
    while lo < hi:
        mid = (lo + hi) // 2
        if a[mid] <= x:
            lo = mid + 1
        else:
            hi = mid
    return lo
```

## C++ 标准库

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> a{1, 2, 2, 2, 4, 5};
    auto lo = std::lower_bound(a.begin(), a.end(), 2);
    auto hi = std::upper_bound(a.begin(), a.end(), 2);
    std::cout << (lo - a.begin()) << ' ' << (hi - a.begin()) << '\n'; // 1 4
}
```

## 二分答案

当“判定某个值是否可行”是单调的，可以对答案二分：

```python
def first_true(lo: int, hi: int, ok) -> int:
    while lo < hi:
        mid = (lo + hi) // 2
        if ok(mid):
            hi = mid
        else:
            lo = mid + 1
    return lo
```

## 边界

| 场景 | 注意 |
|---|---|
| 空数组 | 返回 0 |
| 全部小于 x | 返回 n |
| 全部大于 x | 返回 0 |
| 重复值 | lower/upper 返回区间端点 |
| `lo+hi` 溢出 | 用 `lo + (hi-lo)//2` |

## 练习

1. 用二分求 \(\sqrt n\) 的整数部分。
2. 求有序数组中 \(x\) 的出现次数。
3. 用二分答案解决“最小最大分割”问题。

## 来源

- [Hello 算法](https://www.hello-algo.com/)
- [OI Wiki](https://oi-wiki.org/)
- [cppreference](https://en.cppreference.com/)

## 导航

[← 上一章](03-library-sort.md) · [本级总览](index.md) · [下一章](05-prefix-sum.md)
