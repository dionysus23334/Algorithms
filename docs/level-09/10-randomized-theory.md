# 9.10 随机计算理论

> **级别**：第 9 级 · 算法理论与计算边界  
> **状态**：已展开。

## 学习目标

- 区分 Monte Carlo / Las Vegas；
- 定义 RP、BPP、ZPP；
- 用重复多数降低错误率。

## 类别

- **RP**：多项式时间，正确答案为“是”时至少 \(1/2\) 接受；“否”一定拒绝；
- **coRP**：对“否”有单侧保证；
- **ZPP**：Las Vegas，期望多项式时间，结果总正确；
- **BPP**：双侧错误，错误率 \(\le1/3\)。

\[
RP\subseteq BPP,\qquad ZPP=RP\cap coRP.
\]

## 错误放大

若单次错误率 \(p<1/2\)，独立重复 \(2t+1\) 次取多数，错误率指数下降（Chernoff）。

```python
import random

def majority_vote(f, trials: int = 101) -> bool:
    return sum(f() for _ in range(trials)) * 2 > trials
```

## 例：随机化素性测试

Miller–Rabin 是 Monte Carlo：合数可能被误判为素数，重复 \(k\) 次把错误率降到 \(4^{-k}\)。

## C++ 重复实验

```cpp
#include <iostream>
#include <random>

int main() {
    std::mt19937 rng(12345);
    std::bernoulli_distribution coin(0.5);
    int yes = 0, trials = 10000;
    for (int i = 0; i < trials; ++i) yes += coin(rng);
    std::cout << static_cast<double>(yes) / trials << '\n';
}
```

## 边界

| 场景 | 注意 |
|---|---|
| 单侧/双侧 | 错误方向不同 |
| 独立性 | 重复需独立 |
| 随机源 | 伪随机 vs 真随机 |
| 去随机化 | 某些问题可确定性化 |

## 练习

1. 证明重复多数把错误率指数降低。
2. 说明 ZPP 与 Las Vegas 的关系。
3. 用 Miller–Rabin 重复测试一个大整数。

## 来源

- [Barak — Introduction to Theoretical Computer Science](https://introtcs.org/public/)
- [Tim Roughgarden — CS261](https://timroughgarden.org/w16/w16.html)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## 导航

[← 上一章](09-parameterized.md) · [本级总览](index.md)
