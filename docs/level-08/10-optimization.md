# 8.10 优化算法

> **级别**：第 8 级 · 高级算法与计算方法  
> **状态**：已展开。

## 学习目标

- 区分凸/非凸；
- 用梯度下降与 Newton 法；
- 了解线性规划的基本形式。

## 凸性

凸函数满足

\[
f(\lambda x+(1-\lambda)y)\le\lambda f(x)+(1-\lambda)f(y).
\]

凸优化的局部最优即全局最优；非凸问题没有这个保证。

## 梯度下降

\[
x_{k+1}=x_k-\eta\nabla f(x_k).
\]

学习率太大发散，太小收敛慢。

```python
def gradient_descent(grad, x0: list[float], lr: float = 0.1, steps: int = 1000):
    x = x0[:]
    for _ in range(steps):
        g = grad(x)
        x = [xi - lr * gi for xi, gi in zip(x, g)]
    return x
```

## Newton 法

\[
x_{k+1}=x_k-H(x_k)^{-1}\nabla f(x_k).
\]

二次收敛，但需要 Hessian 与求逆；高维代价大。

## 线性规划

标准形式：

\[
\min c^{\mathsf T}x\quad\text{s.t. }Ax\le b,\ x\ge0.
\]

单纯形法、内点法；实际工程多用成熟求解器。

## C++ 梯度下降

```cpp
#include <vector>

std::vector<double> gradient_descent(
    std::vector<double> (*grad)(const std::vector<double>&),
    std::vector<double> x, double lr = 0.1, int steps = 1000) {
    for (int t = 0; t < steps; ++t) {
        auto g = grad(x);
        for (std::size_t i = 0; i < x.size(); ++i) x[i] -= lr * g[i];
    }
    return x;
}
```

## 边界

| 场景 | 注意 |
|---|---|
| 非凸 | 只能保证局部 |
| 学习率 | 需调参/线搜索 |
| 尺度差异 | 归一化/预处理 |
| 约束 | 投影/罚函数/内点 |

## 练习

1. 用梯度下降最小化 \(x^2+y^2\)。
2. 比较不同学习率的收敛。
3. 用 Newton 法解一个二维凸问题。

## 来源

- [Boyd & Vandenberghe](https://web.stanford.edu/~boyd/cvxbook/)
- [FNC](https://fncbook.com/)
- [MMDS](https://www.mmds.org/)

## 导航

[← 上一章](09-numerical-algorithms.md) · [本级总览](index.md) · [下一章](11-large-scale.md)
