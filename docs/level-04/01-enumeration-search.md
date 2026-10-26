# 4.1 枚举与查找

> **级别**：第 4 级 · 基础算法与常用技巧  
> **状态**：已展开。

## 学习目标

- 用枚举覆盖所有合法情况；
- 用线性查找与提前结束；
- 估计枚举规模，避免指数爆炸。

## 线性查找

```python
def linear_search(a: list[int], x: int) -> int:
    for i, value in enumerate(a):
        if value == x:
            return i
    return -1
```

时间 \(O(n)\)，空间 \(O(1)\)。找不到时返回 `-1`；如果数组可能包含 `-1` 作为合法下标，应改用 `None` 或 `(found, index)`。

## 枚举所有数对

```python
def has_pair_sum(a: list[int], target: int) -> bool:
    n = len(a)
    for i in range(n):
        for j in range(i + 1, n):
            if a[i] + a[j] == target:
                return True
    return False
```

时间 \(O(n^2)\)。先排序再用双指针可降到 \(O(n\log n)\)，哈希表平均 \(O(n)\)。

## 提前结束

枚举不一定要跑完；找到答案即可返回。但“没有答案”时必须证明已经覆盖全部情况。

```python
def first_even(a: list[int]) -> int | None:
    for x in a:
        if x % 2 == 0:
            return x
    return None
```

## C++ 版本

```cpp
#include <iostream>
#include <vector>

bool has_pair_sum(const std::vector<int>& a, int target) {
    for (int i = 0; i < static_cast<int>(a.size()); ++i)
        for (int j = i + 1; j < static_cast<int>(a.size()); ++j)
            if (a[i] + a[j] == target) return true;
    return false;
}

int main() {
    std::cout << has_pair_sum({1, 2, 3, 4}, 6) << '\n';
}
```

## 枚举规模

| 枚举对象 | 规模 |
|---|---|
| 子数组 | \(O(n^2)\) |
| 子序列 | \(O(2^n)\) |
| 排列 | \(O(n!)\) |
| 组合 | \(O(\binom nk)\) |

先估计规模，再决定是否需要剪枝、二分、DP 或贪心。

## 边界

| 场景 | 注意 |
|---|---|
| 空数组 | 返回未找到 |
| 重复值 | 找第一个还是任意一个 |
| 目标不存在 | 必须返回明确结果 |
| 大 \(n\) | \(O(n^2)\) 可能超时 |

## 练习

1. 找出数组中和为 target 的所有数对（不重复）。
2. 用排序 + 双指针改写 `has_pair_sum`。
3. 估计 \(n=30\) 时枚举所有子集的运行时间。

## 来源

- [Hello 算法](https://www.hello-algo.com/)
- [OI Wiki](https://oi-wiki.org/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## 导航

[← 本级总览](index.md) · [下一章](02-basic-sorts.md)
