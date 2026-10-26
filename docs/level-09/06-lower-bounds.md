# 9.6 算法下界

> **级别**：第 9 级 · 算法理论与计算边界  
> **状态**：已展开。

## 学习目标

- 用决策树证明比较排序下界；
- 理解对抗论证；
- 区分“下界”与“最优算法”。

## 比较排序下界

比较排序的决策树有 \(n!\) 个叶子；二叉树高度至少 \(\log_2(n!)=\Omega(n\log n)\)。

所以任何基于比较的排序最坏情况至少 \(\Omega(n\log n)\) 次比较。

## 计数比较

```python
def insertion_sort_count(a: list[int]) -> tuple[list[int], int]:
    a = a[:]
    cmp = 0
    for i in range(1, len(a)):
        x = a[i]
        j = i - 1
        while j >= 0:
            cmp += 1
            if a[j] <= x:
                break
            a[j+1] = a[j]
            j -= 1
        a[j+1] = x
    return a, cmp
```

对逆序数组，比较次数 \(\Theta(n^2)\)；下界只说明“至少”，不说明某个算法达到。

## 对抗论证

对手每次回答都让算法保留尽可能多的可能性；若每次只能排除常数比例，至少需要 \(\Omega(\log N)\) 次。

## 其他下界

- 查找无序数组：\(\Omega(n)\)；
- 比较模型找最大：\(n-1\) 次比较；
- 某些数据结构操作有摊还下界。

## C++ 比较计数

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> a{5,4,3,2,1};
    int cmp = 0;
    std::sort(a.begin(), a.end(), [&](int x, int y) { ++cmp; return x < y; });
    std::cout << cmp << '\n';
}
```

## 边界

| 场景 | 注意 |
|---|---|
| 非比较排序 | 下界不适用 |
| 最坏/平均 | 下界通常指最坏 |
| 模型 | RAM/比较/图灵机不同 |
| 下界证明 | 不等于算法实现 |

## 练习

1. 用决策树证明查找无序数组的下界。
2. 说明计数排序为什么不违反 \(\Omega(n\log n)\)。
3. 设计一个对抗策略证明某问题下界。

## 来源

- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)
- [Barak — Introduction to Theoretical Computer Science](https://introtcs.org/public/)
- [Tim Roughgarden — CS261](https://timroughgarden.org/w16/w16.html)

## 导航

[← 上一章](05-np-complete.md) · [本级总览](index.md) · [下一章](07-approximation.md)
