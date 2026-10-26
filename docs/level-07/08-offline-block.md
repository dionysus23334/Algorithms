# 7.8 离线与分块

> **级别**：第 7 级 · 进阶算法与数据结构  
> **状态**：已展开。

## 学习目标

- 用分块处理区间查询；
- 用莫队处理离线区间；
- 了解扫描线与 CDQ 分治。

## 分块

把数组分成 \(\sqrt n\) 块，整块打标记，零散元素暴力。

```python
import math

class SqrtDecomp:
    def __init__(self, a: list[int]) -> None:
        self.a = a
        self.B = max(1, int(math.sqrt(len(a))))
        self.nb = (len(a) + self.B - 1) // self.B
        self.tag = [0] * self.nb
        self.sum = [0] * self.nb
        for i, x in enumerate(a):
            self.sum[i // self.B] += x

    def add(self, l: int, r: int, v: int) -> None:  # [l, r)
        if l >= r:
            return
        b = self.B
        bl, br = l // b, (r - 1) // b
        if bl == br:
            for i in range(l, r):
                self.a[i] += v; self.sum[bl] += v
            return
        end_left = (bl + 1) * b
        for i in range(l, end_left):
            self.a[i] += v; self.sum[bl] += v
        for blk in range(bl + 1, br):
            self.tag[blk] += v; self.sum[blk] += v * b
        start_right = br * b
        for i in range(start_right, r):
            self.a[i] += v; self.sum[br] += v
```

单次 \(O(\sqrt n)\)。

## 莫队

离线区间查询，按块排序，用双指针移动；一般 \(O((n+q)\sqrt n)\)。需要支持 \(O(1)\) 增删一个元素。

## 扫描线

按一维排序，用数据结构维护另一维；矩形面积并、区间覆盖。

## CDQ 分治

把修改/查询按时间分治，处理左半对右半的贡献；常用于三维偏序。

## C++ 分块求和

```cpp
#include <cmath>
#include <vector>

struct Block {
    std::vector<int> a, tag, sum;
    int B;
    explicit Block(std::vector<int> v) : a(std::move(v)) {
        B = std::max(1, static_cast<int>(std::sqrt(a.size())));
        int nb = (a.size() + B - 1) / B;
        tag.assign(nb, 0); sum.assign(nb, 0);
        for (int i = 0; i < static_cast<int>(a.size()); ++i) sum[i / B] += a[i];
    }
};
```

## 边界

| 场景 | 注意 |
|---|---|
| 块大小 | 约 \(\sqrt n\)；常数影响 |
| 端点 | 半开/闭区间统一 |
| 莫队 | 只适合离线、可快速增删 |
| 强制在线 | 不能用莫队 |

## 练习

1. 用分块实现区间加/区间和。
2. 用莫队统计区间不同数个数。
3. 用扫描线求矩形面积并。

## 来源

- [OI Wiki](https://oi-wiki.org/)
- [cp-algorithms](https://cp-algorithms.com/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## 导航

[← 上一章](07-advanced-trees.md) · [本级总览](index.md) · [下一章](09-nt-advanced.md)
