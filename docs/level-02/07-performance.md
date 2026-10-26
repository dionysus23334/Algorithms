# 2.7 性能测量

> **级别**：第 2 级 · 算法分析基础  
> **状态**：已展开。

## 学习目标

- 用 `timeit` / `chrono` 做基本测量；
- 区分理论复杂度、常数、输入分布与缓存效应；
- 知道微基准测试容易骗人。

## 测量前先问

1. 测的是哪个操作？
2. 输入规模与分布是什么？
3. 是否包含 I/O、初始化、编译/解释开销？
4. 是否重复足够多次？
5. 结果能否被复杂度解释？

## Python：timeit

```python
import timeit

setup = "a = list(range(1000))"
print(timeit.timeit("sum(a)", setup=setup, number=10000))
print(timeit.timeit("total = 0\nfor x in a:\n    total += x", setup=setup, number=10000))
```

`sum` 是 C 层循环，通常明显快于 Python 层循环；这体现的是**常数差异**，两者仍是 \(O(n)\)。

## C++：chrono

```cpp
#include <chrono>
#include <iostream>
#include <numeric>
#include <vector>

int main() {
    std::vector<int> a(1000000, 1);
    auto t0 = std::chrono::steady_clock::now();
    long long s = 0;
    for (int x : a) s += x;
    auto t1 = std::chrono::steady_clock::now();
    auto us = std::chrono::duration_cast<std::chrono::microseconds>(t1 - t0).count();
    std::cout << s << " " << us << "us\n";
}
```

## 输入分布

同一个算法在不同输入上可能差别很大：

- 插入排序：已排序 \(O(n)\)，逆序 \(O(n^2)\)；
- 快速排序：随机划分期望 \(O(n\log n)\)，极端划分 \(O(n^2)\)；
- 哈希表：平均 \(O(1)\)，最坏 \(O(n)\)。

报告性能时必须说明输入分布。

## 微基准陷阱

- 编译器可能把结果优化掉；
- 缓存预热、JIT、Python 解释器状态影响结果；
- 测量粒度太粗（毫秒级测微秒操作）；
- 只测一次，噪声大；
- 不同机器/编译器不可直接比较。

## 简单实验

```python
import timeit
for n in (100, 1000, 10000):
    a = list(range(n))
    t = timeit.timeit(lambda: sum(a), number=1000)
    print(n, t)
```

观察增长趋势，而不是只看单点。

## 练习

1. 比较 `sum` 与手写循环在 \(n=10^3,10^5,10^6\) 的耗时。
2. 测插入排序在有序/逆序/随机输入上的差异。
3. 设计一个微基准，说明“编译器优化掉结果”会怎样误导结论。

## 来源

- [Python Tutorial](https://docs.python.org/zh-cn/3/tutorial/)
- [Hello 算法](https://www.hello-algo.com/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## 导航

[← 上一章](06-testing.md) · [本级总览](index.md)
