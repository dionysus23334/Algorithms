# 2.6 测试与验证

> **级别**：第 2 级 · 算法分析基础  
> **状态**：已展开。

## 学习目标

- 设计普通用例、边界用例、随机对拍；
- 用朴素解法作为 oracle；
- 知道测试通过不等于证明正确。

## 测试层次

1. **单元测试**：函数在固定输入上的输出；
2. **边界测试**：空、单元素、重复、极值；
3. **随机对拍**：小规模随机输入，与暴力解比较；
4. **压力测试**：大规模输入，检查时间/内存；
5. **形式化证明**：循环不变式/归纳法。

## 边界用例

| 类型 | 例子 |
|---|---|
| 空 | `[]`、空串 |
| 单元素 | `[0]`、`[INT_MAX]` |
| 重复 | `[1,1,1,1]` |
| 有序/逆序 | 已排序、完全逆序 |
| 极值 | 最大/最小整数、浮点接近 0 |
| 非法 | 越界、`l>r`、非数字输入 |

## 随机对拍

```python
import random

def brute_max(a: list[int]) -> int | None:
    return max(a) if a else None

def fast_max(a: list[int]) -> int | None:
    if not a:
        return None
    best = a[0]
    for x in a[1:]:
        if x > best:
            best = x
    return best

for _ in range(5000):
    n = random.randint(0, 30)
    a = [random.randint(-50, 50) for _ in range(n)]
    assert brute_max(a) == fast_max(a), a
print("ok")
```

C++ 对拍：

```cpp
#include <algorithm>
#include <cassert>
#include <random>
#include <vector>

int fast_max(const std::vector<int>& a) {
    int best = a[0];
    for (int x : a) best = std::max(best, x);
    return best;
}

int main() {
    std::mt19937 rng(12345);
    std::uniform_int_distribution<int> size(1, 30), value(-50, 50);
    for (int t = 0; t < 5000; ++t) {
        int n = size(rng);
        std::vector<int> a(n);
        for (int& x : a) x = value(rng);
        assert(fast_max(a) == *std::max_element(a.begin(), a.end()));
    }
}
```

## 测试的局限

- 随机测试只覆盖抽样分布；
- 没有反例不等于正确；
- 断言在发布版本可能被关闭；
- 浮点结果要使用容差。

## 练习

1. 为 `lower_bound` 写 10 个边界用例。
2. 用随机对拍验证插入排序与 `sorted`。
3. 设计一个“随机测试很难发现”的 off-by-one 错误，并说明如何构造定向用例。

## 来源

- [Hello 算法](https://www.hello-algo.com/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)
- [Python Tutorial](https://docs.python.org/zh-cn/3/tutorial/)

## 导航

[← 上一章](05-correctness.md) · [本级总览](index.md) · [下一章](07-performance.md)
