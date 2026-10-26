# 8.8 数值计算基础

> **级别**：第 8 级 · 高级算法与计算方法  
> **状态**：已展开。

## 学习目标

- 理解浮点误差、机器精度；
- 区分绝对误差/相对误差；
- 知道条件数与稳定性的区别。

## 浮点数

IEEE 754 double 约 53 位有效二进制位，机器 epsilon 约 \(2.2\times10^{-16}\)。

```python
eps = 2.0 ** -52
print(eps)                 # 2.220446049250313e-16
print(0.1 + 0.2 == 0.3)    # False
print(abs(0.1 + 0.2 - 0.3) < 1e-12)
```

## 误差

- 绝对误差：\(|\hat x-x|\)；
- 相对误差：\(|\hat x-x|/|x|\)（\(x\ne0\)）；
- 舍入误差、截断误差、数据误差。

## 条件数

问题本身对输入扰动的敏感度。解 \(Ax=b\)：

\[
\kappa(A)=\|A\|\|A^{-1}\|.
\]

条件数大 ≠ 算法不稳定；它说明问题本身难。

## 稳定性

算法在计算过程中不放大误差。例如：

- 两个相近数相减会损失有效数字；
- 求和时先加小数可能更稳定（Kahan 求和）。

```python
def kahan_sum(a: list[float]) -> float:
    s = 0.0
    c = 0.0
    for x in a:
        y = x - c
        t = s + y
        c = (t - s) - y
        s = t
    return s
```

## C++ 机器精度

```cpp
#include <iostream>
#include <limits>

int main() {
    std::cout << std::numeric_limits<double>::epsilon() << '\n';
    std::cout << (0.1 + 0.2 == 0.3) << '\n';
}
```

## 边界

| 场景 | 注意 |
|---|---|
| 比较浮点 | 用容差 |
| 相近数相减 | 可能灾难性抵消 |
| 大条件数 | 结果对输入极敏感 |
| 迭代停止 | 绝对+相对准则 |

## 练习

1. 计算 \(\sum_{i=1}^n 1/i\) 的不同求和顺序。
2. 用 Kahan 求和改善精度。
3. 估计一个矩阵的条件数并解释。

## 来源

- [FNC](https://fncbook.com/)
- [Boyd & Vandenberghe](https://web.stanford.edu/~boyd/cvxbook/)
- [cppreference](https://en.cppreference.com/)

## 导航

[← 上一章](07-fft-ntt.md) · [本级总览](index.md) · [下一章](09-numerical-algorithms.md)
