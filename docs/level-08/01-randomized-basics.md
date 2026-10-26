# 8.1 随机算法基础

> **级别**：第 8 级 · 高级算法与计算方法  
> **状态**：已展开。

## 学习目标

- 用随机变量与期望分析算法；
- 区分 Monte Carlo 与 Las Vegas；
- 用 Markov/Chebyshev 估计偏差。

## 期望的线性性

\[
E\left[\sum_i X_i\right]=\sum_i E[X_i]
\]

不要求 \(X_i\) 独立。很多随机算法的分析从这里开始。

## 指示变量

事件 \(A\) 的指示变量 \(I_A\) 满足 \(E[I_A]=P(A)\)。例如随机排列中“第 \(i\) 个位置是某元素”的概率是 \(1/n\)。

## 集中不等式

- Markov：\(P(X\ge a)\le E[X]/a\)（\(X\ge0\)）；
- Chebyshev：\(P(|X-E[X]|\ge a)\le \operatorname{Var}(X)/a^2\)；
- Chernoff：独立和的尾部指数衰减。

## 两类随机算法

- **Monte Carlo**：运行时间确定，结果可能错；重复多次降低错误率；
- **Las Vegas**：结果总正确，运行时间随机；例如随机化快速排序。

```python
import random

def monte_carlo_pi(n: int) -> float:
    inside = 0
    for _ in range(n):
        x, y = random.random(), random.random()
        if x*x + y*y <= 1.0:
            inside += 1
    return 4.0 * inside / n
```

## C++ 随机实验

```cpp
#include <iostream>
#include <random>

int main() {
    std::mt19937 rng(12345);
    std::uniform_real_distribution<double> u(0.0, 1.0);
    int inside = 0, n = 1000000;
    for (int i = 0; i < n; ++i) {
        double x = u(rng), y = u(rng);
        if (x*x + y*y <= 1.0) ++inside;
    }
    std::cout << 4.0 * inside / n << '\n';
}
```

## 边界

| 场景 | 注意 |
|---|---|
| 随机种子 | 固定可复现，生产用真随机/系统熵 |
| 样本量 | 误差约 \(O(1/\sqrt n)\) |
| 独立性 | 很多界要求独立 |
| 错误率 | 重复 \(k\) 次可指数降低 |

## 练习

1. 用 Chebyshev 估计 Monte Carlo 求 π 的误差。
2. 设计一个 Las Vegas 算法并分析期望时间。
3. 说明为什么“随机测试通过”不等于正确。

## 来源

- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)
- [Tim Roughgarden — CS261](https://timroughgarden.org/w16/w16.html)
- [MMDS](https://www.mmds.org/)

## 导航

[← 本级总览](index.md) · [下一章](02-randomized-algorithms.md)
